import { Pet } from "../internal/db/pet.js";
import { Reminder } from "../internal/db/reminder.js";
import { Vaccination } from "../internal/db/vaccination.js";
import { AiService } from "../internal/ai/ollama.js";

const CreatePet = () => {
  return async (req, res) => {
    try {
      let profileImage = null;
      if (req.file) {
        profileImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
      const { name, age, breedId, sex, dob } = req.body;
      const pet = new Pet(
        req.user.id,
        name,
        age,
        breedId,
        sex,
        profileImage,
        dob,
      );
      const savedPet = await pet.save();
      const retrievedPet = await Pet.getById(savedPet.id);
      const petSpecs = {
        species: retrievedPet.breedId.speciesId.name,
        breed: retrievedPet.breedId.name,
        age: retrievedPet.age,
        weight: "15kg",
        Activity: "medium",
        Health: "none",
      };
      console.log(petSpecs);
      const result = await AiService(
        "Generate this month's vaccination schedule",
        {
          petSpecs: petSpecs,
        },
        "vaccines",
      );
      for (let item of result) {
        const vaccination = new Vaccination(
          item.vaccination,
          item.dayOfMonth,
          item.month,
          "vancouver",
        );
        await vaccination.save();

        const reminder = new Reminder(
          retrievedPet.id,
          vaccination.day,
          vaccination.month,
          vaccination.id,
          null,
        );
        await reminder.save();
      }
      const getRemindersByPet = await Reminder.getAllByPet(retrievedPet.id);
      console.log(getRemindersByPet);
      res.status(201).json(getRemindersByPet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const DeletePet = () => {
  return async (req, res) => {
    try {
      await Pet.deleteById(req.params.id);
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const UpdatePet = () => {
  return async (req, res) => {
    try {
      let profileImage = null;
      if (req.file) {
        profileImage = {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        };
      }
      const { name, age, breedId, sex, dob } = req.body;
      const pet = new Pet(
        req.user.id,
        name,
        age,
        breedId,
        sex,
        profileImage,
        dob,
      );
      await pet.updateById(req.params.id);
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const GetPets = () => {
  return async (req, res) => {
    try {
      // console.log("here", req.user.id);
      const pets = await new Pet().getAll(req.user.id);
      res.status(200).json(pets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

const GetPet = () => {
  return async (req, res) => {
    try {
      const pet = await Pet.getById(req.params.id);
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

export { CreatePet, GetPets, GetPet, UpdatePet, DeletePet };
