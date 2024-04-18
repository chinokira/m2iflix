<template>
  <h1>Valeurs réactives</h1>
  <div>
    {{ valeur1 }} + {{ valeur2 }} = {{ resultat }}
  </div>
</template>
<script>
import {computed, watchEffect} from 'vue'
export default {
    data() {
      return {
        valeur1: 2,
        valeur2: 5,
        resultat: null
      }
    },
    mounted() {
      setInterval(() =>
        this.valeur1 += 10, 2000
      );
    },
    computed:{
      resultat() {
        return this.valeur1 + this.valeur2
      }
    }
  }
</script>
<style>

</style>