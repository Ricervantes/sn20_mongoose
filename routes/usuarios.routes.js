const {Router}=require('express');
const router=Router();
const chkToken=require('../middlewares/auth.middleware');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}=require('../controllers/usuarios.controllers');



router.get('/usuarios',chkToken,usuariosGet);

router.post('/usuarios',usuariosPost);

router.put('/usuarios/:id',usuariosPut);

router.delete('/usuarios/:id',usuariosDelete);

module.exports=router;