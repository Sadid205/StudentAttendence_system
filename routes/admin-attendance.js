const router = require('express').Router()
const { getEnable, getDisable,getStatus } = require('../controller/admin-attentance') 


router.get('/enable',getEnable);
router.get('/disable',getDisable);
router.get('/status',getStatus)




module.exports = router;