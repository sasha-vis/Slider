const slider = function(sliderId, buttonNextId, buttonPrevId, auto){
    let slider = document.querySelector(`#${sliderId}`);
    let buttonNext = document.querySelector(`#${buttonNextId}`);
    let buttonPrev = document.querySelector(`#${buttonPrevId}`);
    
    if (!slider || !buttonNext || !buttonPrev) return;

    const sliders = slider.querySelectorAll('li');

    if (sliders.length <= 1) return;

    let slider1 = sliders[0];
    const sliderLast = sliders[sliders.length-1];
    let sI;
    const autoSlider = function() {
        if (auto == false) return;
        sI = setInterval(function() {
            nextPrev('next')
        }, 1000);
    };

    const nextPrev = function(action){
        buttonNext.disabled = true;
        buttonPrev.disabled = true;
        clearInterval(sI);
        let slider1Clone;
        let sliderLastClone;

        let marginLeft = Math.abs(parseInt(slider1.style.marginLeft));
        if (!marginLeft) marginLeft = 0;
        if (action == 'next' && marginLeft == (sliders.length*100)-100) {
            slider1Clone = slider1.cloneNode(true);
            slider1Clone.classList.add('clone');
            slider1Clone.style.marginLeft = '0';
            slider.appendChild(slider1Clone);
            if (!slider1Clone) marginLeft=-100;
        }
        if (action == 'prev' && marginLeft == 0 ) {
            marginLeft = (sliders.length*100);

           sliderLastClone = sliderLast.cloneNode(true);
           sliderLastClone.classList.add('clone');
           slider.insertBefore(sliderLastClone, slider1);
           slider1.style.marginLeft = '';
           slider1 = sliderLastClone;
           slider1.style.marginLeft = '-100%';
           marginLeft = 100;
        }

        const slideStep = 100;
        let slideStartMl = marginLeft;

        const slide = function() {
            marginLeft = marginLeft + 2 * (action == 'prev' ? -1 : 1);
            slider1.style.marginLeft = `-${marginLeft}%`;
            if ((action == 'next' && marginLeft < (slideStartMl + slideStep)) ||
                (action == 'prev' && marginLeft > (slideStartMl - slideStep))){
                window.requestAnimationFrame(slide);
            } else {
                buttonNext.disabled = false;
                buttonPrev.disabled = false;
                if (slider1Clone) {
                    slider1Clone.remove();
                    slider1Clone = undefined;
                    slider1.style.marginLeft = 0;
                }
                if (sliderLastClone) {
                    sliderLastClone.remove();
                    sliderLastClone = undefined;
                    marginLeft = (sliders.length*100)-100;
                    slider1 = sliders[0];
                    slider1.style.marginLeft = `-${marginLeft}%`;
                }
                
                autoSlider();
            }
        };
        slide();
    };
    buttonNext.addEventListener('click', function(){
        nextPrev('next');
    });
    buttonPrev.addEventListener('click', function(){
        nextPrev('prev');
    });

    autoSlider();
};

