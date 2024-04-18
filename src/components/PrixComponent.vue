<template>
<span>  prix ttc : {{ prix + prix * tva }}</span>
</template>

<script setup>
  import {inject} from "vue";

  const tva = inject('tva', 0.5)
  defineProps({prix:Number})
</script>

<style scoped>

</style>