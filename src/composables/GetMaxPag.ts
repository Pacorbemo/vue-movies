import axios from "axios";

export async function getMaxPag() : Promise<number> {
    const response = await axios.post("http://localhost:3000", {maxPages: true}, { headers: { 'Content-Type': 'application/json' } })
    return response.data.maxPages
}