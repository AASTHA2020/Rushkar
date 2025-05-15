const mongoose = require('mongoose');
const faker = require('faker');
const Employee = require('../models/Employee');
require('dotenv').config();

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'IT',
  'Customer Support'
];

const positions = [
  'Software Engineer',
  'Senior Software Engineer',
  'Product Manager',
  'Marketing Specialist',
  'Sales Representative',
  'HR Manager',
  'Financial Analyst',
  'Operations Manager',
  'IT Support',
  'Customer Success Manager'
];

const locations = [
  'New York',
  'San Francisco',
  'London',
  'Berlin',
  'Tokyo',
  'Singapore',
  'Sydney',
  'Toronto'
];

const generateEmployee = () => {
  const joiningDate = faker.date.past(5);
  const lastIncrementDate = faker.date.between(joiningDate, new Date());
  const nextIncrementDate = new Date(lastIncrementDate);
  nextIncrementDate.setFullYear(nextIncrementDate.getFullYear() + 1);

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    dob: faker.date.past(50),
    department: faker.random.arrayElement(departments),
    joiningDate,
    salary: faker.datatype.number({ min: 30000, max: 150000 }),
    location: faker.random.arrayElement(locations),
    position: faker.random.arrayElement(positions),
    lastIncrementDate,
    nextIncrementDate
  };
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-listing', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await Employee.deleteMany({});

    // Generate and insert 100 employees
    const employees = Array.from({ length: 100 }, generateEmployee);
    await Employee.insertMany(employees);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 