<template>
  <nav>
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
      <li class="logout-button">
        <button @click="logout">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('user');
      this.$router.push('/connexion');
    }
  }
}
</script>

<style scoped>
nav {
  background-color: #141414;
  padding: 10px 20px;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-end; /* Alignement à droite */
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
