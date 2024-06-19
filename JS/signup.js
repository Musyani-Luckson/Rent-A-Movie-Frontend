
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
import { backend } from "../JS/backend.js";

// 
const form = utilities.getDom(`#signupForm`)

const fName = utilities.getDom(`#signupFirstNameMsg`);
const lName = utilities.getDom(`#signupLastNameMsg`);
const email = utilities.getDom(`#signupEmailMsg`);
const password = utilities.getDom(`#signupPasswordMsg`);
const comfirm = utilities.getDom(`#signupComfirmMsg`);

const msgBoxes = {
    firstname: fName,
    lastname: lName,
    email,
    password,
    comfirm
}

function clearMsgBoxes(msgBoxes) {
    for (let key in msgBoxes) {
        if (msgBoxes.hasOwnProperty(key) && msgBoxes[key]) {
            utilities.setInnerText(msgBoxes[key], "")
        }
    }
}



utilities.handleEvent(form, `submit`, event => {
    // Prevent the default form submission
    event.preventDefault();
    // Get form data
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    // Log form data to the console (or handle it as needed)
    const configs = {
        method: `POST`,
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const apiKey = `v1/new_admin_signup`
    const url = `${backend()}${apiKey}`;

    utilities.fetchData(url, configs, response => {
        clearMsgBoxes(msgBoxes)
        if (response.error) {
            const msg = response.error.message;
            const target = response.error.target;
            utilities.setInnerText(msgBoxes[target], msg)
        } else {
            redirectTo('../index.html', 1500, true);
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
