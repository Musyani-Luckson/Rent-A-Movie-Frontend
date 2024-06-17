import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
// 
const headers = [
    `No.`,
    `ID`,
    `Phone`,
    `Name`,
    `Street`,
    `City`,
    `State`,
    `Zip Code`
]
// 
renderCustomerList()
export function renderCustomerList() {
    const url = `../CustomData/customers.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `recentTransactions`);
    })
}