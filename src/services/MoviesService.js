import { AppState } from "../AppState.js"
import { Movie } from "../models/Movie.js"
import { logger } from "../utils/Logger.js"
import { movieApi } from "./AxiosService.js"




class MoviesService {
async getMovies(){
const res = await movieApi.get('discover/movie')
logger.log('GOT movies 📼', res.data)
// REVIEW res.data.map is not a function. LOOK AT YOUR RES DATA. WHERE IS THE ARRAY?
AppState.movies = res.data.results.map(movie => new Movie(movie))
AppState.pageNumber = res.data.page
AppState.totalPages = res.data.total_pages
}

async getMovieById(movieId){
  const res = await movieApi.get(`movie/${movieId}`)
  const vids = await movieApi.get(`movie/${movieId}/videos`)
  logger.log('GOT MOVIE BY ID', res.data)
  AppState.activeMovie = new Movie(res.data)
  AppState.activeMovieVideos = vids.data.results
}

async searchMovies(searchTerm){
  const res = await movieApi.get(`search/movie?query=${searchTerm}`)
  logger.log('🔮', res.data)
  AppState.movies = res.data.results.map(movie => new Movie(movie))
  AppState.pageNumber = res.data.page
  AppState.totalPages = res.data.total_pages
  AppState.searchTerm = searchTerm
}

async clearSearch(){
  AppState.searchTerm = ''
  await moviesService.getMovies()

}

async changePage(url){
  logger.log('📄',url)
  const res = await movieApi.get(url)
  logger.log('GOT movies 📼', res.data)
  AppState.movies = res.data.results.map(movie => new Movie(movie))
  // AppState.pageNumber =number
  AppState.pageNumber =res.data.page
  AppState.totalPages = res.data.total_pages
}
}

export const moviesService = new MoviesService()
