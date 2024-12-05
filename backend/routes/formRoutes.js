const express = require('express');
const Form = require('../models/Form');
const router = express.Router();

// Create Form
router.post('/create', async (req, res) => {
    try {
        const form = new Form(req.body);
        await form.save();
        res.status(201).json(form);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get Form
router.get('/:id', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        res.status(200).json(form);
    } catch (err) {
        res.status(404).json({ error: 'Form not found' });
    }
});

// Submit Responses
router.post('/:id/submit', async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        form.responses.push(req.body);
        await form.save();
        res.status(200).json(form);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
