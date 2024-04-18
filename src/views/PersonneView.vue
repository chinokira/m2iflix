<template>
  <h1>Gestion de personnes</h1>
  <PersonneAdd @send-data="ajouterPersonne"/>
  <h2>Liste de personnes </h2>
  <ul v-if="!erreur">
    <li v-for='(elt, ind) in personnes'>
      {{ elt.prenom }} {{ elt.nom }}
      <router-link :to="{ name: 'personne-details', params: { id: elt.id } }">
        modifier
      </router-link>
      <button class="btn" @click="supprimerPersonne(elt.id, ind)">
        <i class="fa-solid fa-trash-can" style="color: #da0b20;"></i>
      </button>
    </li>
  </ul>
  <p v-else>{{ erreur }}</p>
</template>
<script>
import PersonneAdd from '../components/PersonneAdd.vue';
import axios from "axios";

export default {
  components: {
    PersonneAdd
  },
  data() {
    return {
      personnes: [],
      erreur: null
    }
  },
  methods: {
    ajouterPersonne(data) {
      this.personnes.push(data);
    },
    supprimerPersonne(id, ind) {
      axios
          .delete(`${this.BASE_URL}/personnes/${id}`)
          .then(res => this.personnes.splice(ind, 1))
    }
  },
  created() {
    axios
        .get(`${this.BASE_URL}/personnes`)
        .then(res => this.personnes = res.data)
        .catch(() => this.erreur = 'Problème de récupération de données')
  }

}
</script>
<style>

</style>