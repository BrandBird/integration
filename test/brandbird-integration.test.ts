import { BrandBirdIntegration } from '../src/brandbird-integration';

describe('BrandBird Integration', () => {
  it('should have data right after constructing', () => {
    const integration = new BrandBirdIntegration();

    expect(integration.data).toBeTruthy();
  });
});
