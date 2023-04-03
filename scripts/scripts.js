import {
  sampleRUM,
  buildBlock,
  loadHeader,
  loadFooter,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateBlocks,
  decorateTemplateAndTheme,
  waitForLCP,
  loadBlocks,
  loadCSS,
  toClassName,
  setLanguage,
  createMetadata,
} from './lib-franklin.js';

import {
  decorateHistorySection,
  observeHistorySection,
} from './lib-history-section.js';

const LCP_BLOCKS = []; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'mammotome'; // add your RUM generation information here

const ARC_BOTTOM_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1437 210.42">\n'
  + '    <path class="cls-1" d="M0,21.28V210.42H1437v-.11C784.82-93.55,0,21.28,0,21.28Z"/>\n'
  + '</svg>';

const ARC_TOP_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1437 210.42">\n'
+ '    <path class="cls-1" d="M0,21.28V210.42H1437v-.11C784.82-93.55,0,21.28,0,21.28Z" transform="translate(718.500000, 105.211150) scale(-1, -1) translate(-718.500000, -105.211150)" />\n'
+ '</svg>';

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const h2 = main.querySelector('h2');
  const picture = main.querySelector('picture');

  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    const elems = [picture, h1];

    // optional H2 following the hero's H1
    if (h2 && h1.nextElementSibling === h2) {
      elems.push(h2);
    }

    const arc = document.createElement('div');
    arc.classList.add('hero-arc');
    arc.innerHTML = ARC_BOTTOM_SVG;

    elems.push(arc);

    section.append(buildBlock('hero', { elems }));
    main.prepend(section);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Checks if the section passed as a parameter is a Styled Section,
 * i.e. it has styles defined in the section metadata
 * @param {Element} section
 */
function decorateStyledSection(section) {
  Object.keys(section.dataset)
    .filter((attrName) => attrName.startsWith('style'))
    .map((attrKey) => {
      const clsPrefix = toClassName(attrKey.substring(5));
      const value = section.dataset[attrKey];
      if (clsPrefix === 'backgroundimage') {
        section.style.backgroundImage = `url(${value})`;
        section.style.backgroundSize = 'cover';
        return null;
      }
      if (clsPrefix === 'arc') {
        const arc = document.createElement('div');
        arc.classList.add('arc');
        const arcPosition = toClassName(value);
        if (arcPosition === 'bottom') {
          arc.innerHTML = ARC_BOTTOM_SVG;
          section.append(arc);
        } else if (arcPosition === 'top') {
          arc.innerHTML = ARC_TOP_SVG;
          section.prepend(arc);
        }
        return 'styled-section-arc';
      }
      return `styled-section-${clsPrefix}-${toClassName(value)}`;
    })
    .filter((x) => x)
    .forEach((styledClass) => section.classList.add(styledClass));
}

/**
 * Finds all sections in the main element of the document
 * and for each of them invokes the method that will apply
 * to the section the styles defined in the section metadata
 * @param {Element} main
 */
function styledSections(main) {
  Array.from(main.querySelectorAll('.section'))
    .forEach((section) => decorateStyledSection(section));
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export async function decorateMain(main) {
  // hopefully forward compatible button decoration
  decorateButtons(main);
  await decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  styledSections(main);
  decorateBlocks(main);

  if (main.querySelector('.section.our-history')) {
    decorateHistorySection(main);
    observeHistorySection(main);
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element|Document} doc The container element
 */
async function loadEager(doc) {
  setLanguage();
  decorateTemplateAndTheme();
  const main = doc.querySelector('main');
  if (main) {
    await decorateMain(main);
    await waitForLCP(LCP_BLOCKS);
  }
}

/**
 * Adds a favicon.
 * @param {string} href The favicon URL
 * @param {string} rel The icon rel
 * @param {string} type The icon content type
 * @param {string} size The dimensions of the icon, e.g. 80x80
 */
export function addFavIcon(
  href,
  rel = 'icon',
) {
  const link = document.createElement('link');
  link.rel = rel;
  link.href = href;

  const existingLink = document.querySelector(`head link[rel="${rel}"]`);
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element|Document} doc The container element
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  await loadHeader(doc.querySelector('header'));
  await loadFooter(doc.querySelector('footer'));

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`, null);

  addFavIcon(`${window.hlx.codeBasePath}/styles/icons/favicon-32x32.png`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/icons/favicon-180x180.png`, 'apple-touch-icon');
  createMetadata('msapplication-TileImage', `${window.hlx.codeBasePath}/styles/icons/favicon-270x270.png`);

  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  // eslint-disable-next-line import/no-cycle
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

await loadPage();
