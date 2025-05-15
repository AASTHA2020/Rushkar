const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees with filters
router.get('/', async (req, res) => {
  try {
    const {
      search,
      department,
      position,
      minSalary,
      maxSalary,
      fromDate,
      toDate,
      page = 1,
      pageSize = 10
    } = req.query;

    // Build filter object
    const filter = {};

    // Search by name or email
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by department (multi-select)
    if (department) {
      const departments = Array.isArray(department) ? department : [department];
      filter.department = { $in: departments };
    }

    // Filter by position (multi-select)
    if (position) {
      const positions = Array.isArray(position) ? position : [position];
      filter.position = { $in: positions };
    }

    // Filter by salary range
    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    // Filter by joining date range
    if (fromDate || toDate) {
      filter.joiningDate = {};
      if (fromDate) filter.joiningDate.$gte = new Date(fromDate);
      if (toDate) filter.joiningDate.$lte = new Date(toDate);
    }

    // Calculate pagination
    const skip = (Number(page) - 1) * Number(pageSize);
    const limit = Number(pageSize);

    // Get total count
    const total = await Employee.countDocuments(filter);

    // Get paginated results
    const employees = await Employee.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      employees,
      pagination: {
        total,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPages: Math.ceil(total / Number(pageSize))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 