<script>
//Importazioni

import Appheader from './components/Appheader.vue';
import Appmain from './components/Appmain.vue';
import Appsearch from './components/Appsearch.vue';
import axios from "axios";
import {store} from './data/store.js';

export default {
  name: 'App',
  components: {
    Appheader,
    Appmain,
    Appsearch
  },
  data(){
    return {
      store,
    };
  },
  methods: {
    
  }
  }
</script>

<template>
  
</template>


<style>

</style>
