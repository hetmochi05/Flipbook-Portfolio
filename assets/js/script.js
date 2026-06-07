
const pageTurnBtn = document.querySelectorAll(".nextprev-btn");

// Page flip sound
const flipSound = new Audio("assets/sounds/page-flip-47177.mp3");
flipSound.volume = 0.2; // subtle & professional


pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute("data-page");
        const pageTurn = document.getElementById(pageTurnId);

        // Play flip sound
        flipSound.currentTime = 0;
        flipSound.play();

        if (pageTurn.classList.contains("turn")) {
            pageTurn.classList.remove("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        } else {
            pageTurn.classList.add("turn");
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }
    };
});

const pages = document.querySelectorAll(".book-page.page-right");
const contactMeBtn = document.querySelector(".btn.contact-me");

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add("turn");

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500);
        }, (index + 1) * 200 + 100);
    });
};

let totalPages = pages.length;
let pageNumber = 0;

const backProfileButton = document.querySelector(".back-profile");

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

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

const coverRight = document.querySelector(".cover.cover-right");
const pageLeft = document.querySelector(".book-page.page-left");

setTimeout(() => {
    coverRight.classList.add("turn");
}, 2100);

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800);

setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200);

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

/* KEYBOARD NAVIGATION */
document.addEventListener("keydown", (event) => {

    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();

    const pages = document.querySelectorAll(".book-page.page-right");

    // ➡ NEXT PAGE (first page NOT turned)
    if (event.key === "ArrowRight") {
        const nextPage = [...pages].find(page => !page.classList.contains("turn"));
        if (!nextPage) return;

        const nextBtn = nextPage.querySelector(".nextprev-btn:not(.back)");
        if (nextBtn) nextBtn.click();
    }

    // ⬅ PREVIOUS PAGE (last page that IS turned)
    if (event.key === "ArrowLeft") {
        const turnedPages = [...pages].filter(page => page.classList.contains("turn"));
        if (!turnedPages.length) return;

        const lastTurnedPage = turnedPages[turnedPages.length - 1];
        const prevBtn = lastTurnedPage.querySelector(".nextprev-btn.back");
        if (prevBtn) prevBtn.click();
    }
});


