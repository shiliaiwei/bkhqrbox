import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Local Deployment & Responsive Vector Banknote Suite', () => {
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');
  const banknoteSvgPath = path.join(publicDir, 'backgrounds', 'cardbanknote.svg');
  const dragonSvgPath = path.join(publicDir, 'backgrounds', 'card-dragon.svg');
  const libertySvgPath = path.join(publicDir, 'backgrounds', 'card-liberty.svg');

  describe('1. Responsive Vector Asset Integrity & Zero Heavy PNGs', () => {
    it('should verify cardbanknote.svg exists, is lightweight, and contains responsive vector patterns', () => {
      expect(fs.existsSync(banknoteSvgPath)).toBe(true);
      const content = fs.readFileSync(banknoteSvgPath, 'utf-8');
      expect(content).toContain('<svg');
      expect(content).toContain('viewBox="0 0 400 250"');
      expect(content).toContain('id="guilloche"');
      expect(content).toContain('patternUnits="userSpaceOnUse"');
      expect(content).toContain('id="cardRadial"');
      expect(content).toContain('fill="url(#guilloche)"');

      // Verify featherweight footprint (< 5KB vs heavy PNGs)
      const stat = fs.statSync(banknoteSvgPath);
      expect(stat.size).toBeLessThan(5000);
    });

    it('should verify card-dragon.svg and card-liberty.svg responsive vector backgrounds exist', () => {
      expect(fs.existsSync(dragonSvgPath)).toBe(true);
      expect(fs.existsSync(libertySvgPath)).toBe(true);

      const dragonContent = fs.readFileSync(dragonSvgPath, 'utf-8');
      expect(dragonContent).toContain('viewBox="0 0 400 250"');
      expect(dragonContent).toContain('id="dragonScale"');

      const libertyContent = fs.readFileSync(libertySvgPath, 'utf-8');
      expect(libertyContent).toContain('viewBox="0 0 400 250"');
      expect(libertyContent).toContain('id="libertyStarGrid"');
    });

    it('should confirm heavy raster PNG card backgrounds are completely removed', () => {
      const heavyPngs = [
        'account-usd.png',
        'account-khr.png',
        'card-dragon.png',
        'card-liberty.png',
        'card-liberty-full.png',
        'card-debit.png',
        'dollar_account_new.png',
        'riel_account_new.png',
      ];

      for (const png of heavyPngs) {
        const pubP = path.join(publicDir, 'images', 'banking', png);
        const resP = path.join(rootDir, 'resources', 'banking-cards', png);
        expect(fs.existsSync(pubP)).toBe(false);
        expect(fs.existsSync(resP)).toBe(false);
      }
    });

    it('should verify archived vector backgrounds exist in resources directory', () => {
      const resBanknoteSvg = path.join(rootDir, 'resources', 'banking-cards', 'cardbanknote.svg');
      const resDragonSvg = path.join(rootDir, 'resources', 'banking-cards', 'card-dragon.svg');
      const resLibertySvg = path.join(rootDir, 'resources', 'banking-cards', 'card-liberty.svg');

      expect(fs.existsSync(resBanknoteSvg)).toBe(true);
      expect(fs.existsSync(resDragonSvg)).toBe(true);
      expect(fs.existsSync(resLibertySvg)).toBe(true);
    });
  });

  describe('2. Responsive Styling & Component Binding', () => {
    it('should verify globals.css specifies responsive watermark classes with cover and no-repeat', () => {
      const cssPath = path.join(rootDir, 'src', 'app', 'globals.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');

      expect(cssContent).toContain('.skeuo-card-banknote');
      expect(cssContent).toContain('background-image: url("/backgrounds/cardbanknote.svg");');
      expect(cssContent).toContain('background-size: cover;');
      expect(cssContent).toContain('background-repeat: no-repeat;');

      expect(cssContent).toContain('.skeuo-card-dragon');
      expect(cssContent).toContain('background-image: url("/backgrounds/card-dragon.svg");');

      expect(cssContent).toContain('.skeuo-card-liberty');
      expect(cssContent).toContain('background-image: url("/backgrounds/card-liberty.svg");');
    });

    it('should verify SkeuomorphicLeatherWalletCard component includes the banknote element', () => {
      const componentPath = path.join(rootDir, 'src', 'components', 'SkeuomorphicLeatherWalletCard.tsx');
      const compContent = fs.readFileSync(componentPath, 'utf-8');

      expect(compContent).toContain('className="skeuo-card-banknote"');
      expect(compContent).toContain('Banknote Guilloche Security Watermark');
    });
  });

  describe('3. Build & Manifest Compatibility', () => {
    it('should verify package.json exports and SDK build configs are valid', () => {
      const pkgPath = path.join(rootDir, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

      expect(pkg.scripts.build).toBe('next build');
      expect(pkg.scripts['build:sdk']).toBe('tsc -p tsconfig.sdk.json');
      expect(pkg.scripts['build:all']).toBe('npm run build:sdk && npm run build');
    });

    it('should verify resources catalog index includes vector banknote and background assets', () => {
      const catalogPath = path.join(rootDir, 'resources', 'catalog.json');
      expect(fs.existsSync(catalogPath)).toBe(true);

      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
      expect(catalog.images.banking.length).toBeGreaterThan(0);

      const hasBanknoteSvg = catalog.images.banking.some((item: { filename: string }) => item.filename === 'cardbanknote.svg');
      const hasDragonSvg = catalog.images.banking.some((item: { filename: string }) => item.filename === 'card-dragon.svg');
      const hasLibertySvg = catalog.images.banking.some((item: { filename: string }) => item.filename === 'card-liberty.svg');

      expect(hasBanknoteSvg).toBe(true);
      expect(hasDragonSvg).toBe(true);
      expect(hasLibertySvg).toBe(true);
    });
  });
});
