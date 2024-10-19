import { Movie } from "../interfaces/MovieInterface"

export async function getMovies(): Promise<Movie[]> {
    return await fetch("http://localhost:3000")
        .then(res => res.json())
        .then(data => data as Movie[]);
}