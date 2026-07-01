/* ============================================================
   MOBILENAV.JS — Het Mochi Flipbook Portfolio
   Builds and injects the sticky quick-nav bar on mobile.
   Completely standalone — no dependency on script.js.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 768) return;

    /* ── Assign IDs to each section block ── */
    const sectionMap = [
        { el: document.querySelector(".book-page.page-left"),   id: "sec-profile",    label: "Profile" },
        { el: document.querySelector("#turn-1 .page-front"),    id: "sec-education",  label: "Education" },
        { el: document.querySelector("#turn-1 .page-back"),     id: "sec-projects-1", label: "Projects" },
        { el: document.querySelector("#turn-2 .page-front"),    id: "sec-projects-2", label: "More Projects" },
        { el: document.querySelector("#turn-2 .page-back"),     id: "sec-services",   label: "Services" },
        { el: document.querySelector("#turn-3 .page-front"),    id: "sec-skills",     label: "Skills" },
        { el: document.querySelector("#turn-3 .page-back"),     id: "sec-contact",    label: "Contact" },
    ];

    sectionMap.forEach(s => {
        if (s.el) s.el.id = s.id;
    });

    /* ── Build the nav bar ── */
    const nav = document.createElement("div");
    nav.className = "mobile-quick-nav";

    sectionMap.forEach(s => {
        if (!s.el) return;
        const a = document.createElement("a");
        a.textContent = s.label;
        a.href = "#" + s.id;
        a.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.getElementById(s.id);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
        nav.appendChild(a);
    });

    /* ── Inject nav as very first element in body ── */
    document.body.insertBefore(nav, document.body.firstChild);

    /* ── Highlight active nav pill on scroll ── */
    const navLinks = nav.querySelectorAll("a");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === "#" + activeId
                    );
                });
            }
        });
    }, { threshold: 0.4 });

    sectionMap.forEach(s => {
        if (s.el) observer.observe(s.el);
    });

});