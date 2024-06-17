
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
// 
const headers = [
    `No.`,
    `Date`,
    `Name`,
    `Movie`,
    `Price (K)`,
    `Tax (K)`,
    `Total (K)`
]
// 
renderCustomerList()
export function renderCustomerList() {
    const backend = `https://rent-a-movie-api.onrender.com`
    const url = `${backend}/v1/get_transaction_list_data`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `transactionList`);
    })
}