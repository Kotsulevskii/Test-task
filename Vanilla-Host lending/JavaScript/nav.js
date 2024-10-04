//Burger menu

document.querySelector(".btn__burger").addEventListener("click", () => { 
    document.querySelector(".burger__menu").classList.add("active");
});

document.querySelector(".burger__menu").addEventListener("click", () => { 
    document.querySelector(".burger__menu").classList.remove("active");
});


//Header form
navChangeClass = (element, item, index) => {
    document.querySelector(element).classList.toggle(item);
    document.querySelectorAll(".header__form__container p")[index].classList.toggle("invis");
}
// ---> Location

document.querySelector(".header__form__container__location").addEventListener("click", () => {
    navChangeClass(".header__form__list__location", "active", 0)
});

// ---> Tourists

document.querySelector(".header__form__container__tourist").addEventListener("click", () => {
    navChangeClass(".header__form__list__tourist", "active", 2)
});

// --> Calendar

document.addEventListener('DOMContentLoaded', () => {
    const calendar = new VanillaCalendar('#calendar');
    calendar.init();
});

document.querySelector(".header__form__container__date").addEventListener("click", () => {
    navChangeClass("#calendar", "none", 1)
});