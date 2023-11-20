import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  marginIncrement = 0.5;

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
    clone.style.marginRight = `${this.marginIncrement}rem`;

    container.appendChild(clone);

    setTimeout(() => {
      clone.style.top = "1.3rem";
      clone.style.right = "1.4rem";
      clone.style.width = "1.4rem";
      clone.style.height = "1.4rem";
      clone.style.transition = "top 0.8s, right 0.8s, width 0.8s";
    }, 50);

    setTimeout(() => {
      card.classList.add("hidden");
    }, 500);

    this.updateMarginIncrement();
  }

  updateMarginIncrement() {
    this.marginIncrement += 0.5;
  }
}
