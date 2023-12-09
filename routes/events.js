const { Router } =  require('express');
const { getEvents,deleteEvent, createEvent, updateEvent } = require('../controllers/events');
const { revalidarJWT } = require('../middelwares/validar-jwt'); 
const { check } = require('express-validator');
const { validarCampos } =  require('../middelwares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

router.use( revalidarJWT );

router.get('/',getEvents);

router.post('/',[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','La fecha es obligatoria').custom( isDate ),
    check('end','La fecha es obligatoria').custom( isDate ),
    
    validarCampos
],createEvent);
router.put('/:id',updateEvent);
router.delete('/:id',deleteEvent);

module.exports = router;