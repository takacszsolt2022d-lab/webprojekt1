import express from 'express';
import TermekController from '../controllers/termekcontroller.js';

const router = express.Router();

router.get('/', TermekController.getAllTermek);
router.get('/:id', TermekController.getTermekById);
router.post('/', TermekController.createTermek);
router.put('/:id', TermekController.updateTermek);
router.delete('/:id', TermekController.deleteTermek);

export default router;