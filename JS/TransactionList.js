
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { backend } from "../JS/backend.js";
const apiKey = `v1/get_transaction_list_data`
const url = `${backend()}${apiKey}`;
import { table, renderTable } from "./Table.js";
import { redirectTo, showUser, logoutUser } from "./helpers.js";
logoutUser(`logout`, `admin`, `signin`)
//
const login_status = localStorage.getItem(`admin`)
if (login_status != null) {
    // logged in code
    showUser(`userID`)
} else {
    redirectTo('../Pages/signin.html', 0, false);
}
renderTransactionList()
function renderTransactionList() {
    // const url = `../CustomData/transactions.json`;
    const configs = {
        method: `GET`
    }
    const headers = [
        `No.`,
        `Date`,
        `Name`,
        `Movie`,
        `Price (K)`,
        `Tax (K)`,
        `Total (K)`
    ]
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `transactionList`);
    })
}
