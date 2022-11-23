import {reactive} from 'vue';

export const store = reactive({
  apiParams:{
    Api_key: 'f2762044b2f9954e6eb69ef3c1675cc9',
    query: '',
    language: 'it-IT',
  },
  apiUrl:'https://api.themoviedb.org/3/search/',
  tv: [],
  movie: []
});