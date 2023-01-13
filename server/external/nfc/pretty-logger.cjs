const util = require("util");
const winston = require("winston");
const { SPLAT } = require("triple-beam");

const colors = {
  exception: "red",
  error: "red",
  warn: "yellow",
  info: "green",
  verbose: "blue",
  debug: "blue",
  silly: "gray",
};

winston.addColors(colors);

// we could use instanceof but to avoid const we simply check obj structure
const isReader = (obj) => typeof obj === "object" && obj.reader && obj.name;

const printf = winston.format.printf(({ timestamp, level, message, [SPLAT]: splat }) => {
  let splatString = "";

  let reader = "";

  if (splat) {
    let readerObj = splat.find(isReader);

    if (readerObj) {
      reader = readerObj.name + " ";
      splat = splat.filter((obj) => !isReader(obj));
    }

    if (splat.length > 1) {
      splatString = " " + util.inspect(splat, { colors: true });
    } else if (splat.length > 0) {
      splatString = " " + util.inspect(splat[0], { colors: true });
    }
  }

  // see https://stackoverflow.com/questions/10729276/how-can-i-get-the-full-object-in-node-jss-console-log-rather-than-object
  return `${timestamp ? timestamp + " – " : ""}${reader}${level}: ${message}${splatString}`;
});

const FORMAT = winston.format.combine(
  winston.format.timestamp({
    format: () => new Date().toLocaleTimeString(),
  }),
  winston.format.colorize(),
  printf
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "silly",
      format: FORMAT,
    }),
  ],
  exitOnError: true,
});

module.exports = logger;
