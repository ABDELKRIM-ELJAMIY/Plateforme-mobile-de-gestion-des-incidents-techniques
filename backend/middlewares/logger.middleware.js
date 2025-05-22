const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const now = new Date();
  const timestamp = now.toISOString();
  const { method, originalUrl, ip } = req;
  
  const userId = req.user ? req.user.id : 'non-authentifié';
  
  const logMessage = `[${timestamp}] ${method} ${originalUrl} - IP: ${ip} - User: ${userId}\n`;
  
  const logDir = path.join(__dirname, '../logs');
  const logFile = path.join(logDir, `${now.toISOString().split('T')[0]}.log`);
  
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error('Erreur lors de l\'écriture dans le fichier de logs:', err);
    }
  });
  
  if (process.env.NODE_ENV === 'development') {
    console.log(logMessage.trim());
  }
  
  next();
};

module.exports = logger;