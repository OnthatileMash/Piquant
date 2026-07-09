/*
====================================================
PIQUANT CHILLI SAUCE
sauces.js
PART 1
====================================================

Contains

✓ Page Loader
✓ Sticky Header
✓ Active Navigation
✓ Smooth Scrolling
✓ Hero Animation
✓ Reveal Animations
✓ Product Card Effects
✓ Gallery Image Switching
✓ Utility Functions

====================================================
*/

"use strict";

/*==================================================
DOM ELEMENTS
==================================================*/

const header = document.querySelector("#main-header");

const navigationLinks = document.querySelectorAll(
".quick-card, .navigation a"
);

const productCards = document.querySelectorAll(
".product-card"
);

const revealElements = document.querySelectorAll(

".product-card, \
.quick-card, \
.sauce-showcase, \
.flavour-profile, \
.nutrition-section"

);

const galleryContainers = document.querySelectorAll(

".sauce-gallery"

);

/*==================================================
INITIALISE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initialisePage();

});

/*==================================================
INITIALISE FUNCTIONS
==================================================*/

function initialisePage(){

    initialiseHeader();

    initialiseSmoothScroll();

    initialiseNavigationHighlight();

    initialiseRevealAnimations();

    initialiseProductCards();

    initialiseGallery();

    initialiseHeroAnimation();

}

/*==================================================
HEADER
==================================================*/

function initialiseHeader(){

    if(!header) return;

    window.addEventListener("scroll", ()=>{

        if(window.scrollY > 80){

            header.classList.add("minimized");

        }

        else{

            header.classList.remove("minimized");

        }

    });

}

/*==================================================
SMOOTH SCROLL
==================================================*/

function initialiseSmoothScroll(){

    navigationLinks.forEach(link=>{

        const href = link.getAttribute("href");

        if(!href) return;

        if(!href.startsWith("#")) return;

        link.addEventListener("click",(event)=>{

            event.preventDefault();

            const target = document.querySelector(href);

            if(!target) return;

            target.scrollIntoView({

                behavior:"smooth",

                block:"start"

            });

        });

    });

}

/*==================================================
ACTIVE NAVIGATION
==================================================*/

function initialiseNavigationHighlight(){

    const sections = document.querySelectorAll(

        "section[id]"

    );

    if(!sections.length) return;

    window.addEventListener("scroll",()=>{

        let currentSection="";

        sections.forEach(section=>{

            const top = section.offsetTop - 150;

            const height = section.offsetHeight;

            if(

                pageYOffset >= top &&

                pageYOffset < top + height

            ){

                currentSection = section.id;

            }

        });

        navigationLinks.forEach(link=>{

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if(href === "#" + currentSection){

                link.classList.add("active");

            }

        });

    });

}

/*==================================================
HERO FADE
==================================================*/

function initialiseHeroAnimation(){

    const hero = document.querySelector(".hero-overlay");

    if(!hero) return;

    hero.style.opacity="0";

    hero.style.transform="translateY(50px)";

    setTimeout(()=>{

        hero.style.transition="all 1s ease";

        hero.style.opacity="1";

        hero.style.transform="translateY(0)";

    },300);

}

/*==================================================
REVEAL ANIMATIONS
==================================================*/

