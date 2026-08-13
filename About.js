/* =========================================================
   PIQUANT CHILLI SAUCE
   ABOUT PAGE JAVASCRIPT
   File: About.js
   ========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation();
    initHeaderScroll();
    initSmoothScrolling();
    initActiveNavigation();
    initScrollReveal();
    initFaqAccordion();
    initBackToTop();
    initCurrentYear();
    initImageHandling();
});


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

function initMobileNavigation() {

    const menuToggle = document.querySelector(
        ".menu-toggle"
    );

    const navigation = document.querySelector(
        ".navigation"
    );

    if (!menuToggle || !navigation) {
        return;
    }


    const closeMenu = () => {

        navigation.classList.remove("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    };


    const openMenu = () => {

        navigation.classList.add("is-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    };


    menuToggle.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            navigation.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /*
     * Close the mobile navigation after
     * selecting a navigation link.
     */

    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /*
     * Close navigation when clicking outside it.
     */

    document.addEventListener("click", (event) => {

        if (
            navigation.classList.contains("is-open") &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }

    });


    /*
     * Close mobile navigation when switching
     * back to desktop width.
     */

    window.addEventListener("resize", () => {

        if (window.innerWidth >= 900) {
            closeMenu();
        }

    });

}


/* =========================================================
   3. HEADER SCROLL EFFECT
   ========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".header");

    if (!header) {
        return;
    }


    const updateHeader = () => {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   4. SMOOTH INTERNAL NAVIGATION
   ========================================================= */

function initSmoothScrolling() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetID =
                link.getAttribute("href");


            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetID);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });


            /*
             * Update the browser URL without
             * forcing another jump.
             */

            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    targetID
                );

            }

        });

    });

}


/* =========================================================
   5. ACTIVE NAVIGATION
   ========================================================= */

function initActiveNavigation() {

    const links =
        document.querySelectorAll(
            ".navigation a"
        );


    if (!links.length) {
        return;
    }


    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    links.forEach((link) => {

        let linkPage = "";


        try {

            const linkURL =
                new URL(
                    link.href,
                    window.location.href
                );


            linkPage =
                linkURL.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();

        } catch (error) {

            return;

        }


        if (
            currentPage &&
            linkPage &&
            currentPage === linkPage
        ) {

            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );

        }

    });

}


/* =========================================================
   6. SCROLL REVEAL
   ========================================================= */

function initScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal, " +
            ".about-card, " +
            ".value-card, " +
            ".story-card, " +
            ".team-card, " +
            ".timeline-item, " +
            ".contact-card"
        );


    if (!revealElements.length) {
        return;
    }


    /*
     * If the browser does not support
     * IntersectionObserver, show everything.
     */

    if (
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "is-visible"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        observer.observe(element);

    });

}


/* =========================================================
   7. FAQ / ACCORDION
   ========================================================= */

function initFaqAccordion() {

    const questions =
        document.querySelectorAll(
            ".faq-question"
        );


    if (!questions.length) {
        return;
    }


    questions.forEach((question) => {

        let answer = null;


        const answerID =
            question.getAttribute(
                "aria-controls"
            );


        if (answerID) {

            answer =
                document.getElementById(answerID);

        }


        /*
         * Fallback when aria-controls is not
         * included in the HTML.
         */

        if (!answer) {

            answer =
                question.nextElementSibling;

        }


        if (!answer) {
            return;
        }


        /*
         * Set initial accessibility state.
         */

        const initiallyExpanded =
            question.getAttribute(
                "aria-expanded"
            ) === "true";


        answer.hidden =
            !initiallyExpanded;


        question.addEventListener(
            "click",
            () => {

                const currentlyExpanded =
                    question.getAttribute(
                        "aria-expanded"
                    ) === "true";


                /*
                 * Close the other accordion
                 * items so only one remains open.
                 */

                questions.forEach(
                    (otherQuestion) => {

                        if (
                            otherQuestion === question
                        ) {
                            return;
                        }


                        const otherID =
                            otherQuestion.getAttribute(
                                "aria-controls"
                            );


                        const otherAnswer =
                            otherID
                                ? document.getElementById(
                                      otherID
                                  )
                                : otherQuestion.nextElementSibling;


                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        if (otherAnswer) {

                            otherAnswer.hidden = true;

                        }

                    }
                );


                /*
                 * Toggle selected item.
                 */

                question.setAttribute(
                    "aria-expanded",
                    String(!currentlyExpanded)
                );


                answer.hidden =
                    currentlyExpanded;

            }
        );

    });

}


/* =========================================================
   8. BACK TO TOP
   ========================================================= */

function initBackToTop() {

    const backToTop =
        document.querySelector(
            ".back-to-top, .scroll-top"
        );


    if (!backToTop) {
        return;
    }


    const updateVisibility = () => {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "is-visible"
            );

        } else {

            backToTop.classList.remove(
                "is-visible"
            );

        }

    };


    updateVisibility();


    window.addEventListener(
        "scroll",
        updateVisibility,
        { passive: true }
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   9. CURRENT YEAR
   ========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year], #current-year"
        );


    if (!yearElements.length) {
        return;
    }


    const year =
        new Date().getFullYear();


    yearElements.forEach((element) => {

        element.textContent = year;

    });

}


/* =========================================================
   10. IMAGE HANDLING
   ========================================================= */

function initImageHandling() {

    const images =
        document.querySelectorAll("img");


    if (!images.length) {
        return;
    }


    images.forEach((image) => {

        /*
         * Keep images lightweight and asynchronous.
         */

        if (
            !image.hasAttribute("decoding")
        ) {

            image.setAttribute(
                "decoding",
                "async"
            );

        }


        /*
         * Do not override eager loading
         * on hero/logo images.
         */

        if (
            !image.hasAttribute("loading")
        ) {

            image.setAttribute(
                "loading",
                "lazy"
            );

        }


        /*
         * Gracefully handle broken images.
         */

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            },
            { once: true }
        );

    });

}


/* =========================================================
   11. KEYBOARD ESCAPE SUPPORT
   ========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key !== "Escape") {
            return;
        }


        const navigation =
            document.querySelector(
                ".navigation"
            );


        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );


        if (
            navigation &&
            navigation.classList.contains(
                "is-open"
            )
        ) {

            navigation.classList.remove(
                "is-open"
            );


            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }

    }
);


/* =========================================================
   12. REDUCED MOTION SUPPORT
   ========================================================= */

function prefersReducedMotion() {

    return window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

}


if (prefersReducedMotion()) {

    document.documentElement.classList.add(
        "reduced-motion"
    );

}


/* =========================================================
   13. EXTERNAL / SOCIAL LINKS
   ========================================================= */

function initExternalLinks() {

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach((link) => {

        const linkURL =
            new URL(
                link.href,
                window.location.href
            );


        if (
            linkURL.hostname !==
            window.location.hostname
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    initExternalLinks
);


/* =========================================================
   14. PREVENT STALE MOBILE NAVIGATION
   ========================================================= */

window.addEventListener(
    "pageshow",
    () => {

        const navigation =
            document.querySelector(
                ".navigation"
            );


        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );


        if (navigation) {

            navigation.classList.remove(
                "is-open"
            );

        }


        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }
);


/* =========================================================
   END OF ABOUT.JS
   ========================================================= */
