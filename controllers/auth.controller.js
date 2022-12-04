const { response, request } = require('express');
const Usuario = require('../models/Usuario.model');
const authModel = require('../models/Auth.model');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    const userInformationDB = await Usuario.findOne({ email: correo });
    const validPassword = await authModel.comparePassword(password, userInformationDB.password);
    if (validPassword) {
        const token = authModel.generarToken(
            {
                id: userInformationDB._id,
                nombre_completo: `${userInformationDB.nombre}${userInformationDB.apellido}`,
                correo: userInformationDB.email,
                edad: userInformationDB.edad,
            }
        );
        res.status(200).json({
            msg: 'login correcto',
            data: token
        });
    } else {
        res.status(401).json({
            msg: 'error en el login',
        });
    }

};

const validarToken = async (req = request, res = response) => {
    const { token } = req.body;
    res.status(200).json({
        msg: 'Respuesta JWT',
        data: authModel.validarToken(token)
    });


};

module.exports = {
    login,
    validarToken
};