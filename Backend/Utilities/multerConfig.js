const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'assets')
    },
    filename : (req,file,cb)=>{
        cb(null, Date.now() + "_" + file.originalname)
    }
});
const upload = multer({storage:storage});

module.exports= upload;
