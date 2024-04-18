<template>
  <div>
    <h1 class="title">Liste de Films</h1>
    <div class="film-list">
      <div v-for="movie in movies" :key="movie.id" class="film-item">
        <h2 class="film-title">{{ movie.title }}</h2>
        <button @click="addMovieToList(movie)" class="add-button">Ajouter</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.loadMovies();
  },
  methods: {

    async loadMovies() {
      try {
        const response = await axios.get(`http://localhost:8000/movies`);
        this.movies = response.data;
      } catch (error) {
        console.error('Erreur lors du chargement des films :', error);
      }
    },

    async addMovieToList(movie) {
      try {
        const user = this.getAuthenticatedUser()
        if (!user) {
          console.error('Utilisateur non connecté');
          return;
        }
        if (!user.listFilm) {
          user.listFilm = [];
        }
        if (user.listFilm.some(film => film.id === movie.id)) {
          console.log('Ce film est déjà dans la liste de l\'utilisateur.');
          return;
        }
        user.listFilm.push(movie);
        await axios.put(`http://localhost:8000/users/${user.id}`, user);
        console.log('Film ajouté à la liste de l\'utilisateur :', movie);
      } catch (error) {
        alert('Erreur lors de l\'ajout du film à la liste de l\'utilisateur :', error);
      }
    },

    // Cette fonction doit être implémentée pour récupérer l'utilisateur connecté
    getAuthenticatedUser() {
      const user = JSON.parse(localStorage.getItem('user'))[0];
      return user;
    }

  },
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

.add-button {
  background-color: #e50914;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: #ff3d3d;
}
</style>
