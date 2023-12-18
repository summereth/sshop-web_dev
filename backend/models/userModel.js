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

// Encrypt password before saving data
userSchema.pre("save", async function (next) {
    // if saving data without password being modified, just pass to next middleware
    if (!this.isModified("password")) {
        next();
    }

    // const salt = bcrypt.genSaltSync(10);
    // this.password = bcrypt.hashSync(this.password, salt); 
    this.password = bcrypt.hashSync(this.password, 10); 
});

const User = mongoose.model("User", userSchema);

export default User;