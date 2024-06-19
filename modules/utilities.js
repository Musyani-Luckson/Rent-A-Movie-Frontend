// 
export class Utilities {
  constructor() { }
}
// 
Utilities.prototype.fetchData = function (apiUrl, configs, callback) {
  return fetch(apiUrl, configs)
    .then(response => response.json())
    .then(data => {
      callback(data)
    })
    .catch(error => {
      callback(error)
    })
}
//
// factorsOfNumber(27, 2)
Utilities.prototype.factorsOfNumber = function (number, start) {
  const FACTORS = [];
  if (number >= start) {
    // When number is even.
    if (number % 2 == 0) {
      const NUM = number / 2;
      for (let i = start; i <= NUM; i++) {
        if (number % i == 0) {
          FACTORS.push(i);
        }
      }
      //  When number is old.
    } else {
      const NUM = number / 2;
      for (let i = start; i < (NUM + .5); i++) {
        if (number % i == 0) {
          FACTORS.push(i);
        }
      }
    }
    // 
  } else {
  }
  return FACTORS;
};
// 
// SET MIN AND MAX
Utilities.prototype.ensureDoubleDigit = function (didgit) {
  const DIGIT_LENGTH = `${didgit}`.length
  if (DIGIT_LENGTH < 2) {
    return `0${didgit}`
  } else {
    return didgit;
  }
};
// HANDLE EVENT
Utilities.prototype.handleEvent = function (target, event, callback) {
  target.addEventListener(event, (e) => {
    return callback(e);
  });
};
//
// HANDLE HOLDING
Utilities.prototype.handleHold = function (target, callback) {
  let timeOut;
  this.eventListener(target, `touchstart`, () => {
    timeOut = setTimeout(timeOutFunc, 2000);
    function timeOutFunc() {
      return callback();
    }
    this.eventListener(target, `touchend`, () => {
      clearTimeout(timeOut);
    });
  });
};
//
// GET HTML ELEMENT
Utilities.prototype.getDom = function (attrValue) {
  let attrType = attrValue.slice(0, 1);
  if (attrType === `.`) {
    this.domEle = document.querySelectorAll(attrValue);
  } else if (attrType === `#`) {
    this.domEle = document.querySelector(attrValue);
  } else {
    this.domEle = document.getElementsByTagName(attrValue);
  }
  return this.domEle;
};
//
// SET HTML ELEMENT
Utilities.prototype.setDom = function (tagName, attrObject = {}) {
  let element = document.createElement(tagName);
  for (let key of this.getProps(attrObject, "keys")) {
    if (attrObject.data !== undefined) {
      const innerKey = this.getProps(attrObject.data, "keys")[0]
      const value = attrObject.data[innerKey]
      if (attrObject.data.text !== undefined) {
        this.setInnerText(element, value)
      }
      if (attrObject.data.append !== undefined) {
        value.forEach(appendy => {
          element.appendChild(appendy)
        })
      }
    }
    element.setAttribute(key, attrObject[key]);
  }
  return element;
};
//
// APPLY CSS RULES TO AN ELEMENT
Utilities.prototype.cssRules = function (element, rules) {
  if (!element || !rules) {
    throw new Error("Both 'element' and 'rules' arguments are required.");
  }
  if (!Array.isArray(element)) {
    setCss(this, element, rules);
  } else {
    element.forEach((el) => setCss(this, el, rules));
  }
};
//
function setCss(imit, element, rules) {
  Object.keys(rules).forEach((prop) => {
    if (typeof rules[prop] !== "string") {
      throw new Error(`Invalid value for property '${prop}'.`);
    }
    element.style[prop] = rules[prop];
  });
}
//
// size of element
Utilities.prototype.sizeOfElement = function (element) {
  element = element.getBoundingClientRect();
  let height,
    width,
    size = 0;
  height = Math.ceil(element.height);
  width = Math.ceil(element.width);
  if (height > width) {
    size = width;
  } else if (width > height) {
    size = height;
  } else {
    size = (width + height) / 2;
  }
  size = Math.floor(size / 2) * 2;
  return { width: width, height: height, size: size };
};
//
// DOES THE ELEMENT EXIST INTHE DOM
Utilities.prototype.safeExistElement = function (element) {
  if (element !== null && element !== undefined) {
    return element;
  } else {
    return false;
  }
};
//
// HAND DOM ATTR VALUE
Utilities.prototype.handleDomAttrValue = function (
  method,
  element,
  attrName,
  value = ""
) {
  method = toLowerCase(method);
  if ("get") {
    return element[attrName];
  } else if (method == "set") {
    return (element[attrName] = value);
  } else {
    return false;
  }
};
//
// SET INNERTEXT
Utilities.prototype.setInnerText = function (element, text) {
  element.innerText = text;
};
//
// REMOVE ELEMENT
Utilities.prototype.removeElement = function (target) {
  target.innerHTML = "";
};
//
// HANDLE PASSWORD HIDE SHOW
Utilities.prototype.hideShowPassword = function (form, hideShowEle) {
  hideShowEle.addEventListener(`click`, () => {
    let value = hideShowEle.value;
    form.type = value;
    if (value === "password") {
      hideShowEle.value = "text";
    } else {
      hideShowEle.value = "password";
    }
    if (value == "password") {
      this.setInnerText(hideShowEle, "Show");
    } else {
      this.setInnerText(hideShowEle, "Hide");
    }
  });
};
//
// PRINTING TO THE SCREEN
Utilities.prototype.print = function (value) {
  console.log(value);
  return value;
};
// 
// 
Utilities.prototype.getJSON = function (resorce) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.addEventListener(`readystatechange`, () => {
      if ((request, request.readyState === 4 && request.status === 200)) {
        let data = JSON.parse(request.responseText);
        resolve(data);
      } else if ((request, request.readyState === 4)) {
        reject(`404! An Error`);
      }
    });
    request.open(`GET`, resorce);
    request.send();
  });
};
//
// IS USER LOGGED IN
Utilities.prototype.isUserLoggedIn = function (item) {
  let session = this.browserStorageUse("get", item, sessionStorage);
  let exist = this.isNotEmpty(session);
  if (exist || exist === "true") {
    if (session[0].isLoggedIn) {
      return true;
    } else {
      false;
    }
  } else {
    return false;
  }
};
//
// ADDING CHART TO TO REPRESENT DATA INSIDE HTML
Utilities.prototype.chartJS = function (canvaId, type, data) {
  const labels = [];
  const datas = [];
  const colors = [];
  for (let item in data) {
    labels.push(data[item].label);
    datas.push(data[item].percentage);
    colors.push(data[item].color);
  }
  new Chart(`${canvaId}`, {
    type: `${type}`,
    data: {
      labels: labels,
      datasets: [
        {
          data: datas,
          backgroundColor: colors,
        },
      ],
    },
    options: {
      responsive: false,
    },
  });
};
//
// SWITCH ITEMS OF AN OBJECT
Utilities.prototype.switchItems = function (old, obj) {
  let keys = this.getProps(obj, "keys");
  if (old !== obj[keys[0]]) {
    old = obj[keys[0]];
  } else {
    old = obj[keys[1]];
  }
  return old;
};
//
// SHUFFLE ALL THE ITEMS IN AN ARRAY
Utilities.prototype.shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
//
// DUPLICATES COUNTER
Utilities.prototype.dups = function (array) {
  let count = {};
  array.forEach((element) => {
    element = element.trim();
    count[element] = (count[element] || 0) + 1;
  });
  return count;
};
//
// SORT ARRAY
Utilities.prototype.sortArr = function (array) {
  const sorted = array.slice().sort((a, b) => {
    const typeA = typeof a;
    const typeB = typeof b;
    if (typeA === typeB) {
      return typeA === "string" ? a.localeCompare(b) : a - b;
    } else {
      return typeA < typeB ? -1 : 1;
    }
  });
  return sorted;
};
//
// TIME IT CAN COST TO READ
Utilities.prototype.timeToRead = function (
  text,
  wordsPerMinute = 200,
  round = true
) {
  // Ensure that text is not empty or undefined
  if (!text || text.trim().length === 0) {
    return 0;
  }
  // Split text into an array of words and count them
  const words = text.trim().split(/\s+/).length;
  // Calculate reading time in minutes
  const readingTimeMinutes = words / wordsPerMinute;
  // Round reading time to nearest whole number if round parameter is true (default)
  const readingTimeSeconds = round
    ? Math.round(readingTimeMinutes * 60)
    : readingTimeMinutes * 60;
  // Return reading time in seconds
  return readingTimeSeconds;
};
//
// FORMAT NUMBERS IN NORMAL READABLE WAY
Utilities.prototype.formatNumber = function (num, seperator) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, `${seperator}`);
};
//
// CAPTALIZE WORDS
Utilities.prototype.capitalizeWords = function (str) {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.length > 0) {
      words[i] = word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }
  return words.join(" ");
};
//
// RETIURN RANGED CUSTOM PATTERNED ARRAY
Utilities.prototype.rangedArr = function (gap, start, size) {
  let arr = [start];
  for (let i = 0; i < size - 1; i++) {
    arr.push(parseInt(arr[i]) + gap);
  }
  return arr;
};
//
// IS ARRAY EMPTY
Utilities.prototype.isNotEmpty = function (obj) {
  if (Array.isArray(obj)) {
    return obj.length > 0;
  } else {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }
};
//
// FILTER OFF HTML ENTITIES
Utilities.prototype.filterValue = function (value, allowedTags = "") {
  if (value === null || value === "") {
    return null;
  }
  // Trim leading/trailing whitespace
  value = value.trim();

  // Convert special characters to HTML entities
  value = value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
  // Remove any disallowed HTML tags and attributes
  if (allowedTags !== "") {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = value;
    const disallowedTags = tempElement.querySelectorAll(
      `*:not(${allowedTags})`
    );
    for (let i = 0; i < disallowedTags.length; i++) {
      disallowedTags[i].parentNode.removeChild(disallowedTags[i]);
    }
    value = tempElement.innerHTML;
  }

  return value;
};
//
// SET MIN AND MAX
Utilities.prototype.minMax = function (min, max, value) {
  if (value > max) {
    value = min;
  } else if (value < min) {
    value = max;
  } else {
    value = value;
  }
  return value;
};
//
// GET OBJECT PROPS
Utilities.prototype.getProps = function (object, propType) {
  if (!Object.prototype.hasOwnProperty.call(Object, propType)) {
    const errorMessage = `${propType} is not a valid Object method name`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return Object[propType](object);
};
//
//
// Utilities.prototype.JSDSType = function (JSDS, aSet) {
//   // for (const i in JSDS) {
//   //   if (typeof JSDS[i] == "object") {
//   //     this.notAnArray(JSDS[i], aSet);
//   //   } else if (typeof JSDS[i] == "number") {
//   //     aSet.add(JSDS[i]);
//   //   }
//   // }
//   return aSet;
// };
//
//
Utilities.prototype.generateRandomColorScheme = function () {
  // Define arrays of possible color values
  const sciFiColors = [
    "#0B0E31",
    "#1F2943",
    "#324B6D",
    "#3C5E8D",
    "#4C7294",
    "#6686A0",
    "#7B9DB9",
    "#8BA8C6",
  ];
  const aiColors = [
    "#00BFFF",
    "#1E90FF",
    "#00CED1",
    "#20B2AA",
    "#32CD32",
    "#FFD700",
    "#FFA500",
    "#FF6347",
  ];
  // Generate random index values to select colors from each array
  const sciFiIndex = Math.floor(Math.random() * sciFiColors.length);
  const aiIndex = Math.floor(Math.random() * aiColors.length);
  // Return an object containing the selected colors
  return {
    sciFiColor: sciFiColors[sciFiIndex],
    aiColor: aiColors[aiIndex],
  };
};
//
//
Utilities.prototype.idGenerator = function () {
  const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  // Generate the first two characters
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * uppercaseLetters.length);
    id += uppercaseLetters[randomIndex];
  }
  // Generate the remaining six characters
  const oddNumbers = [1, 3, 5, 7, 9];
  const evenNumbers = [0, 2, 4, 6, 8];
  let oddSum = 0;
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * oddNumbers.length);
    id += oddNumbers[randomIndex];
    oddSum += oddNumbers[randomIndex];
  }
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * evenNumbers.length);
    id += evenNumbers[randomIndex];
  }
  return id;
};
//
//
Utilities.prototype.generateSpaceColors = function () {
  // Generate a random color
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  // Generate two random gradients with cool, dark space colors
  const linearGradient = `linear-gradient(to bottom, #141e30, #243b55)`;
  const radialGradient = `radial-gradient(circle at 50% 50%, #0f2027, #203a43, #2c5364)`;
  // Return the random color and gradients
  return {
    color: randomColor,
    linearGradient: linearGradient,
    radialGradient: radialGradient,
  };
};
//
//
Utilities.prototype.browserStorageUse = function (
  method = `post`,
  key = ``,
  storageName = localStorage,
  input = {}
) {
  method = method.toLowerCase();
  switch (method) {
    case "get":
      return getStorageValue(key, storageName);
    case "post":
      setStorageValue(key, input, storageName);
      break;
    case "delete":
    case "remove":
    case "clear":
      removeStorageValue(method, key, storageName);
      break;
    default:
      console.error(`Invalid method "${method}"`);
  }
};
//
function getStorageValue(key, storage) {
  let value = storage.getItem(key);
  if (typeof value === "string") {
    value = JSON.parse(value);
  } else {
    value = [];
    storage.setItem(key, JSON.stringify(value));
  }
  return value;
}
//
function setStorageValue(key, input, storage) {
  let value = getStorageValue(key, storage);
  value.push(input);
  storage.setItem(key, JSON.stringify(value));
}
//
function removeStorageValue(method, key, storage) {
  switch (method) {
    case "delete":
    case "remove":
      storage.removeItem(key);
      break;
    case "clear":
      storage.clear();
      break;
  }
}
