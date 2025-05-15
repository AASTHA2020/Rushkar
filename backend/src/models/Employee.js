const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  dob: {
    type: Date,
    required: true
  },
  department: {
    type: String,
    required: true,
    trim: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  lastIncrementDate: {
    type: Date,
    required: true
  },
  nextIncrementDate: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema); 