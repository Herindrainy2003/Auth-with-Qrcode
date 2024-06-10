const express = require('express')
const QRCode = require('qrcode')
const multer = require('multer')
const Jimp = require("jimp") //pour lire et  traiter l'image
const jsqr = require('jsqr') //pour decoder les QR codes

const User = require("../Models/User")

const router = express.Router();

const upload = multer({dest : "/uploads"});


//Route d'inscription
router.post('/register' , async(req, res)=>{
    const {username , password } = req.body;

    //Generer le Qrcdoe
    const qrcode = await QRCode.toDataURL(username);
  
    const newUser = new User({username , password , qrcode})
    await newUser.save();

    res.send({qrcode})
})


// Route de connexion
router.post('/login', upload.single('qrCode'), async (req, res) => {
    const qrCodePath = req.file.path;
  
    // Lire le fichier d'image QR code
    const image = await Jimp.read(qrCodePath);
    const { data, width, height } = image.bitmap;
  
    // Convertir les données en format approprié pour jsQR
    const qrCodeImage = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < data.length; i++) {
      qrCodeImage[i] = data[i];
    }
  
    const qrCodeResult = jsqr(qrCodeImage, width, height);
    if (!qrCodeResult) {
      return res.status(400).send('Invalid QR code');
    }
  
    const qrCodeContent = qrCodeResult.data;
  
    // Chercher l'utilisateur avec le contenu du QR code
    const user = await User.findOne({ username: qrCodeContent });
    if (!user) {
      return res.status(400).send('User not found');
    }
  
    // Vérification réussie
    res.send({ success: true, user });
  });

  module.exports = router;