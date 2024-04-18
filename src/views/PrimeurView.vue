<template>
    <h1>
        Primeur : Total = {{ total }}
    </h1>
    <ul>
        <ProduitComponent v-for="produit in produits" :produit @sendData='calculerTotal($event, produit.prix)' />
    </ul>
</template>
<script>
import ProduitComponent from '../components/ProduitComponent.vue';

export default  {
    components: {
        ProduitComponent
    },
    data() {
        return {
            produits: [
                { nom: "banane", prix: 3, quantite: 10 },
                { nom: "fraise", prix: 10, quantite: 20 },
                { nom: "poivron", prix: 5, quantite: 10 }
            ],
            total: 0,
        }
    },
    methods: {
        calculerTotal(qte, prix) {
            this.total += qte * prix
        }
    },
  provide:{
      tva: 0.2
  }
}
</script>
<style></style>