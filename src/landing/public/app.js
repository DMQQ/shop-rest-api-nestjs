"use strict";

window.addEventListener("DOMContentLoaded", () => {
  // reveal section on scroll

  const sections = [...document.querySelectorAll(".block")];

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("hidden");

        obs.unobserve(entry.target);
      }
    });
  });

  sections.forEach((section) => obs.observe(section));

  // get header height

  const header = document.querySelector(".header");

  document
    .querySelector(".landing")
    .style.setProperty("--header-height", header.offsetHeight + "px");

  // lazy loading
  const images = [...document.getElementsByTagName("img")];

  const observer = new IntersectionObserver((items, observer) => {
    items.forEach((item) => {
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.url;

        observer.unobserve(item.target);
      }
    });
  });
  images.forEach((image) => {
    observer.observe(image);
  });
});
