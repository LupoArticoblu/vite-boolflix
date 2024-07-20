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
        params :{ 
          ...store.apiParams,
          page: isPopular ? 1 : store.apiParams.page
        }   
      })
        .then(res => {
          if (type === 'movie') {
            store.totPagesMovie = res.data.total_pages;
          } else if (type === 'tv') {
            store.totPagesTv = res.data.total_pages;
          }
          console.log(res.data.results); 
          return res.data.results
        })
        .catch(err => {
          console.log('error!', err);
          return []; //array vuoto in cASO di errore
        })
    },
    changePage(newPage) {
      if (newPage < 1 || newPage >  (store.type === 'movie' ? store.totPagesMovie : store.totPagesTv)) {
        return; // se la pagina è fuori dal range, non cambio pagina
      }
      store.apiParams.page = newPage; // se non ho errori, cambio pagina
      this.startSearch(); // ricarica i dati per la nuova pagina
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
    <Appmain v-if="store.movie.length > 0 && store.type === 'all'" title="Film e serie tv" :cards="store.movie.concat(store.tv)" />
    <Appmain v-if="store.type === 'movie'" title="Film" :cards="store.movie" />
    <Appmain v-if="store.type === 'tv'" title="Serie TV" :cards="store.tv" />

    <!-- Controlli di Paginazione -->
    <div v-if="store.type === 'movie'" class="pagination-controls">
      <button @click="changePage(store.apiParams.page - 1)" :disabled="store.apiParams.page <= 1">‹‹</button>
      <span>Pagina {{ store.apiParams.page }} di {{ store.totalPagesMovie }}</span>
      <button @click="changePage(store.apiParams.page + 1)" :disabled="store.apiParams.page >= store.totalPagesMovie">››</button>
    </div>

    <div v-if="store.type === 'tv'" class="pagination-controls">
      <button @click="changePage(store.apiParams.page - 1)" :disabled="store.apiParams.page <= 1">‹‹</button>
      <span>Pagina {{ store.apiParams.page }} di {{ store.totalPagesTv }}</span>
      <button @click="changePage(store.apiParams.page + 1)" :disabled="store.apiParams.page >= store.totalPagesTv">››</button>
    </div>
  </div>
  
</template>


<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/vars.scss' as *;
  *{
    cursor: default;
  }
  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    button {
      margin: 0 1rem;
    }
  }
</style>
