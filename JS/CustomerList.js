
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
// 
renderCustomerList()
export function renderCustomerList() {
    const url = `../CustomData/customers.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        const data = customers(response);
        displayCustomers(data);
    })
}
// 
function customers(customers) {
    const table = utilities.setDom(`table`, {
        class: `table ms-1`
    });
    const thead = utilities.setDom(`thead`, {
        class: ``
    });
    const tbody = utilities.setDom(`tbody`, {
        class: ``
    });
    // 
    let counter = 0
    if (customers.length > 0) {
        customers.forEach(customer => {
            counter++
            tbody.appendChild(eachCustomer(customer, counter))
        });
    } else {
        // 
    }
    // 
    table.appendChild(tableHead());
    table.appendChild(tbody);
    return table;
}
// 
function eachCustomer(customer, position) {
    const { Customer_ID, Phone_Number, Customer_Name, Street_Address, City, State, Zip_Code } = customer;


    const th = utilities.setDom(`th`, {
        scope: `row`,
        data: {
            text: `${position}`
        }
    });
    // 
    const td1 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Customer_ID}`
        }
    });
    const td2 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Phone_Number}`
        }
    });
    const td3 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Customer_Name}`
        }
    });
    const td4 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Street_Address}`
        }
    });
    const td5 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${City}`
        }
    });
    const td6 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${State}`
        }
    });
    const td7 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Zip_Code}`
        }
    });
    // 
    return utilities.setDom(`tr`, {
        class: ``,
        data: {
            append: [
                th,
                td1,
                td2,
                td3,
                td4,
                td5,
                td6,
                td7
            ]
        }
    });

}
// 
function tableHead() {
    const Position = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `No.`
        }
    });
    const ID = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `ID`
        }
    });
    const Phone = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Phone`
        }
    });
    const Name = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Name`
        }
    });
    const Street = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Street`
        }
    });
    const City = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `City`
        }
    });
    const State = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `State`
        }
    });
    const ZipCode = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Zip Code`
        }
    });
    // 
    return utilities.setDom(`thead`, {
        class: ``,
        data: {
            append: [
                utilities.setDom(`tr`, {
                    class: ``,
                    data: {
                        append: [
                            Position,
                            ID,
                            Phone,
                            Name,
                            Street,
                            City,
                            State,
                            ZipCode
                        ]
                    }
                })
            ]
        }
    });
    return
}
// 
function displayCustomers(customersList) {
    const parent = utilities.getDom(`#customersList`);
    utilities.print(parent)
    parent.appendChild(customersList)
}