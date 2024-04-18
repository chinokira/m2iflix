<template>
  <div class="container">
    <h1>Connexion</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="form-control">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
      <button class="signup-button" @click="$router.push('/inscription')">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          params: {
            email: this.email,
            password: this.password
          }
        });
        const user = response.data;
        if (user.length > 0) {
          console.log('Utilisateur connecté :', user);
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/films');
        } else {
          alert('Erreur de connexion : Utilisateur non trouvé');
        }
      } catch (error) {
        alert('Erreur de connexion :', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #fff;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #e50914;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #ff3d3d;
}

.signup-button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(255,0,0,0.47);
  color: #000;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
}

.signup-button:hover {
  background-color: #f2f2f2;
}
</style>
