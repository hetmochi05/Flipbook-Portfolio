/* ============================================================
   MOBILEANIMATION.JS — Het Mochi Flipbook Portfolio
   Assigns animation classes to each section and triggers them
   via IntersectionObserver as the user scrolls on mobile.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 768) return;

    /* Map each section to its animation class */
   const sectionMap = [
    {
        el: document.querySelector(".profile-page"),
        anim: "anim-profile"
    },
    {
        el: document.querySelector(".education-box"),
        anim: "anim-education"
    },
    {
        el: document.querySelector("#turn-1 .project-box"),
        anim: "anim-projects-1"
    },
    {
        el: document.querySelector("#turn-2 .project-box"),
        anim: "anim-projects-2"
    },
    {
        el: document.querySelector(".services-box"),
        anim: "anim-services"
    },
    {
        el: document.querySelector(".skills-box"),
        anim: "anim-skills"
    },
    {
        el: document.querySelector(".contact-box"),
        anim: "anim-contact"
    }
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