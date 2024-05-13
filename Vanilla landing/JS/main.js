//Burger menu

document.querySelector(".btn__burger").addEventListener("click", function () {
    this.classList.toggle("active");   
    document.querySelector(".menu__burger").classList.toggle("none");
 });


//Tabs
 
//--> Button all episodes
document.querySelector(".latest__episod__btn").addEventListener("click", function () {
    document.querySelectorAll(".tab").forEach((e) => {
        e.classList.toggle("none");
    });

     document.querySelectorAll(".litte__table").forEach((e) => {
         e.classList.toggle("none");
    });
});

//--> Click on episod
for (let i = 0; i < document.querySelectorAll(".tab").length; i++) {
    
    if (document.querySelectorAll(".litte__table")[i].classList.contains("none") != true) {
        document.querySelectorAll(".tab")[i].addEventListener("click", function () {
            this.classList.add("none");
            document.querySelectorAll(".litte__table")[i].classList.remove("none");
        });
    }; 
    if (document.querySelectorAll(".litte__table")[i].classList.contains("none") != true) {
        document.querySelectorAll(".litte__table")[i].addEventListener("click", function () {
            this.classList.add("none");
            document.querySelectorAll(".tab")[i].classList.remove("none");
        });
    };
};



//Slider profile

let dot = document.querySelectorAll(".dot");
let profile = document.querySelectorAll(".profile");
let btn = document.querySelectorAll(".profile__btn");

dot[0].classList.add("active");
profile[0].classList.remove("none");

let counter = 0;

//--> Click dots

for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", () => {
        dot.forEach((e) => {
            e.classList.remove("active");
        });
        profile.forEach((e) => {
            e.classList.add("none");
        })
        
        counter = i;
        dot[counter].classList.add("active");
        profile[counter].classList.remove("none");
    });
};

//--> Click button

for (let n = 0; n < btn.length; n++) {
    btn[n].addEventListener("click", () => {
        dot.forEach((e) => {
            e.classList.remove("active");
        });
        profile.forEach((e) => {
            e.classList.add("none");
        });
        
        counter++;

        if (counter >= btn.length) {
            counter = 0;
        };
        dot[counter].classList.add("active");
        profile[counter].classList.remove("none");
    });
   
};

//--> Slide show

function slideShow() {
          dot.forEach((e) => {
            e.classList.remove("active");
        });
        profile.forEach((e) => {
            e.classList.add("none");
        });
        
        counter++;

        if (counter >= btn.length) {
            counter = 0;
        };
        dot[counter].classList.add("active");
        profile[counter].classList.remove("none");
       
};

let timerSlide = setInterval(() => { slideShow()  }, 3000);

profile.forEach((e) => {
    e.addEventListener("mouseover", () => {
        clearInterval(timerSlide);
    });
});

profile.forEach((e) => {
    e.addEventListener("mouseleave", () => {
        timerSlide = setInterval(() => slideShow(), 3000);
    });
});



//Subscribe

let user = document.querySelectorAll(".subscribe__input")[0];
let email = document.querySelectorAll(".subscribe__input")[1];

let userMails = {};

function Base (user, email) {
    this.user = user;
    this.email = email;
};

function createCounter(mails) {
    return Object.keys(mails).length;
}

document.querySelector(".subscribe__btn").addEventListener("click", () => {
    let userBase = user.value;
    let emailBase = email.value;

    let userMail = new Base(userBase, emailBase);

    let mailCounter = createCounter(userMails);
    userMails[mailCounter] = userMail;

       alert(userBase + ", вы подписались на канал!");
});


//Slider feedback mobile

let slide = document.querySelectorAll(".feedback__item");

if (window.matchMedia("(max-width: 770px)").matches) {

    slide.forEach((el) => {
            el.classList.add("none");
        });
    slide[0].classList.remove("none");
    
    slide.forEach(function () {
        this.addEventListener("touchstart", touchStart, false);
        this.addEventListener("touchmove", touchMove, false);
    });

    slide.forEach(function () {
        this.addEventListener("mousedown", mouseStart, false);
        this.addEventListener("mousemove", mouseMove, false);
    });
};

let x1 = null;
let count = 0;

//--> Touch

function touchStart(event) {
    x1 = event.touches[0].clientX;
};

function touchMove(event) {
    if (!x1) {
        return false;
    };

    let x2 = event.touches[0].clientX;
    let xDiff = x2 - x1;

    slide.forEach((el) => {
        el.classList.add("none");
    });

    if (xDiff > 0) {
        console.log("right");
       
        count++;

        if (count >= slide.length) {
             count = 0;
        };

        slide[count].classList.remove("none");

    } else {
        console.log("left");

        count--;

        if (count <= 0) {
            count = slide.length - 1;
        };

        slide[count].classList.remove("none");
    };

    x1 = null;
};


//--> Mouse click

function mouseStart(event) {
    x1 = event.x;
};

function mouseMove(event) {
    if (!x1) {
        return false;
    };

    let x2 = event.x;
    let xDiff = x2 - x1;

    slide.forEach((el) => {
        el.classList.add("none");
    });

    if (xDiff > 0) {
        console.log("right");

         count++;

        if (count >= slide.length) {
             count = 0;
        };

        slide[count].classList.remove("none");

    } else {
        console.log("left")

         count--;

        if (count <= 0) {
            count = slide.length - 1;
        };

        slide[count].classList.remove("none");
    };

    x1 = null;
};


//Map
ymaps = window.ymaps;

function init () {
    const map = new ymaps.Map("map", {
        center: [43.58965251680574,39.73160653231703],
        zoom: 17,
        type: "yandex#satellite",
        // Карта будет создана без элементов управления.
        controls: ["routePanelControl"]
    });

    let location = ymaps.geolocation.get();
    location.then(function (res) {
        let locationText = res.geoObjects.get(0).properties.get("text"); 

        let control = map.controls.get("routePanelControl");
                control.routePanel.state.set({
                type: "masstransit",
                fromEnabled: true,
                from: locationText,
                toEnabled: false,
                to: "Сочи, ул. Невская 23"
            });

    });

    

    let placemark = new ymaps.Placemark([43.588350181220676, 39.73080186961256], {
        balloonContent: `
            <div class="baloon">
                <div class="baloon__address"> Завоказальный р-н г.Сочи</div>
                <div class="ballon__contact">
                    <a href="tel:+79109999999">+79109999999</a>
                </div>
            </div>
        `
    }, {
     iconLayout: "default#image",
     iconImageHref: "https://cdn-icons-png.flaticon.com/128/3944/3944427.png",
     iconImageSize: [40, 30],
     iconImageOffset: [-20, -20]
     }
    );

    map.geoObjects.add(placemark);
    placemark.balloon.open();
};

  ymaps.ready(init);