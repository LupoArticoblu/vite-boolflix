<script>
import { store } from '../data/store.js';
export default {
  name: 'Appcards',
  // nei data inserisco la lingua originale e ci assegno l'immagine corrispondente a quella lingua, che si trova in public
  data(){
    return{
      store,
      flags:{
        en: 'gb',
        it: 'it',
        fr: 'fr',
        es: 'es',
        ja: 'jp',
      }
    }
  },
  props: {
    card: Object
  },
  computed:{
    rating(){
      return Math.ceil(this.card.vote_average/ 2)
    },
    formatDate(){
      const date = this.card.release_date || this.card.first_air_date;
      return date ? date.split('-').reverse().join('/') : 'Data non disponibile';
    }
  }  
}
</script>

<template>
  <div class="sc-card">
    <div class="inner">

      <div class="front">
          <img class="poster"
           v-if="card.poster_path" :src="`https://image.tmdb.org/t/p/w342/${card.poster_path}`" :alt="card.title || card.name">
          
          <img class="placeholder" v-else src="https://i0.wp.com/sunrisedaycamp.org/wp-content/uploads/2020/10/placeholder.png" :alt="card.title || card.name"> 
      </div>

      <div class="back">
        <h3>{{card.title || card.name}}</h3>
        <h5>{{card.original_title || card.original_name}}</h5>
        <div class="flag">
          <img v-if="flags[card.original_language]" :src="flags[card.original_language] + '.svg' " >
          <p v-else> Lingua: {{card.original_language}}</p>
          <p> {{formatDate}}</p>
        </div>
        <div>
          <i
          v-for="(n, index) in 5"
          :key="index"
          class="fa-star"
          :class="(index < rating) ? 'fa-solid' : 'fa-regular'"></i>
        </div>
        <p class="overview">{{card.overview}}</p>
      </div>
    </div>
    
  </div>

</template>

<style lang="scss" scoped>
.sc-card{
  width: 300px;
  height: 450px;
  padding: 10px;
  .inner{
    position: relative;
    background-color: black;
    height: 100%;
    overflow: hidden;
    &:hover{
      img.poster,
      img.placeholder{
        transform: scale(1.1);
        opacity: .3;
      }
      .back{
        top: 0;
      }
    }
    .front{
      h3{
        padding: 15px;
        text-align: center;
      }
      img.poster{
        width: 100%;
        height: 100%;
        transition: all .5s;
        object-fit: cover;
      }
      img.placeholder{
        width: 100%;
        transition: all .5s;
      }
    }
    .back{
      position: absolute;
      display: flex;
      flex-direction: column;
      top: 100%;
      left: 0;
      padding: 10px;
      height: 100%;
      transition: all .5s;
      img{
          width: 30px;
          height: 20px;
        }
      .overview{
        overflow: auto;
      }
    }
    .fa-star{
      padding: 10px 0;
    }
  }
}
</style>