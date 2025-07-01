require('dotenv').config(); 

const mongoose = require('mongoose')

const app = require('./app') 

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("\x1b[35m Conectado a la DB \x1b[37m" )

        app.listen(process.env.PORT, () => { 

            console.log(`Servidor funcionando en puerto ${process.env.PORT}`); 
    })
        
    })
    .catch(error => console.log(error))