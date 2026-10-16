//var express = require('express');
import express from 'express';
import UserController from '../controllers/userController.js';

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/test', (req, res) => {
  res.send('respond with a test resource');
});
router.post('/', UserController.create);
router.get('/:id', UserController.getById);

export default router;