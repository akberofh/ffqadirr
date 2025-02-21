import express from "express";
import { adminControlAuth, userControlAuth } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { catagoryAd, catagoryUpdate, deleteById, getByIdCatagory, getCatagory } from "../controllers/catagoryController.js";



const router = express.Router();

router.get('/', getCatagory)
router.get('/:id', getByIdCatagory)
router.post('/', upload.single('photo'),catagoryAd);
router.put('/:id', upload.single('photo'),  catagoryUpdate);

router.delete('/:id', userControlAuth, deleteById);

export default router;
