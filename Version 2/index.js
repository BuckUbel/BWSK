'user strict';
let isStarted = false;
const TIME = 1000;

let elements = []

function printStatus() {
    let kohl = document.getElementById('kohl');
    let schaf = document.getElementById('schaf');
    let wolf = document.getElementById('wolf');
    let bauer = document.getElementById('bauer');

    let leftElements = [];

    let rgtElements = [];


    if (isRgt(kohl)) {
        rgtElements.push("K");
    } else {
        leftElements.push("K");
    }
    if (isRgt(schaf)) {
        rgtElements.push("S");
    } else {
        leftElements.push("S");
    }
    if (isRgt(wolf)) {
        rgtElements.push("W");
    } else {
        leftElements.push("W");
    }
    if (isRgt(bauer)) {
        rgtElements.push("B");
    } else {
        leftElements.push("B");
    }
    console.log(leftElements.toString() + " _ " + rgtElements.toString());
}

function start() {

    if (!isStarted) {

        isStarted = true

        let button = document.getElementById('button');
        button.classList.add("clicked");

        let kohl = document.getElementById('kohl');
        let schaf = document.getElementById('schaf');
        let wolf = document.getElementById('wolf');
        let bauer = document.getElementById('bauer');

        elements[0] = {
            htmlObject: kohl,
            c: "K",
            isRgt: false
        }
        elements[1] = {
            htmlObject: schaf,
            c: "S",
            isRgt: false
        }
        elements[2] = {
            htmlObject: wolf,
            c: "W",
            isRgt: false
        }
        elements[3] = {
            htmlObject: bauer,
            c: "B",
            isRgt: false
        }
        setInterval(() => {
            ruleMove();

        }, 1000);
    }
}



function isRgt(object) {
    return object.classList.contains('rgt');
}

function ship(object) {
    let bauer = get("B");
    if (object != null) {
        move(object);
    }
    move(bauer);
    printStatus();
}

function move(object) {

    let isRgt = object.htmlObject.classList.contains('rgt');

    if (isRgt) {
        object.isRgt = false;
        object.htmlObject.classList.remove('rgt');
    } else {
        object.isRgt = true;
        object.htmlObject.classList.add('rgt');
    }
}

function get(a) {
    return elements.find((element) => {
        return element.c == a;
    })
}

function ruleMove() {

    let B = get("B").isRgt;
    let W = get("W").isRgt;
    let S = get("S").isRgt;
    let K = get("K").isRgt;


    let a = !B && !W && !S && !K;
    let b = B && !W && S && !K;
    
    let c = !B && !W && S && !K;
    let d = B && !W && S && K;
    
    let e = !B && !W && !S && K;
    
    let f = B && W && !S && K;
    
    let g = !B && W && !S && K;
    let h = B && W && S && K;

    let i = W === S;
    let j = S === K;

    if (a) {
        ship(get("S"));
    } else
    if (b) {
        ship();
    } else
    if (c) {
        ship(get("K"));

    } else
    if (d) {
        ship(get("S"));

    } else
    if (e) {
        ship(get("W"));

    } else
    if (f) {
        ship();

    } else
    if (g) {
        ship(get("S"));

    } else
    if (h) {
        
        isStarted = false;
        document.getElementById("button").classList.remove("clicked");
        get("S").htmlObject.classList.remove("rgt");
        get("W").htmlObject.classList.remove("rgt");
        get("B").htmlObject.classList.remove("rgt");
        get("K").htmlObject.classList.remove("rgt");

        // finish
    } else


    if (i) {
        // error
    } else
    if (j) {
        // error
    }

}
