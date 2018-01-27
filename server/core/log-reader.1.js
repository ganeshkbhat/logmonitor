/*
 * Log file reader 
 * Credits: https://github.com/barzik/simple-log-viewer/blob/master/lib/logOpener.js
*/
const fs = require('fs');
const singleton = require('../commons/global.singleton').singleton;
const app = singleton('express');
const chokidar = require('chokidar');

var stream_log_file_path, static_log_file_path, numberOfLinesToSend = 500, streamLastLineSent = 0;
let socket, allClients = [], watcher;

/**
 * Initialize the logic with file path
 * 
 * @param {any} path 
 * @param {any} callback 
 */
function initStream (path, callback) {
    if(typeof callback == 'undefined') {
        callback = function() {};
    }
    stream_log_file_path = path;
    prepareLogFilePosition(stream_log_file_path, function () {
        callback();
    });
};

/**
 *
 * Handle the log file position/path given by the user
 * if the log file is not there - create it
 * throw error if location is directory
 *
 * @param stream_log_file_path
 */

function prepareLogFilePosition (stream_log_file_path, callback) {
    if (fs.existsSync(stream_log_file_path)) {
        console.log('Log file existing');
        var stats = fs.lstatSync(stream_log_file_path);
        if(!stats.isFile()) {
            throw new Error('Path is not a file.');
        }
        this.stream_log_file_path = stream_log_file_path;
        callback();
    } else {
        fs.open(stream_log_file_path, 'a', function() {
            this.stream_log_file_path = stream_log_file_path;
            callback();
        });

    }
}

/*
 * Get specific line
*/
function get_line(static_log_file_path, line_of_text, callback) {
    let stream = fs.createReadStream(static_log_file_path, {
      flags: 'r',
      encoding: 'utf-8',
      fd: null,
      mode: 0666,
      bufferSize: 64 * 1024
    });

    let fileData = '';
    stream.on('data', function(data){
      fileData += data;

      // The next lines should be improved
      let lines = fileData.split("\n");

      if(lines.length >= +line_of_text){
        stream.destroy();
        callback(null, lines[+line_of_text]);
      }
    });

    stream.on('error', function(){
      callback('Error', null);
    });

    stream.on('end', function(){
      callback('File end reached without finding line', null);
    });

}

function get_line_better_performance(static_log_file_path, line_no, cb){
    var stream = fs.createReadStream(static_log_file_path, {
        flags: 'r',
        encoding: 'utf-8',
        fd: null,
        mode: '0666',
        bufferSize: 64 * 1024
    });

    var fileData = '';
    stream.on('data', function(data){
        fileData += data;

        var lines = fileData.split('\n');

        if(lines.length >= +line_no){
            stream.destroy();
            cb(null, lines[+line_no]);
        }
        // Add this else condition to remove all unnecesary data from the variable
        else
            fileData = Array(lines.length).join('\n');
    });

    stream.on('error', function(){
        cb('Error', null);
    });

    stream.on('end', function(){
        cb('File end reached without finding line', null);
    });
};

/**
 * Get the logs for static log viewer
 * Send data based on readConfig sent by user
 * readConfig might contain options data like:
 * static_log_file_path
 * numberOfLines, OR fromLine, toLine, 
 * hasString, 
 * hasStringInLogKeyPosition
 * fromDate, toDate
 * 
 * @param {any} callback 
 * @param {any} readConfig 
 */
function readLogFileStaticLog(callback, readConfig){

}

/**
 * Sends the initial set of logs (last or most recent logs)
 * numberOfLines of logs to be sent to be sent by user
 * Default is 500 lines
 * 
 * @param {any} callback 
 * @param {any} numberOfLines 
 */
function readLogFileStreamInitialLog(callback, numberOfLines) {

    let data = "";
    let statement = [];
    let instream = fs.createReadStream(stream_log_file_path);

    instream.on('readable', function() {
        data += instream.read();
        while ( data.indexOf('\n') >= 0) {
            instream.emit('newLine', data.substring(0, data.indexOf('\n')));
            data = data.substring(data.indexOf('\n')+1);
        }
    });
    instream.on('newLine', function (line_of_text, end_of_file) {
        statement.push(line_of_text);
        if(end_of_file){
            callback(statement, line_of_text, numberOfLines);
        }
    });
    instream.on('end', function() {
        instream.emit('newLine', data , true);
    });
}

/**
 *
 *  Start application codes
 *
 */

function startListeningForEvents(sockets) {

    socket = sockets;
    allClients.push(socket);

    socket.on('stream-initial-log', function(data) {

        initStream(data.stream_log_file_path);
        if (data.numberOfLinesToSend) {
            numberOfLinesToSend = data.numberOfLinesToSend;
        } else {
            numberOfLinesToSend = 500;
        }
        
        readLogFileStreamInitialLog(function(statement, last_line_of_text, numberOfLinesToSend) {
            last_lines = statement.slice(-1 * numberOfLinesToSend+1);
            if (last_lines.splice((numberOfLinesToSend-1),1) == null){
                last_lines = last_lines.splice(0,(numberOfLinesToSend));
            }
            streamLastLineSent = statement.length - numberOfLinesToSend;
            socket.emit('stream-log-data', {lines: last_lines, total: statement.length});
            //console.log(statement.length, last_lines.length, last_lines[last_lines.length-1]);
        }, numberOfLinesToSend);
        watchFile();
    });

    socket.on('stream-stop-monitoring-log', function(data) {
        stopWatchingFile(data.stream_log_file_path);
    });

    socket.on('stream-start-monitoring-log', function(data) {
        watchFile();
    });
    socket.on('disconnect', function() {
      console.log('Got disconnect!');
      stopWatchingFile();
      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
   });
}

/**
 *
 * Watching for file changes
 *
 */
function watchFile() {
    watcher = fs.watchFile(stream_log_file_path, function (curr, prev) {
        //console.log(curr, prev);
        readLogFileStreamInitialLog(function (statement, last_line_of_text, numberOfLinesToSend) {
            let totalLines = statement.length;
            last_lines = statement.splice((streamLastLineSent-numberOfLinesToSend), numberOfLinesToSend);
            console.log(statement.length, streamLastLineSent, totalLines, numberOfLinesToSend, last_lines.length, (last_lines.length - numberOfLinesToSend))
            //console.log(last_lines);
            for(let i = 0; i<(last_lines.length); i++) {
                if(last_lines[i] == null || last_lines[i] === null || last_lines[i] === 'null'  || last_lines[i] === ''){
                    console.log('Printing Null', last_lines[i], last_lines.length);
                } else {
                    socket.emit('stream-log-change-data', last_lines[i]);
                }
            }
            //socket.emit('stream-log-change-data', last_line_of_text);
            //console.log(last_line_of_text);
        }, 1);
    });
}

/**
 * Stop watching for changes for a log file
 * 
 * @param {any} stream_log_file_path 
 */
function stopWatchingFile(stream_log_file_path){
    if(watcher){
        //watcher.close();
    }
}



module.exports = {
    init: initStream,
    prepareLogFilePosition: prepareLogFilePosition,
    readLogFileStreamInitialLog: readLogFileStreamInitialLog,
    watchFile: watchFile,
    startListeningForEvents: startListeningForEvents
}
