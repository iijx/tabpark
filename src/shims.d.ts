
export {};

declare global {
  interface Window {
    baidu: {
      sug: (data: any) => void;
    }
  }
}