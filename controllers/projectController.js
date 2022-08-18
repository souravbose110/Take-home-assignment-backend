const asyncHandler = require("express-async-handler");
const Project = require("../models/projectModel");

const addProject = asyncHandler(async (req, res) => {
    const projectName = req.body.projectName;
    const projectDescription = req.body.projectDescription;
    const skills = JSON.parse(req.body.projectSkills);

    if (!projectName || !projectDescription || !skills) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const projectExists = await Project.findOne({ projectName });

    if (projectExists) {
        res.status(400);
        throw new Error("Project already exists");
    }

    const project = await Project.create({
        projectName,
        projectDescription,
    });

    const projectWithSkills = await Project.findByIdAndUpdate(
        project._id,
        {
            $addToSet: { projectSkills: { $each: skills } },
        },
        { new: true }
    ).populate("projectSkills");

    console.log(projectWithSkills);
    if (projectWithSkills) {
        res.status(201).json({
            projectWithSkills,
        });
    } else {
        res.status(400);
        throw new Error("Failed to add project");
    }
});

module.exports = { addProject };
