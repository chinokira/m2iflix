<template>
  <h1>Détails de la personne {{ id }}</h1>
  <Form @submit="enregistrer" :validation-schema="schema" v-slot="{meta,}" ref="myForm">
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
    <div>
      <button :disabled="!meta.valid">
        Enregistrer
      </button>
      <button type="button" @click="$router.push('/personne')">
        Retour
      </button>
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
        age: yup.number().required().min(1).max(150),
        prenom: validateString()
      })
    }
  },
  props: ['id'],
  mounted() {
    axios
        .get(`${this.BASE_URL}/personnes/${this.id}`)
        .then(res => this.$refs.myForm.setValues(res.data))
  },
  methods: {
    enregistrer(values) {
      axios
          .put(`${this.BASE_URL}/personnes/${this.id}`, values)
          .then(() => this.$router.push('/personne'))
    }
  }

}
</script>
<style></style>