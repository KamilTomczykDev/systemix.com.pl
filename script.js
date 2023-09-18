const firstSection = document.querySelector("#firstSection");
const nav = document.querySelector("nav");
const footerNav = document.querySelector(".footer--nav");
const allSections = document.querySelectorAll(".reveal__section");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");

// Loading images
const loadPics = async function () {
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
  const img = await loadImage("/img/background.jpeg");
};

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