function initialiseRevealAnimations(){

    if(!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(

        (entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add(

                        "fade-up"

                    );

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15

        }

    );

    revealElements.forEach(element=>{

        observer.observe(element);

    });

}

/*==================================================
PRODUCT CARD EFFECTS
==================================================*/

function initialiseProductCards(){

    productCards.forEach(card=>{

        card.addEventListener(

            "mouseenter",

            ()=>{

                card.style.transform =

                "translateY(-12px)";

            }

        );

        card.addEventListener(

            "mouseleave",

            ()=>{

                card.style.transform =

                "";

            }

        );

    });

}

/*==================================================
GALLERY
==================================================*/

function initialiseGallery(){

    galleryContainers.forEach(gallery=>{

        const mainImage =

        gallery.querySelector(

            ".main-image img"

        );

        const thumbnails =

        gallery.querySelectorAll(

            ".thumbnail-gallery img"

        );

        if(!mainImage) return;

        thumbnails.forEach(thumbnail=>{

            thumbnail.addEventListener(

                "click",

                ()=>{

                    const source = thumbnail.src;

                    const alt = thumbnail.alt;

                    mainImage.src = source;

                    mainImage.alt = alt;

                }

            );

        });

    });

}

/*==================================================
UTILITY
==================================================*/

function scrollToElement(selector){

    const element =

    document.querySelector(selector);

    if(!element) return;

    element.scrollIntoView({

        behavior:"smooth"

    });

}

/*==================================================
WINDOW LOAD
==================================================*/

window.addEventListener(

    "load",

    ()=>{

        document.body.classList.add(

            "loaded"

        );

    }

);

/*
====================================================
PIQUANT CHILLI SAUCE
SAUCES.JS
PART 2

Contains

✓ FAQ Accordion
✓ Scroll Progress Bar
✓ Scroll To Top Button
✓ Floating WhatsApp Animation
✓ Counter Animation
✓ Flavour Meter Animation
✓ Utility Functions

====================================================
*/

"use strict";

/*==================================================
DOM ELEMENTS
==================================================*/

const faqItems = document.querySelectorAll(".faq-item");

const progressBar = document.querySelector(".progress-bar");

const scrollTopButton = document.querySelector(".scroll-top");

const whatsappButton = document.querySelector(".whatsapp-float");

const counters = document.querySelectorAll(".counter");

const flavourMeters = document.querySelectorAll(".fill");

/*==================================================
INITIALISE
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initialiseFAQ();

    initialiseProgressBar();

    initialiseScrollTop();

    initialiseWhatsApp();

    initialiseCounters();

    initialiseFlavourMeters();

});

/*==================================================
FAQ ACCORDION
==================================================*/

function initialiseFAQ(){

    faqItems.forEach(item=>{

        const question = item.querySelector(".faq-question");

        if(!question) return;

        question.addEventListener("click",()=>{

            faqItems.forEach(faq=>{

                if(faq!==item){

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

}

/*==================================================
SCROLL PROGRESS BAR
==================================================*/

function initialiseProgressBar(){

    if(!progressBar) return;

    window.addEventListener("scroll",()=>{

        const scrollTop = document.documentElement.scrollTop;

        const pageHeight =

            document.documentElement.scrollHeight -

            document.documentElement.clientHeight;

        const progress =

            (scrollTop / pageHeight) * 100;

        progressBar.style.width = progress + "%";

    });

}

/*==================================================
SCROLL TO TOP BUTTON
==================================================*/

function initialiseScrollTop(){

    if(!scrollTopButton) return;

    window.addEventListener("scroll",()=>{

        if(window.scrollY > 600){

            scrollTopButton.classList.add("show");

        }

        else{

            scrollTopButton.classList.remove("show");

        }

    });

    scrollTopButton.addEventListener("click",(event)=>{

        event.preventDefault();

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    });

}

/*==================================================
WHATSAPP BUTTON EFFECT
==================================================*/

function initialiseWhatsApp(){

    if(!whatsappButton) return;

    let direction = 1;

    setInterval(()=>{

        whatsappButton.style.transform =

            `translateY(${direction * -6}px)`;

        direction *= -1;

    },800);

}

/*==================================================
COUNTER ANIMATION
==================================================*/

function initialiseCounters(){

    if(!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    animateCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.4

        }

    );

    counters.forEach(counter=>{

        observer.observe(counter);

    });

}

function animateCounter(counter){

    const target =

        Number(counter.dataset.target);

    const duration = 1800;

    const step = target / (duration / 16);

    let current = 0;

    function update(){

        current += step;

        if(current >= target){

            counter.textContent = target;

            return;

        }

        counter.textContent = Math.floor(current);

        requestAnimationFrame(update);

    }

    update();

}

/*==================================================
FLAVOUR METER ANIMATION
==================================================*/

function initialiseFlavourMeters(){

    if(!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(

        entries=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    animateMeter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.4

        }

    );

    flavourMeters.forEach(meter=>{

        observer.observe(meter);

    });

}

function animateMeter(meter){

    const finalWidth =

        window.getComputedStyle(meter).width;

    meter.style.width = "0";

    setTimeout(()=>{

        meter.style.transition =

            "width 1.5s ease";

        meter.style.width = finalWidth;

    },150);

}

/*==================================================
UTILITY
==================================================*/

function debounce(callback, delay){

    let timer;

    return function(){

        clearTimeout(timer);

        timer = setTimeout(

            ()=>callback.apply(this, arguments),

            delay

        );

    };

}

/*==================================================
WINDOW RESIZE
==================================================*/

window.addEventListener(

    "resize",

    debounce(()=>{

        console.log("Window resized.");

    },250)

);

/*
=========================================================
PIQUANT CHILLI SAUCE
SAUCES.JS
PART 3

Contains

✓ Lightbox Gallery
✓ Recipe Filtering
✓ Product Comparison Highlighting
✓ Lazy Loading
✓ Keyboard Accessibility
✓ Touch Swipe Gallery
✓ Performance Optimisations

=========================================================
*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const galleryImages = document.querySelectorAll(".gallery-image");

const lightbox = document.querySelector(".lightbox");

const lightboxImage = document.querySelector(".lightbox img");

const lightboxClose = document.querySelector(".lightbox-close");

const recipeButtons = document.querySelectorAll(".recipe-filter button");

const recipeCards = document.querySelectorAll(".recipe-card");

const comparisonRows = document.querySelectorAll(".comparison-table tbody tr");

/*=========================================================
INITIALISE
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initialiseLightbox();

    initialiseRecipeFilter();

    initialiseComparison();

    initialiseLazyLoading();

    initialiseKeyboardSupport();

    initialiseSwipeGallery();

});

/*=========================================================
LIGHTBOX GALLERY
=========================================================*/

function initialiseLightbox(){

    if(!lightbox) return;

    galleryImages.forEach(image=>{

        image.addEventListener("click",()=>{

            lightbox.classList.add("active");

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            document.body.style.overflow="hidden";

        });

    });

    lightboxClose.addEventListener("click",closeLightbox);

    lightbox.addEventListener("click",(event)=>{

        if(event.target===lightbox){

            closeLightbox();

        }

    });

}

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

/*=========================================================
RECIPE FILTER
=========================================================*/

function initialiseRecipeFilter(){

    recipeButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            const category =

            button.dataset.filter;

            recipeButtons.forEach(btn=>{

                btn.classList.remove("active");

            });

            button.classList.add("active");

            recipeCards.forEach(card=>{

                if(

                    category==="all" ||

                    card.dataset.category===category

                ){

                    card.style.display="block";

                }

                else{

                    card.style.display="none";

                }

            });

        });

    });

}

/*=========================================================
COMPARISON TABLE
=========================================================*/

function initialiseComparison(){

    comparisonRows.forEach(row=>{

        row.addEventListener("mouseenter",()=>{

            row.style.background="#252525";

        });

        row.addEventListener("mouseleave",()=>{

            row.style.background="";

        });

    });

}

/*=========================================================
LAZY IMAGE LOADING
=========================================================*/

function initialiseLazyLoading(){

    if(!("IntersectionObserver" in window)) return;

    const lazyImages =

    document.querySelectorAll("img[data-src]");

    const observer =

    new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                const image = entry.target;

                image.src = image.dataset.src;

                image.removeAttribute("data-src");

                observer.unobserve(image);

            }

        });

    });

    lazyImages.forEach(image=>{

        observer.observe(image);

    });

}

