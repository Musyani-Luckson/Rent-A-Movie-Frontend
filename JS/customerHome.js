
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
import { backend } from "../JS/backend.js";
import { mainBox } from "../JS/movieCard.js";

mainBox()

const headers = [
    `No.`,
    `ID`,
    `Date`,
    `Movie`,
    `Type`,
    `Price (K)`,
    `Tax (K)`,
    `Total (K)`
]
// 
renderData()
export function renderData() {
    // const apiKey = `v1/get_customer_list_data`
    // const url = `${backend()}${apiKey}`;
    const url = `../CustomData/customerTransactions.json`;

    const configs = {
        method: `GET`
    }

    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `transactionListForCustomer`);
    })
}