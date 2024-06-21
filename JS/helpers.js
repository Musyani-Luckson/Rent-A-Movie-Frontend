
import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();
export function redirectTo(url, delay = 0, replace = false) {
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

export function showUser(target, key = `admin`) {
    const user = localStorage.getItem(key);
    const ele = utilities.getDom(`.${target}`)
    for (let i = 0; i < ele.length; i++) {
        utilities.setInnerText(ele[i], user);
    }
}
export function logoutUser(target, key = `admin`, page) {
    // const user = localStorage.getItem(key);
    const ele = utilities.getDom(`.${target}`)
    for (let i = 0; i < ele.length; i++) {

        utilities.handleEvent(ele[i], `click`, event => {
            localStorage.removeItem(key)
            redirectTo(`../Pages/${page}.html`, 1000, false);
        })
    }
}