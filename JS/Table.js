import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
// 
export function table(customers, headers) {
    const table = utilities.setDom(`table`, {
        class: `table ms-1`
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
        return utilities.setDom(`div`, {
            class: ``,
            data: {
                text: `Empty`
            }
        });
    }
    // 
    table.appendChild(tableHead(headers));
    table.appendChild(tbody);
    return table;
}
// 
function eachCustomer(customer, position) {
    const values = [position, ...Object.values(customer)]
    return tableRow(values);
}
// 
function tableRow(data) {
    const table_row = utilities.setDom(`tr`)
    let counter = 0;
    let scope = ``;
    let tag = ``;
    data.map(value => {
        counter += 1;
        if (counter === 1) {
            scope = `row`
            tag = `th`
        } else {
            scope = ``
            tag = `td`
        }
        const th = utilities.setDom(tag, {
            scope,
            data: {
                text: value
            }
        });
        // 
        table_row.appendChild(th)
    })
    return table_row;
}
// 
function tableHead(heads) {
    const table_row = utilities.setDom(`tr`)
    heads.map(headName => {
        const th = utilities.setDom(`th`, {
            scope: `col`,
            data: {
                text: headName
            }
        });
        // 
        table_row.appendChild(th)
    })
    const table_head = utilities.setDom(`thead`)
    table_head.appendChild(table_row)
    return table_head;
}
// 
export function renderTable(customersList, receiver) {
    const parent = utilities.getDom(`#${receiver}`);
    parent.appendChild(customersList)
}