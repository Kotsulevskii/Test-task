// Slider mobile version
if (window.matchMedia("(max-width: 850px)").matches) { 
    let slideBlog = document.querySelectorAll(".blog__card");
    let posLimitBlog = 50; 
    let posInitBlog = null;
    let countBlog = 0;

    getEvent = (event) => event.type.search('touch') !== -1 ? event.touches[0].clientX : event.x;
    slideInvisible = (arr) => arr.forEach((el) => { el.classList.add("none") });
    slideRemove = (arr, index) => arr[index].classList.remove("none");


    slideInvisible(slideBlog);
    slideRemove(slideBlog, 0);


    slideBlog.forEach((el) => {
        el.addEventListener("touchstart", swipeStart);
        el.addEventListener("touchmove", swipeEnd);
        el.addEventListener("mousedown", swipeStart);
        el.addEventListener("mousemove", swipeEnd);
    })


    function swipeStart (event) {
        posInitBlog = getEvent(event);
    }

    function swipeEnd(event) {

        posFinalBlog = posInitBlog - getEvent(event);

        if (!posInitBlog) {return false}; 
        
        if (Math.abs(posFinalBlog) > posLimitBlog) {

            slideInvisible(slideBlog);
            
            if (posFinalBlog > 0) {

                countBlog++;

                if (countBlog >= slideBlog.length) {
                    countBlog = 0;
                };
                slideRemove(slideBlog, countBlog);

            } else {

                countBlog--;

                if (countBlog < 0) {
                    countBlog = slideBlog.length - 1;
                };

                slideRemove(slideBlog, countBlog);
            };

            posInitBlog = null;
            posFinalBlog = null;
        }     
    };
}



