/* ==========================================================
   PORTFOLIO – Innocencia Lindokuhle Mkhatswa
   script.js

   Contents
   1.  Project details (edit your projects here!)
   4.  Moving dots background
   6.  Phone menu
   7.  Light / dark mode
   8.  Scroll effects (header, progress bar, active link, back-to-top)
   9.  Fade-in on scroll, skill bars, number counters
   11. Project filter
   12. Project pop-up
   14. Copy email + toast
   15. Contact form
   16. Footer year
========================================================== */


/* ==========================================================
   1. PROJECT DETAILS
   The pop-up reads from this list. The order matches
   data-project="0", "1", "2" in index.html.
========================================================== */

const projects = [
    {
        title: "Student Management System",
        image: "images/projects/student-management.svg",
        description: "A software application for managing student records efficiently. Built as Task 1 (Easy) of the Auspify Technologies Software Development Internship.",
        features: [
            "Add new student records",
            "Update student details",
            "Delete records",
            "View student information in a clear list"
        ],
        learned: "How to plan a user interface first, then build full CRUD (Create, Read, Update, Delete) operations and test every part of the application.",
        tags: ["CRUD Operations", "Data Management", "Software Design", "Programming Fundamentals"],
        code: "",   // EDIT ME: paste the GitHub link between the quotes
        live: ""
    },
    {
        title: "Library Management System",
        image: "images/projects/library-management.svg",
        description: "A software solution for managing books and library transactions. Built as Task 2 (Easy) of the internship.",
        features: [
            "Book management (add, edit and remove books)",
            "Issue and return books",
            "Search the catalogue",
            "Generate library reports"
        ],
        learned: "Splitting a system into modules, storing records in a database and validating that every operation behaves correctly.",
        tags: ["Database Integration", "Software Architecture", "Data Processing", "System Testing"],
        code: "",   // EDIT ME
        live: ""
    },
    {
        title: "Inventory Management System",
        image: "images/projects/inventory-management.svg",
        description: "Software that manages inventory records and stock levels. Built as Task 3 (Medium) of the internship.",
        features: [
            "Inventory tracking",
            "Stock updates",
            "Search and filter products",
            "Reports dashboard"
        ],
        learned: "Designing a database for real business data, writing business logic for stock movements and checking that reports stay accurate.",
        tags: ["Database Design", "Business Logic Development", "Data Analysis", "Reporting Systems"],
        code: "",   // EDIT ME
        live: ""
    },
    {
        title: "Employee Management System",
        image: "images/projects/employee-management.svg",
        description: "Software for managing employee records and organisational data. Built as Task 4 (Medium) of the internship.",
        features: [
            "Employee registration and records",
            "Department management",
            "Search employees",
            "Generate employee reports"
        ],
        learned: "Following the software development lifecycle from screen design to reports, and optimising the application so it stays fast as data grows.",
        tags: ["Software Development Lifecycle", "Database Operations", "Application Design", "Performance Optimisation"],
        code: "",   // EDIT ME
        live: ""
    },
    {
        title: "Online Examination System",
        image: "images/projects/online-examination.svg",
        description: "A platform for conducting online examinations. Built as Task 5 (Advanced) of the internship.",
        features: [
            "Secure user login",
            "Online tests",
            "Automated result calculation",
            "Performance and score reports"
        ],
        learned: "Building authentication, keeping the system secure, validating answers and integrating marking and reporting into one flow.",
        tags: ["Authentication Systems", "Secure Software Development", "Data Validation", "System Integration"],
        code: "",   // EDIT ME
        live: ""
    },
    {
        title: "Task Management App",
        image: "images/projects/task-management.svg",
        description: "A productivity application that helps users manage tasks and deadlines efficiently. Built as Task 6 (Advanced) of the internship.",
        features: [
            "User login",
            "Create, edit and delete tasks",
            "Deadlines and priorities",
            "Search and filter tasks"
        ],
        learned: "Loading data dynamically, adding search and filtering, and optimising the interface so the app feels quick and easy to use.",
        tags: ["Authentication", "Dynamic Data Loading", "Search & Filtering", "UI Optimisation"],
        code: "",   // EDIT ME
        live: ""
    }
];


/* Does the visitor prefer less movement? */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Tell CSS that JavaScript is working (used to hide things before they animate in) */
document.body.classList.add("js");


/* ==========================================================
   4. MOVING DOTS BACKGROUND
   Draws dots that drift around and connect with lines
   when they are close. Dots also move away from the mouse.
========================================================== */

const hero = document.querySelector(".hero");
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let dots = [];
const mouse = { x: null, y: null };

