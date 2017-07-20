'use strict';

var jSliders = {

    //Selection des differentes parties
    sliderContainer: document.getElementById('slider-container'),
    slider: document.getElementById('slider'),
    slides: document.getElementsByClassName('slide'),

    //Parametres
    slideSetting: {
        playing: true,
        duree: 7000,
        currentSlide: 0
    },

    //Selection des boutons
    previousButton: {
        button: document.getElementById('previous'),
        icone: document.getElementById('previous-icone')
    },
    nextButton: {
        button: document.getElementById('next'),
        icone: document.getElementById('next-icone')
    },
    pauseButton: {
        button: document.getElementById('pause'),
        icone: document.getElementById('pause-icone')
    },

    //Fonction
    play: function play() {
        this.pauseButton.icone.className = 'fa fa-pause';
        this.playing = true;
        slideInterval = setInterval(this.nextSlide, jSliders.slideSetting.duree);
    },
    pause: function pause() {
        this.pauseButton.icone.className = 'fa fa-play';
        this.playing = false;
        clearInterval(slideInterval);
    },
    nextSlide: function nextSlide() {
        jSliders.slides[jSliders.slideSetting.currentSlide].className = 'slide';
        (jSliders.slideSetting.currentSlide < jSliders.slides.length - 1) ? jSliders.slideSetting.currentSlide += 1: jSliders.slideSetting.currentSlide = 0;
        jSliders.slides[jSliders.slideSetting.currentSlide].className = 'slide showing';

    },
    previousSlide: function previousSlide() {
        jSliders.slides[jSliders.slideSetting.currentSlide].className = 'slide';
        (jSliders.slideSetting.currentSlide > 0) ? jSliders.slideSetting.currentSlide -= 1: jSliders.slideSetting.currentSlide = jSliders.slides.length - 1;
        jSliders.slides[jSliders.slideSetting.currentSlide].className = 'slide showing';
    },

    // Gestion des evenements
    setControls: function setControls() {
        this.pauseButton.button.onclick = function () {
            if (jSliders.playing) {
                jSliders.pause();
            } else {
                jSliders.play();
            }
        };

        this.nextButton.button.onclick = function () {
            jSliders.pause();
            jSliders.nextSlide();
        };
        this.previousButton.button.onclick = function () {
            jSliders.pause();
            jSliders.previousSlide();
        };

        // Gestion du slider au clavier
        document.onkeydown = function (e) {
            if (e.which == 39) {
                jSliders.nextSlide();
            } else if (e.which == 37) {
                jSliders.previousSlide();
            }
        };
    },

    //Initialisation du slider
    init: function init() {
        this.setControls();
        if (this.slideSetting.playing) {
            jSliders.play();
        } else {
            jSliders.pause();
        }
    },
};

// Lancement du slider
var slideInterval = 1000; // Variable globale pour mettre la valeur a 0 lors d'une pause