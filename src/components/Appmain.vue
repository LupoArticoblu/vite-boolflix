<script>
import { store } from '../data/store.js';
import Appcards from './Appcards.vue';


export default {
  name: 'Appmain',
  components: {
    Appcards,
  },
  props:{
    //questo viene riportato in tamplate, qui,  e come parametro comunicherà in App.vue il titolo
    title: String,
    //altro parametro da riferire ad App.vue per riconoscere se il risultato della ricerca va nell'array delle serie tv o dei film 
    cards: Array,
    
  },  
  data() {
    return{
      store,
    };
  },
  computed: {
    outputWrongQuery(){
      if (this.cards.length > 0) {
        return '';
      }else{
        return 'La ricerca non ha prodotto alcun risultato';
      }  
    } 
  }
};
</script>

<template>
 
 <h1 class="container">
    {{title}}
  </h1>

  <div class="container d-flex flex-wrap">
    <Appcards :card="card" v-for="card in cards" :key="card.id"/>
    <p>{{ outputWrongQuery }}</p>
  </div>

</template>

<style lang="scss" scoped>
  
</style>