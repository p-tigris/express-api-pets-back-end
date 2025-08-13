const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const createdPet = await Pet.create(req.body);
        res.status(201).json(createdPet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ - GET - /pets
router.get("/", async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

// READ - GET - /pets/:petId
router.get("/:petId", async (req, res) => {
    try {
        const foundPet = await Pet.findById(req.params.petId);

        if (!foundPet) {
            res.status(404);
            throw new Error('Pet not found.');
        }

        res.status(200).json(foundPet);

    } catch (error) {

        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
})

module.exports = router;