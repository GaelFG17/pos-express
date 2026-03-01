const loginService = require('../service/login.Service');
const login = async(req,res) =>{
    try{
        const{usuario,password} = req.body;

        if(!usuario || !password){
            return res.status(400).json({
                error: 'Por favor ingresa usuario y contrasena'
            });
        }
        const result = await loginService.authUser(usuario,password);

        if(result.success){
            return res.status(200).json({
                mensaje:'Login exitoso',
                token:result.token,
                datos:result.user
            });
        }else{
            return res.status(401).json({
                error:result.message
            });
        }

    }catch(error){
       console.error("Error en el controlador login:", error);
       return res.status(500).json({
        error:'Hubo un problema al  procesar tu solicitud'
       });
    }
};

module.exports = {login};