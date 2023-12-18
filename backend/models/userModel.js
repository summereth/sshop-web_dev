import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
}, {
    timestamps: true,
});

// Must use function keyword here. => causes error
userSchema.methods.matchPassword = function (enteredPwd) {
    return bcrypt.compareSync(enteredPwd, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;