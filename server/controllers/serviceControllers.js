import Service from "../models/Service.js";

export const addService = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  try {
    const { serviceName, serviceDescription, servicePrice } = req.body;
    const existingService = await Service.findOne({ serviceName });
    if (existingService) {
      return res.status(400).json({ error: "Service already exists" });
    }
    await Service.create({ serviceName, serviceDescription, servicePrice });
    res.status(200).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ services });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteService = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  const { id } = req.params;
  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateService = async (req, res) => {
  if (req.staff.role !== "Admin" && req.staff.role !== "General Manager") {
    return res.status(403).json({ error: "Unauthorized, Admin only" });
  }
  const { id } = req.params;
  const data = {
    serviceName: req.body.serviceName,
    serviceDescription: req.body.serviceDescription,
    servicePrice: req.body.servicePrice,
  }
  try {
    const updatedService = await Service.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
