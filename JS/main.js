import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
// 
const headers = [
    `No.`,
    `ID`,
    `Customer`,
    `Movies`,
    `Price (K)`,
    `Tax (K)`,
    `Total (K)`,
    `Date`
]
// 
renderCustomerList()
export function renderCustomerList() {
    const backend = `https://rent-a-movie-api.onrender.com`
    // const url = `${backend}/v1/get_recent_transactions`;
    const url = `../CustomData/Recent.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `recentTransactions`);
    })
}