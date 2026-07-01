/* ============================================================
   MOBILEANIMATION.JS — Het Mochi Flipbook Portfolio
   Adds scroll-reveal classes to each mobile section and uses
   IntersectionObserver to fade/slide them in as the user scrolls.
   Only runs on mobile/tablet (≤768px). Desktop is unaffected.
   ============================================================ */

function isMobileView() {
    return window.innerWidth <= 768;
}

function initMobileScrollAnimation() {
    if (!isMobileView()) return;

    /* Same section targets used by script.js's mobile quick-nav */
    const sections = [
        { el: document.querySelector(".book-page.page-left"), variant: "" },
        { el: document.querySelector("#turn-1 .page-front"),  variant: "from-left" },
        { el: document.querySelector("#turn-1 .page-back"),   variant: "from-right" },
        { el: document.querySelector("#turn-2 .page-front"),  variant: "from-left" },
        { el: document.querySelector("#turn-2 .page-back"),   variant: "from-right" },
        { el: document.querySelector("#turn-3 .page-front"),  variant: "from-left" },
        { el: document.querySelector("#turn-3 .page-back"),   variant: "" },
    ];

    sections.forEach(s => {
        if (!s.el) return;
        s.el.classList.add("scroll-reveal");
        if (s.variant) s.el.classList.add(s.variant);
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target); // animate once
            }
        });
    }, { threshold: 0.15 });

    sections.forEach(s => {
        if (s.el) revealObserver.observe(s.el);
    });
}

document.addEventListener("DOMContentLoaded", initMobileScrollAnimation);

/* Re-check on resize, in case user rotates device or resizes window
   across the mobile/desktop breakpoint */
window.addEventListener("resize", () => {
    if (isMobileView()) {
        document.querySelectorAll(".scroll-reveal:not(.is-visible)").forEach(el => {
            // re-trigger observer setup only if not already handled
        });
    }
});