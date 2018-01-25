import { Injectable } from '@angular/core';
import { OrderByPipe } from 'ngx-pipes';
import { CommonEventsService } from '../../commons/events/events.service';
import { StreamDataService } from '../data/stream.data.service';
import { StreamEventsService } from '../events/stream.events.service';
import { SocketsService } from '../../commons/sockets/sockets.service';

/**
 * 
 * 
 * @export
 * @class StreamSocketsService Injectable/Service
 */

@Injectable()
export class StreamSocketsService {

    /* Sockets Object */
    sockets: any;

    streamOptionColumns: String[] = [
        'Stream',
        'Executive',
        'Manager',
        'Accountant'
    ];

    streamSelectedColumns: String[] = [];

    constructor(public _obp: OrderByPipe, public _ds: StreamDataService, public _es: StreamEventsService, public _ces: CommonEventsService, public _ss: SocketsService) {

        let that = this;
        this.sockets = this._ss.getSocket();

        this.sockets.on('stream-log-change-data', function (data) {
            if (data == null || data === null || typeof data == 'undefined') {
            } else {
                let logs;
                if (data.lines.includes('null')) {
                    logs = data.lines.replace('}null', '}');
                    if (!logs || logs != null || logs !== null) {
                        let item = JSON.parse(logs);
                        item.i = data.no;
                        that._ds.streamLogs.push(item);
                        that._ds.streamLogs = that._obp.transform(that._ds.streamLogs, '-i');
                        that._ces._sscstart.emit(item);
                    }
                } else {
                    logs = data.lines;
                    if ((!logs || logs != null || logs !== null) && (logs != "")) {
                        let item = JSON.parse(logs);
                        item.i = data.no;
                        that._ds.streamLogs.push(item);
                        that._ds.streamLogs = that._obp.transform(that._ds.streamLogs, '-i');
                        that._ces._sscstart.emit(item);
                    }
                }
            }
        });

        this.sockets.on('stream-log-data', function (data) {
            if (data.length !== 0) {
                that._ds.streamLogs = [];
                for (let i = 0; i < data.lines.length; i++) {
                    if (data.lines[i] != '' || data.lines[i] != null || data.lines[i] != 'null') {
                        if (data.lines[i].includes('null')) {
                            let logs = data.lines[i].replace('}null', '}');
                            if (logs != 'null' || logs != '' || logs != null) {
                                let log = JSON.parse(logs);
                                Object.keys(log).forEach(function (key) {
                                    if (that._ds.streamKeys.indexOf(key) === -1) {
                                        that._ds.streamKeys.push(key);
                                    };
                                });
                                that._ds.streamLogs.push(log);
                                that._ds.streamLogs = that._obp.transform(that._ds.streamLogs, '-time');
                                that._ces._sscstart.emit(log);
                            }
                        } else {
                            if (data.lines[i] != null) {
                                that._ds.streamLogs.push(JSON.parse(data.lines[i]));
                                that._ds.streamLogs = that._obp.transform(that._ds.streamLogs, '-time');
                                that._ces._sscstart.emit(JSON.parse(data.lines[i]));
                            }
                        }
                    }
                }
            }
        });

        that.sockets.on('stream-log-watch-stopped', function (data) {
            console.log(data);
        });
    }

    /**
     * 
     * 
     * @memberof StreamSocketsService
     */
    startStreaming(path: String) {
        this._ds.streamSettings = false;
        this.sockets.emit('stream-initial-log', {
            stream_log_file_path: path,
            numberOfLinesToSend: 25
        });
        this._ds.streamLogs = [];
    }

    /**
     * 
     * 
     * @memberof StreamSocketsService
     */
    restartStreaming(path: String) {
        // TODO: Add this feature
        this._ds.streamSettings = false;
        this._ds.streamSearch = true;
        this.sockets.emit('stream-start-monitoring-log', {
            stream_log_file_path: path
        });
    }

    /**
     * 
     * 
     * @memberof StreamSocketsService
     */
    stopStreaming(path: String) {
        this.sockets.emit('stream-stop-monitoring-log', {
            stream_log_file_path: path
        });
    }

}
