// Slider mobile version

let slideDirection = document.querySelectorAll(".direction__slider__item");
let posLimitDirection = 50; 
let posInitDirection = null;
let countDirection = 0;

getEvent = (event) => event.type.search('touch') !== -1 ? event.touches[0].clientX : event.x;
slideInvisible = (arr) => arr.forEach((el) => { el.classList.add("none") });
slideRemove = (arr, index) => arr[index].classList.remove("none");


slideInvisible(slideDirection);
slideRemove(slideDirection, 0);


slideDirection.forEach((el) => {
    el.addEventListener("touchstart", swipeStart);
    el.addEventListener("touchmove", swipeEnd);
    el.addEventListener("mousedown", swipeStart);
    el.addEventListener("mousemove", swipeEnd);
})


function swipeStart (event) {
    posInitDirection = getEvent(event);
}

function swipeEnd(event) {

    posFinalDirection = posInitDirection - getEvent(event);

    if (!posInitDirection) {return false}; 
    
    if (Math.abs(posFinalDirection) > posLimitDirection) {

        slideInvisible(slideDirection);
        
        if (posFinalDirection > 0) {

            countDirection++;

            if (countDirection >= slideDirection.length) {
                countDirection = 0;
            };
            slideRemove(slideDirection, countDirection);

        } else {

            countDirection--;

            if (countDirection < 0) {
                countDirection = slideDirection.length - 1;
            };

             slideRemove(slideDirection, countDirection);
        };

        posInitDirection = null;
        posFinalDirection = null;
    }     
};




