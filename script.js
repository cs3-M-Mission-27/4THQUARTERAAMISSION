document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donation-form');
    const popup = document.getElementById('popup');
    const closeBtn = document.getElementById('close-btn');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const firstName = form.querySelector('input[type="text"][placeholder="First Name"]').value;
        const lastName = form.querySelector('input[type="text"][placeholder="Last Name"]').value;
        const fullName = firstName + ' ' + lastName;

        document.getElementById('popup-message').innerHTML = `Thank you, ${fullName}, for your generous contribution! Your support means the world to us and helps penguins thrive.`;
        popup.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });
});

let menu = document.querySelector('.fa-bars');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click',function(){
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
})

window.addEventListener('scroll', () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
})
const header = document.querySelector('header');
window.onscroll = function (){
    if(document.documentElement.scrollTop > 5){
        header.style.height = '70px';
        header.style.backgroundColor = '#fff';
    }else{
        header.style.height = '100px';
        header.style.backgroundColor = 'transparent';
    }
}
//light box
const lightBox = document.querySelector('.lightbox'),
itemBox = document.querySelectorAll('.thumbnail'),
totalItemBox = itemBox.length;
let lightBoxImage = lightBox.querySelector('.lightbox-img');
let itemIndex = 0;

for(let i = 0; i < totalItemBox; i++){
    itemBox[i].addEventListener('click', () => {
        itemIndex = i;
        changeImage();
        toggleLightBox();
    })
}
const nextSlide = () =>{
    if(itemIndex === totalItemBox - 1){
        itemIndex = 0;
    }else{
        itemIndex++;
    }
    changeImage();
}
const prevSlide = () =>{
    if(itemIndex === 0){
        totalItemBox - 1;
    }else{
        itemIndex--;
    }
    changeImage();
}
const toggleLightBox = () =>{
    lightBox.classList.toggle('open')
}
const changeImage = () =>{
    imgSrc = itemBox[itemIndex].querySelector('img').getAttribute('src');
    lightBoxImage.src = imgSrc;
}
//closing lightbox
const closelightBox = document.querySelector('.lightbox-close');
lightBox.addEventListener('click', (e) => {
    if(e.target === closelightBox){
        toggleLightBox();
    }
})