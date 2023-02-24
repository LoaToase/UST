const mongoose =require('mongoose');

const mongoAdmin = new mongoose.Schema(
    {
        adminUser:{                                   //关联owner
            type:mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        
        adminType:{                            //起拍价格
            type:Number,
            default:1
        },
        
    },
    {
        versionKey: false
    }
)


module.exports = mongoose.model(
    "mongoAdmin",
    mongoAdmin
)