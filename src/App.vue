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
      console.log(store.apiUrl, store.apiParams);
      let apiUrl;
      if (isPopular) {
        apiUrl = `https://api.themoviedb.org/3/${type}/popular`;
      } else {
        apiUrl = store.apiUrl + type;
      }
      axios.get(apiUrl, { 
        params : store.apiParams  
      })
        .then(res => {
          console.log(res.data.results);
          store[type] = res.data.results
        })
        .catch(err => {
          console.log('error!', err);
        })
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
    this.getApi('tv', true);
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


<style lang="scss">
  @use './style/general.scss' as *;
  @use './style/vars.scss' as *;
</style>
