<template>
  <h2>Ajouter une nouvelle personne</h2>
  <Form @submit="ajouterPersonne" :validation-schema="schema" v-slot="{meta, errors}" @invalid-submit="afficherErreur">
    <ul>
      <li v-for="(v, k) in errors">
        {{ k }}: {{ v }}
      </li>
    </ul>
    <div>
      <label for="nom">Nom</label>
      <Field id="nom" name="nom"/>
      <ErrorMessage name="nom"/>
    </div>
    <div>
      <label for="prenom">Prénom</label>
      <Field id="prenom" name="prenom"/>
      <ErrorMessage name="prenom"/>
    </div>
    <div>
      <label for="age">Âge</label>
      <Field id="age" name="age"/>
      <ErrorMessage name="age"/>
    </div>
    <h3>Adresse</h3>
    <div>
      <label for="rue">Rue</label>
      <Field id="rue" name="adresse.rue"/>
    </div>
    <div>
      <label for="cp">Code postal</label>
      <Field id="cp" name="adresse.cp"/>
    </div>
    <div>
      <label for="ville">Ville</label>
      <Field id="ville" name="adresse.ville"/>
    </div>
    <div>
      <button :disabled="!meta.valid">Ajouter</button>
    </div>
  </Form>
</template>
<script>
import {Field, Form, ErrorMessage} from "vee-validate";
import * as yup from 'yup'
import axios from "axios";

export default {
  components: {
    Field, Form, ErrorMessage
  },
  data() {
    const validateString = () => yup
        .string()
        .required()
        .matches(/^[A-Z]{1}.*/, (params) => `'${params.value}' ne commence pas par une majuscule`)
    return {
      schema: yup.object({
        nom: validateString(),
        age: yup
            .number().required().min(1).max(150),
        prenom: validateString()
      })

    }
  },
  methods: {
    ajouterPersonne(values, actions) {
      axios
          .post(`${this.BASE_URL}/personnes`, values)
          .then(res => this.$emit('sendData', res.data))
      actions.resetForm()
    },
    afficherErreur({errors}) {
      console.log(errors)
    }
  },
  emits: ['sendData']
}
</script>
<style scoped></style>