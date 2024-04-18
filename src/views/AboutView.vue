<template>
  <div class="hello">
    {{ msg }} from {{ ville }}
  </div>
  <div>
    Hello
    <slot>Doe</slot>
  </div>
  <div>
    <input type="text" v-model="pays" ref="country">
    <button @click="envoyer">Envoyer au parent</button>
  </div>

</template>

<!--<script>-->
<!--export default {-->
<!--  methods: {},-->
<!--  created() {-->
<!--    console.log('created');-->
<!--  },-->
<!--  mounted() {-->
<!--    this.$refs.country.focus()-->
<!--    console.log('mounted');-->
<!--  },-->
<!--  emits: ['sendData']-->
<!--}-->
<!--</script>-->
<script setup>
import {ref} from "vue";

const msg = ref('Hello world')
const pays = ref('')
defineProps({ville: String})
const emit = defineEmits(['sendData'])
const envoyer = () => emit('sendData', pays.value)


defineExpose({msg})
</script>
<style scoped></style>