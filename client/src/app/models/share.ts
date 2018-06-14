export class ShareRate {
    constructor(
        public price: string,
        public date: string,
    ) { }
}
export class Share {
    constructor(
      public name: string,
      public sharerates: ShareRate[],
    ) { }
}
