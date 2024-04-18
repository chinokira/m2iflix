<template>
  <header-component></header-component>
  <menu-component></menu-component>
  <router-view ></router-view>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import MenuComponent from "./components/MenuComponent.vue";

export default {
  name: 'App',
  components: {
    MenuComponent,
    HeaderComponent
  },
}
</script>