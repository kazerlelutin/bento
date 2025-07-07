const state = new Proxy({
  count: 0,
  increment: () => {
    state.count++;
  },
  decrement: () => {
    state.count--;
  },

}, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    const counterElement = document.getElementById('counter');
    if (counterElement) {
      counterElement.textContent = target.count.toString();
    }
    return true;
  }
});

export default {

  init() {
    const content = document.querySelector('main')
    if (!content) {
      return new Error('main is not in DOM')
    }

    state.count = 0;
    const incrementButton = content.querySelector('#increment') as HTMLButtonElement;
    const decrementButton = content.querySelector('#decrement') as HTMLButtonElement;

    incrementButton?.addEventListener('click', () => {
      console.log('increment');
      state.increment();
    });
    decrementButton?.addEventListener('click', () => {
      state.decrement();
    });
  }
}