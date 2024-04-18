<template>
  <div class="hello">
    {{ msg }} from {{ ville }}
  </div>
  <div>
    Hello <slot>Doe</slot>
  </div>
  <div>
    <input type="text" v-model="pays" ref="country">
    <button @click="envoyer">Envoyer au parent</button>
  </div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello world',
      pays: ''
    }
  },
  props: {
    ville: {
      type: String,
      default: 'Paris'
    }
  },
  methods: {
    envoyer() {
      this.$emit('sendData', this.pays)
    }
  },
  created() {
    console.log('created');
  },
  mounted() {
    this.$refs.country.focus()
    console.log('mounted');
  },
  emits: ['sendData']
}
</script>
<style scoped></style>