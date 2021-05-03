var app = new Vue({
  el: '#app',
  data: {
    api_key: '1a20e46ffbcbc0628119863e1c4600e8',

    movies: [],
    tvSeries: [],
    trendingMovies: [],
    trendingTv: [],
    genres: [],
    selected: '',
    flags: [],
    //images
    posterUrl: 'https://image.tmdb.org/t/p/w342',
    // dynamic classes
    toggledSearch: false,
    toggledMenu: false,
    toggledTrending: false,
    toggledNoContent: true
  },


  methods: {

    getMovies() {

      axios.get('https://api.themoviedb.org/3/search/movie', {
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
            axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?`, {
                params: {
                  api_key: this.api_key
                }
              })
              .then(resp => {
                resp.data.cast.slice(0, 5).forEach(item => {
                  cast.push(item.name);
                });
                item.cast = cast.toString();
                this.movies.push(item); // pushing cast key into movies array
              })
          });

        })
        
    },

    getTvSeries () {

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
              .then(resp => {
                resp.data.cast.slice(0, 5).forEach(item => {
                  cast.push(item.name);
                });
                item.cast = cast.toString();
                this.tvSeries.push(item); // pushing cast key into tvSeries array
              })

          });

        });
    },

    getTrendingMovies() {
      axios
        .get('https://api.themoviedb.org/3/trending/movie/week?', {
        params: {
          api_key: this.api_key
        }
      })
        .then(resp => {
          this.trendingMovies = resp.data.results;

          
          // pushes languages into the flags array, without duplicating them
          this.trendingMovies.forEach(item => {

            this.flags = [];

            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }

          });
        

          // gets the firsts 5 cast names
          this.trendingMovies.forEach(item => {

            this.trendingMovies = []; // emptying array, otherwise it would duplicate trendingMovies

            let cast = [];
            axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?`, {
                params: {
                  api_key: this.api_key
                }
              })
              .then(resp => {
                resp.data.cast.slice(0, 5).forEach(item => {
                  cast.push(item.name);
                });
                item.cast = cast.toString();
                this.trendingMovies.push(item); // pushing cast key into trendingMovies array
              })
          });

        })

      
    },

    getTrendingTv() {
      axios
        .get('https://api.themoviedb.org/3/trending/tv/week?', {
        params: {
          api_key: this.api_key
        }
      })
        .then(resp => {
          this.trendingTv = resp.data.results;

          
          // pushes languages into the flags array, without duplicating them
          this.trendingTv.forEach(item => {

            this.flags = [];

            if (!this.flags.includes(item.original_language)) {
              this.flags.push(item.original_language)
            }
          });
        

          // gets the firsts 5 cast names
          this.trendingTv.forEach(item => {

            this.trendingTv = []; // emptying array, otherwise it would duplicate trendingMovies

            let cast = [];
            axios.get(`https://api.themoviedb.org/3/movie/${item.id}/credits?`, {
                params: {
                  api_key: this.api_key
                }
              })
              .then(resp => {
                resp.data.cast.slice(0, 5).forEach(item => {
                  cast.push(item.name);
                });
                item.cast = cast.toString();
                this.trendingTv.push(item); // pushing cast key into trendingMovies array
              })
          });

        })

      
    },

    getGenres() {
      axios
        .get('https://api.themoviedb.org/3/genre/movie/list?', {
        params: {
          api_key: this.api_key
        }
      })
        .then(resp => {
          this.genres = resp.data.genres;
        })
    },

    voteAverage (item) {
      return Math.round(item / 2);
    },

    search() {
      if (this.selected !== '' || this.selected === ' ') {
        this.getMovies();
        this.getTvSeries();
      } else {
        this.movies = [];
        this.tvSeries = [];
        this.flags = [];
      }
    },

    // toggling classes

    toggleSearch () {
      this.toggledSearch = !this.toggledSearch;
      this.movies = [];
      this.tvSeries = [];
    },

    toggleMenu () {
      this.toggledMenu = !this.toggledMenu;
    },

    toggleTrending() {
      this.toggledTrending = !this.toggledTrending;
      this.toggledNoContent = !this.toggledNoContent;
    },

  },
  
  mounted() {
    this.getGenres();
    this.getTrendingMovies();
    this.getTrendingTv();
    

  }

});



Vue.config.devtools = true;