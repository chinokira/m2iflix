import {defineStore} from "pinia";

export const useProduitStore = defineStore('produits', {
    state() {
        return {
            _lignesCommandes: []
        }
    },
    getters: {
        lignesCommandes(state) {
            return state._lignesCommandes;
        },
        nombreProduits(state) {
            return state._lignesCommandes.length
        },
        quantiteProduits(state) {
            return state._lignesCommandes
                .map(elt => elt.quantite)
                .reduce((a, b) => a + b, 0)
        },
        totalHT(state) {
            return state._lignesCommandes
                .map(elt => elt.quantite * elt.produit.prix)
                .reduce((a, b) => a + b, 0)
        }
    },
    actions: {
        ajouterLigneCommande(ligneCommande) {
            this._lignesCommandes.push(ligneCommande)
        },
        supprimerLigneCommande(nom) {
            const indice = this._lignesCommandes.findIndex(elt => elt.produit.nom === nom);
            if (indice != -1) {
                this._lignesCommandes.splice(indice, 1);
            } else {
                console.error(`Le produit ${nom} n'existe pas!`)
            }
        },
        incrementerQuantite(nom) {
            const ligneCommande = this._lignesCommandes.find(elt => elt.produit.nom === nom);
            if (ligneCommande) {
                ligneCommande.quantite += 1
            } else {
                console.error(`Le produit ${nom} n'existe pas!`)
            }
        },
        decrementerQuantite(nom) {
            const ligneCommande = this._lignesCommandes.find(elt => elt.produit.nom === nom);
            if (ligneCommande) {
                if (ligneCommande.quantite > 1) {
                    ligneCommande.quantite -= 1
                } else {
                    this.supprimerLigneCommande(nom);
                }
            } else {
                console.error(`Le produit ${nom} n'existe pas!`)
            }
        },
    }
})