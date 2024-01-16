//Rutas de Usuarios /Auth  host + /api/auth
const { Router } = require('express');
const { check } =  require('express-validator')
const { validarCampos } =  require('../middelwares/validar-campos')

const router = Router();
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth') 

const { revalidarJWT} = require('../middelwares/validar-jwt');

router.post('/',
[ //Middelwares
    check('email',"El nombre es obligatorio ").isEmail(),
    check('password',"El password debe contener almenos 6 caracteres ").isLength({min:5}),
    validarCampos
],
loginUsuario);



router.post('/new',
[ // Middelwares
 check('name','El nombre es obligatorio').not().isEmpty(),
 check('email','El email es obligatorio').isEmail(),
 check('password','El password es obligatorio').isLength({min:5}),
 validarCampos

],
crearUsuario);


router.get('/renew',revalidarJWT, revalidarToken);


module.exports = router;