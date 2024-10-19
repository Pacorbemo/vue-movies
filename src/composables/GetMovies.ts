import { Movie } from "../interfaces/MovieInterface"
import axios from "axios";

export async function getMovies(): Promise<Movie[]> {
    return await fetch("http://localhost:3000")
        .then(res => res.json())
        .then(data => data as Movie[]);
}

export async function getMoviesByPag(pag: number) : Promise<Movie[] >{
    const response = await axios.post("http://localhost:3000", {pagina : pag}, { headers: { 'Content-Type': 'application/json' } })
    return response.data as Movie[];
}

