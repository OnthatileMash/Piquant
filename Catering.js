/**************************************************

PIQUANT CHILLI SAUCE

CATERING SERVICES

catering.js

Part 1

CONTENTS

1. Strict Mode
2. Cached DOM Elements
3. Utility Functions
4. Page Initialization
5. Page Loader
6. Sticky Header
7. Mobile Navigation
8. Smooth Scrolling
9. Scroll Spy Navigation
10. Hero Animations

**************************************************/

"use strict";


/*=================================================
2. CACHED DOM ELEMENTS
=================================================*/

const body = document.body;

const header = document.querySelector(".header");

const navigation = document.querySelector(".navigation");

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelectorAll(".navigation a");

const heroSection = document.querySelector(".hero-section");

const heroContent = document.querySelector(".hero-content");

const pageLoader = document.querySelector(".page-loader");

const quickLinks = document.querySelectorAll('a[href^="#"]');



/*=================================================
3. UTILITY FUNCTIONS
=================================================*/


/*
Toggle a class on an element.
*/

const toggleClass = (element, className) => {

    if (!element) return;

    element.classList.toggle(className);

};



/*
Add a class.
*/

const addClass = (element, className) => {

    if (!element) return;

    element.classList.add(className);

};



/*
Remove a class.
*/

const removeClass = (element, className) => {

    if (!element) return;

    element.classList.remove(className);

};



/*
Smooth scroll helper.
*/

const smoothScroll = (targetID) => {

    const target = document.querySelector(targetID);

    if (!target) return;

    target.scrollIntoView({

        behavior: "smooth",
        block: "start"

    });

};



/*
Debounce function.
*/

const debounce = (callback, delay = 100) => {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

};



/*=================================================
4. PAGE INITIALIZATION
=================================================*/


const initialisePage = () => {

    pageLoaderAnimation();

    initialiseStickyHeader();

    initialiseMobileNavigation();

    initialiseSmoothScrolling();

    initialiseScrollSpy();

    initialiseHeroAnimations();

};


document.addEventListener("DOMContentLoaded", initialisePage);



/*=================================================
5. PAGE LOADER
=================================================*/


const pageLoaderAnimation = () => {

    if (!pageLoader) return;

    window.addEventListener("load", () => {

        setTimeout(() => {

            addClass(pageLoader, "loaded");

        }, 500);

    });

};



/*=================================================
6. STICKY HEADER
=================================================*/


const initialiseStickyHeader = () => {

    if (!header) return;

    const stickyHeader = () => {

        if (window.scrollY > 80) {

            addClass(header, "scrolled");

        }

        else {

            removeClass(header, "scrolled");

        }

    };

    window.addEventListener(

        "scroll",

        stickyHeader,

        { passive: true }

    );

};



/*=================================================
7. MOBILE NAVIGATION
=================================================*/


const initialiseMobileNavigation = () => {

    if (!menuToggle || !navigation) return;


    menuToggle.addEventListener("click", () => {

        toggleClass(navigation, "active");

        toggleClass(menuToggle, "active");

        toggleClass(body, "menu-open");

    });


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            removeClass(navigation, "active");

            removeClass(menuToggle, "active");

            removeClass(body, "menu-open");

        });

    });


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            removeClass(navigation, "active");

            removeClass(menuToggle, "active");

            removeClass(body, "menu-open");

        }

    });

};



/*=================================================
8. SMOOTH SCROLLING
=================================================*/


const initialiseSmoothScrolling = () => {

    quickLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const href = link.getAttribute("href");


            if (!href.startsWith("#")) return;


            event.preventDefault();

            smoothScroll(href);

        });

    });

};



/*=================================================
9. SCROLL SPY NAVIGATION
=================================================*/


const initialiseScrollSpy = () => {

    const sections = document.querySelectorAll("section[id]");


    window.addEventListener("scroll", () => {

        const scrollPosition = window.scrollY + 150;


        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            const sectionHeight = section.offsetHeight;

            const sectionID = section.getAttribute("id");


            if (

                scrollPosition >= sectionTop &&

                scrollPosition < sectionTop + sectionHeight

            ) {

                navLinks.forEach(link => {

                    removeClass(link, "active");


                    if (

                        link.getAttribute("href") ===

                        `#${sectionID}`

                    ) {

                        addClass(link, "active");

                    }

                });

            }

        });

    },

    { passive: true });

};



/*=================================================
10. HERO ANIMATIONS
=================================================*/


const initialiseHeroAnimations = () => {

    if (!heroContent) return;


    heroContent.classList.add("fade-up");


};



/**************************************************

END OF PART 1

**************************************************/

