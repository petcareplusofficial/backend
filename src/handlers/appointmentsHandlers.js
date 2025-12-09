import { Appointment } from "../internal/db/appointment.js";

const GetAllUserAppointments = () => async (req, res) => {
  try {
    const appointments = await Appointment.getAllByUserId(req.user.id);
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "error getting appointments" });
  }
};

const CreateAppointment = () => async (req, res) => {
  try {
    const body = {
      userId: req.body.vetId,
      petId: req.body.petId,
      isNewPatient: req.body.isNewPatient,
      reason: req.body.reason,
      date: req.body.date,
      hour: req.body.hour,
      status: req.body.status,
      notes: req.body.notes,
    };
    const appointment = new Appointment(body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "error creating appointment" });
  }
};

const UpdateAppointment = () => async (req, res) => {
  try {
    const body = {
      reason: req.body.reason,
      date: req.body.date,
      hour: req.body.hour,
      status: req.body.status,
      notes: req.body.notes,
    };

    const appointment = await new Appointment(body).update(
      req.params.id,
      req.body,
    );
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "error updating appointment" });
  }
};

const GetAppointmentById = () => async (req, res) => {
  try {
    console.log("here1");
    const appointment = await Appointment.getById(req.params.id);
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "error getting appointment" });
  }
};

const GetAllAppointmentsByPetIdAndUserId = () => async (req, res) => {
  try {
    const appointments = await Appointment.getAllByUserAndStatusAndPet(
      req.query.status,
      req.params.petId,
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: "error getting appointments" });
  }
};

const CancelAppointment = () => async (req, res) => {
  try {
    const appointment = await Appointment.cancel(req.params.id);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: "error cancelling appointment" });
  }
};

export {
  GetAllUserAppointments,
  CreateAppointment,
  UpdateAppointment,
  GetAppointmentById,
  CancelAppointment,
  GetAllAppointmentsByPetIdAndUserId,
};
