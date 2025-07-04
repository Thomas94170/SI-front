declare module 'html2pdf.js' {
  const html2pdf: {
    (): {
      set: (options: any) => {
        from: (element: HTMLElement) => {
          save: () => void;
        };
      };
    };
  };
  export = html2pdf;
}
