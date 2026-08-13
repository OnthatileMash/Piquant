/* =========================================================
   PIQUANT CHILLI SAUCE
   MERCH PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =====================================================
       ELEMENT REFERENCES
       ===================================================== */

    const header = document.querySelector(".header");
    const headerToggle = document.querySelector(".header-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu a");
    const sections = document.querySelectorAll("main section[id]");
    const faqItems = document.querySelectorAll(".faq-item");


    /* =====================================================
       HEADER MINIMISATION
       ===================================================== */

    let scrollTicking = false;

    const updateHeader = () => {
        if (!header) {
            return;
        }

        const shouldMinimise = window.scrollY > 80;

        header.classList.toggle(
            "minimized",
            shouldMinimise
        );

        scrollTicking = false;
    };

    const handleScroll = () => {
        if (!scrollTicking) {
            window.requestAnimationFrame(updateHeader);
            scrollTicking = true;
        }
    };

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    updateHeader();


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const closeMobileMenu = () => {
        if (!navMenu) {
            return;
        }

        navMenu.classList.remove("open");

        if (headerToggle) {
            headerToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

        document.body.classList.remove("menu-open");
    };

    const openMobileMenu = () => {
        if (!navMenu) {
            return;
        }

        navMenu.classList.add("open");

        if (headerToggle) {
            headerToggle.setAttribute(
                "aria-expanded",
                "true"
            );
        }

        document.body.classList.add("menu-open");
    };

    if (headerToggle && navMenu) {
        headerToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        headerToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                navMenu.classList.contains("open");

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }


    /* =====================================================
       CLOSE MENU WHEN NAV LINK IS SELECTED
       ===================================================== */

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMobileMenu();
        });
    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {
        if (!navMenu || !headerToggle) {
            return;
        }

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            headerToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {
            closeMobileMenu();
        }
    });


    /* =====================================================
       ESCAPE KEY SUPPORT
       ===================================================== */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();

            if (headerToggle) {
                headerToggle.focus();
            }
        }
    });


    /* =====================================================
       RESPONSIVE MENU CLEAN-UP
       ===================================================== */

    const handleResize = () => {
        if (window.innerWidth > 780) {
            closeMobileMenu();
        }
    };

    window.addEventListener("resize", handleResize, {
        passive: true
    });


    /* =====================================================
       ACTIVE NAVIGATION STATE
       ===================================================== */

    const currentPage = (
        window.location.pathname
            .split("/")
            .pop() || "index.html"
    ).toLowerCase();

    navLinks.forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkURL = new URL(
            href,
            window.location.href
        );

        const linkPage = (
            linkURL.pathname
                .split("/")
                .pop() || "index.html"
        ).toLowerCase();

        if (
            linkPage === currentPage &&
            !linkURL.hash
        ) {
            link.classList.add("active");
        }
    });


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#" ||
                targetID.length < 2
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                10;

            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: "smooth"
            });

            closeMobileMenu();

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


    /* =====================================================
       ACTIVE SECTION TRACKING
       ===================================================== */

    if (
        sections.length > 0 &&
        "IntersectionObserver" in window
    ) {
        const sectionObserver =
            new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        const sectionID =
                            entry.target.id;

                        navLinks.forEach((link) => {
                            const href =
                                link.getAttribute("href");

                            if (!href) {
                                return;
                            }

                            const linkURL =
                                new URL(
                                    href,
                                    window.location.href
                                );

                            const linkHash =
                                linkURL.hash.replace(
                                    "#",
                                    ""
                                );

                            if (
                                linkHash === sectionID
                            ) {
                                link.classList.add(
                                    "active"
                                );
                            } else if (linkHash) {
                                link.classList.remove(
                                    "active"
                                );
                            }
                        });
                    });
                },
                {
                    root: null,
                    rootMargin:
                        "-30% 0px -55% 0px",
                    threshold: 0
                }
            );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    /* =====================================================
       FAQ ACCORDION
       ===================================================== */

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (!item.open) {
                return;
            }

            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        });
    });


    /* =====================================================
       COMMERCE LINKS
       ===================================================== */

    const commerceLinks =
        document.querySelectorAll(
            'a[data-commerce-link]'
        );

    commerceLinks.forEach((link) => {
        link.addEventListener("click", () => {
            link.classList.add("is-loading");

            window.setTimeout(() => {
                link.classList.remove(
                    "is-loading"
                );
            }, 800);
        });
    });


    /* =====================================================
       IMAGE LOADING FALLBACK
       ===================================================== */

    const merchImages =
        document.querySelectorAll(
            ".merch-hero img, " +
            ".collection-image img, " +
            ".feature-image img, " +
            ".sauce-merch-image img, " +
            ".lookbook-placeholder img"
        );

    merchImages.forEach((image) => {
        image.addEventListener("error", () => {
            image.classList.add("image-error");
        });
    });


    /* =====================================================
       AUTOMATIC CURRENT YEAR
       ===================================================== */

    const yearElement =
        document.querySelector(
            "[data-current-year]"
        );

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       PAGE INITIALISATION
       ===================================================== */

    document.documentElement.classList.add(
        "js-enabled"
    );

    document.body.classList.add(
        "merch-page-ready"
    );
});