export class HelperDOM {
  static GetElementBySelector(selectorName: string): {
    element: HTMLElement | null,
    error: Error | null
  } {
    let element = document.querySelector(selectorName);
    if (!element) return { element: null, error: new Error(`can't find any html element with selector name "${selectorName}"`) }
    return { element: element as HTMLElement, error: null }
  }
}
