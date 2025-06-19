export const getTemplate = (templateId: string): HTMLTemplateElement => {
  const template = document.getElementById(templateId) as HTMLTemplateElement;
  if (!template) throw new Error(`Template not found: ${templateId}`);
  return template;
};

export const cloneTemplate = (template: HTMLTemplateElement): DocumentFragment => {
  if (!template) throw new Error('Template not found');
  return template.content.cloneNode(true) as DocumentFragment;
};

export const getMainContent = (): HTMLElement => {
  const mainContent = document.querySelector('main');
  if (!mainContent) throw new Error('Element main not found');
  return mainContent as HTMLElement;
};

export const renderTemplate = (templateId: string): void => {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Template not found: ${templateId}`);

  const mainContent = getMainContent();
  if (!mainContent) throw new Error('Element main not found');

  mainContent.innerHTML = '';

  const content = template.content.cloneNode(true) as DocumentFragment;

  //TODO un nouveau proxy pour hydrater le template

  if (templateId === 'home-template') {

    const counter = new Proxy({
      count: 0,
      increment: () => {
        counter.count++;
      },
      decrement: () => {
        counter.count--;
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


    counter.count = 10;
    const incrementButton = content.querySelector('#increment') as HTMLButtonElement;
    const decrementButton = content.querySelector('#decrement') as HTMLButtonElement;

    incrementButton?.addEventListener('click', () => {
      console.log('increment');
      counter.increment();
    });
    decrementButton?.addEventListener('click', () => {
      counter.decrement();
    });

    console.log('main');
  }
  mainContent.appendChild(content.firstElementChild as Node);
}; 