<script>
//Importazioni

import Appheader from './components/Appheader.vue';
import Appmain from './components/Appmain.vue';
import Appcards from './components/Appcards.vue';
import axios from "axios";
import { store } from './data/store.js';

export default {
  name: 'App',
  components: {
    Appheader,
    Appmain,
    Appcards

  },
  data() {
    return {
      store,
    };
  },
  methods: {
    getApi(type, isPopular = false) {
      let apiUrl;
      if (isPopular){ 
        apiUrl = 'https://api.themoviedb.org/3/search/'
      }else{
        apiUrl = store.apiUrl + type
      }
      axios.get(store.apiUrl, { params: store.apiParams })
        .then(res => {
          if (type === 'movie') {
            store.movie = res.data.results;
          } else {
            store.tv = res.data.results;
          }
        })
        .catch(err => {})
    },
    startSearch() {
      store.movie = [];
      store.tv = [];
      if (store.type === '') {
        this.getApi('movie')
        this.getApi('tv')
      } else {
        this.getApi(store.type)
      }
    }
  },
  mounted() {
    this.getApi('movie', true);
  }
}
</script>

<template>
  <div>
    <Appheader @search="startSearch()" />
    <Appmain v-if="store.movie.length > 0" title="Film" type="movie" />
    <Appmain v-if="store.tv.length > 0" title="Serie TV" type="tv" />
  </div>
</template>


<style>

</style>
