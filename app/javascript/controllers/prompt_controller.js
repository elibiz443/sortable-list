import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["prompt"]

  open(event) {
    event.preventDefault();
    this.promptTarget.showModal();
    this.promptTarget.addEventListener("click", (e) => this.backdropClick(e));
  }

  close(event) {
    event.preventDefault();
    this.promptTarget.close();
  }

  backdropClick(event) {
    event.target === this.promptTarget && this.close(event);
  }
}
