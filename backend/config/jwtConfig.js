const jwtSecret = process.env.JWT_SECRET || 'supersecret';
const jwtExpire = '1d';

module.exports = {
  jwtSecret,
  jwtExpire
};
