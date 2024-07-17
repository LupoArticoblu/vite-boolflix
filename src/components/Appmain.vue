<script>
import { stringifyExpression } from '@vue/compiler-core';
import { store } from '../data/store.js';
import Appcards from './Appcards.vue';

export default {
  name: 'Appmain',
  components: {
    Appcards
  },
  props:{
    //questo viene riportato in tamplate, qui,  e come parametro comunicherà in App.vue il titolo
    title: String,
    //altro parametro da riferire ad App.vue per riconoscere se il risultato della ricerca va nell'array delle serie tv o dei film 
    type: String,
  },  
  data() {
    return{
      store,
    };
  } 
};
</script>

<template>
 
 <h1 class="container">
    {{title}}
  </h1>

  <div class="container d-flex flex-wrap">
    
    <Appcards :card="card" v-for="card in store[type]" :key="card.id"/>
    
  </div>

</template>

<style lang="scss" scoped>
  
</style>