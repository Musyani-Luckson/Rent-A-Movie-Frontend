
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
// 
renderTransactions()
export function renderTransactions() {
    const url = `../CustomData/transactions.json`;
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
function eachCustomer(transaction, position) {
    const { Transaction_Date, Customer_Name, Movie_Title, Movie_Price, Entertainment_Tax, Total_Movie_Price } = transaction;


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
            text: `${formatDate(Transaction_Date)}`
        }
    });
    const td2 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Customer_Name}`
        }
    });
    const td3 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Movie_Title}`
        }
    });
    const td4 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Movie_Price}`
        }
    });
    const td5 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Entertainment_Tax}`
        }
    });
    const td6 = utilities.setDom(`td`, {
        class: ``,
        data: {
            text: `${Total_Movie_Price}`
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
    const Date = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Date`
        }
    });
    const Name = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Name`
        }
    });
    const Title = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Movie`
        }
    });
    const Price = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Price (K)`
        }
    });
    const Tax = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Tax (K)`
        }
    });
    const Total = utilities.setDom(`th`, {
        scope: `col`,
        data: {
            text: `Total (K)`
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
                            Date,
                            Name,
                            Title,
                            Price,
                            Tax,
                            Total
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
    const parent = utilities.getDom(`#transactionList`);
    utilities.print(parent)
    parent.appendChild(customersList)
}

function formatDate(inputDate) {
    // Parse the input date string
    const date = new Date(inputDate);

    // Extract the date components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    // Extract the time components
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format the date and time as YYYY-MM-DD HH:MM:SS
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
