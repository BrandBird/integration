import './index.less';
import { BrandBirdIntegration } from './brandbird-integration';

const integration = new BrandBirdIntegration();

export const openBrandBird = integration.openBrandBird;
