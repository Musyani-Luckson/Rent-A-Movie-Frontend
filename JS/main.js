import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { backend } from "../JS/backend.js";
import { table, renderTable } from "./Table.js";
import { redirectTo, showUser, logoutUser } from "./helpers.js";
//
const login_status = localStorage.getItem(`admin`)
if (login_status != null) {
    // logged in code
    renderCustomerList()
    totals()
    RentSummary()
    MovieDetails()
    // 
    showUser(`userID`)
    logoutUser(`logout`, `admin`, `signin`)
} else {
    redirectTo('../Pages/signin.html', 0, false);
}
// 
function totals() {
    // const url = `../CustomData/Totals.json`;
    const apiKey = `v1/get_totals`
    const url = `${backend()}${apiKey}`;
    const configs = {
        method: `GET`
    }
    //
    utilities.fetchData(url, configs, response => {
        // response = Object.values(response[0])
        const totals = utilities.getDom(`.totals`);
        let counter = 0;
        response.map(value => {
            if (counter === 0) {
                utilities.setInnerText(totals[counter], `K ${value}`)
            } else {
                utilities.setInnerText(totals[counter], value)
            }
            counter += 1;
        })
    })
}
//
function renderCustomerList() {
    // const url = `../CustomData/Recent.json`;
    const apiKey = `v1/get_recent_transactions`
    const url = `${backend()}${apiKey}`;
    const configs = {
        method: `GET`
    }
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
    utilities.fetchData(url, configs, response => {
        const data = table(response, headers);
        renderTable(data, `recentTransactions`);
    })
}
//


function RentSummary() {
    // const url = `../CustomData/RentalSummary.json`;
    const apiKey = `v1/get_rental_status_summary`
    const url = `${backend()}${apiKey}`;
    const configs = {
        method: `GET`
    }
    //
    utilities.fetchData(url, configs, response => {
        response = Object.values(response[0])
        const valuesMovies = response.slice(0, 2)
        const subjectsMovies = ["Rented", "Not Rented"];
        const barColorsMovies = [
            "#b91d47",
            "#00aba9"
        ];
        const customerValues = response.slice(2, 4)
        const subjectsCustomer = ["Renting", "Not Renting"];
        const barColorsCustomers = [
            "#b91d47",
            "#00aba9"
        ];

        new Chart("movieChart", {
            type: "doughnut",
            data: {
                labels: subjectsMovies,
                datasets: [{
                    backgroundColor: barColorsCustomers,
                    data: valuesMovies
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Movies"
                }
            }
        });
        //
        new Chart("customerChart", {
            type: "doughnut",
            data: {
                labels: subjectsCustomer,
                datasets: [{
                    backgroundColor: barColorsCustomers,
                    data: customerValues
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Customers"
                }
            }
        });
    })
}

//
function MovieDetails() {
    const url = `../CustomData/MovieData.json`;
    const apiKey = `v1/get_each_movie_earnings`
    // const url = `${backend()}${apiKey}`;
    const configs = {
        method: `GET`
    }
    //
    utilities.fetchData(url, configs, response => {
        response = getMovieDetails(response)
        const groupedDetails = groupMovieDetails(response);

        const valuesMovies = groupedDetails.totalPriceWithTax;
        const subjectsMovies = groupedDetails.names;

        const barColorsMovies = [
            "#b91d47",
            "#00aba9"
        ];
    })
}
// 
function getMovieDetails(movies) {
    return movies.map(movie => ({
        name: movie.Movie_Title,
        totalPriceWithTax: movie.Total_Price_With_Tax,
        totalPriceWithoutTax: movie.Total_Price_Without_Tax,
        totalTaxAmount: movie.Total_Tax_Amount,
        totalTransactions: movie.Total_Transactions
    }));
}
// 
function groupMovieDetails(movieDetails) {
    return movieDetails.reduce((acc, movie) => {
        acc.names.push(movie.name);
        acc.totalPriceWithTax.push(movie.totalPriceWithTax);
        acc.totalPriceWithoutTax.push(movie.totalPriceWithoutTax);
        acc.totalTaxAmount.push(movie.totalTaxAmount);
        acc.totalTransactions.push(movie.totalTransactions);
        return acc;
    }, {
        names: [],
        totalPriceWithTax: [],
        totalPriceWithoutTax: [],
        totalTaxAmount: [],
        totalTransactions: []
    });
}
