const bcrypt = require("bcryptjs");

const users = [
  {
    username: 'sridhar.aggrawal',
    firstName: 'Sridhar',
    lastName: 'Aggrawal',
    email: 'sridhar@example.com',
    password: bcrypt.hashSync("12345", 10),
  },
  {
    username: 'salman.khan',
    firstName: 'Salman',
    lastName: 'Khan',
    email: 'sallu23@examples.com',
    password: bcrypt.hashSync("12345333", 10),
  },
  {
    username: 'jane.smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@examples.com',
    password: bcrypt.hashSync("1234513323", 10),
  },
  {
    username: 'akshya.kumar',
    firstName: 'Akshya',
    lastName: 'Kumar',
    email: 'Akshya12@example.com',
    password: bcrypt.hashSync("12344445335", 10),
  },
  {
    username: 'suraj.kumar',
    firstName: 'Suraj',
    lastName: 'Kumar',
    email: 'jane@exampless.com',
    password: bcrypt.hashSync("12345664366", 10),
    isAdmin: true,
  }
];

module.exports = users;
