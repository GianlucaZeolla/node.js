const express = require('express');
const router = express.Router();

const userController = require('../Controllers/user.controller'); // Usar consistencia en el nombre
const auth = require('../middlewares/auth'); // Middleware de autenticación
const isAdmin = require('../middlewares/isAdmin'); // Middleware de autorización

// Login (genera token)
router.post('/login', userController.login);

// Ruta protegida (sólo usuarios logueados)
router.get('/User', auth, (req, res) => {
  res.json({ message: 'Perfil del usuario', user: req.user });
});

// Ruta protegida (sólo admin)
router.delete('/:id', auth, isAdmin, userController.deleteUser);

// Rutas generales para usuarios
router.get('/', auth, userController.getUsers); // Opcional: proteger con auth
router.get('/:id', auth, userController.getUserById); // Opcional: proteger con auth
router.post('/', auth, isAdmin, userController.crearUser); // Crear usuario solo por admin
router.put('/:id', auth, isAdmin, userController.updateUser); // Actualizar usuario solo por admin
router.delete('/:id', auth, isAdmin, userController.deleteUser); // Eliminar usuario solo por admin

module.exports = router;



  