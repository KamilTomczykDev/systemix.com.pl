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
const allBars = document.querySelectorAll(".no-animation");
const container = document.querySelector(".modal-container");
const wrongBattery = document.querySelector(".wrong-battery");
const allNewStuffTitles = document.querySelectorAll(
  ".moved-left, .moved-right"
);

// bars animation
function showPercentages(num) {
  const elements = document.querySelectorAll(".bar-percentage");
  elements[num].style.opacity = "1";
}

const expand = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.classList.remove("no-animation");
    setTimeout(() => {
      entry.target.style.width = entry.target.id;
      if (entry.target.dataset.index)
        showPercentages(entry.target.dataset.index);
    }, 3000);
    observer.unobserve(entry.target);
  }
};

const barObserver = new IntersectionObserver(expand, {
  root: null,
  threshold: 0.1,
});

allBars.forEach(function (bar) {
  barObserver.observe(bar);
});

//4R25 animation

const showBorder = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.style.opacity = "1";
    observer.unobserve(entry.target);
  }
};

const borderObserver = new IntersectionObserver(showBorder, {
  root: null,
  threshold: 0.8,
});

borderObserver.observe(wrongBattery);

//new-stuff--title animation

const showTitle = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    return;
  } else {
    entry.target.style.opacity = "1";
    entry.target.style.transform = "translateX(0)";
    observer.unobserve(entry.target);
  }
};

const titleObserver = new IntersectionObserver(showTitle, {
  root: null,
  threshold: 1,
});

allNewStuffTitles.forEach((title) => titleObserver.observe(title));

// header-slider

const state = {
  imageNum: 4,
};

const iterate = function () {
  setInterval(() => {
    document.querySelector(`.slider-${state.imageNum}`).style.opacity = "0";
    if (state.imageNum !== 4) {
      state.imageNum += 1;
    } else {
      state.imageNum = 1;
    }
    document.querySelector(`.slider-${state.imageNum}`).style.opacity = "1";
  }, 8000);
};

iterate();

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
  const elementFound = document.getElementById(`${clicked.dataset.id}`);

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

  const elementFound = document.getElementById(`${clicked.dataset.id}`);
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
});

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
