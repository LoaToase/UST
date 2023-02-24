const mongoose =require('mongoose');

const newUser = new mongoose.Schema(
    {
        userName:{                                  //账户名称
            type:String,
            // default:"[没有取名]",
        },
        userPass:{                                  //账户密码
            type:String,
        },
        userNickName:{
            type:String,
            default:"[没有取名]"
        },
        userCreateTime:{                            //账户创建时间
            type:Date,
            default:Date.now() + 1000*60*60*8       //默认北京时间
        },
        userLogo:{
            type:String,
            default:"/userImg/userLogo.webp"
        }
    },
    {
        versionKey: false
    }
)


module.exports = mongoose.model(
    "newUser",
    newUser
)