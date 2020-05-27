const pino = require('pino')
const logger = pino({
    prettyPrint:{
        translateTime: true,
        colorize: true
    }
})

function writeLog(logMethod, logData) {
    logData = logData || { message: '', data: {} };
    logger[logMethod](logData);
}

function debug(logData) {
    writeLog('debug', logData);
}

function info(logData) {
    writeLog('info', logData);
}

function error(logData) {
    writeLog('error', logData);
}

function warn(logData) {
    writeLog('warn', logData);
}

function fatal(logData) {
    writeLog('fatal', logData);
}


module.exports = {
    debug,
    info,
    error,
    warn,
    fatal
}