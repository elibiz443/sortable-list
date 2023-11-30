import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel"];

  connect() {
    document.addEventListener("click", this.handleClickOutside.bind(this));
  }

  disconnect() {
    document.removeEventListener("click", this.handleClickOutside.bind(this));
  }

  toggle() {
    this.panelTarget.classList.toggle("hidden");
  }

  handleClickOutside(event) {
    if (!this.element.contains(event.target)) {
      this.panelTarget.classList.add("hidden");
    }
  }
}
