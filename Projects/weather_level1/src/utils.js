import Sun from "../src/assets/images/sun.svg";
import Rain from "../src/assets/images/rain.svg";
import Thunder from "../src/assets/images/thunder.svg";
import Cloudy from "../src/assets/images/cloudy.svg";

export const weatherCodesMapping = {
  0: { label: "Clear Sky", img: Sun },
  1: { label: "Mainly Clear", img: Sun },
  2: { label: "Partly Cloudy", img: Cloudy },
  3: { label: "Overcast", img: Cloudy },
  45: { label: "Fog", img: Cloudy },
  48: { label: "Depositing Rime Fog", img: Cloudy },
  51: { label: "Drizzle Light", img: Rain },
  53: { label: "Drizzle Moderate Intensity", img: Rain },
  55: { label: "Dense Intensity", img: Rain },
  56: { label: "Freezing Drizzle Light", img: Rain },
  57: { label: "Drizzle Dense Intensity", img: Rain },
  61: { label: "Rain Slight", img: Rain },
  63: { label: "Rain Moderate Intensity", img: Rain },
  65: { label: "Rain Heavy Intensity", img: Rain },
  66: { label: "Freezing Rain Light Intensity", img: Rain },
  67: { label: "Freezing Rain Heavy Intensity", img: Rain },
  71: { label: "Slight Snow Fall", img: Rain },
  73: { label: "Moderate Snow Fall", img: Rain },
  75: { label: "Heavy SnowFall", img: Rain },
  77: { label: "Snow Grains", img: Rain },
  80: { label: "Slight Rain Showers", img: Rain },
  81: { label: "Moderate Rain Showers", img: Rain },
  82: { label: "Violent Rain Showers", img: Rain },
  85: { label: "Slight Snow Shower", img: Rain },
  86: { label: "Heavy Snow Shower", img: Rain },
  95: { label: "Thunderstorm", img: Thunder },
  96: { label: "Thunderstorm With slight Hail", img: Thunder },
  99: { label: "Thunderstorm With Heavy Hail", img: Thunder },
};
