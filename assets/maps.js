'use strict'
var mapsVloc = {

    mapsVlocSetting: {
        initPosition: {
            lat: 48.867215942062155,
            lng: 2.346782684326172
        },
        stationActuel: ""
    },


    initMaps: function initMap() {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: mapsVloc.mapsVlocSetting.initPosition
        });
        return map;
    },

    // Recuperation des données et callback de makeMarker si ok
    getDonnees: function getDonnees() {
        var reponse = ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=paris&apiKey=55f0d990654c82851fd70ba88f382a9b69d6b187", mapsVloc.makeMarker);
    },

    toggleBounce: function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
    },


    makeMarker: function makeMarker(reponse) {
        var jlist = JSON.parse(reponse);

        //Init de la carte
        var map = mapsVloc.initMaps();

        //Création des marqueurs
        for (var i = 0; i < jlist.length; i++) {
            var marker = new google.maps.Marker({
                position: jlist[i].position,
                map: map,
                title: jlist[i].name,
                status: jlist[i].status,
                address: jlist[i].address,
                available_bike_stands: jlist[i].available_bike_stands,
                available_bikes: jlist[i].available_bikes,
                bike_stands: jlist[i].bike_stands
            });

            // Gestion des couleurs de marker en fonction des vélos dispo

            if (jlist[i].available_bikes >= 10) {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
            } else if (jlist[i].available_bikes >= 1) {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
            } else {
                marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            }
            // Gestion des evenements

            marker.addListener('click', function (e) {
                // Ajout du contenu au tableau
                if (this.status === "OPEN") {
                    document.getElementById("status_station").textContent = "Ouvert";
                } else if (this.status === "CLOSED") {
                    document.getElementById("status_station").textContent = "Fermé";
                };
                document.getElementById("nom_station").textContent = this.title.slice(7);
                document.getElementById("adresse_station").textContent = this.address;
                document.getElementById("place_station").textContent = this.available_bike_stands;
                document.getElementById("velo_station").textContent = this.available_bikes;
                document.getElementById("parking_station").textContent = this.bike_stands;
                mapsVloc.mapsVlocSetting.stationActuel = this.title.slice(7);
                mapsVloc.toggleBounce(marker);
                // Affichage du bouton si il est possible de réserver
                if (this.available_bikes > 0) {
                    document.getElementById("buttonValidation").style.display = "block";
                } else {
                    document.getElementById("buttonValidation").style.display = "none";
                };
            });
        };
        //debug
        //console.log(jlist[0]);
        //debug
    }

}