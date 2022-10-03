class ViewBase {
    bridge;
  
    constructor() {
      this.bridge = window.Bridge;
      this.attachEvents();
    }
  
    //Document element selector
    get(el) {
      return document.querySelector(el);
    }
  
    getAll(els) {
      return document.querySelectorAll(el);
    }
  
    attachEvents() {}
  }
  