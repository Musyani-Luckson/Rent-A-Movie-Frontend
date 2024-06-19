
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
import { backend } from "../JS/backend.js";
const apiKey = `v1/get_transaction_list_data`
const url = `${backend()}${apiKey}`;
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
    // const url = `../CustomData/transactions.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `transactionList`);
    })
}