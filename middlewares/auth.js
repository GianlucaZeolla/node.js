const jwt = require('jsonwebtoken');
const keySecreta = process.env.keySecreta; // <-- Agregado

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token.split(' ')[1], keySecreta);
    req.user = decoded; // Asignar el usuario decodificado a req.user
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
