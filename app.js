/*
School assigment
Criteras:
Use Promise with resolve/reject
Use Async/Await
Use navigator clipboard/appName/Geolocation
Use API
Use Prettier
And no console.log output

*/

(function () {
  const clipBtn = document.querySelector(".clipboard");
  const appBtn = document.querySelector(".browser");
  const geoLocationBtn = document.querySelector(".geolocation");
  const textBox = document.querySelector(".text-box");
  const imgBox = document.querySelector(".image-box");

  // Eventlistener for catching and showing CTRL+C in clipboard
  clipBtn.addEventListener("click", () => {
    navigator.clipboard
      .readText()
      .then((clipboard) => (textBox.innerText = clipboard));
  });
  // Display browser (HINT: It only says Netscape)
  appBtn.addEventListener("click", () => {
    const appName = navigator.appName;
    const error = "Update your browser dude";
    appName && (textBox.innerText = error);

    textBox.innerText = appName;
  });
  // Get Geolocation LAT/LONG and display
  geoLocationBtn.addEventListener("click", () => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
  // Get coords from user (User must accept && use HTTPS://)
  async function success(position) {
    let pos = await position.coords;
    textBox.innerText = `Current position is - LAT: ${pos.latitude} LONG: ${pos.longitude}.\n Accuracy within: ${pos.accuracy} meters.`;
  }
  function error(error) {
    textBox.innerText = `ERROR(${error.code}): ${error.message}`;
  }
  // Get JSON data from API
  function ajax(url, callback) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        try {
          var data = JSON.parse(http.responseText);
        } catch (error) {
          imgBox.innerText = error.message + " in " + http.responseText;
          return;
        }
        callback(data);
      }
    };
    http.open("GET", url, true);
    http.send();
  }
  // Create a promise which returns JSON if furfilled otherwise returns no image found
  function getImg() {
    return new Promise((resolve, reject) => {
      ajax("https://api.thecatapi.com/v1/images/search?size=full", (data) => {
        resolve(data);
        reject("Image Not Found!");
      });
    });
  }
  // Returns data from promise using async function
  async function postImg() {
    let getImage = await getImg();
    return getImage;
  }
  window.addEventListener("load", () => {
    //uses data from JSON to post image from promise.
    postImg()
      .then((img) => {
        let imgSrc = `<img src="${img[0]["url"]}">`;
        imgBox.innerHTML = imgSrc;
      })
      .catch((msg) => {
        imgBox.innerText = msg;
      });
  });
})();
