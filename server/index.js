/*
 * Log File Viewer
 * 
 */

var httpolyglot = require('httpolyglot');
const fs = require('fs');
const stream = require('stream');
const express = require('express');
// const singleton = require('./commons/global.singleton').singleton;
const compression = require('compression');
var appExpress = express();

var server = httpolyglot.createServer({
  key: fs.readFileSync('ia.key'),
  cert: fs.readFileSync('ia.crt')
}, appExpress);

var io = require('socket.io')(server);
var reader = require('./core/log-reader');
const port = 9010;
const host = '127.0.0.1';

/* app.use(compression({filter: shouldCompress})) */
appExpress.use(compression());
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    return false;
  }
  return compression.filter(req, res);
}

httpolyglot.createServer({
  key: fs.readFileSync('ia.key'),
  cert: fs.readFileSync('ia.crt')
}, appExpress);

appExpress.use('', express.static('server/views'));

appExpress.get('/', function (req, res) {
  if (!req.socket.encrypted || !req.protocol === 'https') {
    res.writeHead(301, { 'location': `https://${host}:${port}` });
    return res.end();
  }
  res.sendFile(__dirname + 'server/views/index.html');
});

appExpress.all('*', function (req, res) {
  res.redirect(`https://${host}:${port}`);
});

function initSockets() {
    io.on('connection', function (socket) {
        reader.startListeningForEvents(socket);
    });
};

initSockets();

server.listen(port, host, function() {
  console.log(`httpolyglot server listening on ${host} port ${port}`);
});
