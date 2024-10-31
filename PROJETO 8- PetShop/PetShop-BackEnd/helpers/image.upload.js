const multer = require("multer");
const path = require("path");
const firebaseAdmin = require("firebase-admin");
const { getStorage } = require("firebase-admin/storage");
const dotenv = require('dotenv');

dotenv.config();


const firebaseConfig = JSON.parse(`${process.env.FIREBASE_CONFIG}`);

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}` 
});

const bucket = getStorage().bucket();

const imageUpload = multer({
  storage: multer.memoryStorage(), 
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  }
});

const uploadImageToFirebase = async (req, file) => {
  let folder = '';
  if (req.baseUrl.includes('users')) {
    folder = "Users";
  } else if (req.baseUrl.includes('pets')) {
    folder = "Pets";
  }
  const filename = `${folder}/${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;

  const blob = bucket.file(filename);

  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.mimetype,
    },
  });

  blobStream.end(file.buffer);

  return new Promise((resolve, reject) => {
    blobStream.on("finish", () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
      resolve(publicUrl); 
    });


    blobStream.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = { imageUpload, uploadImageToFirebase };
