/**
 * Log file reader 
 * Credits: https://github.com/barzik/simple-log-viewer/blob/master/lib/logOpener.js
 * TODO: ReadFileStream called multiple times. Call once for initialization and once for every change
*/

const fs = require('fs');
const singleton = require('../commons/global.singleton').singleton;
const app = singleton('express');
const chokidar = require('chokidar');

/** 
 * 
 * Streaming/Static Log Paths and Setting variables
 * 
 */

var stream_log_file_path, static_log_file_path, numberOfLinesToSend = 30, lastLineSent = 0;

/** 
 * 
 * Socket, clients, and Watcher Objects
 * 
 */

let socket, allClients = [], watcher = {};

/**
 * 
 * Stream Log Filters and Setting variables 
 * 
 */

var log_filters = [], type = '', delimiters = [];

/** 
 * 
 * Seperated split string comparer
 * 
 * @param {object} log_filters
 * @param {object array} splitObj
 * @param {string} obj
 * 
 */

function comparer(log_filters, splitObj, obj) {
    let ret = null;
    for (let i = 0; i < log_filters.length; i++) {
        switch (!!log_filters[i] && typeof log_filters[i] === 'object' && !!log_filters[i].comparer && !!log_filters[i].key) {
            case (log_filters.comparer === '='):
                (splitObj[log_filters.index] === log_filters.value) ? (ret = obj) : null;
            case (log_filters.comparer === '>' && typeof splitObj[log_filters.index] === 'number'):
                (splitObj[log_filters.index] === log_filters.value) ? (ret = obj) : null;
            case (log_filters.comparer === '<' && typeof splitObj[log_filters.index] === 'number'):
                (splitObj[log_filters.index] === log_filters.value) ? (ret = obj) : null;
            case (log_filters.comparer === 'contains' && typeof splitObj[log_filters.index] === 'string'):
                (splitObj[log_filters.index] === log_filters.value) ? (ret = obj) : null;
            case (log_filters.comparer === 'doesnotcontains' && typeof splitObj[log_filters.index] === 'string'):
                (splitObj[log_filters.index] === log_filters.value) ? (ret = obj) : null;
        }
    }
    return ret;
}

/** 
 * 
 * Double Seperator Splitter string function
 * 
 * @param {string} log_object,
 * @param {string} type,
 * @param {object array} delimiters
 * 
 */

function doubleSplitter(log_object, type, delimiters) {
    let splitObj = [];
    let regExp = '';
    if (delimiters && delimiters instanceof Array && delimiters.length === 2 && type === 'Double' && log_object) {
        regExp = '[' + delimiters[0] + '\\' + delimiters[1] + ']{1,2}';
        let regExSplitter = new RegExp(regExp, "g");
        splitObj = log_object.split(regExSplitter);
        splitObj.length--;
        splitObj.shift();
    } else {
        return log_object;
    }

    if (splitObj.length === 0) {
        splitObj = log_object;
    }

    return splitObj;
}

/** 
 * 
 * Single Splitter string function
 * 
 * @param {string} log_object,
 * @param {string} type,
 * @param {object array} delimiters
 * 
*/

function multiOrSingleDelimitersSingleSplitter(log_object, type, delimiters) {
    let splitObj = [];
    let regExp = '';
    if (delimiters && delimiters instanceof Array && delimiters.length > 0 && type === 'Single' && log_object) {
        regExp = delimiters;
        let regExSplitter = new RegExp(regExp, "g");
        let splitObj = x.split(new RegExp(regExSplitter, 'g'));
    } else {
        return log_object;
    }

    if (splitObj.length === 0) {
        return log_object;
    }

    return splitObj;
}

/** 
 * 
 * JSON Log Filter function
 * 
 * @param {object array} log_filters
 * @param {string} log_object
 * 
 */

function jsonFilter(log_filters, log_object) {
    let obj = JSON.parse(log_object);
    let retObj = null;

    if (typeof obj === 'object' && (typeof obj !== 'string' || !obj instanceof String) && !obj instanceof Date && typeof obj !== 'number' && !!obj && !obj instanceof Array) {
        for (let i = 0; i < log_filters.length; i++) {
            switch (!!log_filters[i] && typeof log_filters[i] === 'object' && !!log_filters[i].comparer && !!log_filters[i].key) {
                case (log_filters[i].comparer === '='):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === '>'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === '<'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === 'contains'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === 'doesnotcontain'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === 'sametype'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
                case (log_filters[i].comparer === 'notsametype'):
                    (obj[log_filters.key] === log_filters.value) ? (retObj = obj) : null;
                    break;
            }
        }
        return retObj;
    }
}

