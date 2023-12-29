const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true
    },
    email : {
        type: String,
        require: true
    },
    phone : {
        type: Number,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    isAdmin : {
        type : Boolean,
        default: false
    }
});

//Securing password with bcrypt
userSchema.pre('save',async function() {
    const user = this;
    if(!user.isModified('password')) {
        return next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password,saltRound);
        user.password = hash_password;
    } catch (error) {
        return next(error);
    }
});

//comparing password
userSchema.methods.comparePassword = async function(enteredPassword) {
    try {
        const passwordMatch = await bcrypt.compare(enteredPassword,this.password)
        return passwordMatch;
    } catch (error) {
        throw new Error("Email or Password is Incorrect");
    }
}

//JWT (JSON WEB TOKEN)
userSchema.methods.generateToken = async function() {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },  
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.error(error);
    }
};


const User = new mongoose.model('User',userSchema);

module.exports = User;