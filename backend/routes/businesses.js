const express = require('express');
const router = express.Router();
const Business = require('../models/business');

// POST /api/businesses — Register a new business
router.post('/', async (req, res) => {
  try {
    const { name, owner, location, category, contact, address } = req.body;
    const newBusiness = new Business({ name, owner, location, category, contact, address });
    await newBusiness.save();
    res.status(201).json({ message: 'Business registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/businesses — Filter by location, category, search
router.get('/', async (req, res, next) => {
  try {
    const { location, category, search } = req.query;

    const filters = [];

    if (location && location.trim()) {
      filters.push({ location: { $regex: location.trim(), $options: 'i' } });
    }

    if (category && category.trim()) {
      filters.push({ category: { $regex: category.trim(), $options: 'i' } });
    }

    if (search && search.trim()) {
      const keyword = search.trim();
      filters.push({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { owner: { $regex: keyword, $options: 'i' } },
          { address: { $regex: keyword, $options: 'i' } }
        ]
      });
    }

    const query = filters.length > 0 ? { $and: filters } : {};

    const businesses = await Business.find(query);
    res.status(200).json(businesses);

  } catch (err) {
    next(err);
  }
});

module.exports = router;
