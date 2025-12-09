import { Species } from "../internal/db/species.js";

const GetAllSpecies = () => async (req, res) => {
  try {
    const species = await Species.getAll();
    res.status(200).json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { GetAllSpecies };
