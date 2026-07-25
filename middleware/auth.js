
// Checks if the user is logged in
function isAuthenticated(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.redirect('/login');
}

// Restricts a route to a specific role (e.g. 'admin' or 'student')
function requireRole(role) {
  return (req, res, next) => {
    if (req.session && req.session.role === role) return next();
    return res.status(403).send('Access denied: insufficient permissions');
  };
}

module.exports = { isAuthenticated, requireRole };