/*=========================================================
KEYBOARD ACCESSIBILITY
=========================================================*/

function initialiseKeyboardSupport(){

    document.addEventListener("keydown",(event)=>{

        if(event.key==="Escape"){

            closeLightbox();

        }

    });

}

/*=========================================================
SWIPE GALLERY
=========================================================*/

function initialiseSwipeGallery(){

    const galleries =

    document.querySelectorAll(".main-image");

    galleries.forEach(gallery=>{

        let startX = 0;

        gallery.addEventListener(

            "touchstart",

            event=>{

                startX =

                event.touches[0].clientX;

            }

        );

        gallery.addEventListener(

            "touchend",

            event=>{

                const endX =

                event.changedTouches[0].clientX;

                const distance =

                startX - endX;

                if(Math.abs(distance) < 60) return;

                const thumbs =

                gallery.parentElement.querySelectorAll(

                ".thumbnail-gallery img"

                );

                if(!thumbs.length) return;

                let current =

                gallery.querySelector("img").src;

                let index = [...thumbs].findIndex(

                thumb=>thumb.src===current

                );

                if(distance>0){

                    index++;

                }

                else{

                    index--;

                }

                if(index<0){

                    index = thumbs.length-1;

                }

                if(index>=thumbs.length){

                    index = 0;

                }

                gallery.querySelector("img").src =

                thumbs[index].src;

            }

        );

    });

}

/*=========================================================
PERFORMANCE
=========================================================*/

function throttle(callback,delay){

    let waiting=false;

    return function(){

        if(waiting) return;

        callback.apply(this,arguments);

        waiting=true;

        setTimeout(()=>{

            waiting=false;

        },delay);

    };

}

window.addEventListener(

"scroll",

throttle(()=>{

    // Reserved for future animations

},20)

);

/*=========================================================
END OF PART 3
=========================================================*/


/*
=========================================================
PIQUANT CHILLI SAUCE
SAUCES.JS
PART 4

Contains

✓ Page Loader
✓ Mobile Navigation
✓ Hero Parallax
✓ Reduced Motion Support
✓ Resize Optimisation
✓ Error Handling
✓ Utility Functions
✓ Application Bootstrap

=========================================================
*/

"use strict";

/*=========================================================
DOM ELEMENTS
=========================================================*/

const body = document.body;

const loader = document.querySelector(".page-loader");

const mobileToggle = document.querySelector(".menu-toggle");

const navigation = document.querySelector(".navigation");

const hero = d
