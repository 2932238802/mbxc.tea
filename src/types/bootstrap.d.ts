declare module 'bootstrap' {
  export class Toast {
    static getOrCreateInstance(el: Element, options?: any): Toast
    show(): void
    hide(): void
  }
  export class Modal {
    static getOrCreateInstance(el: Element, options?: any): Modal
    static getInstance(el: Element): Modal | null
    show(): void
    hide(): void
  }
}