/** 
 * 
 * Delimiter Single Side Log Seperator Filter
 * 
 * @param {object array} log_filters 
 * @param {string} log_object
 * @param {string} type
 * 
 */

function singleSideSeperatorFilter(log_filters, log_object, type, delimiters) {
    let retObj = null;
    let splitObj = null;

    if ((typeof log_object === 'string') && (log_object !== '' || !!log_object)) {
        let obj = log_object;
        splitObj = multiOrSingleDelimitersSingleSplitter(log_object, type, delimiters);
        if (splitObj instanceof Array && splitObj.length > 0) {
            retObj = comparer(log_filters, splitObj, obj);
            return retObj;
        }
    }
    return log_object;
}

/** 
 * 
 * Delimiter Double Side Log Seperator Filter
 * 
 * @param {object array} log_filters
 * @param {object} log_object
 * @param {string} type
 * @param {object array} delimiters
 * 
 */

function doubleSideSeperatorFilter(log_filters, log_object, type, delimiters) {
    let retObj = null;
    let splitObj = null;

    if ((typeof log_object === 'string') && (log_object !== '' || !!log_object)) {
        let obj = log_object;
        splitObj = doubleSplitter(log_object, type, delimiters);
        if (splitObj instanceof Array && splitObj.length > 0) {
            retObj = comparer(log_filters, splitObj, obj);
            return retObj;
        } else {
            return log_object;
        }
    }
    return log_object;
}

/**
 * 
 * Apply filter for logs
 * Filters are sent by Frontend
 * 
 * @param {object array} log_filters 
 * @param {object || string} log_object
 * @param {string} type
 * @param {object array} delimiters
 * 
 */

function filterLogs(log_filters, log_object, type, delimiters) {
    if (log_filters instanceof Array && delimiters instanceof Array) {
        if (log_filters.length === 0) {
            return log_object;
        } else {
            if (type === 'JSON') {
                return jsonFilter(log_filters, log_object);
            } else if (type === 'Single') {
                return singleSideSeperatorFilter(log_filters, log_object, type, delimiters);
            } else if (type === 'Double') {
                return doubleSideSeperatorFilter(log_filters, log_object, type, delimiters);
            } else {
                return log_object;
            }
        }
    }
}

/**
 * 
 * Initialize the logic with file path
 * 
 * @param {string} path 
 * @param {object function} callback 
 * 
 */

function initStream(path, callback) {
    if (typeof callback == 'undefined') {
        callback = function () { };
    }
    stream_log_file_path = path;
    prepareLogFile(stream_log_file_path, function () {
        callback();
    });
};

/**
 *
 * Handle the log file position/path given by the user
 * if the log file is not there - create it
 * throw error if location is directory
 *
 * @param {string} stream_log_file_path
 * 
 */

function prepareLogFile(stream_log_file_path, callback) {
    if (fs.existsSync(stream_log_file_path)) {
        console.log('Log file existing');
        var stats = fs.lstatSync(stream_log_file_path);
        if (!stats.isFile()) {
            throw new Error('Path is not a file.');
        }
        this.stream_log_file_path = stream_log_file_path;
        callback();
    } else {
        /* 
        fs.open(stream_log_file_path, 'a', function () {
            this.stream_log_file_path = stream_log_file_path;
            callback();
        }); 
        */
        throw new Error('Path does not exist.');
    }
}

/**
 * 
 * Counts the number of lines in a log file
 * 
 * @param {string} filePath 
 * @returns {Promise} line count of log file
 * 
 */

function countFileLines(filePath) {
    return new Promise((resolve, reject) => {
        let lineCount = 0;

        fs.createReadStream(filePath)
            .on("data", (buffer) => {
                let idx = -1;
                lineCount--;
                do {
                    idx = buffer.indexOf(10, idx + 1);
                    lineCount++;
                } while (idx !== -1);
            })
            .on("end", () => {
                resolve(lineCount);
            })
            .on("error", reject);
    });
};

/**
 * 
 * Get specific line numbers to be sent
 * 
 * @param {string} static_log_file_path 
 * @param {number} line_no 
 * @param {number} numberOfLines 
 * @param {object function} cb function
 * 
 */

function get_line(static_log_file_path, line_no, numberOfLines, cb) {

    var stream = fs.createReadStream(static_log_file_path);
    var ended = false;
    var fileData = '';

    stream.on('data', function (data) {
        fileData += data;
        var lines = fileData.split('\n');
        if (lines.length >= +line_no) {
            for (var i = numberOfLines; i > 0; i--) {
                console.log('Line number', +line_no - i + 1, +line_no, i, numberOfLines);
                if (lines[+line_no - i] !== '' && lines[+line_no - i] !== null && (+line_no - i !== lastLineSent)) {
                    let arr = { lines: lines[+line_no - i], no: +line_no - i + 1 };
                    cb(null, arr);
                }
            }
        }
        else
            fileData = Array(lines.length).join('\n');
    });

    stream.on('error', function () {
        cb('Error', null);
    });

    stream.on('end', function () {
        ended = true;
        cb('File end reached without finding line', null);
    });

};

