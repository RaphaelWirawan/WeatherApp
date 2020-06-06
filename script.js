const mapping = {
  "01d": Skycons.CLEAR_DAY,
  "01n": Skycons.CLEAR_NIGHT,
  "02d": Skycons.PARTLY_CLOUDY_DAY,
  "02n": Skycons.PARTLY_CLOUDY_NIGHT,
  "03d": Skycons.FOG,
  "03n": Skycons.FOG,
  "04d": Skycons.CLOUDY,
  "04n": Skycons.CLOUDY,
  "09d": Skycons.RAIN,
  "09n": Skycons.RAIN,
  "10d": Skycons.SLEET,
  "10n": Skycons.SLEET,
  "11d": Skycons.SLEET,
  "11n": Skycons.SLEET,
  "13d": Skycons.SNOW,
  "13n": Skycons.SNOW,
  "50d": Skycons.WIND,
  "50n": Skycons.WIND,
};

window.addEventListener("load", () => {
  let long;
  let lat;
  let tempDescription = document.querySelector(".description");
  let tempDegree = document.querySelector(".degree");
  let locationTimezone = document.querySelector(".timezone");
  let iconCanvas = document.querySelector("#icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const endpoint = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=0720b06e6e9c279f22f161873e1887da`;
      const reverseGeo = `${proxy}https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=cf66961e34cb42f093c1063887b8bafb`;

      fetch(endpoint)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp } = data.main;
          const { description, icon } = data.weather[0];
          //set DOM Elements from the API
          tempDegree.textContent = Math.round(temp);
          tempDescription.textContent = description;
          setIcons(icon, iconCanvas);
        });

      fetch(reverseGeo)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { country, state_district } = data.results[0].components;
          locationTimezone.textContent = `${state_district}, ${country}`;
        });
    });
  } else {
    h1.textContent = "Location not detected. Failed to load data.";
  }
});

function setIcons(icon, iconID) {
  const skycons = new Skycons({ color: "black" });
  skycons.add(iconID, mapping[icon]);
  skycons.play();
}
