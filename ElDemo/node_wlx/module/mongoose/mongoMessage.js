const mongoose =require('mongoose');

const mongoMessage = new mongoose.Schema(
    {
        senderId:{                                  //发送者
            type: mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        getterId:{                                  //接收者
            type: mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        message:{
            type:Array,
        },
        noReadMes:{
            type:Number,
            default:0
        }
        
    },
    {
        versionKey: false
    }
)


module.exports = mongoose.model(
    "mongoMessage",
    mongoMessage
)