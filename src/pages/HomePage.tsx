import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { CatalogPreviewSection } from '@/components/home/CatalogPreviewSection';
import { CTASection } from '@/components/home/CTASection';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CatalogPreviewSection />
      <CTASection />
    </>
  );
}
