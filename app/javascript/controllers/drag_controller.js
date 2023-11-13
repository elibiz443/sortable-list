import { Controller } from "@hotwired/stimulus"
// Default SortableJS
import Sortable from 'sortablejs';

// Connects to data-controller="drag"
export default class extends Controller {
  connect() {
    this.initializeDrag();
  }

  initializeDrag() {
    new Sortable(this.element, {
      onEnd: this.handleDrop.bind(this),
    });
  }

  handleDrop(event) {
    const item = event.item;
    const itemId = item.getAttribute("data-sortable-item-id");
    const newPosition = Array.from(item.parentNode.children).indexOf(item) + 1;

    // Send an AJAX request to update the position
    fetch(`${this.data.get("url")}/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({ position: newPosition }),
    });
  }
}
