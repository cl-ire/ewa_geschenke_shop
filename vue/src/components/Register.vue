<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input v-model="newUser.username" id="username" type="text" placeholder="Enter username" required />
        </div>
        <div>
          <label for="vorname">Vorname:</label>
          <input v-model="newUser.Vorname" id="vorname" type="text" placeholder="Enter first name" required />
        </div>
        <div>
          <label for="nachname">Nachname:</label>
          <input v-model="newUser.Nachname" id="nachname" type="text" placeholder="Enter last name" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input v-model="newUser.Email" id="email" type="email" placeholder="Enter email" required />
        </div>
        <div>
          <label for="strasse">Straße:</label>
          <input v-model="newUser.Straße" id="strasse" type="text" placeholder="Enter street" />
        </div>
        <div>
          <label for="ort">Ort:</label>
          <input v-model="newUser.Ort" id="ort" type="text" placeholder="Enter city" />
        </div>
        <div>
          <label for="plz">PLZ:</label>
          <input v-model="newUser.PLZ" id="plz" type="text" placeholder="Enter postal code" />
        </div>
        <div>
          <label for="nr">Nr:</label>
          <input v-model="newUser.Nr" id="nr" type="text" placeholder="Enter house number" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input v-model="newUser.Passwort" id="password" type="password" placeholder="Enter password" required />
        </div>
        <div>
        <label for="adminstatus">Admin Status:</label>
        <select v-model="newUser.Adminstatus" id="adminstatus">
          <option :value="false">User</option>
          <option :value="true">Admin</option>
        </select>
      </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
  
      <p v-if="registrationSuccess" class="success-message">Registration successful! You can now <router-link to="/login">log in</router-link>.</p>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newUser: {
          username: '',
          Vorname: '',
          Nachname: '',
          Email: '',
          Straße: '',
          Ort: '',
          PLZ: '',
          Nr: '',
          Passwort: '',
          Adminstatus: false,
        },
        registrationSuccess: false, // Whether registration was successful
        error: null, // Error message if registration fails
      };
    },
    methods: {
      async register() {
        try {
          // Send registration data to the backend
          const response = await axios.post('/api/users', this.newUser);
  
          // If registration is successful, show success message
          this.registrationSuccess = true;
          this.newUser = {}; // Reset form fields
          this.error = null; // Reset error message
        } catch (error) {
          console.error('Registration failed', error);
          this.registrationSuccess = false;
          this.error = error.response ? error.response.data.error : error.message;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles here */
  .register-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  h2 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  form input,
  form select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .success-message {
    color: green;
  }
  
  .error-message {
    color: red;
  }
  </style>

