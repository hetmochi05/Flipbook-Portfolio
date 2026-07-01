# 📖 Het Mochi | FlipBook Personal Portfolio

A unique personal portfolio website built with a **3D flipbook experience** — designed to feel like flipping through a real book. On mobile, it transforms into a clean scrollable portfolio with smooth scroll-reveal animations. Built entirely with vanilla HTML, CSS, and JavaScript.

🔗 **Live Demo:** [hetmochi05.github.io/Flipbook-Portfolio](https://hetmochi05.github.io/Flipbook-Portfolio/)

---

## ✨ Features

- 📚 **3D Flipbook Animation** — smooth CSS `rotateY` page-turn effect with cubic-bezier easing
- 🔊 **Page Flip Sound** — subtle audio on every page turn for a realistic feel
- ⌨️ **Keyboard Navigation** — use `←` `→` arrow keys to flip pages
- 📧 **Contact Form** — powered by EmailJS with auto-reply to the sender
- 🎨 **Smooth Animations** — hover effects, gradient text, pulse animations throughout
- 🌙 **Custom Green Theme** — dark forest green palette with accent highlights
- 📱 **Mobile Responsive** — flipbook transforms into a clean scrolling portfolio on mobile/tablet
- ✨ **Scroll-Reveal Animations** — sections fade and slide in as you scroll on mobile

---

## 📄 Pages

| Page | Content |
|------|---------|
| **Cover** | Opening animation with book reveal |
| **Profile** | Photo, bio, social links, Resume & Contact buttons |
| **Education** | BCA, Higher Secondary, Secondary School timeline |
| **Projects** | Personal project showcase (4 projects) |
| **Services** | Web Dev, ASP.NET, Database, UI/UX |
| **Skills** | Languages, Web Tech, Backend, Tools, Soft Skills |
| **Contact** | Full contact form with EmailJS integration |

---

## 🛠️ Built With

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B35?style=flat&logoColor=white)
![Boxicons](https://img.shields.io/badge/Boxicons-2.1.4-22c55e?style=flat)

- **HTML5** — semantic structure
- **CSS3** — 3D transforms, animations, custom properties, scroll-reveal
- **Vanilla JavaScript** — page flip logic, keyboard nav, IntersectionObserver scroll animations
- **EmailJS** — contact form email delivery + auto-reply
- **Boxicons** — icon library

---

## 📁 Project Structure

```
Flipbook-Portfolio/
│
├── index.html
│
├── assets/
│   ├── css/
│   │   ├── style.css             # Core layout & components
│   │   ├── animation.css         # Hover & transition effects
│   │   ├── colors.css            # CSS variables / theme
│   │   ├── responsive.css        # Mobile layout (flattens flipbook to scroll)
│   │   └── mobileanimation.css   # Scroll-reveal animation styles (mobile only)
│   │
│   ├── js/
│   │   ├── script.js             # Flipbook logic & navigation (desktop + mobile)
│   │   ├── mobileanimation.js    # Scroll-reveal IntersectionObserver (mobile only)
│   │   ├── responsive.js         # Mobile Responsive Logic (mobile only)
│   │   └── EmailJS.js            # Contact form email handler
│   │
│   ├── images/
│   │   └── Profile.png
│   │
│   ├── sounds/
│   │   └── page-flip-47177.mp3
│   │
│   └── resume/
│       └── Resume.pdf
```

---

## 🚀 Getting Started

### View Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/HetMochi/flipbook-portfolio.git
   ```

2. Open `index.html` in your browser — no build step needed.

> ⚠️ For the page-flip sound to work, open via a local server (e.g. VS Code Live Server) rather than directly from the file system, as browsers block audio on `file://` URLs.

### Setup EmailJS (Contact Form)

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create a service and two templates:
   - One for receiving the message (admin notification)
   - One for auto-reply to the sender
3. Replace the keys in `assets/js/EmailJS.js`:
   ```js
   emailjs.init("YOUR_PUBLIC_KEY");
   emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form, "YOUR_PUBLIC_KEY");
   ```

---

## 🎮 Navigation

### Desktop
| Action | Result |
|--------|--------|
| Click `›` button | Next page |
| Click `‹` button | Previous page |
| `→` Arrow key | Next page |
| `←` Arrow key | Previous page |
| Click **Contact Me** | Jump to Contact page |
| Click **Profile** icon | Return to Profile page |

### Mobile / Tablet
| Action | Result |
|--------|--------|
| Scroll down | Browse all sections |
| Tap quick-nav pill | Jump to any section instantly |
| Tap **Contact Me** | Smooth scroll to Contact section |

---

## 📱 Mobile Experience

On screens ≤ 768px, the 3D flipbook is replaced with a clean, fast scrolling portfolio:

- All 7 sections stack vertically — Profile → Education → Projects → Services → Skills → Contact
- A **sticky quick-nav bar** at the top lets you jump to any section with one tap
- Each section has a small label so you always know where you are
- **Scroll-reveal animations** — sections fade and slide in (alternating left/right) as you scroll to them
- All desktop flip animations and hover effects are disabled for a smooth mobile experience
- The **Contact Me** button smooth-scrolls to the Contact section instead of flipping pages

---

## 📸 Preview

> *(Add a screenshot or screen recording GIF of your flipbook here)*

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋‍♂️ Author

**Het Mochi**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/het-mochi-57a518321)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/hetmochi05)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=flat&logo=instagram&logoColor=white)](https://www.instagram.com/het._.mochi)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=flat&logo=twitter&logoColor=white)](https://x.com/hetmochi05)

---

⭐ If you like this project, give it a star on GitHub!