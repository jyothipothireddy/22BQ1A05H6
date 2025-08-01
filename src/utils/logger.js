// src/utils/logger.js
const logger = (message, data = null) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    message,
    data
  };

  const existingLogs = JSON.parse(localStorage.getItem("logs")) || [];
  existingLogs.push(logEntry);
  localStorage.setItem("logs", JSON.stringify(existingLogs));
};

export default logger;
