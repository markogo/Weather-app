# Weather app

Take a look at the current weather and the following days forecast in this awesome weather app made with React.js

## Some notes

- Safari (unlike Chrome and Firefox) does not allow access to geolocation over the HTTP protocol - only HTTPS.
- The app uses Google Maps Platform's Geocoding API, Places API and also OpenWeatherMap API to get data.
- The OpenWeatherMap and Google Maps Platform's API keys must be stored in a .env file, which then must be placed into the project's root folder.

## Installation

1. Install Node.js and npm from [here](https://nodejs.org). (If not already installed)
2. Make sure git is installed and then clone this repository.
```
git clone https://github.com/markogo/Weather-app.git
```
3. Navigate to the project folder.
4. Install dependencies.
```
npm install
```
5. Copy the .env file containing the API keys to the project's root folder.
```
REACT_APP_OPENWEATHERMAP_API_KEY={Your OpenWeatherMap API key here}
REACT_APP_GOOGLE_API_KEY={Your Google Cloud API key here}
```
6. Run the program
```
npm start
```
7. The weather app should now be accessible from the browser - http://localhost:3000/

## Authors

* **Marko Gordejev** - [markogo](https://github.com/markogo)

