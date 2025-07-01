const User = require('../Models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10; 

const jwt = require('jsonwebtoken'); 


//generar token
async function login(req, res) {
    const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  try {
    // Buscar el usuario por correo
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload (datos que se incluirán en el token)
      KEY_SECRETA,                       // Clave secreta
      { expiresIn: '2m' }               // Tiempo de expiración
    );

    // Enviar el token en la respuesta
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
//eliminar usuario mediante token
async function deleteUserjwt(req, res) {
    try {
       
    res.json({ message: `Usuario ${id} eliminado` });

      } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario' });
    }
}


// obtiene un usuario por ID
async function getUserById(req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id).select({ password: 0 }); 

        if (!user) {
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            });
        }

        res.status(200).send({
            ok: true,
            message: "Usuario encontrado",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            ok: false,
            message: "Error al obtener el usuario"
        });
    }
}

// obtiene todos los usuarios
async function getUsers(req, res){

    try {
        const users = await User.find().select({password: 0}) /* No devuelve password */

        res.status(200).send({
            ok:true,
            message: "Usuarios obtenidos correctamente",
            users

        })

    } catch (error) {

        console.log(error)

        //Devolvemos una respuesta con un codigo 500 de internal error
        res.status(500).send({
            ok:false,
            message: "Error al obtener usuarios"
        })
    }
}

// crear usuario
async function crearUser(req, res) {

    try {
        if(req.user?.role !== "ADMIN_ROLE"){
            req.body.role = "CLIENT_ROLE";
        } 

        req.body.password = await bcrypt.hash(req.body.password, saltRounds)

        const user = new User(req.body)

        console.log(user)

        const newUser = await user.save();

        //Borrar propiedad password
        newUser.password = undefined; /* Para cuandoo lo devolvamos seteamos el password a undefined para evitar que llegue  al front por más que este hasheado */

        res.status(201).send(newUser)    
        

    } catch (error) {
        res.status(500).send("Error al crear el usuario") 
        console.log(error)
    }

  
}

// elimina un usuario por ID
async function deleteUser(req, res){
   
    
    try {
        const id = req.params.id 

        const deletedUser = await User.findByIdAndDelete(id)

        if(!deletedUser){
            return res.status(404).send({
                ok: false,
                message: "Usuario no encontrado"
            })
        } 

        res.status(200).send({
            ok: true,
            message: "El usuario fue borrado correctamente"
        })
        
    } catch (error) {
        res.status(500).send({
            ok:false,
            message: "Error al borrar el usuario"
        })
    }
}

// actualiza un usuario por ID
async function updateUser(req, res){
    try {
        const id = req.params.id
        console.log(id)

        const newData = req.body;


        const updatedUser= await User.findByIdAndUpdate(id, newData, {new: true}) 
        
        if(!updatedUser){
            return res.status(404).send({
                ok: false,
                message:"No se encontró el usuario"
            })
        }

        res.status(200).send({
            ok:true,
            message:"El usuario se actualizo correctamente"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok:false,
            message:"No se pudo actualizar el usuario"
        })
    }
}


module.exports = {
    getUsers,
    getUserById,
    crearUser,
    deleteUser,
    updateUser,
    login,
    deleteUserjwt
};
