export default class BaseComponent {
  constructor() {
    this._listeners = [];
  }

  _addListener (elem, event, callback) {
    elem.addEventListener(event, callback);
    console.log('even added');
  }

  _setListeners(listeners) {
    listeners.forEach(listener => {
      this._addListener(listener.elem, listener.even, listener.callback);
    });
  }

  _clearListeners() {
    this._listeners.forEach(listener => {
      const { elem, event, callback } = listener;
      elem.removeEventListener(event, callback);
    })
  }
}