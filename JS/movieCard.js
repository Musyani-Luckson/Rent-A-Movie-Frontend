import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
let rentCounter = 0;
let moviesPendding = {};
const cart = utilities.getDom(`#cart`)
export function mainBox() {
    const innerMainBox = utilities.setDom(`div`, {
        class: `p-1 innerMainBox`
    })
    const url = `../CustomData/customerMovies.json`;
    const configs = {
        method: `GET`
    }
    utilities.fetchData(url, configs, response => {
        response = response.results
        response.map(movie => {
            innerMainBox.appendChild(eachCard(movie));
        })
    })
    const mainBox = utilities.setDom(`div`, {
        class: ``,
        data: {
            append: [
                innerMainBox
            ]
        }
    })
    utilities.getDom(`#moviesListForCustomer`).appendChild(mainBox)
}

function eachCard(movie) {
    const {
        ID,
        Title,
        Type,
        Price,
        Tax,
        Total,
        Actors
    } = movie
    const img = utilities.setDom(`img`, {
        class: `card-img-top`,
        src: `https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp`
    })
    // 
    const title = utilities.setDom(`div`, {
        class: `card-title text-dark`,
        data: {
            text: Title
        }
    })
    const type = utilities.setDom(`div`, {
        class: ``,
        data: {
            text: `Type: ${Type}`
        }
    })
    const actors = utilities.setDom(`div`, {
        class: ``,
        data: {
            text: `Actors: ${Actors}`
        }
    })
    const price = utilities.setDom(`div`, {
        class: ``,
        data: {
            text: `Total: K${Total}`
        }
    })
    const details = utilities.setDom(`div`, {
        class: `card-text`,
        data: {
            append: [
                type,
                actors,
                price
            ]
        }
    })
    const rent = utilities.setDom(`button`, {
        class: `btn btn-primary btn-sm`,
        data: {
            text: `Cart`
        },
        value: ID
    })
    const body = utilities.setDom(`div`, {
        class: `card-body`,
        data: {
            append: [
                title,
                details,
                rent
            ]
        }
    })

    const eachMovie = utilities.setDom(`div`, {
        class: `card m-1`,
        data: {
            append: [
                img,
                body,
            ]
        }
    })

    utilities.handleEvent(rent, `click`, event => {
        moviesPendding[rent.value] = rent.value;
        utilities.setInnerText(cart, Object.values(moviesPendding).length)
    })
    return eachMovie;
}

utilities.handleEvent(cart, `click`, event => {
    // get email from the local storage
    alert(Object.values(moviesPendding))
})