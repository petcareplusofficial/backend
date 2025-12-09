import { Allergy } from "../internal/db/allergies.js";

const CreateAllergy = () => async (req, res) => {
  try {
    const { petId, food, symptoms, severity, notes } = req.body;
    const exists = await AllergyModel.findOne({ petId, food, symptoms, severity});
    if (exists) {
      return res.status(200).json({ message: "Allergy already exists.", allergy: exists });
    }
    const newAllergy = new Allergy(petId, food, symptoms, severity, notes);
    await newAllergy.save();
    res.status(201).json(newAllergy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const GetAllergiesByPetId = () => async (req, res) => {
  try {
    const petId = req.params.id;
    const allAllergies = await Allergy.getAllAllergies(petId);
    const distinctAllergies = allAllergies.reduce((distinctList, allergy) => {
      const isDuplicate = distinctList.some(existingAllergy =>
        existingAllergy.food === allergy.food &&
        existingAllergy.symptoms === allergy.symptoms &&
        existingAllergy.severity === allergy.severity
      );
      if (!isDuplicate) {
        distinctList.push(allergy);
      }
      return distinctList;
    }, []);
    res.status(200).json(distinctAllergies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export { CreateAllergy, GetAllergiesByPetId };
