const bcrypt = require('bcrypt');

// Get the password from the command line arguments (or hard-code it)
const password = process.argv[2]; // Or replace with a specific string for testing

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error hashing password:', err);
  } else {
    console.log('Hashed password:', hash);
  }
});
