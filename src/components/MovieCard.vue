<template>
  <!-- NOTE the template unwraps the props object, so you wont see 'props' here -->
  <div @click="getMovieDetails()" data-bs-toggle="modal" data-bs-target="#movie-modal" class="card elevation-1">
    <!-- NOTE binding data INSIDE tags uses : -->
    <img class="img-fluid" :src="movie.poster" alt="">
    <!-- NOTE binding data IN-BETWEEN tags, uses {{  }} -->
    <p class="p-1 mb-1">
      {{ movie.title }}
    </p>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import { Movie } from '../models/Movie.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { moviesService } from '../services/MoviesService.js';

export default{
  props: {movie: {type: Movie, required: true}}, // This sets up the component to TAKE in data from a parent component
  // NOTE to access the props inside setup, setup must TAKE in props as an argument
  setup(props){
    return{
      // NOTE Cannot import a single item FROM AND ARRAY need to use props
      // movie: computed(()=> AppState.movies[0])
      async getMovieDetails(){
        try {
          // NOTE accessing props in the code, you must reach through the props object
          logger.log(props.movie.id)
          const movieId = props.movie.id
          await moviesService.getMovieById(movieId)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>

</style>
