const express = require("express")
const router = express.Router()
const { goodsImgs, goodsInfo, getGoodsInfo, getUserData, addGoodsHotOnce, addIntoShopCar,
    getShopCarInfo, buyTheGoods, getGoodsInfoNew, getMyGoodsData, removeMygoods,
    getColMyGoodsData, removeColMygoods,getAllGoods,auctionInfo,auctionImgs,getAuctiondata,
    getKindGoods,searchBtn,getAllgoodsAdmin } = require("../module/handler/goodsHandler")
const multer = require("multer")
const upload = require("../module/plugin/multer").single('file')


//商品的图片上传路由
router.post("/goodsImg", async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            console.log("上传错误");
        } else if (err) {
            // 发生错误
            console.log("上传有误");
        }
        let ID = req.body.id
        // console.log(ID);
        let imgPath = "/userImg/" + req.file.filename
        // console.log(imgPath);
        await goodsImgs(ID, imgPath)
        // let result = await handlerInfoLogo(ID, imgPath);
        // req.session.user.userLogo = imgPath
        // console.log(result);
        // if (result.code == 1) {
        //     res.send({ imgPath, value: result.value })
        // }
        // res.send("222")
        // console.log("222");

        // res.send(imgPath,result)
        // 一切都好
    })
})

//商品信息上传路由
router.post("/goodsInfo", async (req, res) => {
    // console.log(req.body);
    let result = await goodsInfo(req.body)
    let fina = { id: result, value: "发布商品成功" }
    res.send(fina)
})

//获取商品详细信息
router.post("/getGoodsInfo", async (req, res) => {
    let result = await getGoodsInfo(req.body)
    res.send(result);
})

//获取user
router.post("/getUserData", async (req, res) => {
    // console.log(req.body);
    let result = await getUserData(req.body)
    res.send(result)
})

//点击会提升商品的热度
router.post("/addGoodsHotOnce", async (req, res) => {
    // console.log(req.body);
    await addGoodsHotOnce(req.body)
    res.send("hot up")
})

//将商品加入购物车
router.post("/addIntoShopCar", async (req, res) => {
    let result = await addIntoShopCar(req.body)
    res.send(result)
})

//获取购物车商品信息
router.post("/getShopCarInfo", async (req, res) => {
    // console.log(req.body);
    let result = await getShopCarInfo(req.body)
    if (result) {
        res.send(result)
    }
})

router.post("/buyTheGoods", async (req, res) => {
    // console.log(req.body);
    let result = await buyTheGoods(req.body)
    res.send(result)
})

//最新商品组件
router.post("/getGoodsInfoNew", async (req, res) => {
    let result = await getGoodsInfoNew(req.body)
    res.send(result);
})

//获取我的商品
router.post("/getMyGoodsData", async (req, res) => {
    // console.log(req.body);
    let result = await getMyGoodsData(req.body)
    res.send(result)
})

//admin获取全部商品
router.get("/getAllgoodsAdmin", async (req, res) => {
    // console.log(req.body);
    let result = await getAllgoodsAdmin()
    res.send(result)
})

//下架我的商品
router.post("/removeMygoods", async (req, res) => {
    let result = await removeMygoods(req.body)
    res.send(result)
})

//获取我收藏的商品
router.post("/getColMyGoodsData", async (req, res) => {
    // console.log(req.body);
    let result = await getColMyGoodsData(req.body)
    res.send(result)
})


//取消收藏
router.post("/removeMyColgoods", async (req, res) => {
    let result = await removeColMygoods(req.body)
    res.send(result)
})

//在百货里面筛选的路由
router.post("/getAllGoods",async(req,res)=>{
    let result = await getAllGoods(req.body)
    res.send(result)
})

router.post("/goodsImgTwo", async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            console.log("上传错误");
        } else if (err) {
            // 发生错误
            console.log("上传有误");
        }
        let ID = req.body.id
        // console.log(ID);
        let imgPath = "/userImg/" + req.file.filename
        // console.log(imgPath);
        await auctionImgs(ID, imgPath)
    })
})

//auctionInfo
router.post("/auctionInfo",async(req,res)=>{
    // console.log(req.body);
    let result = await auctionInfo(req.body)
    res.send(result)
})

//getAuctiondata
router.post("/getAuctiondata",async(req,res)=>{
    let result = await getAuctiondata()
    res.send(result)
})

//getKindGoods
router.post("/getKindGoods",async(req,res)=>{
    let result = await getKindGoods(req.body)
    res.send(result)
})

//获取搜索的数据
router.post("/searchBtn",async(req,res)=>{
    let result = await searchBtn(req.body)
    res.send(result)
})

module.exports = router