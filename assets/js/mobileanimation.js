/* ============================================================
   MOBILEANIMATION.JS — Het Mochi Flipbook Portfolio
   Assigns animation classes to each section and triggers them
   via IntersectionObserver as the user scrolls on mobile.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 768) return;

    /* Map each section to its animation class */
    const sectionMap = [
        { el: document.querySelector(".book-page.page-left"),  anim: "anim-profile"    },
        { el: document.querySelector("#turn-1 .page-front"),   anim: "anim-education"  },
        { el: document.querySelector("#turn-1 .page-back"),    anim: "anim-projects-1" },
        { el: document.querySelector("#turn-2 .page-front"),   anim: "anim-projects-2" },
        { el: document.querySelector("#turn-2 .page-back"),    anim: "anim-services"   },
        { el: document.querySelector("#turn-3 .page-front"),   anim: "anim-skills"     },
        { el: document.querySelector("#turn-3 .page-back"),    anim: "anim-contact"    },
    ];

    /* Add base + direction class to each section */
    sectionMap.forEach(s => {
        if (!s.el) return;
        s.el.classList.add("mob-anim", s.anim);
    });

    /* Trigger animation when section enters viewport */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); /* animate once only */
            }
        });
    }, { threshold: 0.15 });

    sectionMap.forEach(s => {
        if (s.el) observer.observe(s.el);
    });

});