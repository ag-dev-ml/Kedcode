
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    menuIcon.classList.toggle("active");
};
let sections=document.querySelectorAll("section");
let navLinks=document.querySelectorAll("header nav a");
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove("active");
                document.querySelector("header nav a[href*="+ id + "]").classList.add("active");
            });
        };
    });
    let header = document.querySelector("header"); 
    header.classList.toggle("sticky",window.scrollY > 100);
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.remove("active");  
};

ScrollReveal({
    reset:true,
    distance:'80px',
    duration:2000,
    delay:200
});

ScrollReveal().reveal(".home-content,.heading",{origin:"top"});
ScrollReveal().reveal(".home-img,.services-container,.portfolio-box,.contact form",{origin:"bottom"});
ScrollReveal().reveal(".home-content h1,.about-img",{origin:"left"});
ScrollReveal().reveal(".home-content p,.about-content",{origin:"right"});

const typed = new Typed(".multiple-text",{
    strings:["Developer","Programmer","Freelancer","Artificial Intelligence Enginner","Machine Learning Engineer"],
    typeSpeed:70,
    backSpeed:100,
    backDelay:1000,
    loop:true
});


const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    const formData = new FormData(form);
    e.preventDefault();

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait..."

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = json.message;
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 3000);
        });
});