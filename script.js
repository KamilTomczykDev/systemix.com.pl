const firstSection = document.querySelector("#firstSection");
const nav = document.querySelector("nav");
const footerNav = document.querySelector(".footer--nav");
const allSections = document.querySelectorAll(".reveal__section");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const productsContainer = document.querySelector(".products--wrapper");
const batteryHoverElements = document.querySelectorAll(".battery--hover");
const batteries = document.querySelectorAll(".battery");

// product hovering feature //
const closeHover = () => {
  for (const battery of batteryHoverElements) {
    battery.classList.add("--disabled");
  }
};
productsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".battery");
  if (!clicked) return;
  for (const battery of batteries) {
    battery.style.backgroundColor = "var(--green-brand-color)";
  }

  console.log(clicked);
  const elementFound = document.getElementById(`${clicked.dataset.id}`);
  console.log(elementFound);
  setTimeout(() => {
    closeHover();
    elementFound.classList.toggle("--disabled");
    clicked.style.backgroundColor = "var(--red-brand-color)";
  }, 1);
});

document.body.addEventListener("click", (e) => {
  const clicked = e.target;
  if (e.target !== batteryHoverElements) {
    closeHover();
    for (const battery of batteries) {
      battery.style.backgroundColor = "var(--green-brand-color)";
    }
  }
  console.log(clicked);
});

//page starting from top on refresh //
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// Loading images

const loadImage = (path) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // to avoid CORS if used with Canvas
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
};
const imageLoading = async function (url) {
  await loadImage(url);
};
imageLoading("img/company-pic.jpg");
imageLoading("img/company-pic-2.jpg");
imageLoading("img/company-pic-3.jpeg");
imageLoading("img/company-pic-4.jpg");
imageLoading("img/slider3.jpg");
imageLoading("img/slider4.jpg");
imageLoading("img/slider5.jpg");
imageLoading("img/slider6.jpg");

// Smooth Loading left side of nav

const lowHeaderLeft = document.querySelector(".low-header--content");
console.log(lowHeaderLeft);

window.addEventListener("load", function () {
  lowHeaderLeft.classList.remove("section--hidden");
});
// Smooth Scrolling
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

footerNav.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

document.querySelector(".learn-more").addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//STICKY NAV

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     nav.style.position = "fixed";
//   } else {
//     nav.style.position = "static";
//   }
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });
// headerObserver.observe(header);

//Reveal sections

const reveal = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  }
};
const sectionObserver = new IntersectionObserver(reveal, {
  root: null,
  threshold: 0.2,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});
