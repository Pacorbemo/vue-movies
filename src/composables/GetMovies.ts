import { Movie } from "../interfaces/MovieInterface"
import axios from "axios";

export async function getMovies(): Promise<Movie[]> {
    return await fetch("http://localhost:3000")
        .then(res => res.json())
        .then(data => data as Movie[]);
}

export async function getMoviesByPag(page: number) : Promise<Movie[] >{
    return await getMoviesBySearchPage("", page);
}

export async function getMoviesBySearch(search:string) : Promise<Movie[] >{
    return await getMoviesBySearchPage(search, 1)
}

export async function getMoviesBySearchPage(search:string, page:number): Promise<Movie[] > {
    const response = await axios.post("http://localhost:3000", {search, page}, { headers: { 'Content-Type': 'application/json' } })
    return response.data as Movie[];
}