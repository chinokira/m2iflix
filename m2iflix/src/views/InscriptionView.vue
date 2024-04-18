<template>
  <div>
    <h1>Formulaire d'Inscription</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="motdepasse">Mot de passe:</label>
        <input type="password" id="motdepasse" v-model="motdepasse">
      </div>
      <button type="submit">Soumettre</button>
    </form>
    <div v-if="submitted">
      <h2>Données soumises :</h2>
      <p>Email: ****</p>
      <p>Mot de passe: ****</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      motdepasse: '',
      submitted: false
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.get('http://localhost:8000/users', {
          params: {
            email: this.email,
            password: this.password
          }
        });
        if (response.data[0].email ===this.email) {
          console.log('Un utilisateur avec cet email existe déjà.');
          return;
        }

        await axios.post('http://localhost:8000/users', {
          email: this.email,
          password: this.motdepasse
        });
        this.submitted = true;
        this.email = '';
        this.motdepasse = '';
        this.$router.push('/connexion');
      } catch (error) {
        alert('Erreur lors de la soumission du formulaire :', error);
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

.submitted-data {
  margin-top: 20px;
  color: #fff;
}
</style>
