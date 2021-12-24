module.exports = function generateRandomPassword() {
  return Math.random().toString(36).substring(2, 11);
};
