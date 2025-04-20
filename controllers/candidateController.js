const Candidate = require("../models/Candidate");
const Employee = require("../models/Employee")
// Get all candidates
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new candidate
exports.addCandidate = async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Debugging - Log incoming request data
  
      const { name, email, phone, position, experience,status } = req.body;
  
      if (!name || !email || !phone || !position || !experience) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const existingCandidate = await Candidate.findOne({ email });
      if (existingCandidate) {
        return res.status(400).json({ error: "Candidate with this email already exists" });
      }
  
      const newCandidate = new Candidate({
        name,
        email,
        phone,
        position,
        experience,
        status: "new",
      });
  
      const savedCandidate = await newCandidate.save();
      console.log("Saved Candidate:", savedCandidate); // Debugging - Log saved candidate
  
      res.status(201).json(savedCandidate);
    } catch (error) {
      console.error("Error saving candidate:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

// Update candidate status
exports.updateCandidate = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedCandidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedCandidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a candidate
exports.deleteCandidate = async (req, res) => {
  try {
    await Candidate.findByIdAndDelete(req.params.id);
    res.json({ message: "Candidate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.promoteToEmployee = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ error: "Candidate not found" });

    if (candidate.status !== "selected") {
      return res.status(400).json({ error: "Candidate is not selected" });
    }

    const newEmployee = new Employee({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      experience: candidate.experience,
    });

    const saved = await newEmployee.save();
    console.log(" Promoted to employee:", saved);

    await Candidate.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "Candidate promoted to employee", employee: saved });
  } catch (err) {
    console.error("Promotion error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
