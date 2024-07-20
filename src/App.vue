<script>
//Importazioni

import Appheader from './components/Appheader.vue';
import Appmain from './components/Appmain.vue';

import axios from "axios";
import { store } from './data/store.js';

export default {
  name: 'App',
  components: {
    Appheader,
    Appmain,

  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getApi(type, isPopular = false) {
      console.log(store.apiUrl, store.apiParams);
      let apiUrl = isPopular ? `https://api.themoviedb.org/3/${type}/popular` : `${store.apiUrl}${type}`;

      return axios.get(apiUrl, { 
        params : store.apiParams  
      })
        .then(res => {
          console.log(res.data.results); 
          return res.data.results
        })
        .catch(err => {
          console.log('error!', err);
          return []; //array vuoto in cASO di errore
        })
    },
    startSearch() {
      console.log('API Params:', store.apiParams);
      console.log('Query:', store.apiParams.query);  
    // Assicurati che store.apiParams e store.apiParams.query siano definiti
    if (!store.apiParams || typeof store.apiParams.query === 'undefined') {
      console.error('store.apiParams or store.apiParams.query is undefined');
      return;
    }

    store.movie = [];
    store.tv = [];
    
    const moviePromise = (store.type === 'all' || store.type === 'movie')
      ? this.getApi('movie', store.apiParams.query === '')
      : Promise.resolve([]);

    const tvPromise = (store.type === 'all' || store.type === 'tv')
      ? this.getApi('tv', store.apiParams.query === '')
      : Promise.resolve([]);

    Promise.all([moviePromise, tvPromise]).then(([movies, tvShows]) => {
      store.movie = movies;
      store.tv = tvShows;
    }).catch(error => {
      console.error('Error fetching data', error);
    });
  }
  },
  mounted() {
    this.startSearch();
  }
}
</script>

<template>
  <div>
    <Appheader @search="startSearch" />
    <Appmain v-if="store.type === 'all' || store.type === 'movie'" title="Film" :cards="store.movie" />
    <Appmain v-if="store.type === 'all' || store.type === 'tv'" title="Serie TV" :cards="store.tv" />
  </div>
</template>


<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/vars.scss' as *;
  *{
    cursor: default;
  }
</style>
