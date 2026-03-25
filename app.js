let btn = document.querySelector(".search-btn");
let input = document.querySelector(".search-input");

btn.onclick = function () {
    let city = input.value;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=768398e57242ae9ea30117fa337fa66a&units=metric`)
        .then(res => res.json())
        .then(data => {
        console.log("Current:", data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-value-large").innerHTML =
            Math.round(data.main.temp) + "°C";
        document.querySelector(".condition-text").innerHTML =
            data.weather[0].main;

        document.querySelectorAll(".detail-value")[0].innerHTML =
            data.main.humidity + "%";
        document.querySelectorAll(".detail-value")[1].innerHTML =
            data.wind.speed + " km/h";
        document.querySelectorAll(".detail-value")[2].innerHTML =
            data.main.pressure + " mb";

        let today = new Date();

        let dateString = today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        document.querySelector(".date").innerHTML = dateString;
        });

        //! 5 days Forcast , Kayjib l ayam ta3 simana kamla bl Forcast 
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=768398e57242ae9ea30117fa337fa66a&units=metric`)
        .then(res => res.json())
        .then(data => {
            console.log("Forecast:", data);

            let cards = document.querySelectorAll(".forecast-card");

            for (let i = 0; i < 5; i++) {
                let dayData = data.list[i * 8]; //? كل نهار

                let temp = Math.round(dayData.main.temp);
                let weather = dayData.weather[0].main;
                let date = new Date(dayData.dt_txt);

        //! Days Name
                let dayName = date.toLocaleDateString("en-US", {
                    weekday: "short",
                });

                cards[i].querySelector(".forecast-day").innerHTML = dayName;
                cards[i].querySelector(".forecast-temp").innerHTML = temp + "°";

        //! Simpl icon  ya jdek !!
                let icon = "☀️";
                //todo Matayasara men xorot 
                if (weather.includes("Cloud")) icon = "☁️";
                if (weather.includes("Rain")) icon = "🌧️";
                if (weather.includes("Thunder")) icon = "⛈️";

                cards[i].querySelector(".forecast-icon").innerHTML = icon;
            }
        });
};

//* ⌨ Enter Key
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        btn.click();
    }
});