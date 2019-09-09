const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');

const timeout = require('connect-timeout'); //express v4
const fileUpload = require('express-fileupload');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
//Cors
app.use(cors());
app.options('*', cors());
//registering view
app.set('views', 'views');
app.set('view engine', 'pug');
// API file for interacting with api route
const api_account = require('./routes/raccount');
const api_area = require('./routes/rarea');
const api_location = require('./routes/rlocation');

//fileupload
app.use(fileUpload());
// Parsers
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
// API location route
//secure the api with auth
const auth = function (req, res, next) {
    let uri = String(req.originalUrl);
    if (uri.indexOf('/account/login') >= 0 || uri.indexOf('/account/register') >= 0)
        next();
    else {
        var token = req.headers['x-access-token'];
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            next();
        });
    }
}
app.use(auth);
//our route
app.use('/api/account', api_account);
app.use('/api/area', api_area);
app.use('/api/location', api_location);


app.use(timeout('150s'));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});


//Set Port
const port = '3005';
app.set('port', port);
http.globalAgent.maxSockets = Infinity;
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on localhost:${port}`));