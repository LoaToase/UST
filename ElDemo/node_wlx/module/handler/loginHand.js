const mongoNewUser = require('../mongoose/mongoNewUser')
const mongoSecUser = require('../mongoose/mongoSecUser')
const mongoAdmin = require("../mongoose/mongoAdmin")
const mongoMessage = require("../mongoose/mongoMessage")
const mongoGoods = require("../mongoose/mongoGoods")
const mongoAuction = require("../mongoose/mongoAuction")
const mongoShopCar = require("../mongoose/mongoShopCar")
//管理注册
const register = async (data) => {
    // console.log(data.userName);
    let find = await mongoNewUser.findOne({ userName: data.userName })
    if (find) {
        return { code: 0, value: "注册失败,账号已存在" }
    } else {
        let bol = await mongoNewUser.create({
            userName: data.userName,
            userPass: data.userPass,
        })
        // console.log(bol);
        await mongoSecUser.create({ catoUser: bol._id })
        let ress = {
            userName: bol.userName,
            userNickName: bol.userNickName,
            userCreateTime: bol.userCreateTime,
            userLogo: bol.userLogo,
            _id: bol._id
        }
        return { code: 1, value: "注册成功", user: ress }
    }
}

//管理登录
const loginTest = async (data) => {
    // console.log(data);
    let bol = await mongoNewUser.findOne({ userName: data.Name })
    // console.log(bol);
    if (!bol) return { code: 0, value: "该用户不存在" }
    if (bol.userPass != data.Pass) return { code: 0, value: "密码不正确" }
    return { code: 1, value: "登陆成功", user: bol }
}

//初始化
const admininitialization = async () => {
    let bol = await mongoAdmin.find()
    if (bol.length == 0) {
        await mongoAdmin.create({ adminUser: "636f0d22b997f09406cd8181", adminType: 0 })
    }
}

//admin获取全部user
const getAllUserAdmin = async () => {//{$ne:{_id:"636f0d22b997f09406cd8181"}}
    let one = await mongoNewUser.find({ _id: { $ne: "636f0d22b997f09406cd8181" } })
    let two = await mongoAdmin.find()
    // console.log(one);
    // console.log(two);
    let outer = []
    for (let i = 0; i < two.length; i++) {
        let ele = two[i];
        for (let j = 0; j < one.length; j++) {
            let item = one[j];
            if (item._id.toString() == ele.adminUser.toString()) {
                outer.push({
                    userName: item.userName,
                    userNickName: item.userNickName,
                    userPass: item.userPass,
                    userCreateTime: item.userCreateTime,
                    _id: item._id,
                    isadmin: true
                })
                one.splice(j, 1)
                break;
            }
        }
    }
    for (let m = 0; m < one.length; m++) {
        let element = one[m];
        outer.push({
            userName: element.userName,
            userNickName: element.userNickName,
            userPass: element.userPass,
            userCreateTime: element.userCreateTime,
            _id: element._id,
            isadmin: false
        })
    }
    // console.log(outer);
    return outer
}

//移除管理员
const removeAdmin = async (data) => {
    // console.log(data.id);
    await mongoAdmin.deleteOne({ adminUser: data.id })
}

//添加管理员
const addAdmin = async (data) => {
    // console.log(data.id);
    await mongoAdmin.create({ adminUser: data.id })
}

//删除用户
const deleteUser = async (data) => {
    // console.log(data.id);
    await mongoAdmin.deleteOne({ adminUser: data.id })
    await mongoNewUser.deleteOne({ _id: data.id })
    await mongoSecUser.deleteOne({ catoUser: data.id })
    await mongoMessage.deleteOne({ senderId: data.id })
    await mongoMessage.deleteOne({ getterId: data.id })
    await mongoGoods.deleteOne({ categoryOwner: data.id })
    await mongoAuction.deleteOne({ catoUser: data.id })
    await mongoShopCar.deleteOne({ catoUser: data.id })
}

//admin获取全部拍卖商品
const getAllAucAdmin = async () => {
    let bol = await mongoAuction.find()
    return bol
}

//admin下架拍卖商品
const removeAuctiongoods = async (data) => {
    let bol = await mongoAuction.findOne({ _id: data.id })
    // console.log(bol);
    bol.goodsImg.forEach(item => {
        // console.log(item);
        fs.unlinkSync(path.resolve(__dirname, '../../public' + item))
    })
    await mongoGoods.deleteOne({ _id: data.id })
    return { code: 1, value: "下架商品成功" }
}

//getPieChartData
const getPieChartData = async () => {
    let bol = await mongoGoods.find()
    // console.log(bol);
    let cate = {
        phone: 0,
        jiaju: 0,
        dianqi: 0,
        diannao: 0,
        yundong: 0,
        nanzhuang: 0,
        nvzhuang: 0,
        xiezi: 0,
        shipin: 0,
        shoushi: 0,
    }
    bol.forEach(item => {
        let len = item.goodsLabel.length
        for (let i = 0; i < len; i++) {
            let ele = item.goodsLabel[i];
            switch (ele) {
                case '手机':
                    cate.phone++
                    break;
                case '电器':
                    cate.dianqi++
                    break;
                case '家具':
                    cate.jiaju++
                    break;
                case '电脑':
                    cate.diannao++
                    break;
                case '运动':
                    cate.yundong++
                    break;
                case '男装':
                    cate.nanzhuang++
                    break;
                case '鞋子':
                    cate.xiezi++
                    break;
                case '食品':
                    cate.shipin++
                    break;
                case '饰品':
                    cate.shoushi++
                    break;
                case '女装':
                    cate.nvzhuang++
                    break;
            }
        }
    })
    // console.log(cate);
    let final = [
        { value: cate.phone, name: "手机" },
        { value: cate.jiaju, name: "家具" },
        { value: cate.dianqi, name: "电器" },
        { value: cate.diannao, name: "电脑" },
        { value: cate.yundong, name: "运动" },
        { value: cate.nanzhuang, name: "男装" },
        { value: cate.nvzhuang, name: "女装" },
        { value: cate.xiezi, name: "鞋子" },
        { value: cate.shipin, name: "食品" },
        { value: cate.shoushi, name: "饰品" },
    ]
    return final
}

//checkAdmin
const checkAdmin = async (data) => {
    // console.log(data.id);
    let bol = await mongoAdmin.findOne({ adminUser: data.id })
    if (bol) {
        return { isadmin: true, type: bol.adminType }
    } else {
        return { isadmin: false }
    }
}

//changeRecom
const changeRecom = async (data) => {
    // console.log(data.ifRecommand);
    let bool = !data.ifRecommand
    await mongoGoods.updateOne({ _id: data.id }, { ifRecommand: bool })
}


module.exports = {
    register,
    loginTest,
    admininitialization,
    getAllUserAdmin,
    addAdmin,
    removeAdmin,
    deleteUser,
    getAllAucAdmin,
    removeAuctiongoods,
    getPieChartData,
    checkAdmin,
    changeRecom,
}