function getAccentColour() {
    return getComputedStyle(document.body).getPropertyValue("--accent").trim();
}

function setupCanvas() {
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;

    // fewer dots on small screens so phones stay fast
    const amount = Math.min(90, Math.floor((canvas.width * canvas.height) / 14000));
    dots = [];

    for (let i = 0; i < amount; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }
}

function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const colour = getAccentColour();

    for (const dot of dots) {

        // move
        dot.x += dot.speedX;
        dot.y += dot.speedY;

        // bounce off the edges
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;

        // gently push away from the mouse
        if (mouse.x !== null) {
            const dx = dot.x - mouse.x;
            const dy = dot.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                dot.x += dx / distance * 1.5;
                dot.y += dy / distance * 1.5;
            }
        }

        // draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = colour;
        ctx.globalAlpha = 0.6;
        ctx.fill();
    }

    // draw lines between dots that are close together
    for (let a = 0; a < dots.length; a++) {
        for (let b = a + 1; b < dots.length; b++) {
            const dx = dots[a].x - dots[b].x;
            const dy = dots[a].y - dots[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                ctx.beginPath();
                ctx.moveTo(dots[a].x, dots[a].y);
                ctx.lineTo(dots[b].x, dots[b].y);
                ctx.strokeStyle = colour;
                ctx.globalAlpha = (1 - distance / 130) * 0.25;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(drawDots);     // draw again on the next screen refresh
}

hero.addEventListener("mousemove", function (event) {
    const box = canvas.getBoundingClientRect();
    mouse.x = event.clientX - box.left;
    mouse.y = event.clientY - box.top;
});

hero.addEventListener("mouseleave", function () {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener("resize", setupCanvas);
setupCanvas();
if (!reduceMotion) {
    drawDots();
}


/* ==========================================================
   6. PHONE MENU
========================================================== */

const menuButton = document.getElementById("menu-button");
const navLinks = document.getElementById("nav-links");
const links = document.querySelectorAll(".nav-link");

menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("open");
    menuButton.classList.toggle("open");
});

for (const link of links) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuButton.classList.remove("open");
    });
}


/* ==========================================================
   7. LIGHT / DARK MODE (remembers the choice)
========================================================== */

const themeButton = document.getElementById("theme-button");

try {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
    }
} catch (error) {
    // the browser blocked storage – that's fine, stay dark
}

themeButton.addEventListener("click", function () {
    document.body.classList.toggle("light");
    const theme = document.body.classList.contains("light") ? "light" : "dark";
    try {
        localStorage.setItem("theme", theme);
    } catch (error) {
        
    }
});


/* ==========================================================
   8. SCROLL EFFECTS
========================================================== */

const header = document.getElementById("header");
const progressBar = document.getElementById("scroll-progress");
const backToTop = document.getElementById("back-to-top");
const pageSections = document.querySelectorAll("main section");

function onScroll() {
    const scrollY = window.scrollY;

    // progress bar
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollY / pageHeight) * 100 + "%";

    // header background + back-to-top button
    header.classList.toggle("scrolled", scrollY > 40);
    backToTop.classList.toggle("visible", scrollY > 600);

    // highlight the menu link for the section on screen
    let currentId = "home";
    for (const section of pageSections) {
        if (scrollY >= section.offsetTop - 200) {
            currentId = section.id;
        }
    }
    for (const link of links) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    }
}

window.addEventListener("scroll", onScroll);
onScroll();


/* ==========================================================
   9. FADE-IN ON SCROLL, SKILL BARS, NUMBER COUNTERS
   IntersectionObserver tells us when something
   comes onto the screen.
========================================================== */

const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(function (entries) {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const item = entry.target;
        item.classList.add("show");

        // grow the skill bars inside this card
        for (const bar of item.querySelectorAll(".bar i")) {
            bar.style.width = bar.dataset.level + "%";
        }

        observer.unobserve(item);   // only animate once
    }
}, { threshold: 0.15 });

for (const item of revealItems) {
    observer.observe(item);
}



/* ==========================================================
   11. PROJECT FILTER
========================================================== */

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

for (const button of filterButtons) {
    button.addEventListener("click", function () {

        for (const b of filterButtons) {
            b.classList.remove("active");
        }
        button.classList.add("active");

        const filter = button.dataset.filter;

        for (const card of projectCards) {
            const match = filter === "all" || card.dataset.category === filter;
            card.classList.toggle("hide", !match);
        }
    });
}


/* ==========================================================
   12. PROJECT POP-UP
========================================================== */

const modal = document.getElementById("modal");

