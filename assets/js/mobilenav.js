/* ============================================================
   MOBILENAV.JS — Het Mochi Flipbook Portfolio
   Hamburger menu with slide-down panel
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {

    if (window.innerWidth > 768) return;

    /* ── Assign section IDs ── */
    const sectionMap = [
        { el: document.querySelector(".book-page.page-left"), id: "sec-profile", label: "Profile", icon: "bx bxs-user" },
        { el: document.querySelector("#turn-1 .page-front"), id: "sec-education", label: "Education", icon: "bx bxs-graduation" },
        { el: document.querySelector("#turn-1 .page-back"), id: "sec-projects-1", label: "Projects", icon: "bx bxs-briefcase" },
        { el: document.querySelector("#turn-2 .page-front"), id: "sec-projects-2", label: "More Projects", icon: "bx bxs-folder" },
        { el: document.querySelector("#turn-2 .page-back"), id: "sec-services", label: "Services", icon: "bx bxs-cog" },
        { el: document.querySelector("#turn-3 .page-front"), id: "sec-skills", label: "Skills", icon: "bx bxs-star" },
        { el: document.querySelector("#turn-3 .page-back"), id: "sec-contact", label: "Contact", icon: "bx bxs-envelope" },
    ];

    sectionMap.forEach(s => {
        if (s.el) s.el.id = s.id;
    });

    /* ── Build top bar ── */
    const topbar = document.createElement("div");
    topbar.className = "mobile-topbar";
    topbar.innerHTML = `
        <div class="brand">
            <img src="assets/favicon/Favicon.png" alt="Het Mochi" class="nav-favicon">
            <span>HET MOCHI</span>
        </div>
        <button class="hamburger-btn" aria-label="Open menu" id="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    `;
    document.body.insertBefore(topbar, document.body.firstChild);

    /* ── Build hamburger menu ── */
    const menu = document.createElement("div");
    menu.className = "hamburger-menu";
    menu.id = "hamburger-menu";

    let menuLinks = "";
    sectionMap.forEach(s => {
        if (!s.el) return;
        menuLinks += `
            <a href="#${s.id}" data-id="${s.id}">
                <i class="${s.icon}"></i>
                ${s.label}
            </a>
        `;
    });

    menu.innerHTML = `
        <div class="hamburger-overlay" id="hamburger-overlay"></div>
        <div class="hamburger-panel">
            ${menuLinks}
            <div class="menu-divider"></div>
            <a href="assets/resume/Resume.pdf" target="_blank" download>
                <i class="bx bxs-download"></i>
                Download Resume
            </a>
        </div>
    `;
    document.body.insertBefore(menu, topbar.nextSibling);

    /* ── Toggle menu open/close ── */
    const btn = document.getElementById("hamburger-btn");
    const overlay = document.getElementById("hamburger-overlay");

    function openMenu() {
        menu.classList.add("is-open");
        btn.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeMenu() {
        menu.classList.remove("is-open");
        btn.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    btn.addEventListener("click", () => {
        menu.classList.contains("is-open") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    /* ── Nav link clicks ── */
    menu.querySelectorAll("a[data-id]").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.getElementById(this.dataset.id);
            closeMenu();
            setTimeout(() => {
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 350);
        });
    });

    /* ── Highlight active link on scroll ── */
    const navLinks = menu.querySelectorAll("a[data-id]");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle("active", link.dataset.id === entry.target.id);
                });
            }
        });
    }, { threshold: 0.4 });

    sectionMap.forEach(s => {
        if (s.el) observer.observe(s.el);
    });

});