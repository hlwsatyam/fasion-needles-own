const express = require('express')
const contactus = require('../Controllers/info/contactus')
const router = express.Router()
const upload = require('../middlewares/image-uploader.js');
const webinfo = require('../Controllers/info/webinfo.js');
const getwebinfo = require('../Controllers/info/getwebinfo.js');
const editwebinfo = require('../Controllers/info/editwebinfo.js');
const contactlist = require('../Controllers/info/contactlist.js');
const {getTesto,delAvailable, deleteTesto, getCateg} = require('../Controllers/info/gtTestomonialsInfo.js');

router.get('/contactus', contactlist)
router.get('/categoryInfo-info', getCateg)
router.get('/testomonials-info', getTesto);
router.get('/testomonials-info/deleteHandle/:id', deleteTesto);
router.get('/delAvailable-info/:id', delAvailable);
router.post('/contactus', upload.none(), contactus);
router.post('/websiteinfo', upload.fields([
  { name: 'logo', maxCount: 1 },
]), webinfo);
router.patch('/websiteinfo', upload.fields([
  { name: 'logo', maxCount: 1 },
]), editwebinfo);
router.get('/websiteinfo', getwebinfo);


module.exports = router