
var app = new Vue({
  el: '#app',
  data: {

    movies: [],
    tvSeries: [],
    selected: '',
    flags: [],
    index: 0,
    //images
    posterUrl: 'https://image.tmdb.org/t/p/w342',
    // dynamic classes
    isActive: false,
    isHidden: true,
    isGrowing: false,

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
          this.movies.forEach((item) => {
            this.index = 0

              if (this.index !== item.id) {
                return this.index ++;
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
    },
    clicked: function() {
      this.isActive = !this.isActive;
      this.isHidden = !this.isHidden;
      this.isGrowing = !this.isGrowing;
    },



  },
  mounted() {

  }

});

Vue.config.devtools = true;
