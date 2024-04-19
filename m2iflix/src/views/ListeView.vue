<template>
  <div>
    <h1 class="title">Films Enregistrés</h1>
    <div class="film-list">
      <div v-if="user && user.listFilm && user.listFilm.length === 0">
        <p>Aucun film enregistré.</p>
      </div>
      <div v-else-if="user && user.listFilm">
        <div v-for="movie in user.listFilm" :key="movie.id" class="film-item">
          <h2 class="film-title">{{ movie.title }}</h2>
          <button @click="removeMovieFromList(movie)" class="remove-button">Supprimer</button>
        </div>
      </div>
      <div v-else>
        <p>Utilisateur non connecté.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      try {
        const user = this.getAuthenticatedUser();
        if (!user || !user.id) {
          console.error('Utilisateur non connecté ou ID manquant');
          this.$router.push('/connexion');
          return;
        }
        const response = await axios.get(`http://localhost:8000/users/${user.id}`);
        this.user = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur :', error);
      }
    },
    async removeMovieFromList(movie) {
      try {
        const user = this.getAuthenticatedUser();
        if (!user || !user.id) {
          console.error('Utilisateur non connecté ou ID manquant');
          this.$router.push('/connexion');
          return;
        }
        user.listFilm = user.listFilm.filter(film => film.id !== movie.id);
        await axios.put(`http://localhost:8000/users/${user.id}`, user);
        localStorage.setItem('user', JSON.stringify(user));
        console.log('Film supprimé de la liste de l\'utilisateur :', movie);
        // Recharger les données de l'utilisateur après avoir supprimé le film
        this.loadUser();
      } catch (error) {
        console.error('Erreur lors de la suppression du film de la liste de l\'utilisateur :', error);
      }
    },
    getAuthenticatedUser() {
      return JSON.parse(localStorage.getItem('user'));
    }
  }
};
</script>

<style scoped>
/* Styles inspirés de Netflix */
.title {
  color: #fff;
  font-size: 36px;
  margin-bottom: 30px;
}

.film-list {
  display: flex;
  flex-wrap: wrap;
}

.film-item {
  margin-right: 20px;
  margin-bottom: 20px;
}

.film-title {
  color: #fff;
  font-size: 24px;
}

.remove-button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-button:hover {
  background-color: #555;
}
</style>
