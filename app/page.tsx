"use client";
import axios from "axios";
import React, { useState } from "react";
const myApi = {
  key: "15a06af67e97eb34ab00ab4dd4cbb07e",
  base: "https://api.openweathermap.org/data/2.5/",
};
const weatherIcon = {
  "01d": "url(/clear.png)",
  "01n": "url(/clear.png)",
  "02d": "url(/cloud.png)",
  "02n": "url(/cloud.png)",
  "03d": "url(/cloud.png)",
  "03n": "url(/cloud.png)",
  "04d": "url(/mist.png)",
  "04n": "url(/mist.png)",
  "09d": "url(/rain.png)",
  "09n": "url(/rain.png)",
  "10d": "url(/rain.png)",
  "10n": "url(/rain.png)",
  "13d": "url(/snow.png)",
  "13n": "url(/snow.png)",
};
export default function Home() {
  const [errorCon, setErrorCon] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [cityName, setCityName] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setwindSpeed] = useState("");
  const [userInput, setUserInput] = useState("karachi");
  const [rotate, setRotate] = useState(true);
  const [image, setImage] = useState("");
  const [preLoad, setPreLoad] = useState(false);
  const [opacityChange, setOpacityChange] = useState("1");

  const fetchingData = async () => {
    try {
      let response = await axios.get(
        `${myApi.base}weather?q=${userInput}&units=metric&APPID=${myApi.key}`
      );
      let api_temp = response.data.main.temp;
      let wind_speed = response.data.wind.speed;
      let weather_icon:keyof typeof weatherIcon = response.data.weather[0].icon;
      let city_name = response.data.name;
      let api_humidity = response.data.main.humidity;
      setTemperature(Math.round(api_temp).toString());
      setwindSpeed(wind_speed);
      setCityName(city_name);
      setHumidity(api_humidity);
      setImage(weatherIcon[weather_icon])
      setErrorCon(false)
    } catch {
      setErrorCon(true);
    }
    setUserInput("");
  };
  window.onload = () => {
    fetchingData()
    setTimeout(() => {
      setPreLoad(true)
    }, 100);
  }
  const animation = () => {
    setRotate((val) => !val);
    setTimeout(() => {
      setOpacityChange("1");
    }, 500);
    setOpacityChange("0");
  };
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center bg-center bg-cover bg-[url(../public/bg2.jpg)]">
        <div
          className="h-[85%] w-[30%] rounded-2xl text-white backdrop-blur-glass opacity-0 shadow-mainBox"
          style={{
            transform: rotate ? "rotateY(0deg)" : "rotateY(180deg)",
            opacity: opacityChange,
            transition: "opacity 0.6s, transform 1.2s",
          }}
        >
          <div
            className="h-full w-full px-6 py-4  items-center justify-center flex-col delay-300 relative"
            style={{ transform: rotate ? "rotateY(0deg)" : "rotateY(180deg)",display: preLoad ? "flex" :"none" }}
          >
            <div className="w-full h-16 flex items-center justify-center">
              <span className="absolute h-10 w-[88%] flex items-center top-5">
                <input
                  className="h-full w-full rounded-full bg-transparent border-2 px-5"
                  type="text"
                  value={userInput}
                  onChange={(data) => {
                    setUserInput(data.target.value);
                  }}
                />
                <button
                  className="bg-transparent h-6 w-14 rounded-r-full absolute right-0 bg-center bg-no-repeat bg-contain bg-[url(../public/search.svg)]"
                  onClick={() => {
                    animation();
                    fetchingData();
                  }}
                ></button>
              </span>
            </div>
            <div className="w-full h-72 flex items-center justify-end flex-col relative">
              <div
                className="h-32 w-52 bg-center bg-contain bg-no-repeat absolute top-2"
                style={{ backgroundImage: errorCon ? "url(/404.png)" : image }}
              ></div>
              <div className="h-28 w-full flex items-center justify-center flex-col gap-3 font-semibold">
                <div className="text-6xl ">
                  {errorCon ? "ERROR" : <>{temperature}<sup>o</sup>c</>}
                </div>
                <div className="text-3xl">{errorCon ? "" : cityName}</div>
              </div>
            </div>
            <div className="w-full h-24 items-end justify-center"
            style={{display: errorCon ? "none" : "flex"}}
            >
              <div className="h-4/5 w-36  flex items-center justify-center ">
                <div className="h-[55%] w-[45%] bg-[url(../public/wave.svg)] bg-center bg-no-repeat bg-contain relative top-1"></div>
                <div className="h-2/4 w-2/4 text-sm">
                  <p>{humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="h-4/5 w-36  flex items-center justify-center ">
                <div className="h-[40%] w-[45%] bg-[url(../public/wicon.svg)] bg-center bg-no-repeat bg-contain relative top-1"></div>
                <div className="h-2/4 w-2/4 text-sm text-nowrap">
                  <p>{windSpeed} km/h</p>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
