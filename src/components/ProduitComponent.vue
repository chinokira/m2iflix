<template>
  <li>
    {{ produit.nom }}, <PrixComponent :prix="produit.prix"/>, {{ produit.quantite }}
    <span>
            <input type="number" v-model="quantiteReservee">
            <button class="btn" :disabled @click="envoyer">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
        </span>
  </li>
</template>
<script>
import PrixComponent from "./PrixComponent.vue";
import {useProduitStore} from "../stores/produit.store.js";

export default {
  components: {PrixComponent},
  data() {
    return {
      quantiteReservee: null,
      disabled: false,
    }
  },
  props: {
    produit: {
      nom: String,
      prix: Number,
      quantite: Number
    }
  },
  methods: {
    envoyer() {
      this.$emit('sendData', this.quantiteReservee)
      this.disabled = true
      const  produitStore = useProduitStore();
      produitStore.ajouterLigneCommande({
        quantite: this.quantiteReservee,
        produit: this.produit
      })
    }
  },
  emits: ['sendData']
}
</script>
<style></style>