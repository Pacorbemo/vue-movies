import { Movie } from "../interfaces/MovieInterface"

export async function getMovie(href : string): Promise<Movie> {

    return await fetch(`http://localhost:3000/${href}`)
    .then(res => res.json())
    .then(data => data as Movie);
        
}
