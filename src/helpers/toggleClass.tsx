export function toggleClass(element: any, className: string, action: string) {
  console.log("toggleClass", element, className, action)
    if (!element || !className) {
      console.error("Element and className are required");
      return;
    }
  
    if (action === "add") {
      element.classList.add(className);
    } else if (action === "remove") {
      element.classList.remove(className);
    } else {
      console.error("Action must be 'add' or 'remove'");
    }
  }