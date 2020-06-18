const ogConsole = console
console = () => {}

let myFullpage = new fullpage('#fullpage', {
    css3: true,
    menu: '#nav',
    onLeave: function (origin, destination, direction) {
        if(destination.isFirst) {
            document.querySelector('nav').classList.remove('black');
            document.querySelector('.lang-box').classList.remove('black');
        } else {
            document.querySelector('nav').classList.add('black');
            document.querySelector('.lang-box').classList.add('black');
        }

        if(destination.isLast) {
            document.querySelector('nav').style.display = 'none';
            document.querySelector('.lang-box').style.display = 'none';
        } else {
            document.querySelector('nav').style.display = 'flex';
            document.querySelector('.lang-box').style.display = 'flex';
        }
    }
});

console = ogConsole;

$('.projects-slider').slick({
    dots: false,
    infinite: false,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    prevArrow: '.prev-arrow',
    nextArrow: '.next-arrow'
});

function initProjectInfo(index) {
    let activeSlick = $('.slick-active');

    $('#category').html(activeSlick.attr('data-category'));
    $('#location').html(activeSlick.attr('data-location'));
    $('.area-p').html(activeSlick.attr('data-area'));
}

$('.projects-slider').on('afterChange', function(event, slick, direction){
    initProjectInfo(direction)    
});

function submitForm(form) {
    $.ajax({
        type: "POST",
        url: 'index.html',
        data: form.serialize(),
        success: function() {

        }
    })
}
function validate(form)  {
    let requiredFields = form.querySelectorAll('.required');
    let errors = 0;
    requiredFields.forEach(element => {
        if (element.value.length == 0) {
            element.parentElement.classList.add('warning');
            errors++;
        }
    });

    if(errors == 0) {
        submitForm(form);
    }

    setTimeout(() => {
        let warningFields = document.getElementsByClassName('input-group');
        console.log(warningFields)
        for (let i = 0; i < warningFields.length; i++) {
            warningFields[i].classList.remove('warning');
        }
    }, 5000);
}

let form = document.getElementById('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validate(form);
})

