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
  let url = "https://api.thecatapi.com/v1/images/search?size=full";

  // Eventlistener for catching and showing CTRL+C in clipboard
  clipBtn.addEventListener("click", () => {
    navigator.clipboard
      .readText()
      .then((clipboard) => {
        textBox.innerText = `Thanks for information! \n ${clipboard} \n `;
      })
      .catch((error) => {
        textBox.innerText = error;
      });
  });
  // Display browser (HINT: It only says Netscape)
  appBtn.addEventListener("click", () => {
    const appName = navigator.appName;
    const error = "Update your browser dude";
    appName && (textBox.innerText = error);

    textBox.innerText = `And your browser is ${appName}! \n Wait?! What?! \n Hahahahahahahahaahah! \n How freakin old are you!!!? \n Hahahaha! I'm dying over here`;
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

  function fetchApi() {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  async function postImg() {
    try {
      let jsonData = await fetchApi();
      imgBox.innerHTML = `<img src="${jsonData[0]["url"]}">`;
    } catch (error) {
      imgBox.innerText = error;
    }
  }
  postImg();
  document.addEventListener("click", () => postImg());
})();
