export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _addListener (elem, event, callback) {
    if (elem) elem.addEventListener(event, callback);
  }

  _setListeners(listeners) {
    Array.prototype.push.apply(this._listeners, listeners);
    listeners.forEach(listener => {
      this._addListener(listener.elem, listener.event, listener.callback);
    });
  }

  _clearListeners() {
    this._listeners.forEach(listener => {
      const { elem, event, callback } = listener;
      elem.removeEventListener(event, callback);
    })
  }
}