<template>
  <h1>Calcul</h1>
  <div v-if="!erreur">
    {{ valeur1 }} {{ operator[op]  }} {{ valeur2 }} = {{ resultat }}
  </div>
  <div v-else>
    {{ erreur }}
  </div>
</template>
<script>
export default {
  props: ['op'],
  data() {
    return {
      operator: {
        'plus': '+',
        'moins': '-',
        'div': '/',
        'fois': '*'
      },
      erreur: null
    }
  },
  computed: {
    valeur1() {
      return this.$route.query.valeur1
    },
    valeur2() {
      return this.$route.query.valeur2
    },
    resultat() {
      if (this.operator[this.op]) {
        return eval(this.valeur1 + this.operator[this.op] + this.valeur2)
      } else {
        this.erreur = 'Opérateur inconnu'
      }

    }
  }
}
</script>
<style></style>