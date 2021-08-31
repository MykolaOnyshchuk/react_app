import React, {Component} from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./Weather.css";
import "lib.d.ts";

class SignInPage extends Component {
    API_KEY = "31fd77decaf2f9adebaf0f1b02fbbf35";
    queryUrlGenerator = (cityName:string) => {
        return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.API_KEY}`;
    };

    /*window.addEventListener("load", run);
    window.onload = function () {

    }*/
    activeWeatherBlock = null;

    /*run() {
        const blocks = document.getElementsByClassName("weather_block");

        for (const weather_block of blocks) {
            weather_block.addEventListener("click", onWeatherBlockClicked);
        }
    };*/

    onWeatherBlockClicked(event:MouseEvent) {
        const weatherBlock = event.currentTarget;
        if (weatherBlock == this.activeWeatherBlock) {
            this.removePrevious(weatherBlock);
            this.activeWeatherBlock = null;
        } else {
            this.removePrevious(weatherBlock);
            this.activeWeatherBlock = weatherBlock;

            weatherBlock.classList.add("active");
            const cityName = weatherBlock.getElementsByClassName("city_name")[0].innerText;

            const weather = document.createElement("div");
            weather.classList.add("weather");
            weather.innerHTML = `...`;

            weatherBlock.appendChild(weather);

            this.getWeatherData(cityName).then((weatherData) => {
                weather.innerHTML = `
            <div class="row">
                <div class="temperature"> Temperature: ${weatherData.main.temp} &#176C</div>
                <div class="feels_like_temperature">Feels like: ${weatherData.main.feels_like} &#176C</div>
            </div>
    
            <div class="row">
                <div class="pressure">Pressure: ${weatherData.main.pressure} mmH</div>
                <div class="humidity">Humidity: ${weatherData.main.humidity}%</div>
            </div>
    
            `;
            });
        }
    };

    removePrevious(weatherBlock:HTMLDivElement) {
        weatherBlock.classList.remove("active");

        const weatherBlocks = weatherBlock.getElementsByClassName("weather");
        // @ts-ignore
        for (const weatherBlock of weatherBlocks) {
            weatherBlock.remove();
        }
    };

    getWeatherData = async (cityName:string) => {
        return (await fetch(this.queryUrlGenerator(cityName))).json();
    };



    render() {
        let obj = window.localStorage.getItem("hackademy");
        if (obj !== null) {
            return (
            <div id="weather_background">
                <h1>Choose city to see current weather:</h1>
                <div className="content">
                    <div className="weather_block" onClick={this.run()}>
                        <span className="city_name">Zhytomyr</span>
                    </div>
                    <div className="weather_block" onClick={run()}>
                        <span className="city_name">Berlin</span>
                    </div>
                    <div className="weather_block" onClick={run()}>
                        <span className="city_name">Amsterdam</span>
                    </div>
                    <div className="weather_block" onClick={run()}>
                        <span className="city_name">Lisbon</span>
                    </div>
                </div>
            </div>
            );
        } else {
            return (
                <h1 id="noDisplay">You have not been logged in yet</h1>
            );
        }
    }
}

export default SignInPage;