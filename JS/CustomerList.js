
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { table, renderTable } from "./Table.js";
import { backend } from "../JS/backend.js";
const apiKey = `v1/get_customer_list_data`
const url = `${backend()}${apiKey}`;
import { redirectTo, showUser } from "./helpers.js";
//
const login_status = localStorage.getItem(`admin`)
if (login_status != null) {
    // logged in code
    showUser(`userID`)
} else {
    redirectTo('../Pages/signin.html', 0, false);
}
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
    // const url = `../CustomData/customers.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `customersList`);
    })
}
//
handleCustomerSearch()
function handleCustomerSearch() {
    const searchType = utilities.getDom(`#searchType`);
    const searchValue = utilities.getDom(`#searchValue`);
    const searchBtn = utilities.getDom(`#searchBtn`);
    const searchValueLabel = utilities.getDom(`#searchValueLabel`);

    const data = {
        Phone_Number: [`number`, `Phone number`, 13],
        First_Name: [`text`, `Firstname`, 20],
        Last_Name: [`text`, `Fastname`, 20],
    }

    utilities.handleEvent(searchType, `input`, event => {
        utilities.setInnerText(searchValueLabel, `Type the ${data[searchType.value][1]} here...`);
        searchValue.type = data[searchType.value][0];
    })

    utilities.handleEvent(searchBtn, `click`, event => {
        const value = searchValue.value;
        const key = searchType.value;
        const data = {
            Phone_Number: { Phone_Number: value },
            First_Name: { First_Name: value },
            Last_Name: { First_Name: value },
        }
        // make a post request here
        // alert(data[key])
        alert(`Request made... but no feed back yet.`)
    })
}