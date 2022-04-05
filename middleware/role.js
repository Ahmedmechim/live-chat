let rolevalidator = (role) => (req, res, next) =>
  !role.includes(req.user.role)
    ? res.status(401).json('Forbidden')
    : next();

module.exports = rolevalidator;