import fs from "fs";

export default class Tracer {
  constructor(util) {
    this.util = util;
  }

  log(message, logLevel, logLine) {
    const date = new Date();
    const options = {
      day: this.util.ISO_2_DIGIT,
      month: this.util.ISO_2_DIGIT,
      year: this.util.ISO_NUMERIC,
      hour: this.util.ISO_2_DIGIT,
      minute: this.util.ISO_2_DIGIT,
      second: this.util.ISO_2_DIGIT
    };
    const logTime = date.toLocaleString(this.util.getSystemLocale(), options);
    const logEntry = `${logTime}; ${logLevel}; ${logLine}; ${message}\n`;

    fs.appendFile(this.util.LOGS_DIR + '/' + this.util.LOG_FILE, logEntry, function (err) {
      if (err) {
        console.log('Error writing to log file:', err);
      } else {
        console.log('Log message written to file');
      }
    });
  }
  clearlog() {
    fs.truncate(this.util.LOGS_DIR + '/' + this.util.LOG_FILE, function (err) {
      if (err) {
        console.log('Error writing to log file:', err);
      } else {
        console.log('Log message written to file');
      }
    });
  }
}
