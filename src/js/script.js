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
const newStuffProducts = document.querySelector(".new-stuff--products");
const allImages = document.querySelectorAll(".battery--hover--img");

const container = document.querySelector(".modal-container");

// product photo modal
const closeModal = () => {
  container.classList.toggle("hidden");
};

const showModal = (imgsrc) => {
  container.classList.toggle("hidden");
  container.innerHTML = "";
  const markup = `
  <div class="modal">
    <div class="modal--img-container">
      <button class="modal--button">&times;</button>
      <img class="modal--img" src="${imgsrc}" alt="Zdjęcie baterii"/>
    </div>
    <div class="modal--overlay"></div>
  </div>
  `;
  container.insertAdjacentHTML("beforeend", markup);
};

allImages.forEach(function (img) {
  img.addEventListener("click", (e) => {
    const src = e.target.src;
    console.log(window.innerWidth);
    if (window.innerWidth > 1000) {
      showModal(src);
      const overlay = document.querySelector(".modal--overlay");
      overlay.addEventListener("click", () => closeModal());

      const modalButton = document.querySelector(".modal--button");
      modalButton.addEventListener("click", (e) => {
        closeModal();
      });
    }
  });
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !container.classList.contains("hidden")) {
    closeModal();
  }
});

// product hovering feature //
const closeHover = () => {
  for (const battery of batteryHoverElements) {
    battery.classList.add("--disabled");
  }
};

const setDefaultButton = () => {
  for (const battery of batteries) {
    battery.style.backgroundColor = "var(--green-brand-color)";
  }
};

newStuffProducts.addEventListener("click", (e) => {
  const clicked = e.target.closest(".battery");
  if (!clicked) return;
  setDefaultButton();

  // console.log(clicked);
  const elementFound = document.getElementById(`${clicked.dataset.id}`);
  // console.log(elementFound);
  setTimeout(() => {
    closeHover();
    elementFound.classList.toggle("--disabled");
    clicked.style.backgroundColor = "var(--red-brand-color)";
  }, 1);
});

productsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".battery");
  if (!clicked) return;
  for (const battery of batteries) {
    battery.style.backgroundColor = "var(--green-brand-color)";
  }

  // console.log(clicked);
  const elementFound = document.getElementById(`${clicked.dataset.id}`);
  // console.log(elementFound);
  setTimeout(() => {
    closeHover();
    elementFound.classList.toggle("--disabled");
    clicked.style.backgroundColor = "var(--red-brand-color)";
  }, 1);
});

document.body.addEventListener("click", (e) => {
  const clicked = e.target;
  if (clicked !== batteryHoverElements && clicked !== container) {
    closeHover();
    setDefaultButton();
  }
  // console.log(clicked);
});

//page starting from top on refresh //
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };

// Smooth Scrolling
document.querySelector(".nav__links").addEventListener("click", function (e) {
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
