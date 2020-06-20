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
    $('#project-more').attr('href', activeSlick.attr('data-url'));
}
initProjectInfo();
$('.projects-slider').on('afterChange', function(event, slick, direction){
    initProjectInfo(direction)    
});

let phoneNumbeInput = document.getElementById('phone-number');
let maskOption = {
    mask: '+{998} (90)-000-00-00'
}
let mask = IMask(phoneNumbeInput, maskOption);

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

let galleryPhotos = document.querySelectorAll('.photo');


function openModal(index) {
    let indexPhoto = index;
    let allPhotos = document.getElementsByClassName('photo');
    let modal = document.querySelector('.modal');
    let modalImg = document.getElementById('modalImg');
    let next = document.querySelector('.modal-next');
    let prev = document.querySelector('.modal-prev');
    let close = document.getElementById('close');
    modalImg.src = allPhotos[indexPhoto].querySelector('.photo-img').src;
    modal.classList.add('active');

    
    close.onclick =  function () {
        modal.classList.remove('active');
    };

    next.onclick =  function () {
        indexPhoto++;
        if(indexPhoto > allPhotos.length) {
            indexPhoto = 0;
        }
        modalImg.src = allPhotos[indexPhoto].querySelector('.photo-img').src;
    };

    prev.onclick =  function () {
        indexPhoto--;
        if(indexPhoto < 0) {
            indexPhoto = 0;
        }
        modalImg.src = allPhotos[indexPhoto].querySelector('.photo-img').src;
    };

}


for (let i = 0; i < galleryPhotos.length; i++) {
    const element = galleryPhotos[i];
    element.addEventListener('click', function() {
        openModal(i);
    })
    
}


