<template>
  <li>
    <input type="text" v-model="ville">
  </li>
</template>

<script setup>
const ville = defineModel('ville')
</script>
