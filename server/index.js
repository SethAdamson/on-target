require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , massive = require('massive')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , ctrl = require('./controllers');
const app = express();

//----------------DotEnv--------------------//

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

//----------------Middleware--------------------//

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
    })
}));

passport.serializeUser((id, done) => {
    done(null, id);
});
passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_session_user([id]).then(user => {
        done(null, user[0]);
    })
});

//-----------------------------------------------------------//


app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `http://localhost:3000/#/home`
}));
app.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect(`http://localhost:3000/#/`)
});
app.get('/auth/user', (req, res) => {
    if(req.user){
        res.status(200).send(req.user);
    } else {
        res.status(401).send('Unauthorized');
        // res.redirect(`http://localhost:3000/#/`);
    }
});

app.get('/boards', ctrl.getBoards);
app.get('/lists/:id', ctrl.getLists);
app.get('/cards/:id', ctrl.getCards);
app.get('/boards/:id', ctrl.getSingleBoard);
app.put('/change/boards/:id', ctrl.updateBoard);
app.put('/change/lists/:id', ctrl.updateListTitle);
app.put('/cards/update/:id', ctrl.updateCardLocation);
app.put('/lists/update/:id', ctrl.updateListLocation);
app.put('/move/cardlist/:id', ctrl.moveCardList);
app.put('/move/card/:id', ctrl.moveCardSame);
app.post('/add/cards', ctrl.addCard);
app.post('/add/lists', ctrl.addList);
app.post('/add/boards', ctrl.addBoard);
app.delete('/remove/card/:board/:card', ctrl.removeItem);
app.delete('/remove/list/:board/:list', ctrl.removeItem);
app.delete('/remove/board/:board', ctrl.removeItem);



app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
});