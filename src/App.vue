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
    getApi(type){
      axios.get(store.apiUrl + type, {params: store.apiParams})
      .then(res => {
        if(type === 'movie'){
          store.movie = res.data.results;
        }else{
          store.tv = res.data.results;
        }
      })
      .catch(err =>{})
    }
  },
  mounted(){
    this.getApi('movie')
    this.getApi('tv')
  }
  }
</script>

<template>
  <div>
    <Appheader />
    <Appmain title="Film" type="movie"/>
    <Appmain  title="Serie TV" type="tv"/>
  </div>
</template>


<style>

</style>
