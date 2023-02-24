const mongoose = require('mongoose');


const mongoSecUser = new mongoose.Schema(
    {
        catoUser:{                                   //关联owner
            type:mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        userLabel:{
            type:Array,
        },
        userDescr:{
            type:String,
            default:"这个人很懒,什么都没有留下~"
        },
        userPhoneNum:{
            type:Number,
        },
        userBgImg:{
            type:String,
            default:'/userImg/selfInfoBg.webp'
        },
        userWantsGoods:{
            type:Array,
        },
        collectGoods:[{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'goodsData'
        }]
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model(
    "mongoSecUser",
    mongoSecUser
)