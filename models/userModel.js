const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        name: { type: String, default: "" },
        city: { type: String, default: "" },
        country: { type: String, default: "" },
        email: { type: String, unique: true },
        password: { type: String },
        contact: { type: String, default: "" },
        about: { type: String, trim: true, default: "" },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
