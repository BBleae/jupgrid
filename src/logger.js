import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import path from 'path';

// Delete all old log files
const deleteOldLogFiles = () => {
  const logDir = path.resolve(__dirname, '../');
  const logFiles = [
    'log.txt',
    'log1.txt',
    'log2.txt',
    'log3.txt',
    'log4.txt',
    'log5.txt'
  ];
  
  logFiles.forEach(file => {
    const filePath = path.join(logDir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

// Call the function to delete old log files when the logger is first started
deleteOldLogFiles();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ 
      filename: path.resolve(__dirname, '../log.txt'),
      maxsize: 5000000, // 5MB
      maxFiles: 5, // keep 5 rotated files
      tailable: true, // makes the newest file always be named 'log.txt'
    }),
  ],
});

export default logger;