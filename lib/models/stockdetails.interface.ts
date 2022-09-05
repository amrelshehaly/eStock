export interface PreviousClose {
    c: number;
    o: number;
    h: number;
    l: number;
  }

// export interface PreviousClose {
//   results: PreviousCloseProps[]
// }
  
  // interface PreviousCloseDetail
  
  export interface StockDetails {
    ticker: string;
    name: string;
    branding: {
      icon_url: string;
      logo_url: string;
    };
    description: string;
    sic_description: string;
    homepage_url: string;
  }

  // export interface StockDetails {
  //   results:StockDetailsProps
  // }