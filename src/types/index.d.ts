export {};

declare global {
  interface Window {
    Cypress: any;
    overmind: any;
  }
}