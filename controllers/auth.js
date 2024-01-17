const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
const jwt = require('jsonwebtoken')

const crearUsuario = async (req, res = response) => {
    const {  email, password } = req.body;

    let usuario = await Usuario.findOne({ email })
    console.log(usuario)
    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: "Un Usuario  ya registro ese correo"
        });
    }

    try {

        usuario = new Usuario(req.body)
        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        // console.log("Token generado en Crear usuario: ",token)

        res.status(202).json({
            ok: true,
            msg: 'registro',
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Please talk to somewhone'
        })
    }
}

const loginUsuario = async (req, res = response) => {
    const { email, password } = req.body


    const usuario = await Usuario.findOne({ email })

    if (!usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'No existe ningun usuario con ese email no existe'
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password)
    if (!validPassword) {
        return res.status(400).json({
            ok: false,
            msg: 'La contrasena es incorrecta'
        })
    }

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name)

     res.status(201).json({
        ok: true,

        msg: 'Login',
        uid: usuario.id,
        name: usuario.name,
        token
    })


}

const revalidarToken = async (req, res = response) => {

    const { uid, name, lastToken } = req;
    // Generar un nuevop token  y retornarlo en esta peticion
    const newToken = await generarJWT(uid, name)
    res.json({
        ok: true,
        msg: 'renew',
        uid,name,
        lastToken,
        newToken

    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken

}