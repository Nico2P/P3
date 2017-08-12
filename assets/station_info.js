'use strict'
var station_info = {

    setStatus: function setStatus(status) {
        if (status === "OPEN") {
            document.getElementById("status_station").textContent = "Ouvert";
        } else if (status === "CLOSED") {
            document.getElementById("status_station").textContent = "Fermé";
        };
    },

    setName: function setName(name) {
        document.getElementById("nom_station").textContent = name.slice(7);
    },

    setAdress: function setAdress(adress) {
        document.getElementById("adresse_station").textContent = adress;
    },

    setAvailableBikeStands: function setAvailableBikeStands(available_bike_stands) {
        document.getElementById("place_station").textContent = available_bike_stands;
    },

    setAvailable_bikes: function setAvailableBikes(available_bikes) {
        document.getElementById("velo_station").textContent = available_bikes;
    },

    setBikeStand: function setBikeStand(bike_stands) {
        document.getElementById("parking_station").textContent = bike_stands;
    },

}