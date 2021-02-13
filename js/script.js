
var app = new Vue({
  el: '#app',
  data: {
    api_key: '1a20e46ffbcbc0628119863e1c4600e8',

    movies: [],
    tvSeries: [],
    selected: '',
    flags: [],
    //images
    posterUrl: 'https://image.tmdb.org/t/p/w342',
    // dynamic classes
    isActive: false,

  },


  methods: {

    getMovies: function() {

      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: this.api_key,
            query: this.selected
          }
        })
        .then(resp => {

          this.movies = resp.data.results;

          // pushes languages into the flags array, without duplicating them
          this.movies.forEach(item => {

            this.flags = [];

            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }
          });

          // gets the firsts 5 cast names
          this.movies.forEach(item => {

            this.movies = []; // emptying array, otherwise it would duplicate movies

            let cast = [];
            axios
              .get(`https://api.themoviedb.org/3/movie/${item.id}/credits?`, {
                 params: {
                    api_key: this.api_key
                 }
               })
               .then(resp =>{
                 resp.data.cast.slice(0, 5).forEach(item => {
                   cast.push(item.name);
                 });
                 item.cast = cast.toString();
                 this.movies.push(item);  // pushing cast key into movies array
               })

          });

        });

    },
    getTvSeries: function() {

      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: this.api_key,
            query: this.selected
          }
        })
        .then((resp) => {
          this.tvSeries = resp.data.results;

          // pushes languages into the flags array, without duplicating them
          this.tvSeries.forEach((item) => {

            this.flags = [];

            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }
          });

          // gets the firsts 5 cast names
          this.tvSeries.forEach(item => {

            this.tvSeries = []; // emptying array, otherwise it would duplicate tvSeries

            let cast = [];
            axios
              .get(`https://api.themoviedb.org/3/movie/${item.id}/credits?`, {
                 params: {
                    api_key: this.api_key
                 }
               })
               .then(resp =>{
                 resp.data.cast.slice(0, 5).forEach(item => {
                   cast.push(item.name);
                 });
                 item.cast = cast.toString();
                 this.tvSeries.push(item);  // pushing cast key into tvSeries array
               })

          });

        });
    },
    voteAverage: function(item) {
      return Math.round(item / 2);
    },
    search: function() {
      if (this.selected !== '') {
        this.getMovies();
        this.getTvSeries();
      }
    },
    clicked: function() {
      this.isActive = !this.isActive;
    },
  },
  mounted() {

  }

});

Vue.config.devtools = true;
