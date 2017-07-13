'use strict'

var reservation = {

    reservationSetting: {
        enCours: false
    },

    validSignature: function validSignature() {
        if (signature.signatureSetting.valid === true) {
            // appel enregistrement web storage et mise en place compte a rebour
            signature.clearArea()
            reservation.reservationSetting.enCours = true;
            reservation.save();
        } else {
            //affichage message d'erreur
            alert("Merci de signez");
        };
    },

    save: function save() {
        var dateReservation = new Date().getTime();
        sessionStorage.setItem("enCours", "true");
        sessionStorage.setItem("dateReservation", dateReservation);
    },

    saveExist: function saveExist() {
        if (sessionStorage.getItem("enCours")) {
            // Nous pouvons utiliser localStorage
            reservation.validPeriod();
        } else {
            // Malheureusement, localStorage n'est pas disponible
            console.log("NOK")
            document.getElementById("status").textContent = " Aucune réservation enregistré";
        }
    },

    validPeriod: function validPeriod() {
        var dateNow = new Date().getTime();
        var dateValide = dateNow + 1200000;
        sessionStorage.setItem("dateValide", dateValide);
        if (dateNow - (sessionStorage.getItem("dateValide")) < 1200000) {
            console.log("reservation valide");
            console.log(sessionStorage.getItem("dateValide"));
            console.log(dateNow);
            console.log((sessionStorage.getItem("dateValide")) - dateNow);
            var compte = ((dateNow - 1200000) / 1000);
            document.getElementById("status").textContent = "Temps pour récuperer vôtre vélo : " + compte + " min";
        } else {
            console.log("aucune reservation");
        };
    }
};