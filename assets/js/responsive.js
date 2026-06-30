/* ============================================================
   SCRIPT.JS — Flipbook Portfolio by Het Mochi
   Desktop : original 3D flip logic — untouched
   Mobile  : flipbook disabled, plain scrolling portfolio with
             a sticky quick-nav bar for jumping between sections
   ============================================================ */

function isMobile() {
    return window.innerWidth <= 768;
}

const flipSound = new Audio("assets/sounds/page-flip-47177.mp3");
flipSound.volume = 0.2;
function playFlip() {
    flipSound.currentTime = 0;
    flipSound.play().catch(() => {});
}

/* ================================================================
   MOBILE — plain scroll portfolio
================================================================ */
function initMobile() {

    /* Safety net: clear any inline styles that desktop's flip logic
       may have set (z-index, transform) so nothing overlaps in mobile view */
    document.querySelectorAll(".book-page, .page-front, .page-back").forEach(el => {
        el.style.zIndex = "";
        el.style.transform = "";
    });

    /* Give each scrollable block an id + label so we can build nav + anchors */
    const sectionMap = [
        { el: document.querySelector(".book-page.page-left"), id: "sec-profile", label: "Profile" },
        { el: document.querySelector("#turn-1 .page-front"),  id: "sec-education", label: "Education" },
        { el: document.querySelector("#turn-1 .page-back"),   id: "sec-projects-1", label: "Projects" },
        { el: document.querySelector("#turn-2 .page-front"),  id: "sec-projects-2", label: "More Projects" },
        { el: document.querySelector("#turn-2 .page-back"),   id: "sec-services", label: "Services" },
        { el: document.querySelector("#turn-3 .page-front"),  id: "sec-skills", label: "Skills" },
        { el: document.querySelector("#turn-3 .page-back"),   id: "sec-contact", label: "Contact" },
    ];

    sectionMap.forEach(s => {
        if (s.el) {
            s.el.id = s.id;
            /* add a small uppercase label at the top of each block */
            if (!s.el.querySelector(".mobile-section-label")) {
                const label = document.createElement("span");
                label.className = "mobile-section-label";
                label.textContent = s.label;
                s.el.insertBefore(label, s.el.firstChild);
            }
        }
    });

    /* Build sticky quick-nav bar */
    const nav = document.createElement("div");
    nav.className = "mobile-quick-nav";
    sectionMap.forEach(s => {
        if (!s.el) return;
        const a = document.createElement("a");
        a.href = `#${s.id}`;
        a.textContent = s.label;
        a.addEventListener("click", (e) => {
            e.preventDefault();
            s.el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        nav.appendChild(a);
    });
    document.body.insertBefore(nav, document.body.firstChild);

    /* Contact Me button → scroll to contact section */
    const contactBtn = document.querySelector(".btn.contact-me");
    if (contactBtn) {
        contactBtn.onclick = (e) => {
            e.preventDefault();
            const contactSection = document.getElementById("sec-contact");
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };
    }

    /* Resume link still works natively (target="_blank" download) — no change needed */
}

/* ================================================================
   DESKTOP — original 3D flip logic (unchanged)
================================================================ */

let totalPages, pageNumber;

function initDesktop() {
    const pageTurnBtns = document.querySelectorAll(".nextprev-btn");

    pageTurnBtns.forEach((el, index) => {
        el.onclick = () => {
            const pageTurnId = el.getAttribute("data-page");
            const pageTurn = document.getElementById(pageTurnId);
            playFlip();

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
    totalPages = pages.length;
    pageNumber = 0;

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
        backProfileButton.onclick = (e) => {
            e.preventDefault();
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

function reverseIndex() {
    if (typeof pageNumber === "undefined") return;
    const pages = document.querySelectorAll(".book-page.page-right");
    pageNumber--;
    if (pageNumber < 0) pageNumber = pages.length - 1;
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

let lastMode = isMobile() ? "mobile" : "desktop";
window.addEventListener("resize", () => {
    const now = isMobile() ? "mobile" : "desktop";
    if (now !== lastMode) {
        lastMode = now;
        location.reload();
    }
});