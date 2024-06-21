import { Utilities } from "../modules/utilities.js";
const utilities = new Utilities();

let zipCodeData = [
    {
        "ZIP_Code": 1010,
        "City": "Luangwa",
        "State": "Lusaka"
    },
    {
        "ZIP_Code": 1101,
        "City": "Ndola",
        "State": "Copperbelt"
    },
    {
        "ZIP_Code": 1111,
        "City": "Choma",
        "State": "Southern"
    },
    {
        "ZIP_Code": 1011,
        "City": "Lusaka",
        "State": "Lusaka"
    },
    {
        "ZIP_Code": 1102,
        "City": "Kitwe",
        "State": "Copperbelt"
    },
    {
        "ZIP_Code": 1020,
        "City": "Livingstone",
        "State": "Southern"
    },
    {
        "ZIP_Code": 1201,
        "City": "Kabwe",
        "State": "Central"
    },
    {
        "ZIP_Code": 1030,
        "City": "Chipata",
        "State": "Eastern"
    },
    {
        "ZIP_Code": 1040,
        "City": "Solwezi",
        "State": "Northwestern"
    },
    {
        "ZIP_Code": 1050,
        "City": "Kasama",
        "State": "Northern"
    }
]


// utilities.print(zipCodeData)
options(zipCodeData)
function options(data) {
    const selector = utilities.getDom(`#zipCode`)
    data.map(eachZipCode => {
        const option = utilities.setDom(`option`, {
            class: ``,
            data: {
                text: `${eachZipCode.City} (${eachZipCode.ZIP_Code})`
            },
            value: eachZipCode.ZIP_Code
        })

        if (eachZipCode.City == `Lusaka`) {
            option.selected = true;
        }



        selector.appendChild(option)
    })
}