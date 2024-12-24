const sessionModel = require('../models/sessionModel');

const cleanExpiredSessions = async () => {
  try {
    await sessionModel.cleanExpiredSessions();
    console.log('Expired sessions cleaned up');
  } catch (error) {
    console.error('Error cleaning expired sessions:', error);
  }
};

// Run the cleanup every hour
setInterval(cleanExpiredSessions, 3600000);

// Run the cleanup immediately when the script starts
cleanExpiredSessions();