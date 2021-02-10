// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// Titolo
// Titolo Originale
// Lingua
// Voto


var app = new Vue({
  el: '#app',
  data: {

    movies: [],
    tvSeries: [],
    selected: '',
    flags: []

  },

  methods: {

    getMovies: function() {
      const self = this;

      axios
      .get('https://api.themoviedb.org/3/search/movie?api_key=1a20e46ffbcbc0628119863e1c4600e8&query=' + self.selected)
      .then(function(resp) {
        const movie = resp.data.results;
        console.log(movie);
        self.movies = movie;

        self.movies.forEach(function(item) {
          if(!self.flags.includes(item.original_language)) {
            self.flags.push(item.original_language)
          }
        })

      });
    },
    getTvSeries: function() {
      const self = this;

      axios
      .get('https://api.themoviedb.org/3/search/tv?api_key=1a20e46ffbcbc0628119863e1c4600e8&query=' + self.selected)
      .then(function(resp) {
        const tvSerie = resp.data.results;
        console.log(tvSerie);
        self.tvSeries = tvSerie;

        self.tvSeries.forEach(function(item) {
          if(!self.flags.includes(item.original_language)) {
            self.flags.push(item.original_language)
          }
        })

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

  }

});

Vue.config.devtools = true;
