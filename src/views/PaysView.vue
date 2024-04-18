<template>
  <div>
    <h1>Pays : {{ villes }}</h1>
    <ul>
      <VilleComponent v-for="(ville, index) in villes" :key="index" v-model:ville="villes[index]" />
    </ul>
  </div>
</template>

<script setup>
import VilleComponent from '../components/VilleComponent.vue';
import { ref, reactive } from 'vue';
const villes = reactive(['Marseille', 'Lyon', 'Paris']);
</script>
