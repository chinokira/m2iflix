<template>
  <h1>Compteur : {{ compteur.etat }}</h1>
  <div>
    <button @click="decrementer">-</button>
    {{ compteur.valeur }}
    <button @click="incrementer">+</button>
  </div>
</template>

<script setup>
import {onMounted, reactive, computed} from "vue";

const counter = { valeur: 0, etat:'nul'}
const compteur = reactive(counter)

const incrementer = () => {
  compteur.valeur++
}
const decrementer = () => {
  compteur.valeur--
}

compteur.etat = computed(() => {
  if (compteur.valeur > 0) {
    return 'positif';
  } else if (compteur.valeur < 0) {
    return 'négatif';
  } else {
    return 'nul';
  }
});

onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped>

</style>
