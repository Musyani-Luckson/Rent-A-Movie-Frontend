
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { backend } from "../JS/backend.js";
const apiKey = `v1/old_admin_signin`
const url = `${backend()}${apiKey}`;
// 
const form = utilities.getDom(`#signinForm`)
const email = utilities.getDom(`#signinEmailMsg`);
const password = utilities.getDom(`#signinPasswordMsg`);

const msgBoxes = {
    email,
    password,
}

function clearMsgBoxes(msgBoxes) {
    for (let key in msgBoxes) {
        if (msgBoxes.hasOwnProperty(key) && msgBoxes[key]) {
            utilities.setInnerText(msgBoxes[key], "")
        }
    }
}

utilities.handleEvent(form, `submit`, event => {
    event.preventDefault();
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    const configs = {
        method: `POST`,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // 
    utilities.fetchData(url, configs, response => {
        clearMsgBoxes(msgBoxes)
        if (response.error) {
            const msg = response.error.message;
            const target = response.error.target;
            utilities.setInnerText(msgBoxes[target], msg)
        } else {
            localStorage.clear(`admin`)
            localStorage.setItem(`admin`, response.email)
            redirectTo('../index.html', 0, false);
        }
    })
})
// 
function redirectTo(url, delay = 0, replace = false) {

    if (delay > 0) {
        setTimeout(function () {
            if (replace) {
                window.location.replace(url);
            } else {
                window.location.href = url;
            }
        }, delay);
    } else {
        if (replace) {
            window.location.replace(url);
        } else {
            window.location.href = url;
        }
    }
}
