let components = [
 
];

const registorWebComponent = () => {
  if ((process && process.env && process.env.NODE_ENV === 'test')) {
    // currently do not support webcomponent test
  } else {
    const customElements = window.customElements;
    if (customElements && customElements.define) {
      components.map((c) => {
        customElements.define(c.prototype.RegistorName, c);
      });
    }
  }

};

export default registorWebComponent;
