<template>
  <nav>
    <div class="list-circle" @click="redirectToList">Liste</div>
    <ul>
      <li>
        <button class="nav-button" @click="$router.push('/films')">Films</button>
      </li>
      <li class="logout-button">
        <button @click="logout">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    redirectToList() {
      if (this.isLoggedIn) {
        this.$router.push('/liste');
      } else {
        this.$router.push('/connexion');
      }
    },
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.$router.push('/connexion');
    }
  },
  computed: {
    isLoggedIn() {
      return localStorage.getItem('user') !== null;
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

.list-circle {
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
  transition: background-color 0.3s, transform 0.1s; /* Ajout de la transition de transform */
}

.list-circle:hover {
  background-color: #ff3d3d;
}

.list-circle:active {
  transform: scale(0.9); /* Réduire légèrement la taille lorsqu'il est cliqué */
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
}

li {
  margin-left: 20px;
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
  text-decoration: underline;
}
</style>
