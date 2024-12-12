<template>
  <div>
    <!-- Login form -->
    <form v-if="!userData" @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input v-model="username" id="username" type="text" placeholder="Enter username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" id="password" type="password" placeholder="Enter password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>

    <!-- Display user data after login -->
    <div v-if="userData">
      <h2>Welcome, {{ userData.username }}!</h2>

      <div class="form-group">
        <label for="vorname">Vorname:</label>
        <input type="text" v-model="userData.Vorname" id="vorname" readonly />
      </div>

      <div class="form-group">
        <label for="nachname">Nachname:</label>
        <input type="text" v-model="userData.Nachname" id="nachname" readonly />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="userData.Email" id="email" readonly />
      </div>

      <div class="form-group">
        <label for="strasse">Straße:</label>
        <input type="text" v-model="userData.Straße" id="strasse" readonly />
      </div>

      <div class="form-group">
        <label for="ort">Ort:</label>
        <input type="text" v-model="userData.Ort" id="ort" readonly />
      </div>

      <div class="form-group">
        <label for="plz">PLZ:</label>
        <input type="text" v-model="userData.PLZ" id="plz" readonly />
      </div>

      <div class="form-group">
        <label for="nr">Nr:</label>
        <input type="text" v-model="userData.Nr" id="nr" readonly />
      </div>

      <div class="form-group">
        <label for="adminstatus">Adminstatus:</label>
        <input type="text" :value="adminStatus" id="adminstatus" readonly />
      </div>

      <!-- Logout Button -->
      <button @click="logout">Logout</button>
    </div>

    <!-- Register option if not logged in -->
    <div v-if="!userData">
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      userData: null, // Store user data after login
      error: null,
    };
  },
  computed: {
    adminStatus() {
      return this.userData && this.userData.Adminstatus ? 'Admin' : 'User';
    }
  },
  methods: {
    async login() {
      try {
        // Send login credentials to the backend
        const response = await axios.post('/api/login', {
          username: this.username,
          password: this.password,
        });

        // Extract the token from the response
        const token = response.data.token;

        // Store the token in localStorage for subsequent requests
        localStorage.setItem('authToken', token);

        // Fetch user data after successful login
        this.fetchUserData();

      } catch (error) {
        console.error('Login failed', error);
        alert('Invalid username or password.');
      }
    },

    async fetchUserData() {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          throw new Error('No token found');
        }

        // Make a request to fetch the logged-in user's data
        const response = await axios.get('/api/user', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        });

        // Store the user data in the component state
        this.userData = response.data;

        localStorage.setItem('userInfo', this.userData);

      } catch (error) {
        console.error('Error fetching user data:', error);
        this.error = error.response ? error.response.data.error : error.message;
      }
    },

    logout() {
      // Remove token and user data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userInfo');
      
      // Reset user data in the component
      this.userData = null;
    }
  },
};
</script>

<style scoped>
/* You can add your styling here */
form {
  margin-bottom: 20px;
}

div {
  margin: 10px 0;
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

h2 {
  margin-top: 20px;
  color: green;
}

p {
  font-size: 1.1rem;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  width: 150px; /* Adjust the width as needed */
}

.form-group input {
  width: 200px;
}
</style>
