'user strict';
let isStarted = false;
const TIME = 1500;
let drawInterval;
let elements = []

function log(msg) {
    console.log(msg);
}

function printStatus() {
    let kohl = document.getElementById('kohl');
    let schaf = document.getElementById('schaf');
    let wolf = document.getElementById('wolf');
    let bauer = document.getElementById('bauerF');

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
    log(leftElements.toString() + " _ " + rgtElements.toString());
    if (rgtElements.length === 4) {
        setTimeout(() => {
            alert("SOLVED");

        }, TIME * 2 / 3);
    }

}

function start() {

    if (!isStarted) {

        isStarted = true

        document.getElementById('start').classList.add("clicked");
        document.getElementById('end').classList.remove("clicked");

        init();

        drawInterval = setInterval(() => {

            let notVar = [0, 1, 2, 3]
            let r = (Math.floor(Math.random() * notVar.length));
            while (!ship(elements[r])) {

                notVar = notVar.filter(function (value, index, arr) {
                    return value !== r;
                });

                r = (Math.floor(Math.random() * notVar.length));
                while (!notVar.includes(r)) {
                    r = (Math.floor(Math.random() * notVar.length));
                }
            }
        }, TIME);
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    init();
    elements.forEach((e) => {
        e.htmlObject.addEventListener("click", () => {
            if (e.c === "B") {
                ship();
            } else {
                ship(e);
            }
        });
    });

});

function init() {
    let kohl = document.getElementById('kohl');
    let schaf = document.getElementById('schaf');
    let wolf = document.getElementById('wolf');
    let bauer = document.getElementById('bauerF');

    elements[0] = {
        htmlObject: kohl,
        c: "K",
        isRgt: false,
        bauerClass: "kohl"
    }
    elements[1] = {
        htmlObject: schaf,
        c: "S",
        isRgt: false,
        bauerClass: "schaf"

    }
    elements[2] = {
        htmlObject: wolf,
        c: "W",
        isRgt: false,
        bauerClass: "wolf"

    }
    elements[3] = {
        htmlObject: bauer,
        c: "B",
        isRgt: false,
        bauerClass: "bauer"
    }
}

function isRgt(object) {
    return object.classList.contains('rgt');
}

function ship(object) {
    if (test(object)) {
        let bauer = get("B");
        if (object != null) {
            moveBauer(bauer, object, false);
            setTimeout(() => {
                move(object);
                moveBauer(bauer, object, true);
                printStatus();

            }, TIME / 3);
            setTimeout(() => {
                moveBauer(bauer, bauer, false);
            }, TIME * 2 / 3);
        } else {
            move(bauer);
        }
        return true;
    }
    return false;
}

function test(object) {

    let B = get("B").isRgt;
    let W = get("W").isRgt;
    let S = get("S").isRgt;
    let K = get("K").isRgt;

    let c = false;
    let d = false;

    if (object != null) {
        let c = object.c;

        if (c === "W") {
            B = W;
        }
        if (c === "S") {
            B = S;
        }
        if (c === "K") {
            B = K;
        }

        let a = (W === S && S === !B);
        let b = (S === K && K === !B);

        if (c === "W") {
            B = !W;
            W = !W;
        }
        if (c === "S") {
            B = !S;
            S = !S;
        }
        if (c === "K") {
            B = !K;
            K = !K;
        }

        c = a || (W === S && S === !B);
        d = b || (S === K && K === !B);
        if (c) {
            log("Wolf und Schaf dürfen nicht alleine auf derselben Seite sein."); // error
            return false;
        } else
        if (d) {
            log("Schaf und Kohl dürfen nicht alleine auf derselben Seite sein."); // error
            return false;
        }

    } else {

        B = !B;

        c = (W === S && S === !B);
        d = (S === K && K === !B);
        if (c) {
            log("Wolf und Schaf dürfen nicht alleine auf derselben Seite sein."); // error
            return false;
        } else
        if (d) {
            log("Schaf und Kohl dürfen nicht alleine auf derselben Seite sein."); // error
            return false;
        }

    }



    return true;
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

function moveBauerSpecific(bauer, specificClass) {
    if (bauer.htmlObject.classList.contains(specificClass)) {
        bauer.htmlObject.classList.remove(specificClass);
    } else {
        bauer.htmlObject.classList = [];
        bauer.htmlObject.classList.add(specificClass);
    }

}

function moveBauer(bauer, object, withRgt) {

    let specificClass = object.bauerClass;
    if (object.isRgt) {
        specificClass += 'rgt';
    }
    if (bauer.htmlObject.classList.contains(specificClass)) {
        bauer.htmlObject.classList.remove(specificClass);
    } else {
        bauer.htmlObject.classList = [];
        bauer.htmlObject.classList.add(specificClass);
    }

    if (withRgt) {

        if (!object.isRgt) {

            bauer.isRgt = false
            bauer.htmlObject.classList.remove('rgt');
        } else {
            bauer.isRgt = true;
            bauer.htmlObject.classList.add('rgt');
        }
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

        reset();
        // finish
    }


}

function reset() {
    isStarted = false;
    document.getElementById("start").classList.remove("clicked");
    document.getElementById("end").classList.add("clicked");
    elements.forEach((e) => {
        e.isRgt = false;
        e.htmlObject.className = "";
    })
    clearInterval(drawInterval);
}
