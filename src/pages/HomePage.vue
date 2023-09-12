<template>

  <div class="container my-2">
    <SearchBar/>
  </div>

      <!-- <button @click="getMovies()" class="btn btn-primary">Get Movies</button> -->
      <div class="container">
        <section v-if="!searchTerm" class="row justify-content-between mb-2">
          <button @click="changePage(pageNumber -1)" :disabled="pageNumber <= 1" class="col-6 col-md-3 btn btn-warning">previous <i class="mdi mdi-arrow-left"></i></button>
          <button @click="changePage(pageNumber +1)" :disabled="pageNumber >= totalPages" class="col-6 col-md-3 btn btn-warning">next <i class="mdi mdi-arrow-right"></i></button>
        </section>
        <section v-else class="row justify-content-between mb-2">
          <button @click="changePageWithSearch(pageNumber -1)" :disabled="pageNumber <= 1" class="col-6 col-md-3 btn btn-success">previous <i class="mdi mdi-arrow-left"></i></button>
          <button @click="changePageWithSearch(pageNumber +1)" :disabled="pageNumber >= totalPages" class="col-6 col-md-3 btn btn-success">next <i class="mdi mdi-arrow-right"></i></button>
        </section>



        <section class="row g-1">

          <div v-for="m in movies" :key="m.id" class="col-md-4">
            <!-- NOTE since the homepage is using movie card, it is responsible to pass the prop data -->
            <MovieCard :movie="m"/>
          </div>

        </section>
        <!-- <section class="row g-1">

          <div v-for="movie in movies" :key="movie.id" class="col-md-4">
            <div class="card elevation-1">
              NOTE binding data INSIDE tags uses :
              <img class="img-fluid" :src="movie.poster" alt="">
              NOTE binding data IN-BETWEEN tags, uses {{  }}
              <p class="p-1 mb-1">
                {{ movie.title }}
              </p>
            </div>
          </div>

        </section> -->
      </div>
</template>

<script>
import { computed, onMounted, onUnmounted, onUpdated } from 'vue';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
import {AppState} from '../AppState.js'

export default {
  setup() {
    // NOTE VUE lifeCycle Hooks
    onMounted(getMovies) // when component is 'mounted' to the DOM (added)
    onUpdated(()=> logger.log('updated homepage')) // when component data is updated
    onUnmounted(()=> logger.log('unmounted homepage')) // when component is 'unmounted' from the DOM (removed)

    // NOTE members outside of the return is accessible by the code in setup
    async function getMovies(){
      try {
        logger.log('🎞️ get movies')
        await moviesService.getMovies()
      } catch (error) {
        Pop.error(error)
      }
    }


    // NOTE members inside the return are accessible by the template
    return {
      getMovies,
      async changePage(number){
        try {
          await moviesService.changePage(`discover/movie?page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },
      async changePageWithSearch(number){
        try {
          const searchTerm = AppState.searchTerm
          await moviesService.changePage(`search/movie?query=${searchTerm}&page=${number}`)
        } catch (error) {
          Pop.error(error)
        }
      },
      movies : computed(()=> AppState.movies),
      pageNumber: computed(()=> AppState.pageNumber),
      totalPages: computed(()=> AppState.totalPages),
      searchTerm: computed(()=> AppState.searchTerm)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
