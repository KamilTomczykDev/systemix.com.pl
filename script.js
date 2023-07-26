const firstSection = document.querySelector("#firstSection");
const nav = document.querySelector("nav");
const allSections = document.querySelectorAll(".reveal__section");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

//Smooth Loading left side of nav

const lowHeaderLeft = document.querySelector(".lowHeaderLeft");
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

document.querySelector(".learnMore").addEventListener("click", function (e) {
  e.preventDefault();
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

//STICKY NAV

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.style.position = "fixed";
  } else {
    nav.style.position = "absolute";
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

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
  threshold: 0.3,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});
