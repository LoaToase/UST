const bodyParser = require("body-parser")
const express = require("express")
const router = express.Router()
const multer = require("multer")
const upload = require("../module/plugin/multer").single('file')
const { handlerInfoLogo, loadUserMessage, changeselfInf,changeSecondInfoTwo,
    changeSecBg,getSecondMess,goodsCollection,getSellerInfo,getallmess,getMyMes } = require("../module/handler/changeHandle")

//更改用户头像路由
router.post('/changeLogo', (req, res) => {
    // console.log(req);
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            console.log("上传错误");
        } else if (err) {
            // 发生错误
            console.log("上传有误");
        }
        let ID = req.body._id
        // console.log(req.body._id);
        let imgPath = "/userImg/" + req.file.filename
        let result = await handlerInfoLogo(ID, imgPath);
        req.session.user.userLogo = imgPath
        // console.log(result);
        if (result.code == 1) {
            res.send({ imgPath, value: result.value })
        }
        

        // res.send(imgPath,result)
        // 一切都好
    })
})

//获取用户信息路由
router.post("/loadUserMessage", async (req, res) => {
    // console.log(req.body);
    let result = await loadUserMessage(req.body._id)
    let final = {
        userName: result.userName,
        userNickName: result.userNickName,
    }
    res.send(final)
})

//更改用户信息
router.post("/changeselfInf", async (req, res) => {
    // console.log(req.body);
    let result = await changeselfInf(req.body)
    // console.log(req.session.user.user);
    let uu = req.session.user
    if (req.body.ifPass == false && req.body.ifNName == false) {
        uu.userNickName = req.body.userNickName
        uu.userPass = req.body.userPass
    } else if (req.body.ifPass == true && req.body.ifNName == false) {
        uu.userNickName = req.body.userNickName
    } else if (req.body.ifPass == false && req.body.ifNName == true) {
        uu.userPass = req.body.userPass
    }
    let rrr = {rlt:result,name:req.body.userNickName}
    res.send(rrr)
})

//更改用户进阶数据
router.post("/changeSecondInfo",async(req,res)=>{
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            console.log("上传错误");
        } else if (err) {
            // 发生错误
            console.log("上传有误");
        }
        
        let imgPath = "/userImg/" + req.file.filename
        // console.log(imgPath);
        // await goodsImgs(ID,imgPath)
        let result = await changeSecBg({id:req.body._id,img:imgPath})
        // req.session.secUser = result.secuser
        // console.log(result);
        res.send(imgPath)
    })
})

router.post("/changeSecondInfoTwo",async(req,res)=>{
    // console.log(req.body);
    let result = await changeSecondInfoTwo(req.body)
    // let secandsec = {
    //     userWantsGoods:req.body.wannaLabel,
    //     userLabel:req.body.myLabel,
    //     userPhoneNum:req.body.phoneNum,
    //     userDescr:req.body.selfDesc
    // }
    // req.session.except = secandsec
    // req.session.secUser.userWantsGoods = req.body.wannaLabel
    // req.session.secUser.userLabel = req.body.myLabel
    // req.session.secUser.userPhoneNum = req.body.phoneNum
    // req.session.secUser.userDescr = req.body.selfDesc
    // console.log(req.session);
    res.send(result)
})

//获取用户进阶信息数据
router.post("/getSecondMess",async(req,res)=>{
    let result = await getSecondMess(req.body)
    res.send(result)
})

//收藏商品路由
router.post("/goodsCollection",async(req,res)=>{
    // console.log(req.body);
    let result = await goodsCollection(req.body)
    res.send(result)
})

//获取seller
router.post("/getSellerInfo",async(req,res)=>{
    let result = await getSellerInfo(req.body)
    res.send(result)
})

//获取all消息
router.post("/getallmess",async(req,res)=>{
    // console.log(req.body);
    let result = await getallmess(req.body)
    res.send(result)
})

//getMyMes
router.post("/getMyMes",async(req,res)=>{
    let result = await getMyMes(req.body)
    res.send(result)
})

module.exports = router