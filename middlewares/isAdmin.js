const isAdmin = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }
  
    if (req.user.role !== 'ADMIN_ROLE') {
      return res.status(403).json({ message: 'Acceso denegado: Se requiere rol de administrador' });
    }
  
    next(); // Si el usuario es admin, continúa con la siguiente función
  };
  
  module.exports = isAdmin;
  