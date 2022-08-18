const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        projectName: { type: String, trim: true, unique: true },
        projectDescription: { type: String, trim: true },
        projectSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "Skill" }],
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
