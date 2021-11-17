import { BrandBirdConfig } from './types';

const DEFAULT_CONFIG: BrandBirdConfig = {
  url: 'https://brandbird.app/integration',
  provider: 'Company',
};

export class BrandBirdIntegration {
  data?: {
    config: BrandBirdConfig;
    resolve: (blob: Blob) => void;
    reject: (reason: any) => void;
    container?: HTMLDivElement;
    iframe?: HTMLIFrameElement;
  };

  constructor() {
    this.openBrandBird = this.openBrandBird.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.teardown = this.teardown.bind(this);
  }

  openBrandBird(_config?: BrandBirdConfig) {
    if(this.data) return
    return new Promise<Blob>((resolve, reject) => {
      this.data = {
        resolve,
        reject,
        config: Object.assign({}, DEFAULT_CONFIG, _config),
      };

      const container = document.createElement('div');
      container.className = '__brandbird-container';

      const wrapper = document.createElement('div');
      wrapper.className = '__brandbird-wrapper';

      const loadingSpinner = document.createElement('div');
      loadingSpinner.innerHTML =
        '<div><div></div><div class="double-bounce2"></div></div>';

      const iframe = document.createElement('iframe');
      iframe.src = this.data.config.url + '';

      wrapper.appendChild(loadingSpinner);
      wrapper.appendChild(iframe);
      container.appendChild(wrapper);

      window.addEventListener('message', this.onMessage);
      this.data.container = container;
      this.data.iframe = iframe;
      container.onclick = this.teardown;
      document.body.appendChild(container);
    });
  }

  private onMessage(event: MessageEvent) {
    
    if (!this.data) {
      return;
    }

    if (this.data.config.url?.includes(event.origin)) {
      if (typeof event.data === 'object') {
        switch (event.data.type) {
          case 'loaded':
            this.data.iframe?.contentWindow?.postMessage(
              {
                type: 'hello',
                provider: this.data.config.provider,
                src: this.data.config.src,
              },
              '*'
            );
            break;
          case 'cancel':
            this.teardown();
            break;
          case 'image':
            this.data.resolve(event.data.blob);
            this.teardown();
            break;
          case 'error':
            console.error('BrandBird reported an error: ', event.data.error);
            this.data.reject(event.data.error);
            this.teardown();
            break;
        }
      }
    }
  }

  private teardown() {
    if (this.data?.container) {
      window.removeEventListener('message', this.onMessage);
      this.data.container.remove();
      delete this.data;
    }
  }
}
