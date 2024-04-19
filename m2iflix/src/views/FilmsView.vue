<template>
  <div>
    <h1 class="title">Liste de Films</h1>
    <div class="film-list">
      <div v-for="movie in movies" :key="movie.id" class="film-item">
        <div class="movie-container" :style="{ backgroundColor: '#333' }">
          <h2 class="film-title">{{ movie.title }}</h2>
          <button @click="addMovieToList(movie)"
                  :class="{ 'add-button': true, 'disabled': isMovieAdded(movie) }"
                  :disabled="isMovieAdded(movie)">
            Ajouter
          </button>
        </div>
      </div>
    </div>

    <!-- Bouton pour revenir en haut de la page -->
    <button class="scroll-top-button" @click="scrollToTop">
      Haut de la page
    </button>
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
        this.movies = response.data.map(movie => ({
          ...movie,
          backgroundColor: '#333'
        }));
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
          // console.log('Ce film est déjà dans la liste de l\'utilisateur.');
          return;
        }
        this.user.listFilm.push(movie);
        await axios.put(`http://localhost:8000/users/${this.user.id}`, this.user);
        localStorage.setItem('user', JSON.stringify(this.user));
        // console.log('Film ajouté à la liste de l\'utilisateur :', movie);
      } catch (error) {
        console.error('Erreur lors de l\'ajout du film à la liste de l\'utilisateur :', error);
      }
    },
    getAuthenticatedUser() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user[user.length - 1] != null) {
        return user[user.length - 1];
      }
      else if (user != null) {
        return user;
      }
      else {
        this.$router.push('/connexion');
      }
    },
    isMovieAdded(movie) {
      return this.user.listFilm && this.user.listFilm.some(film => film.title === movie.title);
    },
    scrollToTop() {
      // Faites défiler la page vers le haut avec une animation fluide
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
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
  margin-bottom: 20px;
  width: calc(50% - 10px); /* Deux films par ligne avec un espacement de 20px */
}

.movie-container {
  margin-right: 20px;
  margin-bottom: 20px;
  padding: 20px; /* Ajout d'un espacement interne */
  display: flex; /* Alignement vertical des éléments */
  flex-direction: column; /* Alignement vertical des éléments */
  align-items: center; /* Alignement vertical des éléments */
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
  margin-top: 10px; /* Ajout d'un espacement en haut du bouton */
}

.add-button:hover {
  background-color: #ff3d3d;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Styles pour le bouton "Haut de la page" */
.scroll-top-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.scroll-top-button:hover {
  background-color: #0056b3;
}
</style>
