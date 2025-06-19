import { World } from "@cucumber/cucumber"


export class BentoWorld extends World {
  private context: {
    apiUrl: string
  }

  constructor(props: {
    attach: (data: any, mediaType: string) => void
    parameters: { [key: string]: string }
  }) {
    super(props as any);
    this.context = {
      apiUrl: 'test'
    }

    console.log('BentoWorld constructor');
  }

  get apiUrl() {
    return this.context.apiUrl;
  }

  set apiUrl(url: string) {
    this.context.apiUrl = url;
  }

}
