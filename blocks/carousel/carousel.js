import Carousel from '../../scripts/lib-carousel.js';
import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

/**
 * Get optimized img element width default
 * @param picture
 */
export function optimizeThumbnails(picture) {
  createOptimizedPicture(
    picture,
    true,
    [{ width: '768' }],
  );
}

export default function decorate(block) {
  optimizeThumbnails(block);

  const carousel = new Carousel(block.firstElementChild.lastElementChild);
  carousel.createPictureSlider();
  carousel.setSliderIds();

  // if (carousel.sliderIds.length > 1) {
  if (carousel.hasSlides()) {
    carousel.createArrowNav();
    carousel.createDottedNav();
    carousel.initSlider();
  }
}
