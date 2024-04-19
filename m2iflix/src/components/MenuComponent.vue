<template>
  <nav>
    <div v-if="isLoggedIn" class="profile-circle" @click="redirectToMovies">Profil</div>
    <ul>
      <li>
        <button class="nav-button" @click="$router.push('/')">Connexion</button>
      </li>
      |
      <li>
        <button class="nav-button" @click="$router.push('/inscriptions')">Inscriptions</button>
      </li>
      |
      <li>
        <button class="nav-button" @click="$router.push('/films')">Films</button>
      </li>
      |
      <li>
        <button class="nav-button" @click="$router.push('/liste')">Liste</button>
      </li>
      <li class="logout-button">
        <button @click="logout">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return localStorage.getItem('user') !== null;
    }
  },
  methods: {
    redirectToMovies() {
      if (this.isLoggedIn) {
        this.$router.push('/liste');
      } else {
        this.$router.push('/connexion');
      }
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); // Invalider le token
      this.$router.push('/connexion');
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #141414;
  padding: 10px 20px;
  display: flex;
  align-items: center;
}

.profile-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #e50914;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
}

li {
  margin-left: 20px; /* Espacement entre les éléments */
}

.nav-button,
.logout-button button {
  color: #fff;
  background-color: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-button:hover,
.logout-button button:hover {
  color: #e50914;
}
</style>
