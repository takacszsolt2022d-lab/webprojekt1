import express from "express";
import termekController from "../controllers/termekcontroller.js";
const router = express.Router();

router.get("/",termekController.getAllTermek);
router.get("/:id", termekController.getTermekById);
router.post("/", termekController.createTermek);
router.put("/:id", termekController.updateTermek);
router.delete("/:id", termekController.deleteTermek);   

export default router;