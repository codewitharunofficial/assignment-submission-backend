import express from "express";
import Evaluator from "../../models/Evaluator.js";
const router = express.Router();

router.get("/fetch", async (req, res) => {
  try {
    const evaluators = await Evaluator.find({});

    if (evaluators.length === 0) {
      res.status(404).send({
        success: false,
        message: "No Evaluators are appointed",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Fetched Evaluators Successfully",
        evaluators,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
});

export default router;
