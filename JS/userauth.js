// Import modules
import { Utilities } from "../modules/utilities.js"
const utilities = new Utilities();

handleAddBtn()
// 
const passwordInput = utilities.getDom(`#password`);
const hideShow = utilities.getDom(`#showPassword`);
// 
utilities.hideShowPassword(passwordInput, hideShow);
//
function handleAddBtn() {
    const form = utilities.getDom(`#form`);
    utilities.handleEvent(form, `submit`, async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const fullname = formData.get(`fullname`);
        const username = formData.get(`username`);
        const password = formData.get(`password`);
        //
        let user;
        let url;
        //
        if (fullname !== null) {
            url = `/signup`;
            user = {
                fullname,
                username,
                password
            }
            createReq(url, user, res => {
                const fullnameErr = utilities.getDom(`#fullnameErr`);
                const usernameErr = utilities.getDom(`#usernameErr`);
                const passwordErr = utilities.getDom(`#passwordErr`);
                utilities.setInnerText(fullnameErr, emptyString(res.fullname));
                utilities.setInnerText(usernameErr, emptyString(res.username));
                utilities.setInnerText(passwordErr, emptyString(res.password));
                if (res.user) {
                    // location.assign(`/quiz`);
                    location.href = `/login`
                }
            })
        }
        else {
            url = `/login`;
            user = {
                username,
                password
            }
            // 
            createReq(url, user, res => {
                const usernameErr = utilities.getDom(`#usernameErr`);
                const passwordErr = utilities.getDom(`#passwordErr`);
                utilities.setInnerText(usernameErr, emptyString(res.username));
                utilities.setInnerText(passwordErr, emptyString(res.password));
                if (res.user) {
                    location.href = `/quiz`
                }
            })
        }
    })
};
// 
function emptyString(value) {
    if (value == undefined) {
        return ``
    } else {
        return value
    }
}
// 
function fetchData(apiUrl, configs) {
    return fetch(apiUrl, configs)
        .then(response => {
            return response.json();
        })
        .catch(error => {
            return error;
        })
}
// POST
function createReq(apiUrl, body = {}, callback) {
    const configs = {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`
        },
        body: JSON.stringify(body)
    }
    fetchData(apiUrl, configs).then(data => {
        return callback(data)
    })
}

