<template>

  <!-- Modal Body -->
  <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
  <div class="modal fade" id="movie-modal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalTitleId">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <!-- NOTE the whole section has a v-if meaning it will only render IF there is an active movie -->
            <section v-if="activeMovie" class="row">

              <div class="col-12 col-md-6">
                <img class="img-fluid sticky-top" :src="activeMovie.poster" alt="">
              </div>

              <div class="col-12 col-md-6">
                <h3>{{ activeMovie.title }}</h3>
                <p>
                  <i>{{ activeMovie.tagline }}</i>
                </p>
                <div>
                  <i class="mdi mdi-clock fw-bold" title="runtime">{{ activeMovie.runtime }}</i>
                </div>
                <div>
                  <i v-for="n in Math.round(activeMovie.popularity)" :key="'pop'+n" class="mdi mdi-star text-warning"></i>
                </div>
                <p>{{ activeMovie.overview }}</p>
                <div class="d-flex flex-wrap">
                  <span class="bg-primary text-light rounded-pill px-2 py-1 m-1" v-for="g in activeMovie.genres" :key="g">{{ g }}</span>
                </div>
                  <p class="fw-bold">budget or revenue: ${{ activeMovie.budget }}</p>
              </div>
            </section>
            <section v-if="videos.length" class="row">
              <div v-for="video in videos" :key="video.id" class="col-6">
                <iframe :src="`https://www.youtube.com/watch?v=${video.key}`" frameborder="0"></iframe>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

export default{
  setup(){
    return {
      activeMovie: computed(()=> AppState.activeMovie),
      videos: computed(()=> AppState.activeMovieVideos)
    }
  }
}
</script>


<style lang="scss" scoped>
.mdi-star::before{
  backdrop-filter: 0px 0px 2px rgba(0, 0, 0, 0.5);
}
</style>
