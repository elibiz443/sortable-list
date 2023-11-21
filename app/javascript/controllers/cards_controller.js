import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card"];
  marginIncrement = 0.5;

  connect() {
    this.applyMargins();
    this.cardTargets.forEach((card) => {
      card.addEventListener("mouseenter", this.increaseMargin.bind(this));
      card.addEventListener("mouseleave", this.resetMargin.bind(this));
    });
  }

  applyMargins() {
    this.cardTargets.forEach((card, index) => {
      card.style.transition = "margin-right 0.3s ease"; // Transition added
      card.style.marginRight = `${this.marginIncrement * (index + 1)}rem`;
    });
  }

  increaseMargin(event) {
    this.marginIncrement = 1.4;
    this.applyMargins();
  }

  resetMargin(event) {
    this.marginIncrement = 0.5;
    this.applyMargins();
  }
}
