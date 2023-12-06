import Weather from "./weather";

export default class Clothing {
    constructor(){
        this.bg;
        this.weather = new Weather();
        this.selectAd();
    }

    selectAd() {

        let temperature;
         temperature = this.weather.temperature;
        //  temperature = -30;


        if(parseInt(temperature) < 20 && parseInt(temperature) > 0) {
            if(localStorage.getItem("time")+3600 <= (Date.now()/1000)) {
                this.getBg("cloud");
            } else {
                this.bg = localStorage.getItem("bg");
            }


            const delay = ms => new Promise(res => setTimeout(res, ms));
            const waitforAPI = async () => {
                await delay(250);

                this.fillAd(this.bg,
                            temperature,
                            `<i class="fa-solid fa-cloud weather-icon"></i>`,
                            "https://cdn.iconscout.com/icon/free/png-512/raincoat-2667112-2212693.png",
                            "It's coat time."
                );
            };
            waitforAPI();
            } 

        else if(parseInt(temperature) <= 0){
            if(localStorage.getItem("time")+3600 <= (Date.now()/1000)) {
                this.getBg("freeze");
            } else {
                this.bg = localStorage.getItem("bg");
            }


            const delay = ms => new Promise(res => setTimeout(res, ms));
            const waitforAPI = async () => {
                await delay(250);
    
                this.fillAd(
                            this.bg,
                            temperature,
                            `<i class="fa-solid fa-snowflake weather-icon"></i>`,
                            "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/71270/jacket-clipart-xl.png",
                            "It's jacket time."
                );
            };
            waitforAPI();
        } 

        else if(parseInt(temperature) >= 20){
            if(localStorage.getItem("time")+3600 <= (Date.now()/1000)) {
                this.getBg("sunny");
            } else {
                this.bg = localStorage.getItem("bg");
            }


            const delay = ms => new Promise(res => setTimeout(res, ms));
            const waitforAPI = async () => {
                await delay(250);
    
                this.fillAd(
                            this.bg,
                            temperature,
                            `<i class="fa-regular fa-sun weather-icon"></i>`,
                            "https://www.nicepng.com/png/full/30-301812_svg-stock-dress-clipart-girl-dress-princess-dress.png",
                            "It's dress time."
                );   
            };
            waitforAPI();     
        }
    }


    /**
     * 
     * @param {Weather type based on temperature} type 
     * 
     * This function requests a background image via an API call based on weather conditions
     */
    getBg(type){
        let id;
        let apiKey = "26078620-8f68666ca82257bf891360d2f"
        if (type == "cloud") {
            id = "1282314";
        } 
        else if (type == "freeze") {
            id = "260817";
        } 
        else {
            id = "1845689";
        }
        let url = `https://pixabay.com/api/?key=${apiKey}&id=${id}`
        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.bg = data.hits[0].largeImageURL;
                localStorage.setItem("bg", this.bg);
                localStorage.setItem("time", Date.now()/1000);
            })
            .catch(err => {
                console.log(err);
            });

    }



    /**
     * @param {background image} bg 
     * @param {current temperature} temperature 
     * @param {icon based on weathertype} weatherIcon 
     * @param {clothing item shown} clothingItem 
     * @param {message shown with clothing item} message 
     */
    fillAd(bg, temperature, weatherIcon, clothingItem, message) {
        let weatherType;

        if(temperature >= 20) {
            weatherType = "sunny";
        }
        else if (temperature <= 0) {
            weatherType = "freezing";
        }
        else {
            weatherType = "cloudy";
        }
        


        document.querySelector("#ad").classList.add(weatherType);
        document.querySelector("#ad").innerHTML = `
            <img class="bg" src="${bg}">
            <div class="panel"></div>
            <h2 class="temperature">${temperature}°C</h2>
            <h3 class="weather-type">${weatherType}</h3>
            ${weatherIcon}
            <img class="clothing-item" src="${clothingItem}">
            <div class="flex">
                <p class="message ">It's ${weatherType}.</p>
                <p class="message ">${message}</p>
            </div>
        `;
    }

}