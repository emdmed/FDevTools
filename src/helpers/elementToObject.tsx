export function elementToObject(element: HTMLElement) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('Provided input is not a valid HTML element');
    }
  
    // Extract attributes
    const attributes = Array.from(element.attributes).reduce<Record<string, string>>((acc, attr) => {
      acc[attr.name] = attr.value;
      return acc;
    }, {});
  
    // Create the object
    const object = {
      tagName: element.tagName.toLowerCase(), // Element's tag name
      attributes: attributes, // Element's attributes as key-value pairs
      styles: element.style.cssText, // Inline styles as a string
      innerText: element.innerText, // Text content inside the element
      innerHTML: element.innerHTML, // HTML content inside the element
      parent: {
        name: element.parentElement?.nodeName,
        class: element.parentElement?.classList,
        id:  element.parentElement?.id
      }
    };
  
    return object;
  }
  