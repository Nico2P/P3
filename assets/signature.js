'use strict'
var signature = {

    signatureSetting: {
        valid: false
    },

    //boutons
    clearButton: {
        button: document.getElementById('clear')
    },
    validButton: {
        button: document.getElementById('valid')
    },

    initThis: function InitThis() {
        ctx = document.getElementById('myCanvas').getContext("2d");

        $('#myCanvas').mousedown(function (e) {
            mousePressed = true;
            signature.draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
        });

        $('#myCanvas').mousemove(function (e) {
            if (mousePressed) {
                signature.draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
            }
        });

        $('#myCanvas').mouseup(function (e) {
            mousePressed = false;
        });
        $('#myCanvas').mouseleave(function (e) {
            mousePressed = false;
        });
    },

    draw: function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
            signature.signatureSetting.valid = true;
        }
        lastX = x;
        lastY = y;

    },

    clearArea: function clearArea() {
        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        signature.signatureSetting.valid = false;
    },

    // Gestion des evenements
    setControls: function setControls() {
        this.clearButton.button.onclick = function () {
            signature.clearArea();
        };

        this.validButton.button.onclick = function () {
            reservation.validSignature();
        };

    },

    //Initialisation
    init: function init() {
        this.setControls();
    }
}
var mousePressed = false;
var lastX, lastY;
var ctx;