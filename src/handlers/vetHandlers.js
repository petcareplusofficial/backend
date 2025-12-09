import { Vet } from "../internal/db/vet.js";

const GetVets = () => async (req, res) => {
  try {
    const vets = await Vet.getAll();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: "error getting vets" });
  }
};

const GetVet = () => async (req, res) => {
  try {
    const vet = await Vet.getById(req.params.id);
    if (!vet) return res.status(404).json({ message: "Vet not found" });
    res.status(200).json(vet);
  } catch (error) {
    res.status(500).json({ message: "error getting vet" });
  }
};

export { GetVets, GetVet };
