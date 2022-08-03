import winston from "winston";
import path from "path";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve("src", "infra", "logs", "infos.log"),
      level: "info",
    }),
    new winston.transports.File({
      filename: path.resolve("src", "infra", "logs", "erros.log"),
      level: "error",
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