/**
 *
 * Start application codes
 * 
 * @param {object} sockets
 *
 */

function startListeningForEvents(sockets) {

    socket = sockets;
    allClients.push(socket);
    let arr = [];
    let fileCount = 0;

    socket.on('stream-initial-log', function (data) {

        console.log(data.stream_log_file_path);
        let filePath = data.stream_log_file_path;
        log_filters = data.log_filters;
        type = data.type;
        delimiters = data.delimiters;

        initStream(data.stream_log_file_path);

        if (data.numberOfLinesToSend) {
            numberOfLinesToSend = data.numberOfLinesToSend;
        } else {
            numberOfLinesToSend = 25;
        }

        countFileLines(filePath)
            .then(function (data) {
                fileCount = data;
                get_line(filePath, fileCount, numberOfLinesToSend, function (d, datas) {
                    arr = datas;
                    if (arr && arr.no) {
                        lastLineSent = arr.no - 1;
                    }
                    if (arr && arr.lines.split('').length > 0 && arr.lines !== '\r' && arr.lines !== '\n') {
                        let filterArr = filterLogs(log_filters, arr, type, delimiters);
                        socket.emit('stream-log-change-data', (filterArr) ? filterArr : arr);
                    }
                });
                watcher[filePath] = watchFile(filePath);
            });

        watcher[filePath] = watchFile(filePath);
    });

    socket.on('stream-stop-monitoring-log', function (data) {
        //console.log('Stop Watching');
        stopWatchingFile(data.stream_log_file_path);
    });

    socket.on('stream-start-monitoring-log', function (data) {

        let filePath = data.stream_log_file_path;

        countFileLines(filePath)
            .then(function (data) {
                fileCount = data;
                console.log(lastLineSent);
                get_line(filePath, fileCount, (fileCount - lastLineSent), function (d, datas) {
                    arr = datas;
                    if (arr && arr.no) {
                        lastLineSent = arr.no - 1;
                    }
                    if (arr && arr.lines.split('').length > 0 && arr.lines !== '\r' && arr.lines !== '\n') {
                        let filterArr = filterLogs(log_filters, arr, type, delimiters);
                        socket.emit('stream-log-change-data', (filterArr) ? filterArr : arr);
                    }
                });
                watcher[filePath] = watchFile(filePath);
            });

        watcher[filePath] = watchFile(filePath);
    });

    socket.on('disconnect', function () {
        console.log('Got disconnect!');
        stopWatchingFile();
        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });

}

/**
 *
 * Watch changes for log file
 * 
 * @param {string} stream_log_file_path 
 *
 */

function watchFile(stream_log_file_path) {
    let filePath = stream_log_file_path;

    if (!watcher[filePath]) {
        watcher[filePath] = fs.watch(filePath, function (curr, prev) {
            countFileLines(filePath)
                .then(function (dat) {
                    let fCount = dat;
                    get_line(filePath, fCount, (fCount - lastLineSent - 1), function (d, datas) {
                        arr = datas;
                        if (arr && arr.no) {
                            lastLineSent = arr.no - 1;
                        }
                        if (arr && arr.lines.split('').length > 0 && arr.lines !== '\r' && arr.lines !== '\n' && (arr.no - 1 === lastLineSent)) {
                            let filterArr = filterLogs(log_filters, arr, type, delimiter_type, delimiters);
                            socket.emit('stream-log-change-data', filterArr);
                        }
                    });
                });
        });
        
    }

    return watcher[filePath];
}

/**
 * 
 * Stop watching for changes for a log file
 * 
 * @param {string} stream_log_file_path 
 * 
 */

function stopWatchingFile(stream_log_file_path) {
    if (stream_log_file_path) {
        if (watcher[stream_log_file_path]) {
            watcher[stream_log_file_path].close();
            watcher[stream_log_file_path] = null;
            socket.emit('stream-log-watch-stopped', 'success');
        } else {
            socket.emit('stream-log-watch-stopped', 'failed');
        }
    } else {
        watcher = {};
    }
}

module.exports = {
    init: initStream,
    get_line: get_line,
    prepareLogFile: prepareLogFile,
    startListeningForEvents: startListeningForEvents,
    watchFile: watchFile,
    stopWatchingFile: stopWatchingFile
}
