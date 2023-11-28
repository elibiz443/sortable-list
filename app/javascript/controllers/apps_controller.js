import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["appsDialog"]

  connect() {
    document.addEventListener("todoUpdated", (event) => this.closeAfterUpdate(event));
  }

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

  closeAfterUpdate(event) {
    event.preventDefault();
    if (event.detail && event.detail.success) {
      this.appsDialogTarget.close();
    }
  }
}
