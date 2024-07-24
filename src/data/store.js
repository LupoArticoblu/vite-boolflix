import {reactive} from 'vue';

export const store = reactive({
  apiParams:{
    api_key: 'f2762044b2f9954e6eb69ef3c1675cc9',
    query: '',
    language: 'it-IT',
    page: 1, // paginazione, pagina corrente
  },
  apiUrl:'https://api.themoviedb.org/3/search/',
  tv: [],
  movie: [],
  type: 'all',
  totPagesMovie: 1,
  totPagesTv: 1,
  lastQuery: '',
  isLoading: false
});