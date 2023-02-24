const multer = require('multer')
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {    //设置文件存储位置
        //   cb(null, '/tmp/my-uploads')
        if (file.originalname.endsWith('.jpg') ||
            file.originalname.endsWith('.jpeg') ||
            file.originalname.endsWith('.webp') ||
            file.originalname.endsWith('.psd') ||
            file.originalname.endsWith('.png')) {
            cb(null, path.resolve(__dirname, "../../public/userImg"))
        }
    },
    filename: function (req, file, cb) {       //设置文件存储的名字
        cb(null, Date.now()+file.originalname)
    }
})

module.exports = multer({ storage: storage })