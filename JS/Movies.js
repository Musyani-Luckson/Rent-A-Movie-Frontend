
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
import { backend } from "../JS/backend.js";
const apiKey = `v1/get_each_movie_earnings`
const url = `${backend()}${apiKey}`;
// 
const headers = [
    `No.`,
    `ID`,
    `Movie Name`,
    `Transacted`,
    `Price (K)`,
    `Total (K)`,
    `Tax (k)`,
    `Total Price `
]
// 
renderTablex()
export function renderTablex() {
    // const url = `../CustomData/MovieData.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `MovieList`);
    })
}