/**************************************************

PIQUANT CHILLI SAUCE

CATERING SERVICES

catering.js

Part 2

CONTENTS

11. Scroll Reveal Animations
12. Quick Navigation Cards
13. Our Process Section
14. Catering Services Cards
15. Catering Packages
16. Signature Menu
17. Performance Optimisations

**************************************************/


/*=================================================
11. SCROLL REVEAL ANIMATIONS
=================================================*/


const initialiseScrollReveal = () => {

    const animatedElements = document.querySelectorAll(

        ".section-heading," +
        ".feature-card," +
        ".process-card," +
        ".service-card," +
        ".package-card," +
        ".menu-card"

    );


    if (!animatedElements.length) return;


    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fade-up");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );


    animatedElements.forEach((element) => {

        observer.observe(element);

    });

};



/*=================================================
12. QUICK NAVIGATION CARDS
=================================================*/


const initialiseQuickNavigation = () => {

    const quickCards = document.querySelectorAll(

        ".quick-card"

    );


    if (!quickCards.length) return;


    quickCards.forEach((card) => {

        card.addEventListener("click", () => {

            const targetID = card.dataset.target;

            if (!targetID) return;

            smoothScroll(`#${targetID}`);

        });

    });

};



/*=================================================
13. OUR PROCESS SECTION
=================================================*/


