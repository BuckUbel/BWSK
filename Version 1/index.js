'user strict';
let isStarted = false;
const TIME = 1000;

function start() {

    if (!isStarted) {

        isStarted = true

        let button = document.getElementById('button');
        button.classList.add("clicked");

        let kohl = document.getElementById('kohl');
        let schaf = document.getElementById('schaf');
        let wolf = document.getElementById('wolf');
        let bauer = document.getElementById('bauer');

        setTimeout(() => {
            ship(schaf);
        }, TIME * 1);
        setTimeout(() => {

            ship();
        }, TIME * 2);

        setTimeout(() => {
            ship(kohl);
        }, TIME * 3);

        setTimeout(() => {
            ship(schaf);
        }, TIME * 4);

        setTimeout(() => {
            ship(wolf);
        }, TIME * 5);

        setTimeout(() => {
            ship();
        }, TIME * 6);

        setTimeout(() => {
            ship(schaf);

        }, TIME * 7);

        setTimeout(() => {
            button.classList.remove("clicked");
            isStarted = false;
        }, TIME * 8);


    }
}

function ship(object) {
    let bauer = document.getElementById('bauer');
    if (object != null) {
        move(object);
    }
    move(bauer);
}

function move(object) {
    let id = object.parentElement.id;
    let positionY = id.slice(0, 1);
    let positionX = id.slice(1, 2);

    console.log(positionX, positionY);

    if (positionX === "1") {
        document.getElementById(positionY + "3").appendChild(object);
    }
    if (positionX === "3") {
        document.getElementById(positionY + "1").appendChild(object);
    }


}
