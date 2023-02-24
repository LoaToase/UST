const express = require('express')
const router = express.Router()
const svg = require('../module/plugin/svgCap')
const {register,loginTest,admininitialization,getAllUserAdmin,removeAdmin,addAdmin,deleteUser,
    getAllAucAdmin,removeAuctiongoods,getPieChartData,checkAdmin,changeRecom} = require('../module/handler/loginHand')

//设置svg获取路由
router.get("/getSvg",async(req,res)=>{

    let { text, data } = svg();
    // console.log(svg());
    res.send({ code: 1, text, data })
})

//注册路由
router.post("/register",async(req,res)=>{
    // console.log(req.body);
    let result = await register(req.body);
    if(result.code){req.session.user = result.user}
    res.send(result)
})

//登录路由
router.post("/loginTest",async(req,res)=>{
    // console.log(req.body);
    let result = await loginTest(req.body) 
    // console.log(req.session);
    req.session.user = result.user
    res.send(result);
})

//获取session
router.get("/getSession",async(req,res)=>{
    let result = req.session.user
    // console.log(req.session.user);
    // let second = req.session.secUser
    let final;
    if(result){
        final = {
            code:1,
            user:result,
            // secUser:second
        }
    }else{
        final = {
            code:0,
            user:null,
            // secUser:null
        }
    }
    res.send(final)
})

//退出登录路由
router.get("/quitLogin",async(req,res)=>{
    // console.log(req.body);
    req.session.user = ''
    // req.session.secUser = ''
    res.send("退出登录成功")
})

//初始化
router.get("/admininitialization",async(req,res)=>{
    await admininitialization()
    res.send("初始化成功")
})

//admin获取所有用户
router.get("/getAllUserAdmin",async(req,res)=>{
    let result = await getAllUserAdmin()
    res.send(result)
})

//移除管理员
router.post("/removeAdmin",async(req,res)=>{
    let result = await removeAdmin(req.body)
    res.send(result)
})

//添加管理员
router.post("/addAdmin",async(req,res)=>{
    let result = await addAdmin(req.body)
    res.send(result)
})

//删除用户
router.post("/deleteUser",async(req,res)=>{
    await deleteUser(req.body)
    res.send("用户数据已完全删除")
})

//admin获取全部拍卖商品
router.get("/getAllAucAdmin",async(req,res)=>{
    let result = await getAllAucAdmin()
    res.send(result)
})

//admin下架拍卖商品
router.post("/removeAuctiongoods",async(req,res)=>{
    let result = await removeAuctiongoods(req.body)
    res.send(result)
})

//getPieChartData
router.get("/getPieChartData",async(req,res)=>{
    let result = await getPieChartData()
    // console.log(result);
    res.send(result)
})

//checkAdmin
router.post("/checkAdmin",async(req,res)=>{
    let result = await checkAdmin(req.body)
    res.send(result)
})

//changeRecom
router.post("/changeRecom",async(req,res)=>{
    await changeRecom(req.body)
    res.send("修改成功")
})

module.exports = router