const initialiseProcessCards = () => {

    const processCards = document.querySelectorAll(

        ".process-card"

    );


    if (!processCards.length) return;


    processCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 0.2}s`;

    });

};



/*=================================================
14. CATERING SERVICES SECTION
=================================================*/


const initialiseServiceCards = () => {

    const serviceCards = document.querySelectorAll(

        ".service-card"

    );


    if (!serviceCards.length) return;


    serviceCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("shadow");

        });


        card.addEventListener("mouseleave", () => {

            card.classList.remove("shadow");

        });

    });

};



/*=================================================
15. CATERING PACKAGES SECTION
=================================================*/


const initialisePackageCards = () => {

    const packageCards = document.querySelectorAll(

        ".package-card"

    );


    if (!packageCards.length) return;


    packageCards.forEach((card) => {

        card.addEventListener("click", () => {


            packageCards.forEach((item) => {

                item.classList.remove("selected");

            });


            card.classList.add("selected");

        });

    });

};



/*=================================================
16. SIGNATURE MENU SECTION
=================================================*/


const initialiseSignatureMenu = () => {

    const menuCards = document.querySelectorAll(

        ".menu-card"

    );


    if (!menuCards.length) return;


    menuCards.forEach((card) => {

        card.addEventListener("mouseenter", () => {

            card.classList.add("float");

        });


        card.addEventListener("mouseleave", () => {

            card.classList.remove("float");

        });

    });

};



/*=================================================
17. PERFORMANCE OPTIMISATIONS
=================================================*/


const initialisePerformance = () => {


    /*
    Lazy load images.
    */

    const images = document.querySelectorAll(

        "img"

    );


    images.forEach((image) => {

        image.loading = "lazy";

    });


    /*
    Improve scrolling performance.
    */

    window.addEventListener(

        "resize",

        debounce(() => {

            console.log(

                "Viewport resized."

            );

        }, 200)

    );

};



/**************************************************

INITIALISE PART 2 FUNCTIONS

**************************************************/


const initialiseContentSections = () => {

    initialiseScrollReveal();

    initialiseQuickNavigation();

    initialiseProcessCards();

    initialiseServiceCards();

    initialisePackageCards();

    initialiseSignatureMenu();

    initialisePerformance();

};


/*
Add this line inside the
initialisePage() function
in Part 1.
*/


/*

initialiseContentSections();

*/


/************************************************** END OF PART 2 **************************************************/

/**************************************************

PIQUANT CHILLI SAUCE

CATERING SERVICES

catering.js

Part 3

CONTENTS

18. Gallery Lightbox
19. Testimonials
20. FAQ Accordion
21. Booking Form Validation
22. Form Submission Handler
23. WhatsApp Button
24. Scroll-To-Top Button
25. Accessibility
26. Performance

**************************************************/


/*=================================================
18. PREMIUM GALLERY LIGHTBOX
=================================================*/


const initialiseGallery = () => {

    const galleryImages = document.querySelectorAll(

        ".gallery-item img"

    );

    const lightbox = document.querySelector(

        ".lightbox"

    );

    const lightboxImage = document.querySelector(

        ".lightbox img"

    );

    const closeButton = document.querySelector(

        ".lightbox-close"

    );


    if (!galleryImages.length || !lightbox) return;


    galleryImages.forEach((image) => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;

            lightboxImage.alt = image.alt;

            lightbox.classList.add("open");

            body.style.overflow = "hidden";

        });

    });


    closeButton.addEventListener("click", () => {

        lightbox.classList.remove("open");

        body.style.overflow = "";

    });


    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.classList.remove("open");

            body.style.overflow = "";

        }

    });

};



/*=================================================
19. TESTIMONIALS
=================================================*/


const initialiseTestimonials = () => {


    /*
    Reserved for future implementation.

    Future features:

    - Slider
    - Auto rotation
    - Swipe support
    - Rating system

    */


    console.log(

        "Testimonials loaded."

    );

};



/*=================================================
20. FAQ ACCORDION
=================================================*/


const initialiseFAQ = () => {

    const faqItems = document.querySelectorAll(

        ".faq-item"

    );


    faqItems.forEach((item) => {

        const question = item.querySelector(

            ".faq-question"

        );

        const answer = item.querySelector(

            ".faq-answer"

        );


        question.addEventListener("click", () => {


            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {

                    const otherAnswer = otherItem.querySelector(

                        ".faq-answer"

                    );

                    otherAnswer.style.maxHeight = null;

                }

            });


            if (answer.style.maxHeight) {

                answer.style.maxHeight = null;

            }

            else {

                answer.style.maxHeight =

                    answer.scrollHeight + "px";

            }

        });

    });

};



/*=================================================
21. BOOKING FORM VALIDATION
=================================================*/


const validateEmail = (email) => {

    const pattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

};



const validatePhoneNumber = (phone) => {

    const pattern =

        /^[0-9+\s()-]{9,20}$/;

    return pattern.test(phone);

};



const validateFutureDate = (date) => {

    const selectedDate = new Date(date);

    const today = new Date();

    today.setHours(0,0,0,0);

    return selectedDate >= today;

};



/*=================================================
22. FORM SUBMISSION
=================================================*/


const initialiseBookingForm = () => {

    const form = document.querySelector(

        ".booking-form"

    );


    if (!form) return;


    form.addEventListener("submit",

        (event) => {

            event.preventDefault();


            const formData = new FormData(form);


            const email = form.querySelector(

                'input[type="email"]'

            ).value.trim();


            const phone = form.querySelector(

                'input[type="tel"]'

            ).value.trim();


            const date = form.querySelector(

                'input[type="date"]'

            ).value;


            if (!validateEmail(email)) {

                alert(

                    "Please enter a valid email address."

                );

                return;

            }


            if (!validatePhoneNumber(phone)) {

                alert(

                    "Please enter a valid phone number."

                );

                return;

            }


            if (!validateFutureDate(date)) {

                alert(

                    "Please select a future event date."

                );

                return;

            }


            alert(

                "Thank you! Your quote request has been received."

            );


            form.reset();

        }

    );

};



/*=================================================
23. WHATSAPP BUTTON
=================================================*/


const initialiseWhatsAppButton = () => {

    const button = document.querySelector(

        ".whatsapp-float"

    );


    if (!button) return;


    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 250) {

                button.classList.add("float");

            }

            else {

                button.classList.remove("float");

            }

        },

        { passive:true }

    );

};



/*=================================================
24. SCROLL TO TOP BUTTON
=================================================*/


const initialiseScrollTop = () => {

    const button = document.querySelector(

        ".scroll-top"

    );


    if (!button) return;


    window.addEventListener(

        "scroll",

        () => {

            if (window.scrollY > 500) {

                button.classList.add("show");

            }

            else {

                button.classList.remove("show");

            }

        },

        { passive:true }

    );


    button.addEventListener("click",

        () => {

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    );

};



/*=================================================
25. ACCESSIBILITY
=================================================*/


const initialiseAccessibility = () => {


    document.addEventListener(

        "keydown",

        (event) => {

            if (

                event.key === "Escape"

            ) {

                const lightbox = document.querySelector(

                    ".lightbox"

                );

                if (lightbox) {

                    lightbox.classList.remove(

                        "open"

                    );

                }

            }

        }

    );

};



/*=================================================
26. PERFORMANCE OPTIMISATIONS
=================================================*/


const optimisePerformance = () => {


    /*
    Passive scrolling.
    */

    document.addEventListener(

        "touchstart",

        () => {},

        {

            passive:true

        }

    );


    /*
    Future optimisation area.
    */

};



/**************************************************

INITIALISE PART 3 FUNCTIONS

**************************************************/


const initialiseBusinessFeatures = () => {

    initialiseGallery();

    initialiseTestimonials();

    initialiseFAQ();

    initialiseBookingForm();

    initialiseWhatsAppButton();

    initialiseScrollTop();

    initialiseAccessibility();

    optimisePerformance();

};



/*

Add this function call inside

initialisePage()


initialiseBusinessFeatures();


*/


/************************************************** END OF PART 3 **************************************************/
