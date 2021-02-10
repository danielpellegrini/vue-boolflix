
var app = new Vue({
  el: '#app',
  data: {

    movies: [],
    tvSeries: [],
    selected: '',
    flags: [],
    //images
    posterUrl: 'https://image.tmdb.org/t/p/w342'

  },

  methods: {

    getMovies: function() {

      axios
        .get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '1a20e46ffbcbc0628119863e1c4600e8',
            query: this.selected
          }
        })
        .then((resp) => {
          this.movies = resp.data.results;

          // pushes languages into the flags array, without duplicating them
          this.movies.forEach((item) => {
            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }
          });

        });
    },
    getTvSeries: function() {

      axios
        .get('https://api.themoviedb.org/3/search/tv', {
          params: {
            api_key: '1a20e46ffbcbc0628119863e1c4600e8',
            query: this.selected
          }
        })
        .then((resp) => {
          this.tvSeries = resp.data.results;

          // pushes languages into the flags array, without duplicating them
          this.tvSeries.forEach((item) => {
            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }
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
    }

  },
  mounted() {

  }

});

Vue.config.devtools = true;