function openProject(index) {
    const project = projects[index];

    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-description").textContent = project.description;
    document.getElementById("modal-learned").textContent = project.learned;

    // picture
    const imageBox = document.getElementById("modal-image");
    imageBox.innerHTML = "";
    const img = document.createElement("img");
    img.src = project.image;
    img.alt = project.title + " preview";
    imageBox.appendChild(img);

    // features list
    const list = document.getElementById("modal-features");
    list.innerHTML = "";
    for (const feature of project.features) {
        const li = document.createElement("li");
        li.textContent = feature;
        list.appendChild(li);
    }

    // tags
    const tags = document.getElementById("modal-tags");
    tags.innerHTML = "";
    for (const tag of project.tags) {
        const span = document.createElement("span");
        span.textContent = tag;
        tags.appendChild(span);
    }

    // buttons (only shown if a link exists)
    const linksBox = document.getElementById("modal-links");
    linksBox.innerHTML = "";
    if (project.code) {
        linksBox.innerHTML += '<a class="btn btn-primary" target="_blank" rel="noopener" href="' + project.code + '">View Code ↗</a>';
    }
    if (project.live) {
        linksBox.innerHTML += '<a class="btn btn-outline" target="_blank" rel="noopener" href="' + project.live + '">Live Demo ↗</a>';
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";       // stop the page scrolling behind
}

function closeProject() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

for (const card of projectCards) {
    card.addEventListener("click", function (event) {
        if (event.target.closest("a")) return;     // the Code link opens GitHub instead
        openProject(Number(card.dataset.project));
    });
}

for (const closer of document.querySelectorAll("[data-close]")) {
    closer.addEventListener("click", closeProject);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeProject();
});


/* ==========================================================
   14. COPY EMAIL + TOAST MESSAGE
========================================================== */

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(function () {
        toast.classList.remove("show");
    }, 2200);
}

document.getElementById("copy-email").addEventListener("click", async function () {
    try {
        await navigator.clipboard.writeText(this.dataset.email);
        showToast("Email copied! ✓");
    } catch (error) {
        showToast("lindo7innocencia@gmail.com");
    }
});


/* ==========================================================
   15. CONTACT FORM
   Sends the message to my inbox with FormSubmit
   without leaving the page.

   IMPORTANT (one-time setup): the very first message sent
   from the LIVE site makes FormSubmit email me an
   "Activate Form" link. Nothing is delivered until I click
   it. After that, every message arrives (check Spam once).
========================================================== */

const contactForm = document.getElementById("contact-form");
const formButton = document.getElementById("form-button");
const formStatus = document.getElementById("form-status");
const MY_EMAIL = "lindo7innocencia@gmail.com";

function setStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = "form-status " + type;
}

/* If sending fails, open the visitor's own email app with the message filled in */
function emailFallback() {
    const name = contactForm.name.value;
    const subject = contactForm.subject.value || "Message from your portfolio";
    const body = contactForm.message.value + "\n\n– " + name + " (" + contactForm.email.value + ")";
    return "mailto:" + MY_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
}

function showFailure(reason) {
    formStatus.className = "form-status error";
    formStatus.innerHTML = "";
    formStatus.append(reason + " ");
    const link = document.createElement("a");
    link.href = emailFallback();
    link.textContent = "Send it with your email app instead →";
    formStatus.appendChild(link);
}

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    // FormSubmit does not work when the page is opened as a file on the computer
    if (location.protocol === "file:") {
        showFailure("The form only works on the live website (not when opened from a file).");
        return;
    }

    formButton.disabled = true;
    formButton.textContent = "Sending…";
    setStatus("", "");

    const data = new FormData(contactForm);
    data.set("_replyto", contactForm.email.value);   // so I can just press Reply
    if (contactForm.subject.value) {
        data.set("_subject", "Portfolio: " + contactForm.subject.value);
    }

    try {
        const response = await fetch("https://formsubmit.co/ajax/" + MY_EMAIL, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: data
        });

        // FormSubmit replies with status 200 even when it did NOT send,
        // so we must read its answer and check "success".
        const result = await response.json().catch(function () { return {}; });
        const sent = response.ok && String(result.success) === "true";

        if (!sent) {
            throw new Error(result.message || "Not sent");
        }

        setStatus("Thank you! Your message has been sent. I'll reply soon.", "success");
        contactForm.reset();
        showToast("Message sent ✈");

    } catch (error) {
        console.warn("Contact form:", error.message);
        showFailure("Sorry, the message couldn't be sent right now.");
    }

    formButton.disabled = false;
    formButton.textContent = "Send Message ✈";
});


/* ==========================================================
   16. FOOTER YEAR
========================================================== */

document.getElementById("year").textContent = new Date().getFullYear();
