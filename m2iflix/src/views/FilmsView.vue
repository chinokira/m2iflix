<template>
  <div>
    <h1 class="title">Liste de Films</h1>
    <div class="film-list">
      <div v-for="movie in movies" :key="movie.id" class="film-item">
        <h2 class="film-title">{{ movie.title }}</h2>
        <button @click="addMovieToList(movie)"
                :class="{ 'add-button': true, 'disabled': isMovieAdded(movie) }"
                :disabled="isMovieAdded(movie)">
          Ajouter
        </button>
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
      user: null
    };
  },
  created() {
    this.loadMovies();
    this.user = this.getAuthenticatedUser();
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
        if (!this.user || !this.user.id) {
          console.error('Utilisateur non connecté ou ID manquant');
          return;
        }
        if (!this.user.listFilm) {
          this.user.listFilm = [];
        }
        if (this.user.listFilm.some(film => film.title === movie.title)) {
          console.log('Ce film est déjà dans la liste de l\'utilisateur.');
          return;
        }
        this.user.listFilm.push(movie);
        await axios.put(`http://localhost:8000/users/${this.user.id}`, this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
        console.log('Film ajouté à la liste de l\'utilisateur :', movie);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la liste de l\'utilisateur :', error);
      }
    },
    getAuthenticatedUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.length > 0) {
        return user[user.length - 1];
      } else {
        this.$router.push('/connexion');
      }
    },
    isMovieAdded(movie) {
      return this.user.listFilm && this.user.listFilm.some(film => film.title === movie.title);
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

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
