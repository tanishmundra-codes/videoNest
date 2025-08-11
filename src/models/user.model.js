import mongoose, { Schema } from "mongoose";
import jwt, { sign } from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchmea = new Schema ({

    watchHistory : [{
        type : Schema.Types.ObjectId,
        ref : "Video"
    }],
    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avtar : {
        type :String,
        required : true
    },
    coverImage : {
        type : String
    },
    password : {
        type : String,
        required : [true, 'Password is required'],
        unique : true
    },
    refreshToken : {
        type : String,

    }

}, {timestamps: true})

userSchmea.pre("save", async function (next) {
    if(!this.isModified("password")) { //Syntax to check 
        return next()
    }
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchmea.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchmea.methods.generateAccessToken = async function(){
    jwt.sign ({
        _id: this._id,
        email: this.email,
        username: this.username
    }), 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
    
}

userSchmea.methods.generateRefreshToken = async function(){
        jwt.sign ({
        _id: this._id,
    }), 
    process.env.REFRESH_TOKEN_SECERT,
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
}

export const User = mongoose.Model("User", userSchmea)



