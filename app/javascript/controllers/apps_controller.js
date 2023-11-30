import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["appsDialog"]

  open(event) {
    event.preventDefault();
    this.appsDialogTarget.showModal();
    this.appsDialogTarget.addEventListener('click', (e) =>  this.backdropClick(e));
  }

  close(event) {
    event.preventDefault();
    this.appsDialogTarget.close();
  }

  backdropClick(event) {
    event.target === this.appsDialogTarget && this.close(event);
  }
}
