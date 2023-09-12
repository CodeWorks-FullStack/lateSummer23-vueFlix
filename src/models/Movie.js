


export class Movie{
  constructor(data){
    this.id = data.id
    this.title = data.title
    this.overview = data.overview
    this.popularity = data.vote_average
    this.releaseDate = data.release_date
    this.poster = 'https://image.tmdb.org/t/p/original'+ data.poster_path // This is a tricky one
    this.backdrop = 'https://image.tmdb.org/t/p/original'+ data.backdrop_path // also tricky
    this.budget = data.budget || data.revenue
    this.runtime = data.runtime
    this.tagline = data.tagline
    this.homepage = data.homepage
    // REVIEW the Elvis operator, keeps your code from reaching into undefined objects notation
    this.genres = data.genres?.map(g => g.name)
  }
}
