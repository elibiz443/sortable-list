import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  minimizeCard(event) {
    const card = event.currentTarget.closest('.card');
    const container = card.closest('[data-target="folder.container"]');
    const header = container.querySelector('[data-target="folder.header"]');

    const cardRect = card.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    const clone = card.cloneNode(true);
    clone.classList.add("minimized");

    const topDiff = cardRect.top - headerRect.top;
    const leftDiff = cardRect.left - headerRect.left;


    clone.style.top = `${topDiff}px`;
    clone.style.right = `${leftDiff}px`;

    container.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.top = "1.3rem";
      clone.style.right = "1.4rem";
      clone.style.width = "2.4rem";
      clone.style.height = "2.4rem";
      clone.style.transition = "top 0.8s, right 0.8s, width 0.8s";
    }, 50);

    setTimeout(() => {
      clone.style.opacity = "0";
      clone.style.transition = "opacity 0.5s";
      clone.style.pointerEvents = "none";
    }, 1000);

    setTimeout(() => {
      container.removeChild(clone);
    }, 1500);
  }
}
