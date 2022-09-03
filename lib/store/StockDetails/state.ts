export interface PreviousClose {
  c: number;
  o: number;
  h: number;
  l: number;
}

// interface PreviousCloseDetail

export interface StockDetails {
  ticker: string;
  name?: string;
  branding: {
    icon_url?: string;
    logo_url?: string;
  };
  description?: string;
  sic_description?: string;
  homepage_url?: string;
}

export const StockDetailsState: StockDetails = {
  description: "",
  name: "",
  branding: {
    icon_url: "",
    logo_url: "",
  },
  sic_description: "",
  ticker: "",
  homepage_url: "",
};

export const StockPreviousState : PreviousClose = {
    c:0,
    l:0,
    h:0,
    o:0
}
