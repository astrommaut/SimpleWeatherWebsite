import React, { useState, useEffect } from "react";
import "./app.css";
import axios from "axios";
import { motion } from "framer-motion";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TbRadiusBottomLeft, TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner8 } from "react-icons/im";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";
const APIkey = "70033726f0a61ed34ab7b12789a155c9";
function App() {
  const [data, setData] = useState(null);
  const [location, setLOcation] = useState("Sarajevo");
  const [inputValue, setInputValue] = useState("");
  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  const handleSubmit = (e) => {
    if (inputValue !== "") {
      setLOcation(inputValue);
    }
    const input = document.querySelector("input");
    input.value = "";
    e.preventDefault();
  };
  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [location]);

  if (!data) {
    return (
      <div className="loading_screen d-flex justify-content-center align-items-center">
        <div className="m-1 spinner-grow" role="status"></div>
        <div className="spinner-grow m-1" role="status"></div>
        <div className="spinner-grow m-1" role="status"></div>
      </div>
    );
  }
  let icon;
  let funFact;
  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloudy />;
      funFact =
        "In Februrary 2007, paraglider Eva Wiśnierska-Cieślewicz was sucked up into a cumulonimbus cloud rapidly climbing at a speed of 45 mph to an altitude of 9,946 m (32,600 feet) - close to the altitude of an airliner. ";
      break;
    case "Haze":
      icon = <BsCloudHaze2Fill />;
      funFact =
        "The title of foggiest place in the world goes to an area of the Atlantic Ocean called Grand Banks, lying off the coast of Newfoundland.";
      break;
    case "Rain":
      icon = <IoMdRainy />;
      funFact =
        "Mawsynram in India is noted as being the wettest place on earth is with over 11 meters of rain falling every year.";
      break;
    case "Clear":
      icon = <IoMdSunny className="sunny_icon" />;
      funFact =
        "Al'Aziziyah in Libya has the highest recorded temperature on earth at a sweltering 58°C on the 13th Sept, 1922.";
      break;
    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      funFact =
        "The Atacama Desert in northern Chile and southern Peru is the driest spot on Earth based on meteorological observations. It averages only 0.019 inches (0.5 millimeters) of rainfall annually, according to Guinness World Records. NASA says it's the driest non-polar desert on the planet.";
      break;
    case "Snow":
      icon = <IoMdSnow />;
      funFact =
        "The lowest ever recorded world temperature was at Vostok Station, Antarctica on the 21 July 1983 at a bitter -89.6°C";
      break;
    case "Thznderstorm":
      icon = <IoMdThunderstorm />;
      funFact =
        "A storm named John was the Longest-lasting Pacific tropical storm continuing for 31 days. As it crossed the dateline twice, it changed status from a hurricane to a typhoon and back to a hurricane.";
      break;
  }

  const date = new Date();
  const hoursAndMinutes = date.getHours() + ":" + date.getMinutes();
  return (
    <div className="app align-items-center">
      <form>
        <div className="col-6 ps-5 pe-5 pt-2 pb-2 m-auto input-group flex-nowrap forma">
          <motion.input
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 1 }}
            type="text"
            className="form-control"
            placeholder="Search by city or country..."
            onChange={(e) => handleInput(e)}
          />
          <motion.span
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 1 }}
            className="input-group-text"
            id="addon-wrapping"
          >
            <button className="btn" onClick={(e) => handleSubmit(e)}>
              <IoMdSearch />
            </button>
          </motion.span>
        </div>
      </form>
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 1 }}
        className="card kartica m-auto col-9  mt-2 mb-2 shadow-lg"
      >
        <div className="card-top row text-center">
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="weather_icon"
          >
            {icon}
          </motion.div>
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <FaMapMarkerAlt /> {data.name}, {data.sys.country}
            <br />
            {date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}
            <br />
            {hoursAndMinutes}
          </motion.div>
        </div>

        <div className="card-body">
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="temp_number text-center"
          >
            {parseInt(data.main.temp)}
            <TbTemperatureCelsius className="celsius align-self-top" />
          </motion.div>
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-capitalize info_span text-center"
          >
            {data.weather[0].description}
          </motion.div>
        </div>

        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="card-bottom d-flex justify-content-evenly"
        >
          <div>
            <BsEye /> Visibility <span>{data.visibility / 1000}km</span>
          </div>
          <div>
            <BsThermometer /> Feels like {parseInt(data.main.feels_like)}
            <TbTemperatureCelsius />
          </div>
        </motion.div>
        <motion.div
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="card-bottom2 pt-3 pb-3 d-flex justify-content-evenly"
        >
          <div>
            <BsWater /> Humidity <span>{data.main.humidity} %</span>
          </div>
          <div>
            <BsWind /> Wind {data.wind.speed} m/s
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{ scale: 1 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="card kartica mx-auto pt-5 pb-5 mt-3 mb-3 col-9"
      >
        <motion.h2 className="text-center pb-2">Fun Fact</motion.h2>
        <motion.p
          animate={{ scale: 1 }}
          initial={{ scale: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          {funFact}
        </motion.p>
      </motion.div>
    </div>
  );
}

export default App;
