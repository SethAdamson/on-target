require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , ctrl = require('./controllers')
    , nodemailer = require('nodemailer')
    , smtpTransport = require('nodemailer-smtp-transport');
const app = express();

//----------------DotEnv--------------------//

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    APP_ADDRESS,
    APP_PASSWORD,
    REACT_APP_FRONTEND_URL
} = process.env;

//----------------Middleware--------------------//

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
});

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//----------------Auth0--------------------//

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid email profile'
},
(accessToken, refreshToken, extraParams, profile, done) => {
    const db = app.get('db');
    // console.log(profile);
    let {picture, nickname} = profile;
    let first = profile.name.givenName;
    let last = profile.name.familyName;
    let authID = profile.id;
    let email = profile.emails[0].value;

    db.find_user([authID]).then(user => {
        if(user[0]){
            done(null, user[0].id);
        } else {
            db.create_user([first, last, picture, nickname, email, authID])
            .then(createdUser => {
                done(null, createdUser[0].id);
            });
        }
    }).catch(e => console.log(e))
}));

passport.serializeUser((id, done) => {
    done(null, id);
});
passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_session_user([id]).then(user => {
        done(null, user[0]);
    }).catch(e => console.log(e))
});

//-----------------------------------------------------------//


app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `${REACT_APP_FRONTEND_URL}#/home`
}));
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect(`https://on-target.auth0.com/v2/logout?returnTo=${encodeURIComponent(REACT_APP_FRONTEND_URL)}`)
});
app.get('/auth/user', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Unauthorized');
        res.redirect(REACT_APP_FRONTEND_URL);
        // res.redirect(`${REACT_APP_FRONTEND_URL}/#/`);
    }
});

app.get('/boards', ctrl.getBoards);
app.get('/lists/:id', ctrl.getLists);
app.get('/cards/:id', ctrl.getCards);
app.get('/boards/:id', ctrl.getSingleBoard);
app.put('/change/boards/:id', ctrl.updateBoard);
app.put('/change/lists/:id', ctrl.updateListTitle);
app.put('/change/cards/:id', ctrl.updateCardTitle);
app.put('/cards/desc/:id', ctrl.updateCardDesc)
app.put('/cards/update/:id', ctrl.updateCardLocation);
app.put('/lists/update/:id', ctrl.updateListLocation);
app.put('/move/cardlist/:id', ctrl.moveCardList);
app.put('/move/card/:id', ctrl.moveCardSame);
app.put('/move/list/:id', ctrl.moveList);
app.post('/add/cards', ctrl.addCard);
app.post('/add/lists', ctrl.addList);
app.post('/add/boards', ctrl.addBoard);
app.delete('/remove/card/:board/:card', ctrl.removeItem);
app.delete('/remove/list/:board/:list', ctrl.removeItem);
app.delete('/remove/board/:board', ctrl.removeItem);

app.post('/send/email', function(req, res, next){
    let {user, message, emailSubject} = req.body;
    const transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: APP_ADDRESS,
        pass: APP_PASSWORD
      }
    }));
    const mailOptions = {
      from: `${user.email}`,
      to: APP_ADDRESS,
      subject: `${emailSubject}`,
      text: `${message}`,
      replyTo: `${user.email}`
    }
    transporter.sendMail(mailOptions, function(err, res) {
      if (err) {
        console.error('there was an error: ', err);
      } else {
        console.log('here is the res: ', res)
      }
    })
});


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});