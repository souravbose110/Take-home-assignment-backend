const asyncHandler = require("express-async-handler");
const Skill = require("../models/skillModel");

const addSkills = asyncHandler(async (req, res) => {
    const { userId, skill, rating } = req.body;

    if (!userId || !skill || !rating) {
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const addedSkill = await Skill.create({
        skill,
        rating,
    });

    const addedSkillFull = await Skill.findByIdAndUpdate(
        addedSkill._id,
        {
            user: userId,
        },
        { new: true }
    ).populate("user", "-password");

    if (addedSkillFull) {
        res.status(201).json({
            _id: addedSkillFull._id,
            skill: addedSkillFull.skill,
            rating: addedSkillFull.rating,
            user: addedSkillFull.user,
        });
    } else {
        res.status(400);
        throw new Error("Failed to add skill");
    }
});

const userSkills = asyncHandler(async (req, res) => {
    const userSkills = await Skill.find({ user: req.params.userId });

    if (userSkills) {
        res.status(200).json(userSkills);
    } else {
        res.status(400);
        throw new Error("Failed to fetch user skills");
    }
});

const allSkills = asyncHandler(async (req, res) => {
    const allSkills = await Skill.distinct("skill");

    if (allSkills) {
        res.status(200).json(allSkills);
    } else {
        res.status(400);
        throw new Error("Failed to fetch skills");
    }
});

module.exports = { addSkills, userSkills, allSkills };
