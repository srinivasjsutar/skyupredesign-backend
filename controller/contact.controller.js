const Contact = require("../models/contact.model");

// get all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get a single contact
const getContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a contact (from the landing page form)
const createContact = async (req, res) => {
  try {
    // The frontend sends: firstname, lastname, company_name, email,
    // your_interest (array), phone_number, message.
    // The model expects: name, company, email, phone, service, budget, message.
    // We map them here so both old and new field shapes work.
    const b = req.body;
    const payload = {
      name:    b.name    || `${b.firstname || ""} ${b.lastname || ""}`.trim() || "Unknown",
      company: b.company || b.company_name || "",
      email:   b.email,
      phone:   b.phone   || String(b.phone_number || ""),
      service: b.service || (Array.isArray(b.your_interest) ? b.your_interest.join(", ") : b.your_interest) || "",
      budget:  b.budget  || "Not specified",
      message: b.message || "",
      status:  b.status  || "new",
    };
    const contact = await Contact.create(payload);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update a contact (e.g. change status)
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndUpdate(id, req.body);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    const updatedContact = await Contact.findById(id);
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};