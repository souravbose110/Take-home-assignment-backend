const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
    {
        skill: { type: String, trim: true },
        rating: { type: Number, default: 0 },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
