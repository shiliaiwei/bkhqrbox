declare module 'bakong-khqr' {
  export class BakongKHQR {
    generateIndividual(individualInfo: any): any;
    generateMerchant(merchantInfo: any): any;
    static decode(khqrString: string): any;
    static verify(khqrString: string): { isValid: boolean };
    static generateDeepLink(url: string, qr: string, sourceInfo?: any): Promise<any>;
    static checkBakongAccount(url: string, bakongId: string): Promise<any>;
  }

  export class IndividualInfo {
    constructor(
      bakongAccountID: string,
      merchantName: string,
      merchantCity: string,
      optional?: any
    );
  }

  export class MerchantInfo extends IndividualInfo {
    constructor(
      bakongAccountID: string,
      merchantName: string,
      merchantCity: string,
      merchantID: string,
      acquiringBank: string,
      optional?: any
    );
  }

  export const khqrData: {
    currency: {
      usd: string;
      khr: string;
    };
    merchantType: {
      individual: string;
      merchant: string;
    };
  };

  export class SourceInfo {
    constructor(appIconUrl: string, appName: string, appDeepLinkCallback: string);
  }
}
