/* ============================================================
   SCRIPT.JS — Flipbook Portfolio by Het Mochi
   Desktop : original 3D flip logic
   Mobile  : skips all flip logic, handled by mobilenav.js
             and mobileanimation.js
   ============================================================ */

function isMobile() {
    return window.innerWidth <= 768;
}

/* Page flip sound */
const flipSound = new Audio("assets/sounds/page-flip-47177.mp3");
flipSound.volume = 0.2;

/* ================================================================
   MOBILE — assign section IDs and handle Contact Me scroll
================================================================ */
function initMobile() {

    /* Clear any inline styles */
    document.querySelectorAll(".book-page, .page-front, .page-back").forEach(el => {
        el.style.zIndex = "";
        el.style.transform = "";
    });

    /* Assign IDs to each section (mobilenav.js needs these) */
    const sectionMap = [
        { el: document.querySelector(".book-page.page-left"), id: "sec-profile",    label: "Profile" },
        { el: document.querySelector("#turn-1 .page-front"),  id: "sec-education",  label: "Education" },
        { el: document.querySelector("#turn-1 .page-back"),   id: "sec-projects-1", label: "Projects" },
        { el: document.querySelector("#turn-2 .page-front"),  id: "sec-projects-2", label: "More Projects" },
        { el: document.querySelector("#turn-2 .page-back"),   id: "sec-services",   label: "Services" },
        { el: document.querySelector("#turn-3 .page-front"),  id: "sec-skills",     label: "Skills" },
        { el: document.querySelector("#turn-3 .page-back"),   id: "sec-contact",    label: "Contact" },
    ];

    sectionMap.forEach(s => {
        if (s.el) s.el.id = s.id;
    });

    /* Contact Me → smooth scroll to contact section */
    const contactBtn = document.querySelector(".btn.contact-me");
    if (contactBtn) {
        contactBtn.onclick = (e) => {
            e.preventDefault();
            const target = document.getElementById("sec-contact");
            if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        };
    }
}

/* ================================================================
   DESKTOP — original 3D flip logic (unchanged)
================================================================ */
function initDesktop() {

    const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

    pageTurnBtn.forEach((el, index) => {
        el.onclick = () => {
            const pageTurnId = el.getAttribute("data-page");
            const pageTurn = document.getElementById(pageTurnId);

            flipSound.currentTime = 0;
            flipSound.play();

            if (pageTurn.classList.contains("turn")) {
                pageTurn.classList.remove("turn");
                setTimeout(() => { pageTurn.style.zIndex = 20 - index; }, 500);
            } else {
                pageTurn.classList.add("turn");
                setTimeout(() => { pageTurn.style.zIndex = 20 + index; }, 500);
            }
        };
    });

    const pages = document.querySelectorAll(".book-page.page-right");
    let totalPages = pages.length;
    let pageNumber = 0;

    const contactMeBtn = document.querySelector(".btn.contact-me");
    if (contactMeBtn) {
        contactMeBtn.onclick = () => {
            pages.forEach((page, index) => {
                setTimeout(() => {
                    page.classList.add("turn");
                    setTimeout(() => { page.style.zIndex = 20 + index; }, 500);
                }, (index + 1) * 200 + 100);
            });
        };
    }

    const backProfileButton = document.querySelector(".back-profile");
    if (backProfileButton) {
        backProfileButton.onclick = () => {
            pages.forEach((_, index) => {
                setTimeout(() => {
                    reverseIndex();
                    pages[pageNumber].classList.remove("turn");
                    setTimeout(() => {
                        reverseIndex();
                        pages[pageNumber].style.zIndex = 10 + index;
                    }, 500);
                }, (index + 1) * 200 + 100);
            });
        };
    }

    function reverseIndex() {
        pageNumber--;
        if (pageNumber < 0) pageNumber = totalPages - 1;
    }

    const coverRight = document.querySelector(".cover.cover-right");
    const pageLeft   = document.querySelector(".book-page.page-left");

    setTimeout(() => { coverRight.classList.add("turn"); }, 2100);
    setTimeout(() => { coverRight.style.zIndex = -1; }, 2800);
    setTimeout(() => { pageLeft.style.zIndex = 20; }, 3200);

    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove("turn");
            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;
            }, 500);
        }, (index + 1) * 200 + 2100);
    });

    /* Keyboard navigation */
    document.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();

        const allPages = document.querySelectorAll(".book-page.page-right");

        if (event.key === "ArrowRight") {
            const nextPage = [...allPages].find(p => !p.classList.contains("turn"));
            if (!nextPage) return;
            const btn = nextPage.querySelector(".nextprev-btn:not(.back)");
            if (btn) btn.click();
        }

        if (event.key === "ArrowLeft") {
            const turned = [...allPages].filter(p => p.classList.contains("turn"));
            if (!turned.length) return;
            const last = turned[turned.length - 1];
            const btn = last.querySelector(".nextprev-btn.back");
            if (btn) btn.click();
        }
    });
}

/* ================================================================
   BOOT
================================================================ */
document.addEventListener("DOMContentLoaded", () => {
    if (isMobile()) {
        initMobile();
    } else {
        initDesktop();
    }
});

/* Reload on breakpoint cross */
let lastMode = isMobile() ? "mobile" : "desktop";
window.addEventListener("resize", () => {
    const now = isMobile() ? "mobile" : "desktop";
    if (now !== lastMode) {
        lastMode = now;
        location.reload();
    }
});