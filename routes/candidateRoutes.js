const express = require("express");
const {
  getCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  promoteToEmployee, // ✅ add this
} = require("../controllers/candidateController");

const router = express.Router();

router.get("/", getCandidates);
router.post("/", addCandidate);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

// ✅ Add this new route:
router.post("/promote/:id", promoteToEmployee); 

module.exports = router;
