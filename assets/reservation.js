'use strict'

var reservation = {

    reservationSetting: {
        enCours: sessionStorage.getItem("enCours"),
        timeValid: 1200000,
        timeMinutes: "",
        timeSeconds: "",
        annulButton: document.getElementById('annule')
    },


    annuleButton: {
        button: document.getElementById('annule')
    },

    validSignature: function validSignature() {

        if (mapsVloc.mapsVlocSetting.veloDispo > 0) {

            if (signature.signatureSetting.valid === true && mapsVloc.mapsVlocSetting.stationSelected === true) {
                // appel enregistrement web storage et mise en place compte a rebour
                alert("Réservation enregistré");
                this.reservationSetting.enCours = true;
                reservation.save();
                location.reload();

            }
            if (mapsVloc.mapsVlocSetting.stationSelected === false) {
                alert("Aucune station sélectionné");
            } else if (signature.signatureSetting.valid === false) {
                //affichage message d'erreur
                alert("Merci de signez");
            };
        } else {
            document.getElementById("valid").removeEventListener("click");
            alert("Aucun vélo disponible");
        }
        signature.clearArea();
    },

    save: function save() {
        var dateReservation = new Date().getTime();
        var dateLimite = dateReservation + reservation.reservationSetting.timeValid;
        sessionStorage.setItem("enCours", "true");
        sessionStorage.setItem("dateReservation", dateReservation);
        sessionStorage.setItem("dateLimite", dateLimite);
        sessionStorage.setItem("stationActuel", mapsVloc.mapsVlocSetting.stationActuel);
        reservation.validPeriod();
    },

    saveExist: function saveExist() {
        if (this.reservationSetting.enCours) {
            // Nous pouvons utiliser localStorage
            reservation.validPeriod;
        } else {
            // Malheureusement, localStorage n'est pas disponible
            document.getElementById("annule").style.display = "none";
        }
    },

    validPeriod: function validPeriod() {
        // Set the date we're counting down to
        var countDownDate = sessionStorage.getItem("dateLimite");
        // Update the count down every 1 second
        var x = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();
            // Find the distance between now an the count down date
            var distance = countDownDate - now;
            // Time calculations for minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Display the result in the element
            document.getElementById("cpt").innerHTML = "Réservation disponible pour : " +
                minutes + "m " + seconds + "s ";
            document.getElementById("station_reservation").innerHTML = "Station :" + sessionStorage.getItem("stationActuel") + ".";
            document.getElementById("annule").style.display = "block";
            // If the count down is finished, write some text
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("cpt").innerHTML = "Aucune reservation";
                document.getElementById("station_reservation").innerHTML = "";
                document.getElementById("annule").style.display = "none";
            }
        }, 1000);
    },

    annuleReservation: function annuleReservation() {
        this.reservationSetting.enCours = "false";
        sessionStorage.setItem("enCours", "false");
        sessionStorage.setItem("dateLimite", new Date().getTime());
        document.getElementById("annule").style.display = "none";
        location.reload();
    },

    // Gestion des evenements
    setControls: function setControls() {
        this.annuleButton.button.onclick = function () {
            reservation.annuleReservation();
        };
    },

    //Initialisation
    init: function init() {
        this.setControls();
    }
};