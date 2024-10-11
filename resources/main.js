/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./blocks/cards/cards.js":
/*!*******************************!*\
  !*** ./blocks/cards/cards.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


const isValidUrl = (urlString) => {
  try {
    return new URL(urlString);
  } catch (e) {
    return false;
  }
};

function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');

  const processRow = (row) => {
    const li = document.createElement('li');
    let cardLink;

    const processDiv = (div) => {
      const { children } = div;
      const picture = div.querySelector('picture');

      if (children.length === 1 && picture) {
        div.className = 'cards-card-image';
      } else {
        div.className = children.length ? 'cards-card-body' : 'cards-card-body empty';
        const action = div.querySelectorAll('p a');

        const containsHeading = Array.from(div.querySelectorAll('h1, h2, h3')).length > 0;

        if (!containsHeading) {
          div.classList.add('no-heading');
        } else {
          // remove download icons for headings
          div.querySelectorAll('h1, h2, h3 i.link-icon')
            .forEach((heading) => heading.querySelectorAll('i.link-icon')
              .forEach((icon) => icon.remove()));
        }

        if (action.length === 1) {
          const actionBlock = div.querySelector('.button-container') || action[0].parentElement;
          actionBlock.className = isValidUrl(action[0].text) ? 'callout hidden' : 'callout';
          div.classList.toggle('callout-hidden', actionBlock.classList.contains('hidden'));

          actionBlock.innerHTML = action[0].innerHTML;

          cardLink = document.createElement('a');
          cardLink.href = action[0].href;
          cardLink.innerHTML = row.innerHTML;
        }
      }
    };

    [...row.children].forEach(processDiv);

    if (cardLink) {
      li.appendChild(cardLink);
    } else {
      li.innerHTML = row.innerHTML;
    }
    return li;
  };

  [...block.children].forEach((row) => {
    ul.append(processRow(row));
  });

  const processImg = (img) => {
    const picture = img.closest('picture');
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createOptimizedPicture)(picture,  false,   [{ width: '600' }]);
  };

  ul.querySelectorAll('img').forEach(processImg);

  block.textContent = '';
  block.append(ul);
}


/***/ }),

/***/ "./blocks/carousel/carousel.js":
/*!*************************************!*\
  !*** ./blocks/carousel/carousel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate),
/* harmony export */   optimizeThumbnails: () => (/* binding */ optimizeThumbnails)
/* harmony export */ });
/* harmony import */ var _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-carousel.js */ "./scripts/lib-carousel.js");
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");



/**
 * Get optimized img element width default
 * @param picture
 */
function optimizeThumbnails(picture) {
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__.createOptimizedPicture)(
    picture,
    true,
    [{ width: '768' }],
  );
}

function decorate(block) {
  optimizeThumbnails(block);

  const carousel = new _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__["default"](block.firstElementChild.lastElementChild);
  carousel.createPictureSlider();
  carousel.setSliderIds();

  // if (carousel.sliderIds.length > 1) {
  if (carousel.hasSlides()) {
    carousel.createArrowNav();
    carousel.createDottedNav();
    carousel.initSlider();
  }
}


/***/ }),

/***/ "./blocks/collapsible/collapsible.js":
/*!*******************************************!*\
  !*** ./blocks/collapsible/collapsible.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
function decorate(block) {
  const processRow = (row) => {
    const [questionArea, answerArea] = Array.from(row.children);

    questionArea.classList.add('question');
    answerArea.classList.add('answer');

    const question = document.createElement('a');

    const answerBlock = document.createElement('p');
    answerBlock.innerHTML = answerArea.innerHTML;

    answerArea.textContent = '';
    answerArea.appendChild(answerBlock);

    question.innerHTML = `<span>${questionArea.innerHTML}</span>`;
    questionArea.textContent = '';
    questionArea.appendChild(question);

    answerArea.classList.add('collapsed');

    questionArea.addEventListener('click', () => {
      questionArea.classList.toggle('expanded');

      if (questionArea.classList.contains('expanded')) {
        // Expand the answer
        answerArea.style.height = `${answerArea.scrollHeight}px`;
      } else {
        // Collapse the answer
        answerArea.style.height = '0';
      }

      answerArea.classList.toggle('collapsed');
    });
  };

  Array.from(block.children).forEach(processRow);
}


/***/ }),

/***/ "./blocks/columns/columns.js":
/*!***********************************!*\
  !*** ./blocks/columns/columns.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/**
 * Sometimes in columns containing only text,
 * the text is not wrapped by a paragraph.
 * This breaks the styling and makes it difficult to identify
 * text only columns. This methods fixes it by forcing wrapping
 * the text in a paragraph.
 * @param {HTMLElement} col
 */
function decorateOnlyTextColumn(col) {
  if (col.firstChild && col.firstChild.nodeType === Node.TEXT_NODE
    && !col.firstElementChild) {
    const paragraph = document.createElement('p');
    paragraph.appendChild(col.firstChild);
    col.appendChild(paragraph);
  }
}

function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col, index) => {
      decorateOnlyTextColumn(col);
      const pic = col.querySelector('picture');
      const text = col.querySelector('p');

      // Adds Href to image if linked-images class was set
      if (pic && text && block.classList.contains('linked-images')) {
        const a = col.querySelector('a');
        if (a) {
          const href = a.getAttribute('href');
          const p = pic.parentElement;
          const newA = document.createElement('a');
          const imageLinkLabel = a.getAttribute('aria-label');
          newA.setAttribute('href', href);
          newA.setAttribute('aria-label', imageLinkLabel);
          newA.appendChild(pic);
          p.appendChild(newA);
        }
      }

      if (pic && !text) {
        const oddeven = (index % 2 === 0) ? 'even' : 'odd';
        const picWrapper = pic.closest('div');
        const picDecoration = document.createElement('div');
        const picImg = document.createElement('div');
        const frag = document.createDocumentFragment();

        picWrapper.classList.add('columns-img-wrapper', `columns-img-wrapper-${oddeven}`);

        picDecoration.classList.add('columns-img-decoration');
        picImg.classList.add('columns-img');
        picImg.appendChild(pic);
        picDecoration.appendChild(picImg);

        frag.appendChild(picDecoration);
        picWrapper.appendChild(frag);

        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }

      if (text && !pic) {
        const textWrapper = text.closest('div');
        textWrapper.classList.add('columns-txt-wrapper');
      }

      // not using :has selector because it's not supported in FF (fixes https://github.com/hlxsites/mammotome/issues/499)
      const paragraphs = Array.from(col.querySelectorAll('main .columns.image-cards p'));
      const imageCards = paragraphs.filter((p) => p.querySelector('picture'));

      imageCards.forEach((imageCard) => {
        const imageCardLink = imageCard.querySelector('a');
        if (imageCardLink) {
          const image = imageCard.querySelector('picture');
          imageCardLink.appendChild(image);
        }
      });
    });
  });
}


/***/ }),

/***/ "./blocks/footer/footer.js":
/*!*********************************!*\
  !*** ./blocks/footer/footer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
async function decorate(block) {
  const footerPath = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('footer') || '/footer';

  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    // Duplicate .icon-logo element
    const logoElement = footer.querySelector('.icon-logo');

    if (logoElement) {
      const logoParagraph = logoElement.parentElement.parentElement;
      if (logoParagraph) {
        const clonedParagraph = logoParagraph.cloneNode(true);
        const newDiv = document.createElement('div');
        newDiv.appendChild(clonedParagraph);
        footer.insertBefore(newDiv, footer.firstElementChild);
      }
    }

    // Duplicate .icon-danahertrustmark element
    const trustmarkElement = footer.querySelector('.icon-danahertrustmark');
    if (trustmarkElement) {
      const trustmarkParagraph = trustmarkElement.parentElement;
      if (trustmarkParagraph) {
        const clonedParagraph = trustmarkParagraph.cloneNode(true);
        const newDiv = document.createElement('div');
        newDiv.appendChild(clonedParagraph);
        footer.querySelector('.columns').firstElementChild.appendChild(newDiv);
      }
    }

    // decorate cookie settings (us/en/ & /uk/en/ only)
    const cookieSettingsAnchor = footer.querySelector('#legal')?.nextElementSibling?.lastElementChild?.querySelector('a');
    if (cookieSettingsAnchor) {
      cookieSettingsAnchor.addEventListener('click', (event) => {
        event.preventDefault();
        if (window.OneTrust) window.OneTrust.ToggleInfoDisplay();
      });
    }

    await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(footer);
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScriptInTextBelow)(footer);
    block.append(footer);
  }
}


/***/ }),

/***/ "./blocks/form/checkbox.js":
/*!*********************************!*\
  !*** ./blocks/form/checkbox.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
function update(checkboxgroup) {
  const allUnchecked = checkboxgroup.every((checkbox) => !checkbox.checked);
  checkboxgroup.forEach((checkbox) => {
    if (allUnchecked) {
      checkbox.setAttribute('required', '');
    } else {
      checkbox.removeAttribute('required');
    }
  });
}

async function decorate(form) {
  const checkboxes = form.querySelectorAll('input[type=checkbox][required]');
  const checkboxNameMap = [...checkboxes].reduce((map, checkbox) => ({
    ...map,
    [checkbox.name]: [checkbox, ...(map[checkbox.name] || [])],
  }), {});

  Object.values(checkboxNameMap).filter((checkboxgroup) => checkboxgroup.length > 1)
    .forEach((checkboxgroup) => {
      checkboxgroup.forEach((checkbox) => checkbox.addEventListener('change', () => update(checkboxgroup)));
    });
}


/***/ }),

/***/ "./blocks/form/file.js":
/*!*****************************!*\
  !*** ./blocks/form/file.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
function isFileAllowed(file, allowedTypes = '') {
  if (!file) {
    throw new Error('File object is required.');
  }
  const extensionRegex = /(?:\.([^.]+))?$/;
  const fileExtension = extensionRegex.exec(file.name)[1];
  const fileType = file.type;
  return !allowedTypes || allowedTypes.includes(fileType) || allowedTypes.includes(fileExtension);
}

function getFileList(files) {
  const dataTransfer = new DataTransfer();
  files.forEach((file) => dataTransfer.items.add(file));
  return dataTransfer.files;
}

function getFileDesription(file) {
  const description = document.createElement('div');
  description.className = 'field-description file-description';
  const span = document.createElement('span');
  span.textContent = `${file.name} ${(file.size / (1024 * 1024)).toFixed(2)}mb`;
  description.append(span);
  return description;
}

function updateIndex(elements = []) {
  elements.forEach((element, index) => {
    element.dataset.index = index;
  });
}

function updateMessage(messages, message) {
  const li = document.createElement('li');
  li.textContent = message;
  messages.append(li);
}

function clearMessages(messages) {
  messages.innerHTML = '';
}

function validateType(files, allowedTypes = '') {
  const allowedFiles = [];
  const disallowedFiles = [];
  files.forEach((file) => {
    (isFileAllowed(file, allowedTypes) ? allowedFiles : disallowedFiles).push(file);
  });
  return { allowedFiles, disallowedFiles };
}

function validateSize(files, maxSize = 2) {
  const withinSizeFiles = [];
  const exceedSizeFiles = [];
  files.forEach((file) => {
    const size = (file.size / (1024 * 1024)).toFixed(2); // in mb
    (size < maxSize ? withinSizeFiles : exceedSizeFiles).push(file);
  });
  return { withinSizeFiles, exceedSizeFiles };
}

function validateLimit(files, attachedFiles, multiple = false, max = -1) {
  let filesToAttach = [];
  let filesToReject = [];
  if (!multiple) {
    filesToAttach = files.splice(0, attachedFiles.length ? 0 : 1);
  } else {
    filesToAttach = files.splice(0, max === -1 ? Infinity : max - attachedFiles.length);
  }
  filesToReject = files;
  return { filesToAttach, filesToReject };
}

async function decorate(element) {
  const wrappers = element.querySelectorAll('.form-file-wrapper');
  [...wrappers].forEach((wrapper) => {
    const attachedFiles = [];
    const input = wrapper.querySelector('input');
    const max = (parseInt(input.max, 10) || -1);
    const template = input.cloneNode(true);
    const multiple = input.hasAttribute('multiple');
    const messages = document.createElement('ul');
    const fileDescriptions = wrapper.getElementsByClassName('file-description');
    const validate = (files = []) => {
      clearMessages(messages);
      const { allowedFiles, disallowedFiles } = validateType(files);
      disallowedFiles.forEach((file) => updateMessage(messages, `${file.name} - This type of file is not allowed.`));
      const { withinSizeFiles, exceedSizeFiles } = validateSize(allowedFiles);
      exceedSizeFiles.forEach((file) => updateMessage(messages, `${file.name} - File exceeds size limit.`));
      // eslint-disable-next-line max-len
      const { filesToAttach, filesToReject } = validateLimit(withinSizeFiles, attachedFiles, multiple, max);
      if (filesToReject.length > 0) {
        updateMessage(messages, 'Maximum number of files reached.');
      }
      return filesToAttach;
    };
    const attachFiles = (files = []) => {
      const filesToAttach = validate(files);
      filesToAttach.forEach((file) => {
        const description = getFileDesription(file);
        const button = document.createElement('button');
        button.type = 'button';
        button.onclick = () => {
          const index = parseInt(description.dataset.index, 10);
          description.remove();
          attachedFiles.splice(index, 1);
          input.files = getFileList(attachedFiles);
          updateIndex([...fileDescriptions]);
          clearMessages(messages);
        };
        description.append(button);
        wrapper.append(description);
        attachedFiles.push(file);
      });
      updateIndex([...fileDescriptions]);
      input.files = getFileList(attachedFiles);
    };
    const dropArea = document.createElement('div');
    dropArea.className = 'field-dropregion';
    dropArea.innerHTML = `<p>${input.getAttribute('placeholder')}</p>`;
    dropArea.ondragover = (event) => event.preventDefault();
    dropArea.ondrop = (event) => {
      attachFiles([...event.dataTransfer.files]);
      event.preventDefault();
    };
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Select files';
    button.onclick = () => {
      const fileInput = template.cloneNode(true);
      fileInput.onchange = () => attachFiles([...fileInput.files]);
      fileInput.click();
    };
    dropArea.append(button);
    wrapper.insertBefore(dropArea, input);
    wrapper.append(messages); // for validation messages.
  });
}


/***/ }),

/***/ "./blocks/form/form.js":
/*!*****************************!*\
  !*** ./blocks/form/form.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");
/* harmony import */ var _file_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file.js */ "./blocks/form/file.js");
/* harmony import */ var _checkbox_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkbox.js */ "./blocks/form/checkbox.js");
/* harmony import */ var _utm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utm.js */ "./blocks/form/utm.js");





const SITE_KEY = '6Lc0qYoiAAAAADNOimWbvoSdn2YawNsa6Wbxejpp';
const FORM_SUBMIT_ENDPOINT = 'https://franklin-submit-wrapper.mammotome.workers.dev';

function getLocaleRegion() {
  return ((0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('locale') || 'en-US').split('-');
}

function loadScript(url) {
  const head = document.querySelector('head');
  let script = head.querySelector(`script[src="${url}"]`);
  if (!script) {
    script = document.createElement('script');
    script.src = url;
    script.async = true;
    head.append(script);
    return script;
  }
  return script;
}

function constructPayload(form) {
  const payload = {
    Last_Form_Date__c: (new Date()).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'EST',
    }),
  };
  const attachments = {};
  [...form.elements].filter((fe) => fe.name).forEach((fe) => {
    if (fe.type === 'radio') {
      if (fe.checked) payload[fe.name] = fe.value;
    } else if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.name] = payload[fe.name] ? `${payload[fe.name]}; ${fe.value}` : fe.value;
    } else if (fe.type === 'file' && fe.files?.length > 0) {
      attachments[fe.name] = fe.files;
    } else {
      payload[fe.name] = fe.value;
    }
  });
  return { payload, attachments };
}

function showError(form, error) {
  const errorMessage = document.createElement('div');
  errorMessage.className = 'form-submission-error';
  errorMessage.textContent = error;
  form.querySelector('.form-submit-wrapper').parentElement.append(errorMessage);
}

function clearError(form) {
  const errorMessage = form.querySelector('.form-submission-error');
  if (errorMessage) {
    errorMessage.remove();
  }
}

async function submissionFailure(error, form) {
  showError(form, error);
  form.setAttribute('data-submitting', 'false');
  const submitter = form.querySelector('button[type="submit"]');
  submitter.disabled = false;
  submitter.textContent = submitter.dataset.text || submitter.textContent;
}

function prepareRequest(form, token) {
  const { payload, attachments } = constructPayload(form);
  let headers = {
    'Content-Type': 'application/json',
  };
  let body = JSON.stringify({ data: payload, token });
  if (attachments && Object.keys(attachments).length > 0) {
    headers = {};
    body = new FormData();
    const fileNames = [];
    Object.entries(attachments).forEach(([dataRef, files]) => {
      fileNames.push(dataRef);
      [...files].forEach((file) => body.append(dataRef, file));
    });
    body.append('token', token);
    body.append('fileFields', JSON.stringify(fileNames));
    body.append('data', JSON.stringify(payload));
  }
  return { headers, body };
}

async function submitForm(form, token) {
  try {
    const url = `${FORM_SUBMIT_ENDPOINT}${form.dataset.action}`;
    const response = await fetch(url, {
      method: 'POST',
      ...prepareRequest(form, token),
    });
    if (response.ok) {
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('form:submit');
      window.location.href = form.dataset?.redirect || '/us/en/thank-you/';
    } else {
      const [locale] = getLocaleRegion();
      const dictionary = window.placeholders.default[`i18n-${locale}`];
      const error = dictionary[`formSubmissionError-${response.status}`] || dictionary.formSubmissionError;
      throw new Error(error);
    }
  } catch (error) {
    submissionFailure(error, form);
  }
}

function addGEC(form) {
  const email = form.querySelector('input[name=email]');
  if (email) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'form_complete',
      enhanced_conversion_data: { email: email.value },
    });
  }
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') !== 'true') {
    form.setAttribute('data-submitting', 'true');
    clearError(form);
    addGEC(form);
    const { grecaptcha } = window;
    if (grecaptcha) {
      grecaptcha.ready(() => {
        grecaptcha.execute(SITE_KEY, { action: 'submit' }).then(async (token) => {
          await submitForm(form, token);
        });
      });
    } else {
      await submitForm(form);
    }
  }
}

function setPlaceholder(element, fd) {
  if (fd.Placeholder) {
    element.setAttribute('placeholder', fd.Placeholder);
  }
}

function setNumberConstraints(element, fd) {
  if (fd.Max) {
    element.max = fd.Max;
  }
  if (fd.Min) {
    element.min = fd.Min;
  }
  if (fd.Step) {
    element.step = fd.Step || 1;
  }
}
function createLabel(fd, tagName = 'label') {
  const label = document.createElement(tagName);
  label.setAttribute('for', fd.Id);
  label.className = 'field-label';
  label.textContent = fd.Label || '';
  if (fd.Tooltip) {
    label.title = fd.Tooltip;
  }
  return label;
}

function createHelpText(fd) {
  const div = document.createElement('div');
  div.className = 'field-description';
  div.setAttribute('aria-live', 'polite');
  div.textContent = fd.Description;
  div.id = `${fd.Id}-description`;
  return div;
}

function createFieldWrapper(fd, tagName = 'div') {
  const fieldWrapper = document.createElement(tagName);
  const nameStyle = fd.Name ? ` form-${fd.Name}` : '';
  const fieldId = `form-${fd.Type}-wrapper${nameStyle}`;
  fieldWrapper.className = fieldId;
  fieldWrapper.dataset.fieldset = fd.Fieldset ? fd.Fieldset : '';
  fieldWrapper.classList.add('field-wrapper');
  fieldWrapper.append(createLabel(fd));
  return fieldWrapper;
}

function createButton(fd) {
  const wrapper = createFieldWrapper(fd);
  const button = document.createElement('button');
  button.textContent = fd.Label;
  button.type = fd.Type;
  button.classList.add('button', 'primary');
  button.dataset.redirect = fd.Extra || '';
  button.id = fd.Id;
  button.name = fd.Name;
  wrapper.replaceChildren(button);
  return wrapper;
}
function createSubmit(fd) {
  const wrapper = createButton(fd);
  if (fd.Placeholder) {
    wrapper.querySelector('button').dataset.submitText = fd.Placeholder;
  }
  if (SITE_KEY) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadScript(`https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`);
          obs.disconnect();
        }
      });
    });
    obs.observe(wrapper);
  }
  return wrapper;
}

function createInput(fd) {
  const input = document.createElement('input');
  input.type = fd.Type;
  setPlaceholder(input, fd);
  setNumberConstraints(input, fd);
  return input;
}

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const input = document.createElement('textarea');
  setPlaceholder(input, fd);
  return input;
});

function isDatasource(path) {
  return path && path.trim().split('?')[0].endsWith('.json');
}

const createSelect = withFieldWrapper((fd) => {
  const select = document.createElement('select');
  const addOption = (optionText, optionValue) => {
    const option = document.createElement('option');
    option.textContent = optionText.trim();
    option.value = optionValue.trim();
    if (fd.Value === option.value) {
      option.setAttribute('selected', '');
    }
    select.append(option);
    return option;
  };

  if (fd.Placeholder) {
    const ph = addOption(fd.Placeholder, '');
    ph.setAttribute('disabled', '');
  }

  const options = fd.Options.split(',');
  if (options.length === 1 && isDatasource(options[0])) {
    try {
      (async (path) => {
        const { data } = await (await fetch(path)).json();
        data.forEach((optionObj) => addOption(optionObj.Text || optionObj.Value, optionObj.Value));
      })(options[0]);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Error: Failed to fetch options ${err}`);
    }
  } else {
    const optionsName = fd['Options Name'] ? fd['Options Name'].split(',') : options;
    options.forEach((optionValue, index) => addOption(optionsName[index], optionValue));
  }
  return select;
});

function createRadio(fd) {
  const wrapper = createFieldWrapper(fd);
  wrapper.insertAdjacentElement('afterbegin', createInput(fd));
  return wrapper;
}

const createOutput = withFieldWrapper((fd) => {
  const output = document.createElement('output');
  output.name = fd.Name;
  output.dataset.fieldset = fd.Fieldset ? fd.Fieldset : '';
  output.textContent = fd.Value;
  return output;
});

const createFile = withFieldWrapper((fd) => {
  const input = createInput(fd);
  input.accept = fd.Accept || '';
  if (fd.Multiple && fd.Multiple.toLowerCase() === 'true') {
    input.setAttribute('multiple', '');
  }
  return input;
});

function createHidden(fd) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.id = fd.Id;
  input.name = fd.Name;
  input.value = fd.Value;
  return input;
}

function createLegend(fd) {
  return createLabel(fd, 'legend');
}

function createFieldSet(fd) {
  const wrapper = createFieldWrapper(fd, 'fieldset');
  wrapper.name = fd.Name;
  wrapper.replaceChildren(createLegend(fd));
  return wrapper;
}

function groupFieldsByFieldSet(form) {
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets?.forEach((fieldset) => {
    const fields = form.querySelectorAll(`[data-fieldset="${fieldset.name}"`);
    fields?.forEach((field) => {
      fieldset.append(field);
    });
  });
}

function createPlainText(fd) {
  const paragraph = document.createElement('p');
  const nameStyle = fd.Name ? `form-${fd.Name}` : '';
  paragraph.className = nameStyle;
  paragraph.dataset.fieldset = fd.Fieldset ? fd.Fieldset : '';
  paragraph.textContent = fd.Label;
  return paragraph;
}

const getId = (function getId() {
  const ids = {};
  return (name) => {
    ids[name] = ids[name] || 0;
    const idSuffix = ids[name] ? `-${ids[name]}` : '';
    ids[name] += 1;
    return `form-${name}${idSuffix}`;
  };
}());

const fieldRenderers = {
  radio: createRadio,
  checkbox: createRadio,
  textarea: createTextArea,
  select: createSelect,
  button: createButton,
  submit: createSubmit,
  output: createOutput,
  hidden: createHidden,
  fieldset: createFieldSet,
  plaintext: createPlainText,
  file: createFile,
};

function renderField(fd) {
  const renderer = fieldRenderers[fd.Type];
  let field;
  if (typeof renderer === 'function') {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  if (fd.Description) {
    field.append(createHelpText(fd));
  }
  return field;
}

function decorateFormFields(form) {
  (0,_file_js__WEBPACK_IMPORTED_MODULE_1__["default"])(form);
  (0,_checkbox_js__WEBPACK_IMPORTED_MODULE_2__["default"])(form);
  (0,_utm_js__WEBPACK_IMPORTED_MODULE_3__["default"])(form);
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScriptInTextBelow)(form);
}

async function decorateFormLayout(block, form) {
  if (block.classList.contains('wizard')) {
    try {
      (await Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./wizard.js */ "./blocks/form/wizard.js"))).default(form);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`Failed to load wizard ${err}`);
    }
  }
}

async function fetchData(url) {
  const resp = await fetch(url);
  const json = await resp.json();
  return json.data.map((fd) => ({
    ...fd,
    Id: fd.Id || getId(fd.Name),
    Value: fd.Value || '',
  }));
}

async function createForm(formURL) {
  const { pathname, search } = new URL(formURL);
  const data = await fetchData(`${pathname}${search}`);
  const form = document.createElement('form');
  data.forEach((fd) => {
    const el = renderField(fd);
    const input = el.querySelector('input,textarea,select');
    if (input) {
      input.id = fd.Id;
      input.name = fd.Name;
      input.value = fd.Value;
      if (fd.Mandatory && fd.Mandatory.toLowerCase() === 'true') {
        input.setAttribute('required', '');
      }
      if (fd.Description) {
        input.setAttribute('aria-describedby', `${fd.Id}-description`);
      }
    }
    form.append(el);
  });
  groupFieldsByFieldSet(form);
  // eslint-disable-next-line prefer-destructuring
  form.dataset.action = pathname.split('.json')[0];
  form.addEventListener('submit', (e) => {
    const { submitter } = e;
    submitter.setAttribute('disabled', '');
    submitter.dataset.text = submitter.textContent;
    submitter.textContent = submitter.dataset.submitText || submitter.textContent;
    handleSubmit(form);
    e.preventDefault();
  });
  decorateFormFields(form);
  return form;
}

async function decorate(block) {
  const formLink = block.querySelector('a[href*=".json"]');
  if (formLink) {
    let formURL = formLink.href;
    const config = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(block);
    if (formURL.endsWith('contact.json')) {
      const [locale, region] = getLocaleRegion();
      if (locale === 'en' && region && region.toLowerCase() === 'gb') {
        formURL += '?sheet=uk';
      } else if (locale !== 'en') {
        formURL += `?sheet=${locale}`;
      }
    }
    const form = await createForm(formURL);
    Object.entries(config).forEach(([key, value]) => { form.dataset[key] = value; });
    await decorateFormLayout(block, form);
    formLink.replaceWith(form);
  }
}


/***/ }),

/***/ "./blocks/form/utm.js":
/*!****************************!*\
  !*** ./blocks/form/utm.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
const allowedUTMs = ['utm_campaign', 'utm_source', 'utm_medium', 'utm_content', 'utm_term', 'gclid'];
const paramFieldNameUTMMap = {
  utm_content: 'uTMContent',
  gclid: 'GCLID__c',
};

async function decorate(form) {
  const queryParams = new URLSearchParams(window.location.search);
  allowedUTMs.forEach((allowedUTM) => {
    const values = queryParams.getAll(allowedUTM);
    if (values.length) {
      const fieldName = paramFieldNameUTMMap[allowedUTM] || allowedUTM;
      const input = form.querySelector(`input[type=hidden][name="${fieldName}"]`);
      if (input) {
        input.value = values.join();
      }
    }
  });
}


/***/ }),

/***/ "./blocks/form/wizard.js":
/*!*******************************!*\
  !*** ./blocks/form/wizard.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
function createButton(fd) {
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = fd.Label;
  button.className = 'form-wizard-button';
  return button;
}

const createTooltip = (() => {
  const tooltip = document.createElement('div');
  tooltip.className = 'field-tooltip';
  document.addEventListener('click', () => tooltip.remove(), true); // execute for next click
  return (fd) => {
    tooltip.textContent = fd.Label;
    return tooltip;
  };
})();

function moveToNext(current) {
  const invalid = current.querySelector(':invalid');
  if (invalid) {
    const tooltip = createTooltip({ Label: invalid.validationMessage });
    invalid.parentElement.insertBefore(tooltip, invalid.nextElementSibling);
  } else {
    current.classList.remove('current-wizard-step');
    current.nextElementSibling.classList.add('current-wizard-step');
  }
}

function moveToPrev(current) {
  current.classList.remove('current-wizard-step');
  current.previousElementSibling.classList.add('current-wizard-step');
}

async function decorate(form) {
  const wrapper = document.createElement('div');
  wrapper.className = 'form-wizard-button-wrapper';
  const current = form.getElementsByClassName('current-wizard-step');
  const prev = createButton({ Label: 'BACK' });
  prev.onclick = () => moveToPrev(current[0]);
  const next = createButton({ Label: 'NEXT' });
  next.onclick = () => moveToNext(current[0]);
  const submit = form.querySelector('.form-submit-wrapper');
  wrapper.append(prev, next, submit);
  form.append(wrapper);
  form.children[0]?.classList.add('current-wizard-step');
}


/***/ }),

/***/ "./blocks/header/header.js":
/*!*********************************!*\
  !*** ./blocks/header/header.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 1025px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

function createMobileMenuControlsBlock() {
  const mobileMenuControls = document.createElement('li');
  mobileMenuControls.classList.add('mobile-menu-controls');

  const backButton = document.createElement('div');
  backButton.classList.add('mobile-menu-back');

  mobileMenuControls.addEventListener('click', (e) => {
    e.stopPropagation();
    backButton.closest('[aria-expanded]').setAttribute('aria-expanded', 'false');
    backButton.closest('[aria-expanded]').parentElement.classList.remove('nav-expanded');
  });

  mobileMenuControls.append(backButton);

  return mobileMenuControls;
}

function createOverflowDropdown(navSections) {
  const overflowDropdown = document.createElement('li');
  overflowDropdown.classList.add('nav-button', 'nav-overflow');
  const overflowButton = document.createElement('a');
  overflowButton.href = '#';
  overflowButton.textContent = '...';
  overflowDropdown.append(overflowButton);

  const overflowDropdownList = document.createElement('ul');
  overflowDropdownList.classList.add('nav-overflow-list');

  overflowDropdown.append(overflowDropdownList);

  const sections = Array.from(navSections.querySelectorAll(':scope > ul > li'));
  // add last three items to dropdown
  const overflowSections = sections.slice(sections.length - 3);
  overflowSections.forEach((section) => {
    overflowDropdownList.append(section.cloneNode(true));
  });
  return overflowDropdown;
}

function addNavigationLogoForScrollingPage(nav) {
  const [navBrandPrimary, navBrandSecondary] = nav.querySelectorAll('.nav-brand > p');

  if (!navBrandPrimary) return;

  const homePageLink = navBrandPrimary.querySelector('a');
  homePageLink.setAttribute('aria-label', 'Navigate to homepage');

  const scrollingLogo = document.createElement('span');
  scrollingLogo.className = 'logo-hidden scrolling-logo icon icon-logo-small';
  scrollingLogo.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-logo-small"></use></svg>';

  const defaultLogo = homePageLink.firstChild;

  homePageLink.append(scrollingLogo);

  if (navBrandSecondary) {
    navBrandSecondary.classList.add('nav-brand-text');
  }

  // Simple debounce function to improve scroll performance
  let timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const isScrolled = window.scrollY > 40;
      nav.classList.toggle('narrow', isScrolled);
      defaultLogo.classList.toggle('logo-hidden', isScrolled);
      scrollingLogo.classList.toggle('logo-hidden', !isScrolled);
      if (navBrandSecondary) {
        navBrandSecondary.classList.toggle('logo-hidden', isScrolled);
      }
    }, 50);
  });
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections > ul > li').forEach((section) => {
    if (!section.classList.contains('mobile-menu-controls')) {
      section.setAttribute('aria-expanded', expanded.toString());
    }
  });
  const searchElement = document.querySelector('.icon-search');
  if (searchElement) {
    searchElement.dispatchEvent(new Event(expanded ? 'disable' : 'enable'));
  }
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');

  nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');

  button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');

  // enable nav dropdown keyboard accessibility
  const navDrops = navSections.querySelectorAll('.nav-drop');
  if (isDesktop.matches) {
    nav.classList.remove('nav-mobile');
    navDrops.forEach((drop) => {
      if (!drop.hasAttribute('tabindex')) {
        drop.setAttribute('role', 'button');
        drop.setAttribute('tabindex', '0');
        drop.addEventListener('focus', focusNavSection);
      }
    });
  } else {
    nav.classList.add('nav-mobile');
    navDrops.forEach((drop) => {
      drop.removeAttribute('role');
      drop.removeAttribute('tabindex');
      drop.removeEventListener('focus', focusNavSection);
    });
  }
  // enable menu collapse on escape keypress
  if (!expanded || isDesktop.matches) {
    // collapse menu on escape press
    window.addEventListener('keydown', closeOnEscape);
  } else {
    window.removeEventListener('keydown', closeOnEscape);
  }
}

async function fetchSearchData({ queryIndex }) {
  if (!window.searchData) {
    const resp = await fetch(`${queryIndex}?limit=10000`);
    if (resp.ok) {
      const json = await resp.json();
      if (json.data) {
        window.searchData = json;
      } else {
        throw new Error('Fetching search data returned unknown format');
      }
    } else {
      throw new Error(`Fetching search data failed with: ${resp.status}`);
    }
  }
  return window.searchData.data;
}

async function fetchProductSupportSearchData({ country, language, productSupport }) {
  if (!window.productSearchData) {
    const products = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getProducts)(country, language);
    window.productSearchData = products.flatMap(({
      Name, Description, Page, assets,
    }) => ([{
      title: Name,
      description: Description,
      path: `${productSupport}/${Page}`,
    }, ...assets.map((asset) => ({
      title: asset.Name,
      description: asset.Description,
      path: asset.URL,
    }))]));
  }
  return window.productSearchData;
}

async function search(value) {
  const info = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getInfo)();
  const searchData = await fetchSearchData(info);
  const productSupportData = await fetchProductSupportSearchData(info);
  return [...searchData, ...productSupportData]
    .filter((e) => `${e.title} ${e.description}`.toLowerCase().includes(value.toLowerCase()));
}

async function searchInput(event) {
  const { value: searchTerm, aside } = event.target;

  aside.innerHTML = '';

  const url = new URL(window.location);
  if (searchTerm.length >= 3) {
    url.searchParams.set('ee_search_query', searchTerm);
  } else {
    url.searchParams.delete('ee_search_query');
  }

  if (searchTerm.length >= 3) {
    const title = document.createElement('h1');
    title.classList.add('nav-search-result-title');
    title.textContent = `${await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('navSearchResultsFor', 'Search Results for')}: ${searchTerm}`;
    aside.append(title);
    aside.insertAdjacentHTML('beforeend', '<div class="nav-search-result-title-divider"><span class="nav-search-result-title-divider-separator"/></div>');

    try {
      const hits = await search(searchTerm);
      if (hits.length > 0) {
        hits.forEach((hit) => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('nav-search-wrapper');
          const searchTitle = document.createElement('h3');
          searchTitle.classList.add('nav-search-title');
          const searchLink = document.createElement('a');
          searchLink.href = hit.path;
          (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)((0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(hit.title), searchLink);
          const searchDescription = document.createElement('div');
          searchDescription.classList.add('nav-search-description');
          (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)((0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(hit.description), searchDescription);
          searchTitle.appendChild(searchLink);
          wrapper.appendChild(searchTitle);
          wrapper.appendChild(searchDescription);
          aside.appendChild(wrapper);
        });
        (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('search', { source: 'input.nav-search-input', target: searchTerm });
      } else {
        const searchTitle = document.createElement('h3');
        searchTitle.classList.add('nav-search-title');
        searchTitle.textContent = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('navSearchNoResult', 'No Result');
        aside.appendChild(searchTitle);
        (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('nullsearch', { source: 'input.nav-search-input', target: searchTerm });
      }
    } catch (error) {
      const searchTitle = document.createElement('h3');
      searchTitle.classList.add('nav-search-title');
      searchTitle.textContent = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('navSearchFailure', 'Search could not be completed at this time - please try again later.');
      aside.appendChild(searchTitle);
    }
    aside.insertAdjacentHTML('beforeend', '<div class="nav-search-result-title-divider"><span class="nav-search-result-title-divider-separator"/></div>');
  }
  // eslint-disable-next-line no-restricted-globals
  history.replaceState(null, '', url);
}

async function searchClick(event) {
  const { input, searchElement } = event.currentTarget;
  if (!input.active) {
    input.placeholder = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('navSearchPlaceholder', 'What are you looking for?');

    const inputContainer = document.createElement('div');
    inputContainer.classList.add('nav-search-input-container');
    inputContainer.appendChild(input);

    searchElement.prepend(inputContainer);
    searchElement.append(input.aside);
    input.active = true;
    input.focus();
  } else {
    input.active = false;
    input.value = '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    searchElement.removeChild(input.parentElement);
    searchElement.removeChild(input.aside);
  }
  event.preventDefault();
}

function searchDisable(event) {
  if (event.currentTarget.input.active) {
    event.currentTarget.dispatchEvent(new Event('click', { bubbles: false }));
  }
}

async function decorateSearch(block) {
  const searchSection = block.querySelector('div.nav-tools > p > a > .icon-search');

  if (!searchSection) return;

  const aside = document.createElement('aside');
  aside.classList.add('nav-search-aside');

  const input = document.createElement('input');
  input.classList.add('nav-search-input');
  input.type = 'search';
  input.value = new URL(window.location).searchParams.get('ee_search_query');
  input.aside = aside;
  input.active = input.value;
  input.addEventListener('input', searchInput);

  const searchElement = document.createElement('div');
  searchElement.classList.add('nav-search');
  searchSection.input = input;
  searchSection.searchElement = searchElement;

  searchSection.parentElement.parentElement
    .replaceChild(searchElement, searchSection.parentElement);

  searchElement.appendChild(searchSection);

  searchSection.addEventListener('click', searchClick);

  searchSection.addEventListener('disable', searchDisable);

  if (input.active) {
    input.placeholder = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('navSearchPlaceholder', 'What are you looking for?');
    searchElement.prepend(input);
    searchElement.append(aside);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

/**
 * decorate Language to include flag image in href
 * @param navSections
 */
function decorateLanguageNav(navSections) {
  const listItems = navSections.querySelectorAll('.nav-drop > ul > li');

  listItems.forEach((li) => {
    const picture = li.querySelector('picture');
    const a = li.querySelector('a');

    if (picture && a) {
      const href = a.getAttribute('href');
      const txt = a.innerHTML;

      li.innerHTML = '';
      const newA = document.createElement('a');

      newA.setAttribute('href', href);
      newA.appendChild(picture);
      newA.appendChild(document.createTextNode(txt));

      li.appendChild(newA);
    }
  });
}

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
async function decorate(block) {
  // fetch nav content
  const navPath = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('nav') || '/nav';
  const resp = await fetch(`${navPath}.plain.html`);

  if (resp.ok) {
    const html = await resp.text();

    // decorate nav DOM
    const nav = document.createElement('nav');
    nav.id = 'nav';
    nav.innerHTML = html;

    const classes = ['brand', 'sections', 'tools'];
    Array.from(nav.children).forEach((section, i) => {
      // first section is assigned to brand, last to tools
      if (i === 0) {
        section.classList.add(`nav-${classes[0]}`);
      } else if (i === nav.children.length - 1) {
        section.classList.add(`nav-${classes[classes.length - 1]}`);
      } else {
        const navSectionList = nav.querySelector('.nav-sections > ul');
        if (navSectionList) {
          const sectionMetaData = section.querySelector('div.section-metadata');
          let config = {};
          if (sectionMetaData) {
            config = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.readBlockConfig)(sectionMetaData);
            sectionMetaData.remove();
          }
          Array.from(section.querySelectorAll('div > ul > li')).forEach((li, j) => {
            navSectionList.appendChild(li);
            if (config.style) {
              li.classList.add(`${config.style}`);
              if (config.style === 'nav-button' && j % 2) {
                li.querySelector('a').classList.add('button', 'secondary');
              } else {
                li.querySelector('a').classList.add('button', 'primary');
              }
            }
          });
        } else {
          section.classList.add(`nav-${classes[1]}`);
        }
      }
    });

    const navSections = nav.querySelector('.nav-sections');

    if (navSections) {
      navSections.querySelectorAll(':scope > ul > li').forEach((navSection) => {
        if (navSection.classList.length === 0) navSection.classList.add('nav-drop');
        if (navSection.querySelector('ul > li > ul > li > ul')) navSection.classList.add('nav-multilevel');

        const navList = navSection.querySelector('ul');
        if (navList) navList.prepend(createMobileMenuControlsBlock());

        navSection.addEventListener('click', (e) => {
          if (!isDesktop.matches && e.target.nextElementSibling) {
            const expanded = navSection.getAttribute('aria-expanded') === 'true';

            toggleAllNavSections(navSections);
            navSection.setAttribute('aria-expanded', expanded ? 'false' : 'true');
            if (expanded) {
              navSection.parentElement.classList.remove('nav-expanded');
            } else {
              navSection.parentElement.classList.add('nav-expanded');
            }
          }
        });
      });

      // not using :has selector because it's not supported in FF (fixes https://github.com/hlxsites/mammotome/issues/499)
      const firstLevelLis = Array.from(nav.querySelectorAll('.nav-sections > ul > li'));
      const firstLevelLinks = firstLevelLis.filter((li) => li.querySelector('ul')).map((li) => li.querySelector('a'));

      firstLevelLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
          if (!isDesktop.matches) {
            event.preventDefault();
          }
        });
      });

      navSections.querySelector('ul').prepend(createMobileMenuControlsBlock());
      navSections.querySelector('ul').append(createOverflowDropdown(navSections));
      decorateLanguageNav(navSections);
      const multiLevelNav = navSections.querySelectorAll('li.nav-multilevel > ul > li > ul > li a');
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.setActiveLink)(multiLevelNav, 'active');
    }

    // hamburger for mobile
    const hamburger = document.createElement('div');
    hamburger.classList.add('nav-hamburger');
    hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
        <span class="nav-hamburger-icon"></span>
      </button>`;
    hamburger.addEventListener('click', () => {
      toggleMenu(nav, navSections);
      navSections.style.transition = 'right 300ms var(--mt-nav-transition-timing)';
    });
    nav.insertBefore(hamburger, nav.querySelector('.nav-tools'));

    nav.setAttribute('aria-expanded', 'false');
    // prevent mobile nav behavior on window resize
    toggleMenu(nav, navSections, isDesktop.matches);
    isDesktop.addEventListener('change', () => {
      toggleMenu(nav, navSections, isDesktop.matches);
      navSections.style.transition = '';
    });

    const mobileCover = document.createElement('div');
    mobileCover.classList.add('nav-mobile-cover');
    nav.insertBefore(mobileCover, nav.querySelector('.nav-hamburger'));
    mobileCover.addEventListener('click', () => {
      block.querySelectorAll('[aria-expanded="true"]').forEach((expanded) => {
        expanded.setAttribute('aria-expanded', 'false');
      });
    });

    await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(nav);
    await decorateSearch(nav);
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScriptInTextBelow)(nav);
    // add logo for scrolling page
    addNavigationLogoForScrollingPage(nav);

    // remove empty sections
    Array.from(nav.children).forEach((section) => {
      if (section.children.length === 1 && section.children[0].tagName === 'UL' && section.children[0].children.length === 0) {
        section.remove();
      }
    });

    const navWrapper = document.createElement('div');
    navWrapper.className = 'nav-wrapper';
    navWrapper.append(nav);
    block.append(navWrapper);
  }
}


/***/ }),

/***/ "./blocks/hero-carousel/hero-carousel.js":
/*!***********************************************!*\
  !*** ./blocks/hero-carousel/hero-carousel.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createButtonRow: () => (/* binding */ createButtonRow),
/* harmony export */   "default": () => (/* binding */ decorate),
/* harmony export */   optimizeThumbnails: () => (/* binding */ optimizeThumbnails)
/* harmony export */ });
/* harmony import */ var _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-carousel.js */ "./scripts/lib-carousel.js");
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");



// Number of required columns in table
const NUM_COLUMNS = 3;
const INVALID_CONFIGURATION_MESSAGE = `Invalid configuration. Table with ${NUM_COLUMNS} columns and at least 1 row required`;

/**
 * Get optimized img element width default
 * @param picture
 */
function optimizeThumbnails(block) {
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__.createOptimizedPicture)(
    block.querySelector("picture"),
    true,
  )
}

/**
 * create button links as part of the text
 * @param slides
 */
function createButtonRow(slides) {
  slides.forEach((slide) => {
    const buttons = slide.querySelectorAll('.button-container');
    if (buttons.length > 0) {
      const buttonRow = document.createElement('div');
      buttonRow.classList.add('button-row');
      buttons.forEach((button, i) => {
        button.remove();
        if (i % 2 === 1) {
          button.querySelector('a').classList.add('button', 'secondary');
        }
        buttonRow.appendChild(button);
      });
      slide.firstElementChild.appendChild(buttonRow);
    }
  });
}

/**
 * Check if align property has a valid value (left,right,center)
 * @param str
 * @returns {*}
 */
const checkAlign = (str) => str.includes('left') || str.includes('center') || str.includes('right');

/**
 * Get configuration from table containing align property and remove after parsing
 * @param block
 * @returns {*[]}: config array literal
 */
function getConfig(block) {
  if (block.children.length === 0 || block.children[0].children.length !== NUM_COLUMNS) {
    throw new Error(INVALID_CONFIGURATION_MESSAGE);
  }

  return Array.from(block.children).map((slide) => {
    const alignValue = slide.children[1].textContent.replace(/[\n\s]/g, '');
    const align = checkAlign(alignValue) ? alignValue : 'left';
    const imgAlign = align === 'center' || align === 'right' ? 'left' : 'right';
    slide.children[1].remove();
    return {
      align,
      imgAlign,
    };
  });
}

/**
 * Decorate hero-carousel block
 * @param block
 */
function decorate(block) {
  let config;
  try {
    config = getConfig(block);
  } catch (e) {
    block.innerHTML = `<code>${e.message}</code>`;
    return;
  }
  // check if required amount of columns and rows are present
  if (config.length === 0) {
    block.innerHTML = `<code>${INVALID_CONFIGURATION_MESSAGE}</code>`;
    return;
  }
  // Optimize images
  optimizeThumbnails(block);
  // Add white-overlay, position text and image to each slide
  Array.from(block.children).forEach((slide, i) => {
    slide.classList.add(`text-align-${config[i].align}`);
    slide.appendChild(Object.assign(document.createElement('div'), { className: 'white-overlay' }));
    slide.querySelector('img').classList.add(`position-${config[i].imgAlign}`);
  });

  // setup carousel and slider elements
  const heroCarousel = new _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__["default"](block);
  heroCarousel.createSlideSlider();
  heroCarousel.setSliderIds();
  // createButtonRow(heroCarousel.sliderChildren);
  createButtonRow(heroCarousel.getSlides());
  if (heroCarousel.getSlides().length > 1) {
    heroCarousel.createDottedNav();
    heroCarousel.setSliderInterval(4000);
    heroCarousel.initSlider();
  }
}


/***/ }),

/***/ "./blocks/hero/hero.js":
/*!*****************************!*\
  !*** ./blocks/hero/hero.js ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "./blocks/ifus/ifus.js":
/*!*****************************!*\
  !*** ./blocks/ifus/ifus.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


async function handleSearch(selectors, allSelectors) {
  const { result, code, country } = selectors;

  result.innerHTML = '';
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{
    type: 'h2',
    textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchTitle', 'Search results'),
  }], result);

  allSelectors.filter((entry) => entry !== selectors)
    .flatMap((entry) => [entry.code, entry.country])
    .forEach((value) => { value.options[0].selected = true; });

  result.classList.remove('no-result');

  const assets = code.value && country.value
    ? selectors.assets(code.value, country.value) : [];

  if (assets.length === 0) {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{
      type: 'div',
      children: [{ type: 'strong', textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchNoResult', 'No result') }],
    }], result);
    return;
  }

  const assetMap = new Map();
  const revisionedAssetMap = new Map();

  assets.forEach((asset) => {
    const map = asset.Revised ? revisionedAssetMap : assetMap;

    const links = map.get(asset.Title) || [];
    links.push(asset.URL);
    map.set(asset.Title, links);
  });

  async function createAssetDomStructure([key, value]) {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
      {
        type: 'div',
        children: [
          { type: 'h3', textContent: key },
          {
            type: 'div',
            children: [
              {
                type: 'div',
                children: [
                  {
                    type: 'div',
                    textContent: selectors.productCodes(code.value),
                    children: [{
                      type: 'h4',
                      position: 'prepend',
                      textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchProductCodes', 'Product Code(s)'),
                    }],
                  },
                ],
              },
              {
                type: 'div',
                textContent: country.value,
                children: [{
                  type: 'h4',
                  position: 'prepend',
                  textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchCountrySelected', 'Country Selected'),
                }],
              },
              {
                type: 'div',
                children: value.map(
                  (link) => ({
                    type: 'a',
                    attributes: { href: link, target: 'blank' },
                    children: [{ type: 'button', textContent: link.substring(link.lastIndexOf('/') + 1) }],
                  }),
                ),
              },
            ],
          },
        ],
      },
    ], result);
  }

  await Promise.all(Array.from(assetMap).map(createAssetDomStructure));

  if (revisionedAssetMap.size === 0) {
    return;
  }

  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{
    type: 'h4',
    textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchRevisionedTitle', 'Past Revisions of Instructions for Use'),
  }], result);

  await Promise.all(Array.from(revisionedAssetMap).map(createAssetDomStructure));
}

function populateSearch(selectors, allSelectors) {
  const createOptions = (items, selector, text, attributes) => {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)(
      items.map((item) => ({ type: 'option', textContent: text?.(item) || item, attributes: attributes?.(item) })),
      selector,
    );
    selector.disabled = false;
  };

  createOptions(selectors.ids(), selectors.code);

  createOptions(
    selectors.countries(),
    selectors.country,
    (country) => country['Country Name'],
    (country) => ({ value: country.ISO_3166_1_alpha_2_code }),
  );

  selectors.search.disabled = false;
  selectors.search.addEventListener('click', async () => handleSearch(selectors, allSelectors));
}

async function populate(block) {
  const json = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getProductDB)();

  const getSelectors = (prefix, ids, assets, productCodes) => ({
    code: block.querySelector(`#${prefix}-code`),
    country: block.querySelector(`#${prefix}-country`),
    search: block.querySelector(`#${prefix}-code-search`),
    result: block.querySelector('.ifu-result'),
    ids,
    countries: () => json.Countries.data,
    assets,
    productCodes,
  });

  const unique = (value, index, array) => array.indexOf(value) === index;

  const getIFUIDs = () => json.eIFU.data.map((value) => value.eIFU).filter(unique).sort();

  const getProductCodeIDs = () => json.eIFU.data.flatMap((value) => value.ProductCodes.split('|')).filter(unique).sort();

  const getProductCodesByIFU = (id) => json.eIFU.data
    .filter((match) => match.eIFU === id)
    .flatMap((match) => match.ProductCodes.split('|'))
    .filter(unique)
    .sort()
    .join(', ');

  const getProductCodesByProductCode = (id) => json.eIFU.data
    .filter((match) => match.ProductCodes.split('|').includes(id))
    .flatMap((match) => match.ProductCodes.split('|'))
    .filter(unique)
    .sort()
    .join(', ');

  const getAssetbyIFUandCountry = (id, country) => json.eIFU.data.filter(
    (asset) => asset.eIFU === id && ((asset.Countries === '') || asset.Countries.split('|').includes(country)),
  );

  const getAssetsByProductCodeandCountry = (id, country) => json.eIFU.data
    .filter((entry) => entry.ProductCodes.split('|').includes(id) && ((entry.Countries === '') || entry.Countries.split('|').includes(country)));

  const selectors = [
    getSelectors(
      'eIFU',
      getIFUIDs,
      getAssetbyIFUandCountry,
      getProductCodesByIFU,
    ),
    getSelectors(
      'product',
      getProductCodeIDs,
      getAssetsByProductCodeandCountry,
      getProductCodesByProductCode,
    ),
  ];

  selectors.forEach((selector) => populateSearch(selector, selectors));
}

async function decorate(block) {
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
    {
      type: 'div',
      classes: ['ifu-result', 'no-result'],
      children: [{ type: 'h2', textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearchTitle', 'Search results') }],
    },
    {
      type: 'div',
      classes: ['ifu'],
      children: await Promise.all([['eIFU', 'eIFU', 'Ifu'], ['product', 'Product Code', 'Product']].map(async (entry) => (
        {
          type: 'div',
          classes: ['ifu-selection'],
          children: [
            {
              type: 'h3',
              classes: ['ifu-title'],
              textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)(`ifuSearchBy${entry[2]}`, `Search by ${entry[1]}`),
            },
            {
              type: 'select',
              attributes: { id: `${entry[0]}-code`, name: `Select ${entry[1]}`, disabled: true },
              children: [
                {
                  type: 'option',
                  attributes: { hidden: true, disabled: true, selected: true },
                  textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)(`ifuSelect${entry[2]}`, `Select ${entry[1]}`),
                },
              ],
            },
            {
              type: 'select',
              attributes: { id: `${entry[0]}-country`, name: 'Select Country', disabled: true },
              children: [
                {
                  type: 'option',
                  attributes: { hidden: true, disabled: true, selected: true },
                  textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSelectCountry', 'Select Country'),
                },
              ],
            },
            {
              type: 'button',
              attributes: { id: `${entry[0]}-code-search`, disabled: true },
              textContent: await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('ifuSearch', 'Search'),
            },
          ],
        }))),
    },
  ], block);

  populate(block);
}


/***/ }),

/***/ "./blocks/onetrust-ccpa/onetrust-ccpa.js":
/*!***********************************************!*\
  !*** ./blocks/onetrust-ccpa/onetrust-ccpa.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function decorate(block) {
  const blockConfig = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.readExactBlockConfig)(block.cloneNode(true));
  block.innerHTML = '';
  const initializeOneTrust = async () => {
    await OneTrust.NoticeApi.Initialized.then(async () => { // eslint-disable-line
      await OneTrust.NoticeApi.LoadNotices([ // eslint-disable-line
        'https://privacyportalde-cdn.onetrust.com/c579c0d0-360f-49c0-bccc-f7b7cded31cd/privacy-notices/0e664032-8cf4-4719-94d8-fdd9685743b5.json',
      ], false);
    }).catch((error) => {
      console.error("Error initializing OneTrust: ", error); // eslint-disable-line
    });
  };

  function updateOpCoDetails(opCoDetails) {
    const versionNumber = document.getElementsByClassName('otnotice-public-version')[0].innerHTML;
    const versionNum = document.getElementsByClassName('VersionNumber');
    if (opCoDetails.OpCoName) {
      const opcoNameElements = document.getElementsByClassName('OpCoName');
      Array.from(opcoNameElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoName;
      });
    }

    if (opCoDetails.OpCoAddressMultiLine) {
      const opcoAddrElements = document.getElementsByClassName('OpCoAddressMultiLine');
      Array.from(opcoAddrElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoAddressMultiLine;
      });
    }

    if (opCoDetails.OpCoEmail) {
      const opcoEmailElements = document.getElementsByClassName('OpCoEmail');
      Array.from(opcoEmailElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoEmail;
        el.href = `mailto:${opCoDetails.OpCoEmail}`;
      });
    }

    // Update the href for OpCoCookiePolicy, OpCoCCPAPolicy, OpCoPrivacyPolicy
    if (opCoDetails.OpCoCookiePolicy) {
      const opcoCookiePolicyElements = document.getElementsByClassName('OpCoCookiePolicy');
      Array.from(opcoCookiePolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCookiePolicy;
      });
    }

    if (opCoDetails.OpCoCCPAPolicy) {
      const opcoCCPAPolicyElements = document.getElementsByClassName('OpCoCCPAPolicy');
      Array.from(opcoCCPAPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCCPAPolicy;
      });
    }

    if (opCoDetails.OpCoPrivacyPolicy) {
      const opcoPrivacyPolicyElements = document.getElementsByClassName('OpCoPrivacyPolicy');
      Array.from(opcoPrivacyPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoPrivacyPolicy;
      });
    }

    for (let i = 0; i < versionNum.length; i += 1) {
      versionNum[i].innerHTML = versionNumber;
    }

    const versionElements = document.getElementsByClassName('otnotice-version');
    Array.from(versionElements).forEach((el) => {
      el.remove();
    });
  }

  const createAndAppendDiv = () => {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const innerDiv = document.createElement('div');
    innerDiv.id = 'otnotice-0e664032-8cf4-4719-94d8-fdd9685743b5';
    innerDiv.className = 'otnotice';

    containerDiv.appendChild(innerDiv);
    block.appendChild(containerDiv);
  };

  const addOneTrustScript = () => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js';
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.setAttribute('settings', 'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9');
      script.id = 'otprivacy-notice-script';

      script.onload = () => resolve(script);
      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  };

  addOneTrustScript()
    .then(async () => {
      await createAndAppendDiv();
      await initializeOneTrust();
      await updateOpCoDetails(blockConfig);
    })
    .catch((error) => {
      console.error('Error loading OneTrust script: ', error);  // eslint-disable-line
    });
}


/***/ }),

/***/ "./blocks/onetrust-cookie/onetrust-cookie.js":
/*!***************************************************!*\
  !*** ./blocks/onetrust-cookie/onetrust-cookie.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function decorate(block) {
  const blockConfig = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.readExactBlockConfig)(block.cloneNode(true));
  block.innerHTML = '';
  const initializeOneTrust = async () => {
    await OneTrust.NoticeApi.Initialized.then(async () => { // eslint-disable-line
      await OneTrust.NoticeApi.LoadNotices([ // eslint-disable-line
        'https://privacyportalde-cdn.onetrust.com/c579c0d0-360f-49c0-bccc-f7b7cded31cd/privacy-notices/8b719598-1655-4d2d-879b-9b2e633813ac.json',
      ], false);
    }).catch((error) => {
      console.error("Error initializing OneTrust: ", error); // eslint-disable-line
    });
  };

  const removeVersionElements = () => {
    const versionElements = document.getElementsByClassName('otnotice-version');
    Array.from(versionElements).forEach((el) => el.remove());
  };

  function updateOpCoDetails(opCoDetails) {
    const versionNumber = document.getElementsByClassName('otnotice-public-version')[0].innerHTML;
    const versionNum = document.getElementsByClassName('VersionNumber');
    if (opCoDetails.OpCoName) {
      const opcoNameElements = document.getElementsByClassName('OpCoName');
      Array.from(opcoNameElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoName;
      });
    }

    if (opCoDetails.OpCoAddressMultiLine) {
      const opcoAddrElements = document.getElementsByClassName('OpCoAddressMultiLine');
      Array.from(opcoAddrElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoAddressMultiLine;
      });
    }

    if (opCoDetails.OpCoEmail) {
      const opcoEmailElements = document.getElementsByClassName('OpCoEmail');
      Array.from(opcoEmailElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoEmail;
        el.href = `mailto:${opCoDetails.OpCoEmail}`;
      });
    }

    // Update the href for OpCoCookiePolicy, OpCoCCPAPolicy, OpCoPrivacyPolicy
    if (opCoDetails.OpCoCookiePolicy) {
      const opcoCookiePolicyElements = document.getElementsByClassName('OpCoCookiePolicy');
      Array.from(opcoCookiePolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCookiePolicy;
      });
    }

    if (opCoDetails.OpCoCCPAPolicy) {
      const opcoCCPAPolicyElements = document.getElementsByClassName('OpCoCCPAPolicy');
      Array.from(opcoCCPAPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCCPAPolicy;
      });
    }

    if (opCoDetails.OpCoPrivacyPolicy) {
      const opcoPrivacyPolicyElements = document.getElementsByClassName('OpCoPrivacyPolicy');
      Array.from(opcoPrivacyPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoPrivacyPolicy;
      });
    }

    for (let i = 0; i < versionNum.length; i += 1) {
      versionNum[i].innerHTML = versionNumber;
    }

    const versionElements = document.getElementsByClassName('otnotice-version');
    Array.from(versionElements).forEach((el) => {
      el.remove();
    });
  }

  const createAndAppendDiv = () => {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const innerDiv = document.createElement('div');
    innerDiv.id = 'otnotice-8b719598-1655-4d2d-879b-9b2e633813ac';
    innerDiv.className = 'otnotice';

    containerDiv.appendChild(innerDiv);
    block.appendChild(containerDiv);
  };

  const addOneTrustScript = () => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://privacyportal-uatde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js';
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.id = 'otprivacy-notice-script';

      script.onload = () => resolve(script);
      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  };

  addOneTrustScript()
    .then(async () => {
      await createAndAppendDiv();
      await initializeOneTrust();
      await updateOpCoDetails(blockConfig);
      await removeVersionElements();
    })
    .catch((error) => {
      console.error('Error loading OneTrust script: ', error);  // eslint-disable-line
    });
}


/***/ }),

/***/ "./blocks/onetrust-privacy/onetrust-privacy.js":
/*!*****************************************************!*\
  !*** ./blocks/onetrust-privacy/onetrust-privacy.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function decorate(block) {
  const blockConfig = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.readExactBlockConfig)(block.cloneNode(true));
  block.innerHTML = '';
  const initializeOneTrust = async () => {
    await OneTrust.NoticeApi.Initialized.then(async () => { // eslint-disable-line
      await OneTrust.NoticeApi.LoadNotices([ // eslint-disable-line
        'https://privacyportalde-cdn.onetrust.com/c579c0d0-360f-49c0-bccc-f7b7cded31cd/privacy-notices/afca6a13-75db-4fd7-b522-74a5a9d459de.json',
      ], false);
    }).catch((error) => {
      console.error("Error initializing OneTrust: ", error); // eslint-disable-line
    });
  };

  function updateOpCoDetails(opCoDetails) {
    const versionNumber = document.getElementsByClassName('otnotice-public-version')[0].innerHTML;
    const versionNum = document.getElementsByClassName('VersionNumber');
    if (opCoDetails.OpCoName) {
      const opcoNameElements = document.getElementsByClassName('OpCoName');
      Array.from(opcoNameElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoName;
      });
    }

    if (opCoDetails.OpCoAddressMultiLine) {
      const opcoAddrElements = document.getElementsByClassName('OpCoAddressMultiLine');
      Array.from(opcoAddrElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoAddressMultiLine;
      });
    }

    if (opCoDetails.OpCoEmail) {
      const opcoEmailElements = document.getElementsByClassName('OpCoEmail');
      Array.from(opcoEmailElements).forEach((el) => {
        el.innerHTML = opCoDetails.OpCoEmail;
        el.href = `mailto:${opCoDetails.OpCoEmail}`;
      });
    }

    // Update the href for OpCoCookiePolicy, OpCoCCPAPolicy, OpCoPrivacyPolicy
    if (opCoDetails.OpCoCookiePolicy) {
      const opcoCookiePolicyElements = document.getElementsByClassName('OpCoCookiePolicy');
      Array.from(opcoCookiePolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCookiePolicy;
      });
    }

    if (opCoDetails.OpCoCCPAPolicy) {
      const opcoCCPAPolicyElements = document.getElementsByClassName('OpCoCCPAPolicy');
      Array.from(opcoCCPAPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoCCPAPolicy;
      });
    }

    if (opCoDetails.OpCoPrivacyPolicy) {
      const opcoPrivacyPolicyElements = document.getElementsByClassName('OpCoPrivacyPolicy');
      Array.from(opcoPrivacyPolicyElements).forEach((el) => {
        el.href = opCoDetails.OpCoPrivacyPolicy;
      });
    }

    for (let i = 0; i < versionNum.length; i += 1) {
      versionNum[i].innerHTML = versionNumber;
    }

    const versionElements = document.getElementsByClassName('otnotice-version');
    Array.from(versionElements).forEach((el) => {
      el.remove();
    });
  }

  const createAndAppendDiv = () => {
    const containerDiv = document.createElement('div');
    containerDiv.className = 'container';

    const innerDiv = document.createElement('div');
    innerDiv.id = 'otnotice-afca6a13-75db-4fd7-b522-74a5a9d459de';
    innerDiv.className = 'otnotice';

    containerDiv.appendChild(innerDiv);
    block.appendChild(containerDiv);
  };

  const addOneTrustScript = () => { // eslint-disable-line
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js';
      script.type = 'text/javascript';
      script.charset = 'UTF-8';
      script.setAttribute('settings', 'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vcHJpdmFjeXBvcnRhbC1kZS5vbmV0cnVzdC5jb20vcmVxdWVzdC92MS9wcml2YWN5Tm90aWNlcy9zdGF0cy92aWV3cyJ9');
      script.id = 'otprivacy-notice-script';

      script.onload = () => resolve(script);
      script.onerror = (error) => reject(error);

      document.head.appendChild(script);
    });
  };

  addOneTrustScript()
    .then(async () => {
      await createAndAppendDiv();
      await initializeOneTrust();
      await updateOpCoDetails(blockConfig);
    //   await removeVersionElements();
    })
    .catch((error) => {
      console.error('Error loading OneTrust script: ', error);  // eslint-disable-line
    });
}


/***/ }),

/***/ "./blocks/pdf-viewer/pdf-viewer.js":
/*!*****************************************!*\
  !*** ./blocks/pdf-viewer/pdf-viewer.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


/**
 * https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/gettingstarted/
 */
const ADOBE_DC_VIEW_SDK_SRC = 'https://documentservices.adobe.com/view-sdk/viewer.js';
const ADOBE_DC_VIEW_SDK_READY_EVENT = 'adobe_dc_view_sdk.ready';
const FRANKLIN_DELAYED_COMPLETED_EVENT = 'franklin.delayed_completed';

let sdkLoaded = false;

/**
 * Obtain API keys here: https://documentservices.adobe.com/dc-integration-creation-app-cdn/main.html?api=pdf-embed-api#
 *
 * A key is domain-specific and convers all subdomains. As such the placeholders need to
 * feature a key per <domain>.<tld>. In this case a key each for:
 * - localhost
 * - aem.page
 * - aem.live
 * - mammotome.com
 *
 * This method checks the host from `window.location` and returns the respective placeholder
 * holding the api key.
 *
 * @returns {undefined|string} The key or undefined if no matching domain was found.
 */
const getApiKey = async () => {
  const { host } = window.location;

  if (host.startsWith('localhost')) {
    return (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)('pdfApiKeyLocalhost');
  }

  if (host.endsWith('.page')) {
    return (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)('pdfApiKeyPage');
  }

  if (host.endsWith('.live')) {
    return (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)('pdfApiKeyLive;');
  }

  if (host.endsWith('mammotome.com')) {
    return (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)('pdfApiKeyProduction');
  }

  return undefined;
};

// eslint-disable-next-line no-unused-vars
const createAdobeDCViewSDKReadyHandler = (config) => async (event) => {
  const apiKey = await getApiKey();
  if (apiKey === null) {
    // eslint-disable-next-line no-console
    console.warn('no PDF viewer API key provided');
  }

  // eslint-disable-next-line no-undef
  const adobeDCView = new AdobeDC.View({
    clientId: apiKey,
    divId: config.divId,
  });
  adobeDCView.previewFile(
    config.viewer.preview,
    config.viewer.options,
  );
};

const onEmbedPDFScriptLoaded = () => {
  sdkLoaded = true;
};

const loadAdobeDCViewSDK = async () => {
  if (!sdkLoaded) {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadScript)(ADOBE_DC_VIEW_SDK_SRC, onEmbedPDFScriptLoaded);
  }
};

const addEventListeners = (config) => {
  document.addEventListener(
    ADOBE_DC_VIEW_SDK_READY_EVENT,
    createAdobeDCViewSDKReadyHandler(config),
  );
  document.addEventListener(
    FRANKLIN_DELAYED_COMPLETED_EVENT,
    loadAdobeDCViewSDK,
  );
};

const setupDOM = (block, divId) => {
  const div = document.createElement('div');
  div.setAttribute('class', 'pdf-embed');
  div.setAttribute('style', 'width: 100%; height: 800px;');
  div.setAttribute('id', divId);

  block.appendChild(div);
};

const embedPDF = async (block, href) => {
  if (!href) {
    return;
  }
  const divId = `pdf-viewer-${Math.random()
    .toString(36)
    .slice(2)}`;
  const fileName = href.slice(href.lastIndexOf('/') + 1);

  const supportFullScreen = !!document.fullscreenEnabled
    || !!document.webkitFullscreenEnabled
    || !!document.msFullscreenEnabled;

  const config = {
    apiKey: null,
    divId,
    viewer: {
      // https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/howtos/
      preview: {
        content: { location: { url: href } },
        metaData: {
          fileName,
          hasReadOnlyAccess: true,
        },
      },
      // https://developer.adobe.com/document-services/docs/overview/pdf-embed-api/howtos_ui/
      options: {
        defaultViewMode: 'FIT_WIDTH',
        embedMode: supportFullScreen ? 'FULL_WINDOW' : 'IN_LINE',
        showAnnotationTools: false,
        showBookmarks: true,
        showDownloadPDF: true,
        showFullScreen: supportFullScreen,
        showPrintPDF: true,
        showThumbnails: true,
        showZoomControl: true,
      },
    },
  };

  setupDOM(block, divId);
  addEventListeners(config);
};

async function decorate(block) {
  const pdfSource = block.querySelector('a');

  if (!pdfSource) {
    return;
  }

  await embedPDF(block, pdfSource.href);
}


/***/ }),

/***/ "./blocks/prev-next/prev-next.js":
/*!***************************************!*\
  !*** ./blocks/prev-next/prev-next.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


const HTML_ARROW_PREV = '<svg fill="rgba(129,51,151,1)" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">'
  + '<path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"/>'
  + '</svg>';

const HTML_ARROW_NEXT = '<svg fill="rgba(129,51,151,1)" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">'
  + '<path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>'
  + '</svg>';

async function decorate(block) {
  const moveHeaderLinkDiv = (el) => {
    const text = el.innerHTML;
    const newDiv = document.createElement('div');
    newDiv.classList.add('prev-next-header-link');
    newDiv.innerHTML = text;
    el.innerHTML = '';
    el.insertAdjacentElement('afterbegin', newDiv);
  };

  const buildNavButtons = async (key, defaultText) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('prev-next-button');
    newDiv.textContent = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)(key, defaultText);
    return newDiv;
  };

  const createArrow = (direction) => {
    const arrow = document.createElement('div');
    arrow.classList.add(`${direction}-arrow`);
    arrow.innerHTML = direction === 'left' ? HTML_ARROW_PREV : HTML_ARROW_NEXT;
    return arrow;
  };

  if (!block) return;

  const prevNextContainer = block.firstElementChild;
  const verticalSeparator = document.createElement('div');
  verticalSeparator.classList.add('vertical-line');
  prevNextContainer.firstElementChild.insertAdjacentElement('afterend', verticalSeparator);

  const prevBox = prevNextContainer.firstElementChild.querySelector('a');
  const nextBox = prevNextContainer.lastElementChild.querySelector('a');

  if (prevBox) {
    moveHeaderLinkDiv(prevBox);
    prevBox.insertAdjacentElement('afterbegin', await buildNavButtons('navPreviousText', 'Previous'));
    prevBox.insertAdjacentElement('afterbegin', createArrow('left'));
  }

  if (nextBox) {
    moveHeaderLinkDiv(nextBox);
    nextBox.insertAdjacentElement('afterbegin', await buildNavButtons('navNextText', 'Next'));
    nextBox.insertAdjacentElement('afterbegin', createArrow('right'));
  }
}


/***/ }),

/***/ "./blocks/product-carousel/product-carousel.js":
/*!*****************************************************!*\
  !*** ./blocks/product-carousel/product-carousel.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate),
/* harmony export */   optimizeThumbnails: () => (/* binding */ optimizeThumbnails)
/* harmony export */ });
/* harmony import */ var _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-carousel.js */ "./scripts/lib-carousel.js");
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


// import { addEnclosingDiv, initSlider } from '../../scripts/lib-carousel';

// Large sreen bigger than px
const LARGE_SCREEN = 1000;

// Number of required column and rows in table
const NUM_COLUMNS = 2;
const NUM_ROWS = 2;

// Error Messages
const INVALID_COLUMNS_MSG = `Invalid configuration. Table with ${NUM_COLUMNS} columns and at least 1 row required`;
const INVALID_ROWS_MSG = `Invalid configuration. At least ${NUM_ROWS} rows required to properly show the Product Carousel`;

/**
 *
 * @param path
 * @returns HTML for left/right arrow
 * @constructor
 */
const ARROW_TEMPLATE = (path) => `
  <svg fill="rgb(88,127,194)" width="24px" height="24px" viewBox="0 0 1024 1024" class="icon" xmlns="http://www.w3.org/2000/svg">
    <path d="${path}"/>
  </svg>
`;

const HTML_LEFT_ARROW = ARROW_TEMPLATE('M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z');

const HTML_RIGHT_ARROW = ARROW_TEMPLATE('M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z');

/**
 * Get optimized img element width default
 * @param picture
 */
function optimizeThumbnails(picture) {
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_1__.createOptimizedPicture)(picture,  true,)
}

/**
 * Check if the block has the correct number of columns and rows
 * @param block
 */
function checkConfig(block) {
  const children = Array.from(block.children);
  const [firstChild] = children;
  if (!firstChild || firstChild.children.length < NUM_COLUMNS) throw new Error(INVALID_COLUMNS_MSG);
  if (children.length < NUM_ROWS) throw new Error(INVALID_ROWS_MSG);
}

/**
 * Move Elements in an array by a given number of positions.
 * Positive numPositions value moves elements to the right,
 * negative numPositions value moves elements to the left.
 * @param arr
 * @param numPositions
 * @returns {*}
 */
function moveArrayElements(arr, numPositions) {
  if (arr.length < 2) {
    return arr;
  }

  const normalizedPositions = numPositions % arr.length;
  if (normalizedPositions === 0) {
    return arr;
  }

  if (normalizedPositions > 0) {
    const movedElements = arr.splice(arr.length - normalizedPositions);
    arr.unshift(...movedElements);
  } else {
    const movedElements = arr.splice(0, -normalizedPositions);
    arr.push(...movedElements);
  }

  return arr;
}

/**
 * Updates the style properties of a slide child element.
 * @param {HTMLElement} child - The slide child element.
 * @param {number} index - The index of the element.
 * @returns {void}
 */
const updateChildStyle = (child, index) => {
  const showSlide = index < 3 ? 'flex' : 'none';
  const slideIndex = index === 1 ? 3 : 1;
  child.style.cssText = `order: ${index + 1}; display: ${showSlide}; z-index: ${slideIndex};`;
};

/**
 * Reorder the children of the slider and remove empty children for mobile view
 * @param sliderChildren
 * @returns {slideChildren}
 */
const reorderChildren = (productCarousel) => {
  productCarousel.sliderChildren = productCarousel
    .sliderChildren.filter((child) => child.innerHTML.trim() !== '');

  productCarousel.sliderChildren.forEach(updateChildStyle);
  return productCarousel.sliderChildren;
};

/**
 * Navigation for arrow buttons.
 * @param {Event} event - The event object.
 * @returns {void}
 */
const arrowNavigation = (productCarousel, event) => {
  const isLargeScreen = window.innerWidth > LARGE_SCREEN;

  const sliderChildren = isLargeScreen
    ? productCarousel.getSlides()
    : reorderChildren(productCarousel);

  const increment = isLargeScreen ? 3 : 1;
  const direction = event.currentTarget.id === 'slider-arrow-left' ? increment : -increment;

  moveArrayElements(sliderChildren, direction).forEach(updateChildStyle);
};

/**
 * Event Listeners for arrow navigation
 * @param arrowNavContainer
 */
const arrowNavOnClickEvents = (productCarousel) => {
  if (productCarousel.getArrowNavContainer()) {
    Array.from(productCarousel.getArrowNavContainer().children).forEach((el) => {
      el.addEventListener('click', (event) => {
        arrowNavigation(productCarousel, event);
      });
    });
  }
};

/**
 * Initialize the slide order
 * @param sliderChildren
 */
const initSlideOrder = (sliderChildren) => {
  sliderChildren.forEach((child, index) => {
    child.setAttribute('style', `order: ${index + 1};`);
  });
};

/**
 * Fill Slide Grid to match 3 rows for each series
 * @param sliderWrapper
 */
const fillSlideGrid = (productCarousel) => {
  const sliderWrapperChildren = Array.from(productCarousel.sliderWrapper.children);
  const emptySlide = document.createElement('div');

  const targetLength = Math.ceil(sliderWrapperChildren.length / 3) * 3;
  const elementsToAdd = targetLength - sliderWrapperChildren.length;

  const emptySlidesToAdd = new Array(elementsToAdd).fill(emptySlide);

  emptySlidesToAdd.forEach((slide) => productCarousel
    .sliderWrapper.appendChild(slide.cloneNode(true)));
};

/**
 * Decorate the block
 * @param block
 */
function decorate(block) {
  try {
    checkConfig(block);
  } catch (e) {
    block.innerHTML = `<code>${e.message}</code>`;
  }

  optimizeThumbnails(block);
  block.querySelectorAll('.button-container').forEach((el) => {
    el.classList.remove('button-container');
  });
  block.querySelectorAll('.button').forEach((el) => {
    el.classList.remove('button', 'primary');
  });
  const productCarousel = new _scripts_lib_carousel_js__WEBPACK_IMPORTED_MODULE_0__["default"](block);
  // Only fill slider grid with empty div elements if screen width is greater than 1000px
  if (window.innerWidth > LARGE_SCREEN) fillSlideGrid(productCarousel);
  productCarousel.createSlideSlider();
  productCarousel.setSliderIds();
  initSlideOrder(productCarousel.getSlides());
  productCarousel.setLeftAndRightArrowHtml(HTML_LEFT_ARROW, HTML_RIGHT_ARROW);
  if (productCarousel.getSlides().length > 3) productCarousel.createArrowNav();
  productCarousel.initSlider(false, false, false);
  if (productCarousel.getSlides().length > 3) arrowNavOnClickEvents(productCarousel);
}


/***/ }),

/***/ "./blocks/product-list/product-list.js":
/*!*********************************************!*\
  !*** ./blocks/product-list/product-list.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function decorateProduct(base, product) {
  const children = [
    { type: 'h4', children: (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(product.Name) },
  ];

  if (product.Image) {
    children.unshift({
      type: 'div',
      classes: ['container'],
      children: [{ type: 'img', attributes: { src: product.Image } }],
    });
  }

  return {
    type: 'a',
    classes: ['product'],
    attributes: { href: `${base}/${product.Page}` },
    children,
  };
}

async function decorate(block) {
  const { country, language } = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getInfo)();
  const products = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getProducts)(country, language);
  const base = `/${country}/${language}/${await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)(`${(0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(`product Reference Support Url ${country}/${language}`)}`, 'product-support')}`;

  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
    {
      type: 'div',
      classes: ['product-list'],
      children: products.map((product) => decorateProduct(base, product)),
    }], block);

  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlockImgs)(block);
}


/***/ }),

/***/ "./blocks/product-reference/product-reference.js":
/*!*******************************************************!*\
  !*** ./blocks/product-reference/product-reference.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


async function createButtons(country, language, product) {
  return [
    [
      product.Information ? `${window.location.pathname}#${product.Information}` : `/${country}/${language}/${await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)(`${(0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(`product Reference Information Url ${country}/${language}`)}`, 'contact/')}`,
      ['primary'],
      await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productReferenceInformation', 'Request Information'),
    ],
    [
      `/${country}/${language}/${await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)(`${(0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(`product Reference Support Url ${country}/${language}`)}`, 'product-support')}`,
      ['secondary'],
      await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productReferenceSupport', 'Product Support'),
    ],
    [
      `/${country}/${language}/${await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getConfigValue)(`${(0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.toCamelCase)(`product Reference Support Url ${country}/${language}`)}`, 'product-support')}/${product.Page}`,
      ['secondary'],
      await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productReferenceDocuments', 'Product Documents'),
    ],
  ].map(([href, className, textContent]) => ({ href, className, textContent }));
}

async function decorate(block) {
  const page = block.querySelector('div > div')?.textContent?.trim();

  block.innerHTML = '';

  if (!page) {
    return;
  }

  const { country, language } = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getInfo)();

  const product = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getProduct)(page, country, language);

  if (!product) {
    return;
  }

  const buttons = await createButtons(country, language, product);

  const imgStructure = [
    {
      type: 'img',
      attributes: { src: product.Image, alt: product.Name },
    },
  ];

  const buttonStructure = buttons.map(({ href, className, textContent }) => ({
    type: 'a',
    attributes: { href },
    children: [{ type: 'button', classes: [className], textContent }],
  }));

  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
    {
      type: 'div',
      children: [
        imgStructure,
        buttonStructure,
      ].map((children) => (
        {
          type: 'div',
          classes: ['product-ref-container'],
          children: [
            {
              type: 'div',
              children,
            },
          ],
        })),
    },
  ], block);
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlockImgs)(block);
}


/***/ }),

/***/ "./blocks/product-support/product-support.js":
/*!***************************************************!*\
  !*** ./blocks/product-support/product-support.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function getProductSupportInfo() {
  const info = (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getInfo)();
  const url = new URL(window.location);
  const idx = url.pathname.indexOf('/product-support/');
  if (idx > 0) {
    const page = url.pathname.substring(url.pathname.indexOf('/product-support/') + '/product-support/'.length);
    return { page, ...info };
  }
  return info;
}

function getTypes(product) {
  return Array.from(new Set(product.assets.map((asset) => asset.Type).filter((type) => type)));
}

function getAssets(product, type, allType) {
  return product.assets.filter((asset) => (type === allType || asset.Type === type));
}

const YOUTUBE_URL_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

function parseYoutubeCode(url) {
  const matchUrl = url.match(YOUTUBE_URL_REGEX);
  const videoCode = matchUrl && matchUrl[7];

  return (videoCode && videoCode.length === 11) ? videoCode : false;
}

function setMetaTag(type, name, value) {
  let meta = document.querySelector(`meta[${type}='${name}']`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.querySelector('head').append(meta);
  }
  meta.content = value;
}

async function decorate(block) {
  const {
    country, page, productSupport, language,
  } = getProductSupportInfo();

  const product = await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getProduct)(page, country, language);

  if (!product) {
    window.location.replace(productSupport);
    return;
  }

  const [heading, headingVideos, allDocuments, empty] = await Promise.all([
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productSupportHeading', 'Product and Technical Documents'),
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productSupportHeadingVideos', 'Instructional Videos'),
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productSupportAllDocuments', 'All Product Documents'),
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.translate)('productSupportNoResult', 'No data was found'),
  ]);

  setMetaTag('property', 'og:title', product.Name);
  setMetaTag('name', 'description', `${product.Name} - ${heading}`);

  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{ type: 'div', children: [{ type: 'h1', children: (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(product.Name) }] }], block);
  if (product.Image) {
    setMetaTag('property', 'og:image', product.Image);
    setMetaTag('property', 'og:image:secure_url', product.Image);
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{ type: 'div', classes: ['container'], children: [{ type: 'img', attributes: { src: product.Image, alt: product.Name } }] }], block);
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlockImgs)(block);
  }
  const types = getTypes(product);
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
    {
      type: 'div',
      children: [
        {
          type: 'div',
          classes: ['header-colored', 'header-uppercase', 'header-wide'],
          children: [
            {
              type: 'h2',
              textContent: heading,
            },
          ],
        },
        {
          type: 'div',
          children: [
            {
              type: 'select',
              children: [
                {
                  type: 'option',
                  textContent: allDocuments,
                },
                ...types
                  .map((type) => (
                    {
                      type: 'option',
                      textContent: type,
                    }
                  )),
              ],
            },
          ],
        },
        {
          type: 'div',
          classes: ['link-container'],
        },
      ],
    },
  ], block);

  const select = block.querySelector('select');
  if (types.length === 0) {
    select.style.display = 'none';
  }
  const container = block.querySelector('.link-container');

  const handler = () => {
    container.innerHTML = '';
    const assets = getAssets(product, select.value, allDocuments)
      .filter((asset) => !parseYoutubeCode(asset.URL));

    if (assets.length > 0) {
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)(assets.map((asset) => (
        {
          type: 'div',
          classes: ['link', 'button-container'],
          children: [
            {
              type: 'a',
              attributes: { href: asset.URL, target: 'blank' },
              children: (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(asset.Name),
            },
          ],
        }
      )), container);
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateButtons)(container);
    } else {
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([{
        type: 'div',
        textContent: empty,
      }], container);
    }
  };

  const videoAssets = getAssets(product, allDocuments, allDocuments)
    .map((asset) => ({ ...asset, youtubeCode: parseYoutubeCode(asset.URL) }))
    .filter((asset) => asset.youtubeCode);

  if (videoAssets.length > 0) {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createDomStructure)([
      {
        type: 'div',
        children: [
          {
            type: 'div',
            classes: ['header-colored', 'header-uppercase', 'header-wide'],
            children: [
              {
                type: 'h2',
                textContent: headingVideos,
              },
            ],
          },
          {
            type: 'div',
            classes: ['link-container'],
            children: videoAssets.map((asset) => (
              {
                type: 'div',
                classes: ['video', 'link'],
                children: [
                  {
                    type: 'div',
                    children: [
                      {
                        type: 'div',
                        children: [
                          {
                            type: 'h3',
                            children: (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScript)(asset.Name),
                          },
                        ],
                      },
                      {
                        type: 'div',
                        children: [
                          {
                            type: 'a',
                            attributes: { href: `https://www.youtu.be/${asset.youtubeCode}` },
                            children: [
                              {
                                type: 'span',
                                textContent: asset.Name,
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'div',
                        children: [
                          {
                            type: 'img',
                            attributes:
                              {
                                src: `https://img.youtube.com/vi/${asset.youtubeCode}/sddefault.jpg`,
                                alt: asset.Name,
                              },
                          },
                        ],
                      },
                    ],
                  },
                ],
              }
            )),
          },
        ],
      },
    ], block);
    await Promise.all(Array.from(block.querySelectorAll('.video')).map(async (video) => {
      (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlock)(video);
      await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadBlock)(video);
    }));
  }

  handler();
  select.addEventListener('change', handler);
}


/***/ }),

/***/ "./blocks/soundcloud/soundcloud.js":
/*!*****************************************!*\
  !*** ./blocks/soundcloud/soundcloud.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
const SOUNDCLOUD = {
  origin: 'https://soundcloud.com',
  iframeOrigin: 'https://w.soundcloud.com',
  apiUrl: 'https://api.soundcloud.com/tracks/',
};

const FRANKLIN_DELAYED_COMPLETED_EVENT = 'franklin.delayed_completed';

const calculateIframeHeight = (text) => {
  // Extract the height value from the iframe HTML
  const heightRegex = /height="(\d+)"/;
  const heightMatch = text.match(heightRegex);
  return heightMatch && heightMatch[1] ? parseInt(heightMatch[1], 10) : 0;
};

// eslint-disable-next-line no-unused-vars
const addSrcToIframes = (iframe, url) => async (event) => {
  iframe.src = url.toString();
};

const addEventListener = (iframe, url) => {
  document.addEventListener(
    FRANKLIN_DELAYED_COMPLETED_EVENT,
    addSrcToIframes(iframe, url),
  );
};

async function decorate(block) {
  const elements = Array.from(block.querySelectorAll('.soundcloud > div'));
  elements.reduce((podcasts, element) => {
    const textContent = element.children[1]?.textContent ?? '';
    const iframe = /<iframe.*?<\/iframe>/.exec(textContent)?.[0] ?? '';
    const div = /<div.*?<\/div>/.exec(textContent)?.[0] ?? '';

    const src = iframe.match(/src="(.*?)"/);
    if (src && src[1]) {
      const url = new URL(decodeURIComponent(src[1]));
      const urlParam = new URLSearchParams(url.search).get('url');
      if (url.origin === SOUNDCLOUD.iframeOrigin && urlParam?.startsWith(SOUNDCLOUD.apiUrl)) {
        podcasts.push({
          element, iframe, url, div,
        });
      }
    }
    return podcasts;
  }, []).forEach(({
    element, iframe, url, div,
  }) => {
    const height = calculateIframeHeight(iframe);
    const soundCloudFrame = document.createElement('iframe');
    soundCloudFrame.height = `${height}px`;
    soundCloudFrame.width = '100%';
    soundCloudFrame.setAttribute('loading', 'lazy');
    soundCloudFrame.setAttribute('scrolling', 'no');
    soundCloudFrame.setAttribute('frameborder', 'no');
    soundCloudFrame.setAttribute('allow', 'autoplay');
    addEventListener(soundCloudFrame, url);
    element.children[1].innerHTML = '';
    element.children[1].appendChild(soundCloudFrame);
    element.classList.add('soundcloud-col');

    if (div.length > 0) {
      const divElement = document.createElement('div');
      divElement.innerHTML = div;

      const links = divElement.getElementsByTagName('a');
      const channel = links[0];
      const podcast = links[1];

      const titleDiv = document.createElement('div');
      titleDiv.classList.add('soundcloud-title');

      const channelElement = document.createElement('a');
      channelElement.href = new URL(channel.href).origin === SOUNDCLOUD.origin ? channel.href : '';
      channelElement.title = channel.title;
      channelElement.target = channel.target;
      channelElement.textContent = channel.textContent;

      const separator = document.createTextNode(' · ');

      const podcastElement = document.createElement('a');
      podcastElement.href = podcast.href;
      podcastElement.title = podcast.title;
      podcastElement.target = podcast.target;
      podcastElement.textContent = podcast.textContent;

      titleDiv.appendChild(channelElement);
      titleDiv.appendChild(separator);
      titleDiv.appendChild(podcastElement);

      element.children[1].appendChild(titleDiv);
    }
  });
}


/***/ }),

/***/ "./blocks/tab-navigation/tab-navigation.js":
/*!*************************************************!*\
  !*** ./blocks/tab-navigation/tab-navigation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


function decorate(block) {
  const links = block.querySelectorAll('a');
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.setActiveLink)(links, 'active');
}


/***/ }),

/***/ "./blocks/video/video.js":
/*!*******************************!*\
  !*** ./blocks/video/video.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decorate)
/* harmony export */ });
/* harmony import */ var _scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../scripts/lib-franklin.js */ "./scripts/lib-franklin.js");


let playerCssLoaded = false;
let removeVideo;
let escHandler;

const CSS_CLASS_NAME_ICON_PLAY_VIDEO = 'icon-playvideo';
const HTML_PLAY_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="99.2px" height="99.2px">\n'
  + '    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>\n'
  + '    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>\n'
  + '</svg>';
const YOUTUBE_URL_REGEX = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

const getVideoPathFromVideo = (video) => {
  const videoURLElement = video.querySelector(':scope > div:nth-child(2) a');
  if (!videoURLElement) {
    return '';
  }

  const videoURLString = videoURLElement.href;
  if (!videoURLString) {
    return '';
  }
  const matchUrl = videoURLString.match(YOUTUBE_URL_REGEX);
  const videoCode = matchUrl && matchUrl[7];

  if (videoCode && videoCode.length === 11) {
    return `/${videoCode}`;
  }

  return new URL(videoURLString).pathname;
};

const onPlayerCssLoaded = () => {
  playerCssLoaded = true;
};

const ensurePlayerCSSLoaded = () => {
  if (!playerCssLoaded) {
    (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadCSS)(`${window.hlx.codeBasePath}/blocks/video/asset-viewer/asset-viewer.css`, onPlayerCssLoaded);
  }
};

const createVideoOverlays = (main) => {
  const overlay = document.createElement('div');
  overlay.classList.add('asset-viewer-overlay');
  main.prepend(overlay);

  const toolbar = document.createElement('div');
  toolbar.classList.add('asset-viewer-toolbar');

  const toolbarClose = document.createElement('div');
  toolbarClose.classList.add('asset-viewer-close');
  toolbar.appendChild(toolbarClose);
  main.prepend(toolbar);

  return {
    overlay,
    toolbar,
    toolbarClose,
  };
};

const createRemoveVideoHandler = (main, overlays, videoIframe) => () => {
  overlays.overlay.removeEventListener('click', removeVideo);
  overlays.toolbarClose.removeEventListener('click', removeVideo);
  window.removeEventListener('keydown', escHandler);

  main.removeChild(overlays.overlay);
  main.removeChild(overlays.toolbar);
  main.removeChild(videoIframe);
};

const registerEventListeners = (main, overlays, videoIframe) => {
  removeVideo = createRemoveVideoHandler(main, overlays, videoIframe);
  escHandler = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      removeVideo();
    }
  };

  overlays.overlay.addEventListener('click', removeVideo);
  overlays.toolbarClose.addEventListener('click', removeVideo);
  window.addEventListener('keydown', escHandler);
};

const loadVideo = (video, videoPath) => {
  ensurePlayerCSSLoaded();

  const main = document.querySelector('main');

  const overlays = createVideoOverlays(main);

  const videoIframe = document.createElement('iframe');
  videoIframe.classList.add('video-player-iframe');
  videoIframe.setAttribute('allowfullscreen', '');
  videoIframe.src = `https://www.youtube.com/embed${videoPath}`;

  main.prepend(videoIframe);

  registerEventListeners(main, overlays, videoIframe);
};

const addPlayButton = (video) => {
  const playButton = document.createElement('span');
  playButton.classList.add(CSS_CLASS_NAME_ICON_PLAY_VIDEO);
  playButton.innerHTML = HTML_PLAY_ICON;

  const thumbnailElement = video.querySelector(':scope > div:last-child');
  thumbnailElement.appendChild(playButton);
};

const addClickHandler = (video, videoPath) => {
  video.addEventListener('click', () => loadVideo(video, videoPath), { passive: true });
};

const optimizeThumbnails = (video) => {
  (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createOptimizedPicture)(video.querySelector("picture"), false, [{ width: '768' }],);

};

const decorateVideo = async (video) => {
  const videoPath = getVideoPathFromVideo(video);
  if (!videoPath) {
    return;
  }

  addPlayButton(video);
  addClickHandler(video, videoPath);
  optimizeThumbnails(video);
  await (0,_scripts_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(video);
};

async function decorate(block) {
  const videos = block.querySelectorAll(':scope > div');
  const promises = [];

  videos.forEach((video) => {
    promises.push(decorateVideo(video));
  });

  await Promise.all(promises);
}


/***/ }),

/***/ "./blocks eager recursive ^\\.\\/.*\\/.*\\.js$":
/*!*********************************************************!*\
  !*** ./blocks/ eager ^\.\/.*\/.*\.js$ namespace object ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./cards/cards.js": "./blocks/cards/cards.js",
	"./carousel/carousel.js": "./blocks/carousel/carousel.js",
	"./collapsible/collapsible.js": "./blocks/collapsible/collapsible.js",
	"./columns/columns.js": "./blocks/columns/columns.js",
	"./footer/footer.js": "./blocks/footer/footer.js",
	"./form/checkbox.js": "./blocks/form/checkbox.js",
	"./form/file.js": "./blocks/form/file.js",
	"./form/form.js": "./blocks/form/form.js",
	"./form/utm.js": "./blocks/form/utm.js",
	"./form/wizard.js": "./blocks/form/wizard.js",
	"./header/header.js": "./blocks/header/header.js",
	"./hero-carousel/hero-carousel.js": "./blocks/hero-carousel/hero-carousel.js",
	"./hero/hero.js": "./blocks/hero/hero.js",
	"./ifus/ifus.js": "./blocks/ifus/ifus.js",
	"./onetrust-ccpa/onetrust-ccpa.js": "./blocks/onetrust-ccpa/onetrust-ccpa.js",
	"./onetrust-cookie/onetrust-cookie.js": "./blocks/onetrust-cookie/onetrust-cookie.js",
	"./onetrust-privacy/onetrust-privacy.js": "./blocks/onetrust-privacy/onetrust-privacy.js",
	"./pdf-viewer/pdf-viewer.js": "./blocks/pdf-viewer/pdf-viewer.js",
	"./prev-next/prev-next.js": "./blocks/prev-next/prev-next.js",
	"./product-carousel/product-carousel.js": "./blocks/product-carousel/product-carousel.js",
	"./product-list/product-list.js": "./blocks/product-list/product-list.js",
	"./product-reference/product-reference.js": "./blocks/product-reference/product-reference.js",
	"./product-support/product-support.js": "./blocks/product-support/product-support.js",
	"./soundcloud/soundcloud.js": "./blocks/soundcloud/soundcloud.js",
	"./tab-navigation/tab-navigation.js": "./blocks/tab-navigation/tab-navigation.js",
	"./video/video.js": "./blocks/video/video.js"
};
var fakeMap = {
	"./blocks/cards/cards.js": 9,
	"./blocks/carousel/carousel.js": 9,
	"./blocks/collapsible/collapsible.js": 9,
	"./blocks/columns/columns.js": 9,
	"./blocks/footer/footer.js": 9,
	"./blocks/form/checkbox.js": 9,
	"./blocks/form/file.js": 9,
	"./blocks/form/form.js": 9,
	"./blocks/form/utm.js": 9,
	"./blocks/form/wizard.js": 9,
	"./blocks/header/header.js": 9,
	"./blocks/hero-carousel/hero-carousel.js": 9,
	"./blocks/hero/hero.js": 7,
	"./blocks/ifus/ifus.js": 9,
	"./blocks/onetrust-ccpa/onetrust-ccpa.js": 9,
	"./blocks/onetrust-cookie/onetrust-cookie.js": 9,
	"./blocks/onetrust-privacy/onetrust-privacy.js": 9,
	"./blocks/pdf-viewer/pdf-viewer.js": 9,
	"./blocks/prev-next/prev-next.js": 9,
	"./blocks/product-carousel/product-carousel.js": 9,
	"./blocks/product-list/product-list.js": 9,
	"./blocks/product-reference/product-reference.js": 9,
	"./blocks/product-support/product-support.js": 9,
	"./blocks/soundcloud/soundcloud.js": 9,
	"./blocks/tab-navigation/tab-navigation.js": 9,
	"./blocks/video/video.js": 9
};

function webpackAsyncContext(req) {
	return webpackAsyncContextResolve(req).then(id => {
		return __webpack_require__.t(id, fakeMap[id] | 16)
	});
}
function webpackAsyncContextResolve(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		if(!__webpack_require__.o(map, req)) {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		}
		return map[req];
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.resolve = webpackAsyncContextResolve;
webpackAsyncContext.id = "./blocks eager recursive ^\\.\\/.*\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./plugins/experimentation/src/index.js":
/*!**********************************************!*\
  !*** ./plugins/experimentation/src/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_OPTIONS: () => (/* binding */ DEFAULT_OPTIONS),
/* harmony export */   getConfig: () => (/* binding */ getConfig),
/* harmony export */   getConfigForFullExperiment: () => (/* binding */ getConfigForFullExperiment),
/* harmony export */   getConfigForInstantExperiment: () => (/* binding */ getConfigForInstantExperiment),
/* harmony export */   getResolvedAudiences: () => (/* binding */ getResolvedAudiences),
/* harmony export */   isValidExperimentationConfig: () => (/* binding */ isValidExperimentationConfig),
/* harmony export */   loadEager: () => (/* binding */ loadEager),
/* harmony export */   loadLazy: () => (/* binding */ loadLazy),
/* harmony export */   runCampaign: () => (/* binding */ runCampaign),
/* harmony export */   runExperiment: () => (/* binding */ runExperiment),
/* harmony export */   serveAudience: () => (/* binding */ serveAudience)
/* harmony export */ });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const MAX_SAMPLING_RATE = 10; // At a maximum we sample 1 in 10 requests

const DEFAULT_OPTIONS = {
  // Generic properties
  rumSamplingRate: MAX_SAMPLING_RATE, // 1 in 10 requests

  // Audiences related properties
  audiences: {},
  audiencesMetaTagPrefix: 'audience',
  audiencesQueryParameter: 'audience',

  // Campaigns related properties
  campaignsMetaTagPrefix: 'campaign',
  campaignsQueryParameter: 'campaign',

  // Experimentation related properties
  experimentsRoot: '/experiments',
  experimentsConfigFile: 'manifest.json',
  experimentsMetaTag: 'experiment',
  experimentsQueryParameter: 'experiment',
};

/**
 * Checks if the current engine is detected as being a bot.
 * @returns `true` if the current engine is detected as being, `false` otherwise
 */
function isBot() {
  return navigator.userAgent.match(/bot|crawl|spider/i);
}

/**
 * Checks if any of the configured audiences on the page can be resolved.
 * @param {string[]} applicableAudiences a list of configured audiences for the page
 * @param {object} options the plugin options
 * @returns Returns the names of the resolved audiences, or `null` if no audience is configured
 */
async function getResolvedAudiences(applicableAudiences, options, context) {
  if (!applicableAudiences.length || !Object.keys(options.audiences).length) {
    return null;
  }
  // If we have a forced audience set in the query parameters (typically for simulation purposes)
  // we check if it is applicable
  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(options.audiencesQueryParameter)
    ? context.toClassName(usp.get(options.audiencesQueryParameter))
    : null;
  if (forcedAudience) {
    return applicableAudiences.includes(forcedAudience) ? [forcedAudience] : [];
  }

  // Otherwise, return the list of audiences that are resolved on the page
  const results = await Promise.all(
    applicableAudiences
      .map((key) => {
        if (options.audiences[key] && typeof options.audiences[key] === 'function') {
          return options.audiences[key]();
        }
        return false;
      }),
  );
  return applicableAudiences.filter((_, i) => results[i]);
}

/**
 * Replaces element with content from path
 * @param {string} path
 * @param {HTMLElement} element
 * @param {boolean} isBlock
 */
async function replaceInner(path, element) {
  const plainPath = path.endsWith('/')
    ? `${path}index.plain.html`
    : `${path}.plain.html`;
  try {
    const resp = await fetch(plainPath);
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.log('error loading content:', resp);
      return false;
    }
    const html = await resp.text();
    // eslint-disable-next-line no-param-reassign
    element.innerHTML = html;
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error loading content: ${plainPath}`, e);
  }
  return false;
}

/**
 * Parses the experimentation configuration sheet and creates an internal model.
 *
 * Output model is expected to have the following structure:
 *      {
 *        id: <string>,
 *        label: <string>,
 *        blocks: <string>,
 *        audiences: [<string>],
 *        status: Active | Inactive,
 *        variantNames: [<string>],
 *        variants: {
 *          [variantName]: {
 *            label: <string>
 *            percentageSplit: <number 0-1>,
 *            pages: <string>,
 *            blocks: <string>,
 *          }
 *        }
 *      };
 */
function parseExperimentConfig(json, context) {
  const config = {};
  try {
    json.settings.data.forEach((line) => {
      const key = context.toCamelCase(line.Name);
      if (key === 'audience' || key === 'audiences') {
        config.audiences = line.Value ? line.Value.split(',').map((str) => str.trim()) : [];
      } else if (key === 'experimentName') {
        config.label = line.Value;
      } else {
        config[key] = line.Value;
      }
    });
    const variants = {};
    let variantNames = Object.keys(json.experiences.data[0]);
    variantNames.shift();
    variantNames = variantNames.map((vn) => context.toCamelCase(vn));
    variantNames.forEach((variantName) => {
      variants[variantName] = {};
    });
    let lastKey = 'default';
    json.experiences.data.forEach((line) => {
      let key = context.toCamelCase(line.Name);
      if (!key) key = lastKey;
      lastKey = key;
      const vns = Object.keys(line);
      vns.shift();
      vns.forEach((vn) => {
        const camelVN = context.toCamelCase(vn);
        if (key === 'pages' || key === 'blocks') {
          variants[camelVN][key] = variants[camelVN][key] || [];
          if (key === 'pages') variants[camelVN][key].push(new URL(line[vn]).pathname);
          else variants[camelVN][key].push(line[vn]);
        } else {
          variants[camelVN][key] = line[vn];
        }
      });
    });
    config.variants = variants;
    config.variantNames = variantNames;
    return config;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('error parsing experiment config:', e, json);
  }
  return null;
}

/**
 * Checks if the given config is a valid experimentation configuration.
 * @param {object} config the config to check
 * @returns `true` if it is valid, `false` otherwise
 */
function isValidExperimentationConfig(config) {
  if (!config.variantNames
    || !config.variantNames.length
    || !config.variants
    || !Object.values(config.variants).length
    || !Object.values(config.variants).every((v) => (
      typeof v === 'object'
      && !!v.blocks
      && !!v.pages
      && (v.percentageSplit === '' || !!v.percentageSplit)
    ))) {
    return false;
  }
  return true;
}

/**
 * Calculates percentage split for variants where the percentage split is not
 * explicitly configured.
 * Substracts from 100 the explicitly configured percentage splits,
 * and divides the remaining percentage, among the variants without explicit
 * percentage split configured
 * @param {Array} variant objects
 */
function inferEmptyPercentageSplits(variants) {
  const variantsWithoutPercentage = [];

  const remainingPercentage = variants.reduce((result, variant) => {
    if (!variant.percentageSplit) {
      variantsWithoutPercentage.push(variant);
    }
    const newResult = result - parseFloat(variant.percentageSplit || 0);
    return newResult;
  }, 1);
  if (variantsWithoutPercentage.length) {
    const missingPercentage = remainingPercentage / variantsWithoutPercentage.length;
    variantsWithoutPercentage.forEach((v) => {
      v.percentageSplit = missingPercentage.toFixed(2);
    });
  }
}

/**
 * Gets experiment config from the metadata.
 *
 * @param {string} experimentId The experiment identifier
 * @param {string} instantExperiment The list of varaints
 * @returns {object} the experiment manifest
 */
function getConfigForInstantExperiment(
  experimentId,
  instantExperiment,
  pluginOptions,
  context,
) {
  const audience = context.getMetadata(`${pluginOptions.experimentsMetaTag}-audience`);
  const config = {
    label: `Instant Experiment: ${experimentId}`,
    audiences: audience ? audience.split(',').map(context.toClassName) : [],
    status: 'Active',
    id: experimentId,
    variants: {},
    variantNames: [],
  };

  const pages = instantExperiment.split(',').map((p) => new URL(p.trim()).pathname);

  const splitString = context.getMetadata(`${pluginOptions.experimentsMetaTag}-split`);
  const splits = splitString
    // custom split
    ? splitString.split(',').map((i) => parseInt(i, 10) / 100)
    // even split fallback
    : [...new Array(pages.length)].map(() => 1 / (pages.length + 1));

  config.variantNames.push('control');
  config.variants.control = {
    percentageSplit: '',
    pages: [window.location.pathname],
    blocks: [],
    label: 'Control',
  };

  pages.forEach((page, i) => {
    const vname = `challenger-${i + 1}`;
    config.variantNames.push(vname);
    config.variants[vname] = {
      percentageSplit: `${splits[i].toFixed(2)}`,
      pages: [page],
      blocks: [],
      label: `Challenger ${i + 1}`,
    };
  });
  inferEmptyPercentageSplits(Object.values(config.variants));
  return (config);
}

/**
 * Gets experiment config from the manifest and transforms it to more easily
 * consumable structure.
 *
 * the manifest consists of two sheets "settings" and "experiences", by default
 *
 * "settings" is applicable to the entire test and contains information
 * like "Audience", "Status" or "Blocks".
 *
 * "experience" hosts the experiences in rows, consisting of:
 * a "Percentage Split", "Label" and a set of "Links".
 *
 *
 * @param {string} experimentId The experiment identifier
 * @param {object} pluginOptions The plugin options
 * @returns {object} containing the experiment manifest
 */
async function getConfigForFullExperiment(experimentId, pluginOptions, context) {
  const path = `${pluginOptions.experimentsRoot}/${experimentId}/${pluginOptions.experimentsConfigFile}`;
  try {
    const resp = await fetch(path);
    if (!resp.ok) {
      // eslint-disable-next-line no-console
      console.log('error loading experiment config:', resp);
      return null;
    }
    const json = await resp.json();
    const config = pluginOptions.parser
      ? pluginOptions.parser(json, context)
      : parseExperimentConfig(json, context);
    if (!config) {
      return null;
    }
    config.id = experimentId;
    config.manifest = path;
    config.basePath = `${pluginOptions.experimentsRoot}/${experimentId}`;
    inferEmptyPercentageSplits(Object.values(config.variants));
    return config;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`error loading experiment manifest: ${path}`, e);
  }
  return null;
}

function getDecisionPolicy(config) {
  const decisionPolicy = {
    id: 'content-experimentation-policy',
    rootDecisionNodeId: 'n1',
    decisionNodes: [{
      id: 'n1',
      type: 'EXPERIMENTATION',
      experiment: {
        id: config.id,
        identityNamespace: 'ECID',
        randomizationUnit: 'DEVICE',
        treatments: Object.entries(config.variants).map(([key, props]) => ({
          id: key,
          allocationPercentage: Number(props.percentageSplit) * 100,
        })),
      },
    }],
  };
  return decisionPolicy;
}

async function getConfig(experiment, instantExperiment, pluginOptions, context) {
  const usp = new URLSearchParams(window.location.search);
  const [forcedExperiment, forcedVariant] = usp.has(pluginOptions.experimentsQueryParameter)
    ? usp.get(pluginOptions.experimentsQueryParameter).split('/')
    : [];

  const experimentConfig = instantExperiment
    ? await getConfigForInstantExperiment(experiment, instantExperiment, pluginOptions, context)
    : await getConfigForFullExperiment(experiment, pluginOptions, context);

  // eslint-disable-next-line no-console
  console.debug(experimentConfig);
  if (!experimentConfig) {
    return null;
  }

  const forcedAudience = usp.has(pluginOptions.audiencesQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.audiencesQueryParameter))
    : null;

  experimentConfig.resolvedAudiences = await getResolvedAudiences(
    experimentConfig.audiences,
    pluginOptions,
    context,
  );
  experimentConfig.run = (
    // experiment is active or forced
    (context.toCamelCase(experimentConfig.status) === 'active' || forcedExperiment)
    // experiment has resolved audiences if configured
    && (!experimentConfig.resolvedAudiences || experimentConfig.resolvedAudiences.length)
    // forced audience resolves if defined
    && (!forcedAudience || experimentConfig.audiences.includes(forcedAudience))
  );

  window.hlx = window.hlx || {};
  if (!experimentConfig.run) {
    return false;
  }
  window.hlx.experiment = experimentConfig;

  // eslint-disable-next-line no-console
  console.debug('run', experimentConfig.run, experimentConfig.audiences);
  if (forcedVariant && experimentConfig.variantNames.includes(forcedVariant)) {
    experimentConfig.selectedVariant = forcedVariant;
  } else {
    // eslint-disable-next-line import/extensions
    const { ued } = await Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./ued.js */ "./plugins/experimentation/src/ued.js"));
    const decision = ued.evaluateDecisionPolicy(getDecisionPolicy(experimentConfig), {});
    experimentConfig.selectedVariant = decision.items[0].id;
  }
  return experimentConfig;
}

async function runExperiment(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const experiment = context.getMetadata(pluginOptions.experimentsMetaTag);
  if (!experiment) {
    return false;
  }
  const variants = context.getMetadata('instant-experiment')
    || context.getMetadata(`${pluginOptions.experimentsMetaTag}-variants`);
  let experimentConfig;
  try {
    experimentConfig = await getConfig(experiment, variants, pluginOptions, context);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Invalid experiment config.', err);
  }
  if (!experimentConfig || !isValidExperimentationConfig(experimentConfig)) {
    // eslint-disable-next-line no-console
    console.warn('Invalid experiment config. Please review your metadata, sheet and parser.');
    return false;
  }
  // eslint-disable-next-line no-console
  console.debug(`running experiment (${window.hlx.experiment.id}) -> ${window.hlx.experiment.selectedVariant}`);

  if (experimentConfig.selectedVariant === experimentConfig.variantNames[0]) {
    return false;
  }

  const { pages } = experimentConfig.variants[experimentConfig.selectedVariant];
  if (!pages.length) {
    return false;
  }

  const currentPath = window.location.pathname;
  const control = experimentConfig.variants[experimentConfig.variantNames[0]];
  const index = control.pages.indexOf(currentPath);
  if (index < 0 || pages[index] === currentPath) {
    return false;
  }

  // Fullpage content experiment
  document.body.classList.add(`experiment-${experimentConfig.id}`);
  const result = await replaceInner(pages[0], document.querySelector('main'));
  if (!result) {
    // eslint-disable-next-line no-console
    console.debug(`failed to serve variant ${window.hlx.experiment.selectedVariant}. Falling back to ${experimentConfig.variantNames[0]}.`);
  }
  document.body.classList.add(`variant-${result ? experimentConfig.selectedVariant : experimentConfig.variantNames[0]}`);
  context.sampleRUM('experiment', {
    source: experimentConfig.id,
    target: result ? experimentConfig.selectedVariant : experimentConfig.variantNames[0],
  });
  return result;
}

async function runCampaign(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...options };
  const usp = new URLSearchParams(window.location.search);
  const campaign = (usp.has(pluginOptions.campaignsQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.campaignsQueryParameter))
    : null)
    || (usp.has('utm_campaign') ? context.toClassName(usp.get('utm_campaign')) : null);
  if (!campaign) {
    return false;
  }

  let audiences = context.getMetadata(`${pluginOptions.campaignsMetaTagPrefix}-audience`);
  if (audiences) {
    audiences = audiences.split(',').map(context.toClassName);
    const resolvedAudiences = await getResolvedAudiences(audiences, pluginOptions, context);
    if (!!resolvedAudiences && !resolvedAudiences.length) {
      return false;
    }
  }

  const allowedCampaigns = context.getAllMetadata(pluginOptions.campaignsMetaTagPrefix);
  if (!Object.keys(allowedCampaigns).includes(campaign)) {
    return false;
  }

  const urlString = allowedCampaigns[campaign];
  if (!urlString) {
    return false;
  }

  try {
    const url = new URL(urlString);
    const result = replaceInner(url.pathname, document.querySelector('main'));
    if (!result) {
      // eslint-disable-next-line no-console
      console.debug(`failed to serve campaign ${campaign}. Falling back to default content.`);
    }
    document.body.classList.add(`campaign-${campaign}`);
    context.sampleRUM('campaign', {
      source: window.location.href,
      target: result ? campaign : 'default',
    });
    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
}

async function serveAudience(document, options, context) {
  if (isBot()) {
    return false;
  }

  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  const configuredAudiences = context.getAllMetadata(pluginOptions.audiencesMetaTagPrefix);
  if (!Object.keys(configuredAudiences).length) {
    return false;
  }

  const audiences = await getResolvedAudiences(
    Object.keys(configuredAudiences),
    pluginOptions,
    context,
  );
  if (!audiences || !audiences.length) {
    return false;
  }

  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(pluginOptions.audiencesQueryParameter)
    ? context.toClassName(usp.get(pluginOptions.audiencesQueryParameter))
    : null;

  const urlString = configuredAudiences[forcedAudience || audiences[0]];
  if (!urlString) {
    return false;
  }

  try {
    const url = new URL(urlString);
    const result = replaceInner(url.pathname, document.querySelector('main'));
    if (!result) {
      // eslint-disable-next-line no-console
      console.debug(`failed to serve audience ${forcedAudience || audiences[0]}. Falling back to default content.`);
    }
    document.body.classList.add(audiences.map((audience) => `audience-${audience}`));
    context.sampleRUM('audiences', {
      source: window.location.href,
      target: result ? forcedAudience || audiences.join(',') : 'default',
    });
    return result;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
}

/*
window.hlx.patchBlockConfig.push((config) => {
  const { experiment } = window.hlx;

  // No experiment is running
  if (!experiment || !experiment.run) {
    return config;
  }

  // The current experiment does not modify the block
  if (experiment.selectedVariant === experiment.variantNames[0]
    || !experiment.variants[experiment.variantNames[0]].blocks
    || !experiment.variants[experiment.variantNames[0]].blocks.includes(config.blockName)) {
    return config;
  }

  // The current experiment does not modify the block code
  const variant = experiment.variants[experiment.selectedVariant];
  if (!variant.blocks.length) {
    return config;
  }

  let index = experiment.variants[experiment.variantNames[0]].blocks.indexOf('');
  if (index < 0) {
    index = experiment.variants[experiment.variantNames[0]].blocks.indexOf(config.blockName);
  }
  if (index < 0) {
    index = experiment.variants[experiment.variantNames[0]].blocks.indexOf(`/blocks/${config.blockName}`);
  }
  if (index < 0) {
    return config;
  }

  let origin = '';
  let path;
  if (/^https?:\/\//.test(variant.blocks[index])) {
    const url = new URL(variant.blocks[index]);
    // Experimenting from a different branch
    if (url.origin !== window.location.origin) {
      origin = url.origin;
    }
    // Experimenting from a block path
    if (url.pathname !== '/') {
      path = url.pathname;
    } else {
      path = `/blocks/${config.blockName}`;
    }
  } else { // Experimenting from a different branch on the same branch
    path = `/blocks/${variant.blocks[index]}`;
  }
  if (!origin && !path) {
    return config;
  }

  const { codeBasePath } = window.hlx;
  return {
    ...config,
    cssPath: `${origin}${codeBasePath}${path}/${config.blockName}.css`,
    jsPath: `${origin}${codeBasePath}${path}/${config.blockName}.js`,
  };
});
*/

let isAdjusted = false;
function adjustedRumSamplingRate(checkpoint, options, context) {
  const pluginOptions = { ...DEFAULT_OPTIONS, ...(options || {}) };
  return (data) => {
    if (!window.hlx.rum.isSelected && !isAdjusted) {
      isAdjusted = true;
      // adjust sampling rate based on project config …
      window.hlx.rum.weight = Math.min(
        window.hlx.rum.weight,
        // … but limit it to the 10% sampling at max to avoid losing anonymization
        // and reduce burden on the backend
        Math.max(pluginOptions.rumSamplingRate, MAX_SAMPLING_RATE),
      );
      window.hlx.rum.isSelected = (window.hlx.rum.random * window.hlx.rum.weight < 1);
      if (window.hlx.rum.isSelected) {
        context.sampleRUM(checkpoint, data);
      }
    }
    return true;
  };
}

async function loadEager(document, options, context) {
  context.sampleRUM.always.on('audiences', adjustedRumSamplingRate('audiences', options, context));
  context.sampleRUM.always.on('campaign', adjustedRumSamplingRate('campaign', options, context));
  context.sampleRUM.always.on('experiment', adjustedRumSamplingRate('experiment', options, context));
  let res = await runCampaign(document, options, context);
  if (!res) {
    res = await runExperiment(document, options, context);
  }
  if (!res) {
    res = await serveAudience(document, options, context);
  }
}

async function loadLazy(document, options, context) {
  const pluginOptions = {
    ...DEFAULT_OPTIONS,
    ...(options || {}),
  };
  if (window.location.hostname.endsWith('hlx.page')
    || window.location.hostname === ('localhost')
    || (typeof options.isProd === 'function' && !options.isProd())) {
    // eslint-disable-next-line import/no-cycle
    const preview = await Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./preview.js */ "./plugins/experimentation/src/preview.js"));
    preview.default(document, pluginOptions, { ...context, getResolvedAudiences });
  }
}


/***/ }),

/***/ "./plugins/experimentation/src/preview.js":
/*!************************************************!*\
  !*** ./plugins/experimentation/src/preview.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ decoratePreviewMode)
/* harmony export */ });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function createPreviewOverlay(cls) {
  const overlay = document.createElement('div');
  overlay.className = cls;
  return overlay;
}

function createButton(label) {
  const button = document.createElement('button');
  button.className = 'hlx-badge';
  const text = document.createElement('span');
  text.innerHTML = label;
  button.append(text);
  return button;
}

function createPopupItem(item) {
  const actions = typeof item === 'object'
    ? item.actions.map((action) => `<div class="hlx-button"><a href="${action.href}">${action.label}</a></div>`)
    : [];
  const div = document.createElement('div');
  div.className = `hlx-popup-item${item.isSelected ? ' is-selected' : ''}`;
  div.innerHTML = `
    <h5 class="hlx-popup-item-label">${typeof item === 'object' ? item.label : item}</h5>
    ${item.description ? `<div class="hlx-popup-item-description">${item.description}</div>` : ''}
    ${actions.length ? `<div class="hlx-popup-item-actions">${actions}</div>` : ''}`;
  return div;
}

function createPopupDialog(header, items = []) {
  const actions = typeof header === 'object'
    ? (header.actions || []).map((action) => `<div class="hlx-button"><a href="${action.href}">${action.label}</a></div>`)
    : [];
  const popup = document.createElement('div');
  popup.className = 'hlx-popup hlx-hidden';
  popup.innerHTML = `
    <div class="hlx-popup-header">
      <h5 class="hlx-popup-header-label">${typeof header === 'object' ? header.label : header}</h5>
      ${header.description ? `<div class="hlx-popup-header-description">${header.description}</div>` : ''}
      ${actions.length ? `<div class="hlx-popup-header-actions">${actions}</div>` : ''}
    </div>
    <div class="hlx-popup-items"></div>`;
  const list = popup.querySelector('.hlx-popup-items');
  items.forEach((item) => {
    list.append(createPopupItem(item));
  });
  return popup;
}

function createPopupButton(label, header, items) {
  const button = createButton(label);
  const popup = createPopupDialog(header, items);
  button.innerHTML += '<span class="hlx-open"></span>';
  button.append(popup);
  button.addEventListener('click', () => {
    popup.classList.toggle('hlx-hidden');
  });
  return button;
}

// eslint-disable-next-line no-unused-vars
function createToggleButton(label) {
  const button = document.createElement('div');
  button.className = 'hlx-badge';
  button.role = 'button';
  button.setAttribute('aria-pressed', false);
  button.setAttribute('tabindex', 0);
  const text = document.createElement('span');
  text.innerHTML = label;
  button.append(text);
  button.addEventListener('click', () => {
    button.setAttribute('aria-pressed', button.getAttribute('aria-pressed') === 'false');
  });
  return button;
}

function getOverlay() {
  let overlay = document.querySelector('.hlx-preview-overlay');
  if (!overlay) {
    overlay = createPreviewOverlay('hlx-preview-overlay');
    document.body.append(overlay);
  }
  return overlay;
}

const percentformat = new Intl.NumberFormat('en-US', { style: 'percent', maximumSignificantDigits: 2 });
const countformat = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 2 });
const significanceformat = {
  format: (value) => {
    if (value < 0.005) {
      return 'highly significant';
    }
    if (value < 0.05) {
      return 'significant';
    }
    if (value < 0.1) {
      return 'marginally significant';
    }
    return 'not significant';
  },
};
const bigcountformat = {
  format: (value) => {
    if (value > 1000000) {
      return `${countformat.format(value / 1000000)}M`;
    }
    if (value > 1000) {
      return `${countformat.format(value / 1000)}K`;
    }
    return countformat.format(value);
  },
};

function createVariant(experiment, variantName, config, options) {
  const selectedVariant = config?.selectedVariant || config?.variantNames[0];
  const variant = config.variants[variantName];
  const split = variant.percentageSplit;
  const percentage = percentformat.format(split);

  const experimentURL = new URL(window.location.href);
  // this will retain other query params such as ?rum=on
  experimentURL.searchParams.set(options.experimentsQueryParameter, `${experiment}/${variantName}`);

  return {
    label: `<code>${variantName}</code>`,
    description: `
      <p>${variant.label}</p>
      <p class="percentage">(${percentage} split)</p>
      <p class="performance"></p>`,
    actions: [{ label: 'Simulate', href: experimentURL.href }],
    isSelected: selectedVariant === variantName,
  };
}

async function fetchRumData(experiment, options) {
  // the query is a bit slow, so I'm only fetching the results when the popup is opened
  const resultsURL = new URL('https://helix-pages.anywhere.run/helix-services/run-query@v2/rum-experiments');
  resultsURL.searchParams.set(options.experimentsQueryParameter, experiment);
  if (window.hlx.sidekickConfig && window.hlx.sidekickConfig.host) {
    // restrict results to the production host, this also reduces query cost
    resultsURL.searchParams.set('domain', window.hlx.sidekickConfig.host);
  }

  const response = await fetch(resultsURL.href);
  if (!response.ok) {
    return null;
  }

  const { results } = await response.json();
  if (!results.length) {
    return null;
  }

  const numberify = (obj) => Object.entries(obj).reduce((o, [k, v]) => {
    o[k] = Number.parseFloat(v);
    o[k] = Number.isNaN(o[k]) ? v : o[k];
    return o;
  }, {});

  const variantsAsNums = results.map(numberify);
  const totals = Object.entries(
    variantsAsNums.reduce((o, v) => {
      Object.entries(v).forEach(([k, val]) => {
        if (typeof val === 'number' && Number.isInteger(val) && k.startsWith('variant_')) {
          o[k] = (o[k] || 0) + val;
        } else if (typeof val === 'number' && Number.isInteger(val) && k.startsWith('control_')) {
          o[k] = val;
        }
      });
      return o;
    }, {}),
  ).reduce((o, [k, v]) => {
    o[k] = v;
    const vkey = k.replace(/^(variant|control)_/, 'variant_');
    const ckey = k.replace(/^(variant|control)_/, 'control_');
    const tkey = k.replace(/^(variant|control)_/, 'total_');
    if (o[ckey] && o[vkey]) {
      o[tkey] = o[ckey] + o[vkey];
    }
    return o;
  }, {});
  const richVariants = variantsAsNums
    .map((v) => ({
      ...v,
      allocation_rate: v.variant_experimentations / totals.total_experimentations,
    }))
    .reduce((o, v) => {
      const variantName = v.variant;
      o[variantName] = v;
      return o;
    }, {
      control: {
        variant: 'control',
        ...Object.entries(variantsAsNums[0]).reduce((k, v) => {
          const [key, val] = v;
          if (key.startsWith('control_')) {
            k[key.replace(/^control_/, 'variant_')] = val;
          }
          return k;
        }, {}),
      },
    });
  const winner = variantsAsNums.reduce((w, v) => {
    if (v.variant_conversion_rate > w.conversion_rate && v.p_value < 0.05) {
      w.conversion_rate = v.variant_conversion_rate;
      w.p_value = v.p_value;
      w.variant = v.variant;
    }
    return w;
  }, { variant: 'control', p_value: 1, conversion_rate: 0 });

  return {
    richVariants,
    totals,
    variantsAsNums,
    winner,
  };
}

function populatePerformanceMetrics(div, config, {
  richVariants, totals, variantsAsNums, winner,
}) {
  // add summary
  const summary = div.querySelector('.hlx-info');
  summary.innerHTML = `Showing results for ${bigcountformat.format(totals.total_experimentations)} visits and ${bigcountformat.format(totals.total_conversions)} conversions: `;
  if (totals.total_conversion_events < 500 && winner.p_value > 0.05) {
    summary.innerHTML += ` not yet enough data to determine a winner. Keep going until you get ${bigcountformat.format((500 * totals.total_experimentations) / totals.total_conversion_events)} visits.`;
  } else if (winner.p_value > 0.05) {
    summary.innerHTML += ' no significant difference between variants. In doubt, stick with <code>control</code>.';
  } else if (winner.variant === 'control') {
    summary.innerHTML += ' Stick with <code>control</code>. No variant is better than the control.';
  } else {
    summary.innerHTML += ` <code>${winner.variant}</code> is the winner.`;
  }

  // add traffic allocation to control and each variant
  config.variantNames.forEach((variantName, index) => {
    const variantDiv = document.querySelectorAll('.hlx-popup-item')[index];
    const percentage = variantDiv.querySelector('.percentage');
    percentage.innerHTML = `
      <span title="${countformat.format(richVariants[variantName].variant_conversion_events)} real events">${bigcountformat.format(richVariants[variantName].variant_conversions)} clicks</span> /
      <span title="${countformat.format(richVariants[variantName].variant_experimentation_events)} real events">${bigcountformat.format(richVariants[variantName].variant_experimentations)} visits</span>
      <span>(${percentformat.format(richVariants[variantName].variant_experimentations / totals.total_experimentations)} split)</span>
    `;
  });

  // add click rate and significance to each variant
  variantsAsNums.forEach((result) => {
    const variant = document.querySelectorAll('.hlx-popup-item')[config.variantNames.indexOf(result.variant)];
    if (variant) {
      const performance = variant.querySelector('.performance');
      performance.innerHTML = `
        <span>click rate: ${percentformat.format(result.variant_conversion_rate)}</span>
        <span>vs. ${percentformat.format(result.control_conversion_rate)}</span>
        <span title="p value: ${result.p_value}" class="significance ${significanceformat.format(result.p_value).replace(/ /, '-')}">${significanceformat.format(result.p_value)}</span>
      `;
    }
  });
}

/**
 * Create Badge if a Page is enlisted in a AEM Experiment
 * @return {Object} returns a badge or empty string
 */
async function decorateExperimentPill(overlay, options, context) {
  const config = window?.hlx?.experiment;
  const experiment = context.toClassName(context.getMetadata(options.experimentsMetaTag));
  if (!experiment || !config) {
    return;
  }
  // eslint-disable-next-line no-console
  console.log('preview experiment', experiment);

  const pill = createPopupButton(
    `Experiment: ${config.id}`,
    {
      label: config.label,
      description: `
        <div class="hlx-details">
          ${config.status}
          ${config.resolvedAudiences ? ', ' : ''}
          ${config.resolvedAudiences && config.resolvedAudiences.length ? config.resolvedAudiences[0] : ''}
          ${config.resolvedAudiences && !config.resolvedAudiences.length ? 'No audience resolved' : ''}
          ${config.variants[config.variantNames[0]].blocks.length ? ', Blocks: ' : ''}
          ${config.variants[config.variantNames[0]].blocks.join(',')}
        </div>
        <div class="hlx-info">How is it going?</div>`,
      actions: config.manifest ? [{ label: 'Manifest', href: config.manifest }] : [],
    },
    config.variantNames.map((vname) => createVariant(experiment, vname, config, options)),
  );
  pill.classList.add(`is-${context.toClassName(config.status)}`);
  overlay.append(pill);

  const performanceMetrics = await fetchRumData(experiment, options);
  if (performanceMetrics === null) {
    return;
  }
  populatePerformanceMetrics(pill, config, performanceMetrics);
}

function createCampaign(campaign, isSelected, options) {
  const url = new URL(window.location.href);
  if (campaign !== 'default') {
    url.searchParams.set(options.campaignsQueryParameter, campaign);
  } else {
    url.searchParams.delete(options.campaignsQueryParameter);
  }

  return {
    label: `<code>${campaign}</code>`,
    actions: [{ label: 'Simulate', href: url.href }],
    isSelected,
  };
}

/**
 * Create Badge if a Page is enlisted in a AEM Campaign
 * @return {Object} returns a badge or empty string
 */
async function decorateCampaignPill(overlay, options, context) {
  const campaigns = context.getAllMetadata(options.campaignsMetaTagPrefix);
  if (!Object.keys(campaigns).length) {
    return;
  }

  const usp = new URLSearchParams(window.location.search);
  const forcedAudience = usp.has(options.audiencesQueryParameter)
    ? context.toClassName(usp.get(options.audiencesQueryParameter))
    : null;
  const audiences = campaigns.audience?.split(',').map(context.toClassName) || [];
  const resolvedAudiences = await context.getResolvedAudiences(audiences, options);
  const isActive = forcedAudience
    ? audiences.includes(forcedAudience)
    : (!resolvedAudiences || !!resolvedAudiences.length);
  const campaign = (usp.has(options.campaignsQueryParameter)
    ? context.toClassName(usp.get(options.campaignsQueryParameter))
    : null)
    || (usp.has('utm_campaign') ? context.toClassName(usp.get('utm_campaign')) : null);
  const pill = createPopupButton(
    `Campaign: ${campaign || 'default'}`,
    {
      label: 'Campaigns on this page:',
      description: `
        <div class="hlx-details">
          ${audiences.length && resolvedAudiences?.length ? `Audience: ${resolvedAudiences[0]}` : ''}
          ${audiences.length && !resolvedAudiences?.length ? 'No audience resolved' : ''}
          ${!audiences.length || !resolvedAudiences ? 'No audience configured' : ''}
        </div>`,
    },
    [
      createCampaign('default', !campaign || !isActive, options),
      ...Object.keys(campaigns)
        .filter((c) => c !== 'audience')
        .map((c) => createCampaign(c, isActive && context.toClassName(campaign) === c, options)),
    ],
  );

  if (campaign && isActive) {
    pill.classList.add('is-active');
  }
  overlay.append(pill);
}

function createAudience(audience, isSelected, options) {
  const url = new URL(window.location.href);
  url.searchParams.set(options.audiencesQueryParameter, audience);

  return {
    label: `<code>${audience}</code>`,
    actions: [{ label: 'Simulate', href: url.href }],
    isSelected,
  };
}

/**
 * Create Badge if a Page is enlisted in a AEM Audiences
 * @return {Object} returns a badge or empty string
 */
async function decorateAudiencesPill(overlay, options, context) {
  const audiences = context.getAllMetadata(options.audiencesMetaTagPrefix);
  if (!Object.keys(audiences).length || !Object.keys(options.audiences).length) {
    return;
  }

  const resolvedAudiences = await context.getResolvedAudiences(
    Object.keys(audiences),
    options,
    context,
  );
  const pill = createPopupButton(
    'Audiences',
    {
      label: 'Audiences for this page:',
    },
    [
      createAudience('default', !resolvedAudiences.length || resolvedAudiences[0] === 'default', options),
      ...Object.keys(audiences)
        .filter((a) => a !== 'audience')
        .map((a) => createAudience(a, resolvedAudiences && resolvedAudiences[0] === a, options)),
    ],
  );

  if (resolvedAudiences.length) {
    pill.classList.add('is-active');
  }
  overlay.append(pill);
}

/**
 * Decorates Preview mode badges and overlays
 * @return {Object} returns a badge or empty string
 */
async function decoratePreviewMode(document, options, context) {
  try {
    context.loadCSS(`${options.basePath || window.hlx.codeBasePath}/plugins/experimentation/src/preview.css`);
    const overlay = getOverlay(options);
    await decorateAudiencesPill(overlay, options, context);
    await decorateCampaignPill(overlay, options, context);
    await decorateExperimentPill(overlay, options, context);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}


/***/ }),

/***/ "./plugins/experimentation/src/ued.js":
/*!********************************************!*\
  !*** ./plugins/experimentation/src/ued.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ued: () => (/* binding */ ued)
/* harmony export */ });
/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

var storage = window.sessionStorage;

function murmurhash3_32_gc(key, seed) {
  var remainder = key.length & 3;
  var bytes = key.length - remainder;
  var c1 = 0xcc9e2d51;
  var c2 = 0x1b873593;
  var h1 = seed;
  var k1;
  var h1b;
  var i = 0;
  while (i < bytes) {
      k1 =
          ((key.charCodeAt(i) & 0xff)) |
              ((key.charCodeAt(++i) & 0xff) << 8) |
              ((key.charCodeAt(++i) & 0xff) << 16) |
              ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;
      k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
      h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }
  k1 = 0;
  switch (remainder) {
      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
          k1 ^= (key.charCodeAt(i) & 0xff);
          k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
          k1 = (k1 << 15) | (k1 >>> 17);
          k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
          h1 ^= k1;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
}

var TOTAL_BUCKETS = 10000;
function getBucket(saltedId) {
  var hash = murmurhash3_32_gc(saltedId, 0);
  var hashFixedBucket = Math.abs(hash) % TOTAL_BUCKETS;
  var bucket = hashFixedBucket / TOTAL_BUCKETS;
  return bucket;
}
function pickWithWeightsBucket(allocationPercentages, treatments, bucket) {
  var sum = allocationPercentages.reduce(function (partialSum, a) { return partialSum + a; }, 0);
  var partialSum = 0.0;
  for (var i = 0; i < treatments.length; i++) {
      partialSum += Number(allocationPercentages[i].toFixed(2)) / sum;
      if (bucket > partialSum) {
          continue;
      }
      return treatments[i];
  }
}
function assignTreatmentByVisitor(experimentid, identityId, allocationPercentages, treatments) {
  var saltedId = experimentid + '.' + identityId;
  var bucketId = getBucket(saltedId);
  var treatmentId = pickWithWeightsBucket(allocationPercentages, treatments, bucketId);
  return {
      treatmentId: treatmentId,
      bucketId: bucketId
  };
}

var LOCAL_STORAGE_KEY = 'unified-decisioning-experiments';
function assignTreatment(allocationPercentages, treatments) {
  var random = Math.random() * 100;
  var i = treatments.length;
  while (random > 0 && i > 0) {
      i -= 1;
      random -= +allocationPercentages[i];
  }
  return treatments[i];
}
function getLastExperimentTreatment(experimentId) {
  var experimentsStr = storage.getItem(LOCAL_STORAGE_KEY);
  if (experimentsStr) {
      var experiments = JSON.parse(experimentsStr);
      if (experiments[experimentId]) {
          return experiments[experimentId].treatment;
      }
  }
  return null;
}
function setLastExperimentTreatment(experimentId, treatment) {
  var experimentsStr = storage.getItem(LOCAL_STORAGE_KEY);
  var experiments = experimentsStr ? JSON.parse(experimentsStr) : {};
  var now = new Date();
  var expKeys = Object.keys(experiments);
  expKeys.forEach(function (key) {
      var date = new Date(experiments[key].date);
      if ((now.getTime() - date.getTime()) > (1000 * 86400 * 30)) {
          delete experiments[key];
      }
  });
  var date = now.toISOString().split('T')[0];
  experiments[experimentId] = { treatment: treatment, date: date };
  storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(experiments));
}
function assignTreatmentByDevice(experimentId, allocationPercentages, treatments) {
  var cachedTreatmentId = getLastExperimentTreatment(experimentId);
  var treatmentIdResponse;
  if (!cachedTreatmentId || !treatments.includes(cachedTreatmentId)) {
      var assignedTreatmentId = assignTreatment(allocationPercentages, treatments);
      setLastExperimentTreatment(experimentId, assignedTreatmentId);
      treatmentIdResponse = assignedTreatmentId;
  }
  else {
      treatmentIdResponse = cachedTreatmentId;
  }
  return {
      treatmentId: treatmentIdResponse
  };
}

var RandomizationUnit = {
  VISITOR: 'VISITOR',
  DEVICE: 'DEVICE'
};
function evaluateExperiment(context, experiment) {
  var experimentId = experiment.id, identityNamespace = experiment.identityNamespace, _a = experiment.randomizationUnit, randomizationUnit = _a === void 0 ? RandomizationUnit.VISITOR : _a;
  var identityMap = context.identityMap;
  var treatments = experiment.treatments.map(function (item) { return item.id; });
  var allocationPercentages = experiment.treatments.map(function (item) { return item.allocationPercentage; });
  var treatmentAssignment = null;
  switch (randomizationUnit) {
      case RandomizationUnit.VISITOR: {
          var identityId = identityMap[identityNamespace][0].id;
          treatmentAssignment = assignTreatmentByVisitor(experimentId, identityId, allocationPercentages, treatments);
          break;
      }
      case RandomizationUnit.DEVICE: {
          treatmentAssignment = assignTreatmentByDevice(experimentId, allocationPercentages, treatments);
          break;
      }
      default:
          throw new Error("Unknow randomization unit");
  }
  var evaluationResponse = {
      experimentId: experimentId,
      hashedBucket: treatmentAssignment.bucketId,
      treatment: {
          id: treatmentAssignment.treatmentId
      }
  };
  return evaluationResponse;
}

function traverseDecisionTree(decisionNodesMap, context, currentNodeId) {
  var _a = decisionNodesMap[currentNodeId], experiment = _a.experiment, type = _a.type;
  if (type === 'EXPERIMENTATION') {
      var treatment = evaluateExperiment(context, experiment).treatment;
      return [treatment];
  }
}
function evaluateDecisionPolicy(decisionPolicy, context) {
  if (context.storage && context.storage instanceof Storage) {
    storage = context.storage;
  }
  var decisionNodesMap = {};
  decisionPolicy.decisionNodes.forEach(function (item) {
      decisionNodesMap[item['id']] = item;
  });
  var items = traverseDecisionTree(decisionNodesMap, context, decisionPolicy.rootDecisionNodeId);
  return {
      items: items
  };
}

const ued = { evaluateDecisionPolicy };


/***/ }),

/***/ "./plugins/rum-conversion/src/index.js":
/*!*********************************************!*\
  !*** ./plugins/rum-conversion/src/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initConversionTracking: () => (/* binding */ initConversionTracking),
/* harmony export */   loadLazy: () => (/* binding */ loadLazy)
/* harmony export */ });
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const { sampleRUM } = window.hlx.rum;

/**
* Registers the 'convert' function to `sampleRUM` which sends
* variant and convert events upon conversion.
* The function will register a listener for an element if listenTo parameter is provided.
* listenTo supports 'submit' and 'click'.
* If listenTo is not provided, the information is used to track a conversion event.
*/
sampleRUM.drain('convert', (cevent, cvalueThunk, element, listenTo = []) => {
  async function trackConversion(celement) {
    try {
      // send conversion event
      const cvalue = typeof cvalueThunk === 'function' ? await cvalueThunk(element) : cvalueThunk;
      const data = { source: cevent, target: cvalue, element: celement };
      sampleRUM('convert', data);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error reading experiments', e);
    }
  }

  function registerConversionListener(elements) {
    // if elements is an array or nodelist, register a conversion event for each element
    if (Array.isArray(elements) || elements instanceof NodeList) {
      elements.forEach((e) => registerConversionListener(e, listenTo, cevent, cvalueThunk));
    } else {
      // add data attribute to elements tracked in preview
      if (window.location.hostname === 'localhost' || window.location.hostname.endsWith('.hlx.page')) {
        element.dataset.conversionTracking = true;
      }
      listenTo.forEach((eventName) => element.addEventListener(
        eventName,
        (e) => trackConversion(e.target),
      ));
    }
  }

  if (element && listenTo.length) {
    registerConversionListener(element, listenTo, cevent, cvalueThunk);
  } else {
    trackConversion(element, cevent, cvalueThunk);
  }
});

/**
 * Returns the label used for tracking link clicks
 * @param {Element} element link element
 * @returns link label used for tracking converstion
 */
function getLinkLabel({ toClassName }, element) {
  return element.title ? toClassName(element.title) : toClassName(element.textContent);
}

function getConversionNameMetadata({ getMetadata }, element) {
  const text = element.title || element.textContent;
  return getMetadata(`conversion-name--${text.toLowerCase().replace(/[^0-9a-z]/gi, '-')}-`);
}

function findConversionValue(parent, fieldName) {
  // Try to find the element by Id or Name
  const valueElement = document.getElementById(fieldName) || parent.querySelector(`[name='${fieldName}']`);
  if (valueElement) {
    return valueElement.value;
  }
  // Find the element by the inner text of the label
  return Array.from(parent.getElementsByTagName('label'))
    .filter((l) => l.textContent.trim().toLowerCase() === fieldName.toLowerCase())
    .map((label) => document.getElementById(label.htmlFor))
    .filter((field) => !!field)
    .map((field) => field.value)
    .pop();
}

/**
 * Registers conversion listeners according to the metadata configured in the document.
 * @param {Element} parent element where to find potential event conversion sources
 * @param {string} defaultFormConversionName In case of form conversions, default
 * name for the conversion in case there is no conversion name defined
 * in the document or section metadata. If the form is defined in a fragment
 * this is typically the path to the fragment.
 * The parameter is optional, if no value is passed, and conversion
 * name is not defined in the document or section metadata,
 * the id of the HTML form element will be used as conversion name
 */
// eslint-disable-next-line import/prefer-default-export
async function initCTInternal(context, parent = document, defaultFormConversionName = '') {
  const { toClassName, getMetadata } = context;
  const conversionElements = {
    form: () => {
      // Track all forms
      parent.querySelectorAll('form').forEach((element) => {
        const section = element.closest('div.section');
        if (section.dataset.conversionValueField) {
          const cvField = section.dataset.conversionValueField.trim();
          // this will track the value of the element with the id specified in
          // the "Conversion Element" field.
          // ideally, this should not be an ID, but the case-insensitive name label of the element.
          sampleRUM.convert(undefined, (cvParent) => findConversionValue(cvParent, cvField), element, ['submit']);
        }
        let formConversionName = section.dataset.conversionName || getMetadata('conversion-name');
        if (!formConversionName) {
          // if no conversion name is defined in the metadata,
          // use the conversion name passed as parameter or the form or id
          formConversionName = defaultFormConversionName
            ? toClassName(defaultFormConversionName) : element.id;
        }
        sampleRUM.convert(formConversionName, undefined, element, ['submit']);
      });
    },
    link: () => {
      // track all links
      Array.from(parent.querySelectorAll('a[href]'))
        .map((element) => ({
          element,
          cevent: getConversionNameMetadata(context, element) || getMetadata('conversion-name') || getLinkLabel(context, element),
        }))
        .forEach(({ element, cevent }) => {
          sampleRUM.convert(cevent, undefined, element, ['click']);
        });
    },
    'labeled-link': () => {
      // track only the links configured in the metadata
      const linkLabels = getMetadata('conversion-link-labels') || '';
      const trackedLabels = linkLabels.split(',')
        .map((p) => p.trim())
        .map(toClassName);

      Array.from(parent.querySelectorAll('a[href]'))
        .filter((element) => trackedLabels.includes(getLinkLabel(context, element)))
        .map((element) => ({
          element,
          cevent: getConversionNameMetadata(context, element) || getMetadata('conversion-name') || getLinkLabel(context, element),
        }))
        .forEach(({ element, cevent }) => {
          sampleRUM.convert(cevent, undefined, element, ['click']);
        });
    },
  };
  const declaredConversionElements = getMetadata('conversion-element') ? getMetadata('conversion-element').split(',').map((ce) => toClassName(ce.trim())) : [];

  Object.keys(conversionElements)
    .filter((ce) => declaredConversionElements.includes(ce))
    .forEach((cefn) => conversionElements[cefn]());
}

// for backwards compatibility. Keep support for initConversionTracking.call(...) invocation
// where the context is passed as first parameter and made available in the "this" object.
async function initConversionTracking(parent = document, defaultFormConversionName = '') {
  initCTInternal(this, parent, defaultFormConversionName);
}

// Add support for Plugin system
/**
 * Load the martech configured as non-delayed
 * @param {*} context should contain at lease sampleRUM object and toCamelCase function
 */
async function loadLazy(document, pluginOptions, context) {
  initCTInternal(context, document);
}


/***/ }),

/***/ "./plugins eager recursive ^\\.\\/.*\\/src\\/index\\.js$":
/*!******************************************************************!*\
  !*** ./plugins/ eager ^\.\/.*\/src\/index\.js$ namespace object ***!
  \******************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./experimentation/src/index.js": "./plugins/experimentation/src/index.js",
	"./rum-conversion/src/index.js": "./plugins/rum-conversion/src/index.js"
};


function webpackAsyncContext(req) {
	return webpackAsyncContextResolve(req).then(__webpack_require__);
}
function webpackAsyncContextResolve(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		if(!__webpack_require__.o(map, req)) {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		}
		return map[req];
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.resolve = webpackAsyncContextResolve;
webpackAsyncContext.id = "./plugins eager recursive ^\\.\\/.*\\/src\\/index\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./scripts/delayed.js":
/*!****************************!*\
  !*** ./scripts/delayed.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib-franklin.js */ "./scripts/lib-franklin.js");
// eslint-disable-next-line import/no-cycle


document.dispatchEvent(new Event('franklin.delayed_begin'));

// Fathom Analytics Code
async function loadScriptFa(src, attrs) {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`head > script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      if (attrs) {
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
      }
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Script load error'));
      document.head.append(script);
    } else {
      resolve();
    }
  });
}

const attrsFa = { 'data-site': 'MTMDHVUG' };
loadScriptFa('https://cdn.usefathom.com/script.js', attrsFa);

// Core Web Vitals RUM collection
(0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('cwv');

// add more delayed functionality here
try {
  await (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.fetchPlaceholders)();
} catch (error) { /* empty */ }

document.dispatchEvent(new Event('franklin.delayed_completed'));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ "./scripts/lib-carousel.js":
/*!*********************************!*\
  !*** ./scripts/lib-carousel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Carousel)
/* harmony export */ });
/** @module lib-carousel2 */

/**
 * Slider duration in milliseconds for auto-advance.
 * @type {number}
 */
const SLIDER_INTERVAL = 3500;

// HTML code for arrow icons
const HTML_ARROW_LEFT = '<svg fill="rgb(217, 217, 217)" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 600 600">\n'
  + '<path d="M97.141,225.92c0-8.095,3.091-16.192,9.259-22.366L300.689,9.27c12.359-12.359,32.397-12.359,44.751,0c12.354,12.354,12.354,32.388,0,44.748L173.525,225.92l171.903,171.909c12.354,12.354,12.354,32.391,0,44.744c-12.354,12.365-32.386,12.365-44.745,0l-194.29-194.281C100.226,242.115,97.141,234.018,97.141,225.92z"/>\n'
  + '</svg>';
const HTML_ARROW_RIGHT = '<svg fill="rgb(217, 217, 217)" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 600 600">\n'
  + '<path d="M345.441,248.292L151.154,442.573c-12.359,12.365-32.397,12.365-44.75,0c-12.354-12.354-12.354-32.391,0-44.744L278.318,225.92L106.409,54.017c-12.354-12.359-12.354-32.394,0-44.748c12.354-12.359,32.391-12.359,44.75,0l194.287,194.284c6.177,6.18,9.262,14.271,9.262,22.366C354.708,234.018,351.617,242.115,345.441,248.292z"/>\n'
  + '</svg>\n';

/**
 * add attributes stored in key-value object to an element
 * @param el
 * @param attributes
 */
const addAttributes = (el, attributes) => {
  Object.keys(attributes).forEach((key) => {
    el.setAttribute(key, attributes[key]);
  });
};

/**
 *
 * @param sliderContainer - DOM element where carousel will be inserted
 * @constructor
 */
function Carousel(sliderContainer) {
  const self = {
    carouselId: null,
    slideShow: false,
    slideCount: 0,
    activeSlide: 1,
    activeSlideElement: null,
    touchStartX: 0,
    touchEndX: 0,
    touchRelX: 0,
    touchStartY: 0,
    touchEndY: 0,
    touchRelY: 0,
    elementStartX: 0,
    sliderWrapper: null,
    slider: null,
    sliderChildren: null,
    sliderIds: [],
    dottedNavContainer: null,
    dottedNavChildren: null,
    arrowNavContainer: null,
    htmlArrowLeft: HTML_ARROW_LEFT,
    htmlArrowRight: HTML_ARROW_RIGHT,
    sliderInterval: SLIDER_INTERVAL,
    /**
     * Initialize the carousel
     */
    init() {
      self.carouselId = `carousel-${Math.floor(Math.random() * 1000000)}`;
      sliderContainer.setAttribute('id', self.carouselId);
      sliderContainer.classList.add('slider-wrapper');
      self.sliderWrapper = sliderContainer;
    },
    /**
     * Create a slider from a container element
     * @param container - default is self.sliderWrapper
     */
    createSlideSlider(container = self.sliderWrapper) {
      const existingDivs = container.children;
      const sliderDiv = document.createElement('div');
      if (existingDivs.length === 0) return;
      [...existingDivs].forEach((div) => {
        sliderDiv.appendChild(div);
      });
      sliderDiv.classList.add('slider');
      self.sliderWrapper.appendChild(sliderDiv);
      self.slider = sliderDiv;
      self.sliderChildren = Array.from(sliderDiv.children);
    },
    /**
     * Create a picture only slider from a container element
     * @param sliderWrapper - default is self.sliderWrapper
     */
    createPictureSlider(sliderWrapper = self.sliderWrapper) {
      const pictures = sliderWrapper.getElementsByTagName('picture');
      if (pictures.length === 0) return;
      const slider = document.createElement('div');
      slider.classList.add('slider');
      [...pictures].forEach((el) => {
        slider.appendChild(el);
      });
      sliderWrapper.innerHTML = '';
      sliderWrapper.appendChild(slider);
      const sliderAttributes = {
        id: 'carousel',
        role: 'group',
        'aria-label': 'Slider Carousel',
      };
      addAttributes(slider, sliderAttributes);
      self.sliderChildren = Array.from(slider.children);
    },
    /**
     * Change left and right arrow HTML if other than default arrows are required
     * @param leftHtml
     * @param rightHtml
     */
    setLeftAndRightArrowHtml(leftHtml, rightHtml) {
      self.htmlArrowLeft = leftHtml;
      self.htmlArrowRight = rightHtml;
    },
    /**
     * Create arrow navigation
     * @param container - default is self.sliderWrapper
     */
    createArrowNav(container = self.sliderWrapper) {
      const arrowNavContainer = document.createElement('div');
      arrowNavContainer.classList.add('arrow-nav');
      const arrowLeft = `
        <button id="slider-arrow-left"
                aria-label="Previous Slide">
          ${self.htmlArrowLeft}
        </button>
        `;
      const arrowRight = `
        <button id="slider-arrow-right"
                aria-label="Next Slide"
                role="button">
          ${self.htmlArrowRight}
        </button>
        `;
      arrowNavContainer.innerHTML = arrowLeft + arrowRight;
      container.appendChild(arrowNavContainer);
      self.arrowNavContainer = arrowNavContainer;
    },
    /**
     * Change Slider Interval if required
     * @param interval
     */
    setSliderInterval(interval) {
      self.sliderInterval = interval;
    },
    /**
     * Create dotted navigation
     * @returns {HTMLDivElement}
     */
    createDottedNav() {
      const dottedNavContainer = document.createElement('div');
      dottedNavContainer.classList.add('dotted-nav');
      const dottedNavAttributes = {
        'aria-label': 'Slide Controls',
        role: 'region',
      };
      addAttributes(dottedNavContainer, dottedNavAttributes);

      let j = 1;
      let navElements = '';

      self.sliderIds.forEach(() => {
        const dottedNavElAttribute = {
          id: `${self.carouselId}-dot-${j}`,
          'aria-label': `Select Slide ${j} of ${self.sliderIds.length}`,
          role: 'button',
          'aria-current': j === 1 ? 'true' : 'false',
          'aria-controls': `${self.carouselId}-slide-${j}`,
        };

        navElements += `
      <button id="${dottedNavElAttribute.id}" 
              aria-label="${dottedNavElAttribute['aria-label']}" 
              role="${dottedNavElAttribute.role}" 
              aria-current="${dottedNavElAttribute['aria-current']}" 
              aria-controls="${dottedNavElAttribute['aria-controls']}" 
              class="dot ${j === 1 ? 'active' : 'inactive'}">
      </button>
    `;
        j += 1;
      });

      dottedNavContainer.innerHTML = navElements;
      self.dottedNavChildren = Array.from(dottedNavContainer.children);
      self.dottedNavContainer = dottedNavContainer;
      self.sliderWrapper.appendChild(dottedNavContainer);
      return dottedNavContainer;
    },
    /**
     * Set slider ids if required for navigation purpose
     */
    setSliderIds() {
      let i = 1;
      self.sliderChildren.forEach((el) => {
        el.setAttribute('id', `${self.carouselId}-slide-${i}`);
        el.classList.add(i === 1 ? 'show' : 'hide');
        self.sliderIds.push(`${self.carouselId}-slide-${i}`);
        i += 1;
      });
    },
    /**
     * Increment the Slides based on direction
     * @param direction - +1 left or -1 right
     */
    incrementActiveSlide(direction) {
      if (direction > 0) {
        self.activeSlide = (self.activeSlide + 1) <= self.slideCount ? self.activeSlide + 1 : 1;
      } else {
        self.activeSlide = (self.activeSlide - 1) > 0 ? self.activeSlide - 1 : self.slideCount;
      }
      self.activeSlideElement = self.sliderChildren.find((el) => el.id === `${self.carouselId}-slide-${self.activeSlide}`);
    },
    /**
     * Activate a slide
     * @param slideId - sliderId, see SetSliderIds
     */
    activateSlide(slideId) {
      self.sliderChildren.forEach((el) => {
        if (el.id === slideId) {
          el.classList.replace('hide', 'show');
        } else {
          el.classList.replace('show', 'hide');
        }
      });
    },
    /**
     * Activate a dot
     * @param bulletId - bulletId
     */
    activateDot(bulletId) {
      if (self.dottedNavContainer) {
        self.dottedNavChildren.forEach((el) => {
          const isActive = el.id === bulletId;
          el.classList.toggle('active', isActive);
          el.classList.toggle('inactive', !isActive);
          el.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      }
    },
    /**
     * Move the slide based on direction
     * @param direction - +1 left or -1 right
     */
    moveSlide(direction) {
      self.incrementActiveSlide(direction);
      self.activateSlide(`${self.carouselId}-slide-${self.activeSlide}`);
      self.activateDot(`${self.carouselId}-dot-${self.activeSlide}`);
    },
    /**
     * Start the slide show
     */
    startSlideShow() {
      if (!self.slideShow) {
        self.slideShow = window.setInterval(() => self.moveSlide(1), self.sliderInterval);
      }
    },
    /**
     *
     */
    stopSlideShow() {
      window.clearInterval(self.slideShow);
      self.slideShow = false;
    },
    /**
     * Navigate to a slide when clicked on a dot
     * @param event
     */
    dottedNavigation(event) {
      const matches = event.target.id.match(/\d+$/);
      const targetId = matches ? parseInt(matches[0], 10) : 1;
      const sliderTarget = `${self.carouselId}-slide-${targetId}`;
      self.activateSlide(sliderTarget);
      self.activateDot(event.target.id);
      self.activeSlideElement = self.sliderChildren.find((el) => el.id === sliderTarget);
      self.activeSlide = parseInt(targetId, 10);
    },
    /**
     *
     * @param event
     */
    arrowNavigation(event) {
      const navButton = event.currentTarget.id;
      const increment = navButton === 'slider-arrow-left' ? -1 : 1;
      self.incrementActiveSlide(increment);
      self.activateSlide(`${self.carouselId}-slide-${self.activeSlide}`);
      self.activateDot(`${self.carouselId}-dot-${self.activeSlide}`);
    },
    /**
     * Register click events for dots
     */
    dottedNavClickEvents() {
      if (!self.dottedNavContainer) return;
      self.dottedNavContainer.addEventListener('click', (event) => {
        if (event.target && event.target.nodeName === 'BUTTON') self.dottedNavigation(event);
      });
    },
    /**
     * register click events for arrows
     */
    arrowNavOnClickEvents() {
      if (!self.arrowNavContainer) return;
      Array.from(self.arrowNavContainer.children).forEach((el) => {
        el.addEventListener('click', (event) => {
          self.arrowNavigation(event);
        });
      });
    },
    /**
     *
     */
    touchStartEl() {
      self.sliderWrapper.addEventListener(
        'touchstart',
        (e) => {
          self.touchStartX = Math.floor(e.touches[0].clientX);
          self.touchStartY = Math.floor(e.touches[0].clientY);
          self.elementStartPosX = self.activeSlideElement.offsetLeft;
          self.stopSlideShow();
        },
        { passive: false },
      );
    },
    /**
     * Register touch move events
     */
    touchMoveEl() {
      self.sliderWrapper.addEventListener(
        'touchmove',
        (e) => {
          self.touchRelX = Math.floor(e.touches[0].clientX) - self.touchStartX;
          self.touchRelY = Math.floor(e.touches[0].clientY) - self.touchStartY;
          if (self.shouldPreventDefaultScrolling(e)) self.activeSlideElement.style.transform = `translateX(${self.elementStartPosX + self.touchRelX}px)`;
        },
        { passive: false },
      );
    },
    /**
     * Handle scrolling if user swipes left or right
     * @param e
     * @returns {boolean}
     */
    shouldPreventDefaultScrolling(e) {
    // if target is a link or button, allow scrolling and don't prevent default
      if (['a', 'button', 'svg'].includes(e.target.tagName.toLowerCase())) {
        return false;
      }

      const isMovingVertically = Math.abs(self.touchRelY) > Math.abs(self.touchRelX);
      // if touch move is not vertical (=horizontal) prevent scrolling
      if (!isMovingVertically) {
        e.preventDefault();
        return true;
      }

      return false;
    },
    /**
     * Register touch end events
     */
    touchEndEl() {
      self.sliderWrapper.addEventListener(
        'touchend',
        (e) => {
          self.touchEndX = Math.floor(e.changedTouches[0].clientX);
          const previousSlide = self.activeSlideElement;
          if (self.shouldPreventDefaultScrolling(e)) self.handleGesture();
          previousSlide.style.removeProperty('transform');
        },
        { passive: false },
      );
    },
    /**
     * Handle the gesture
     */
    handleGesture() {
      if (self.touchEndX < self.touchStartX) {
        self.moveSlide(1);
      }
      if (self.touchEndX > self.touchStartX) {
        self.moveSlide(-1);
      }
    },
    /**
     * Register click events for dots
     */
    dottedNavOnClickEvents() {
      if (!self.dottedNavContainer) return;
      self.dottedNavContainer.addEventListener('click', (event) => {
        if (event.target && event.target.nodeName === 'BUTTON') self.dottedNavigation(event);
      });
    },
    /**
     * Initialize Slider once setup is done
     * @param dottedNav - if true, register click events for dots
     * @param arrowNav - if true, register click events for arrows
     * @param touchNav - if true, register touch events
     */
    initSlider(dottedNav = true, arrowNav = true, touchNav = true) {
      self.slideCount = self.sliderIds.length;
      self.activeSlideElement = document.getElementById(`${self.carouselId}-slide-${self.activeSlide}`);
      if (touchNav) {
        self.touchStartEl();
        self.touchMoveEl();
        self.touchEndEl();
      }
      // if there is more than one slide and sliderDurationMs is set, start slide show
      if (self.slideCount > 1 && self.sliderInterval > 0) {
        self.sliderWrapper.addEventListener('mouseover', self.stopSlideShow);
        self.sliderWrapper.addEventListener('mouseleave', self.startSlideShow);
        self.startSlideShow();
      }
      if (dottedNav) self.dottedNavOnClickEvents();
      if (arrowNav) self.arrowNavOnClickEvents();
    },
    /**
     * Check if Slider has slides attached
     * @return {boolean}
     */
    hasSlides() {
      return (self.sliderChildren.length > 0) || false;
    },
    /**
     * Get all slides
     * @return {null}
     */
    getSlides() {
      return self.sliderChildren;
    },
    getArrowNavContainer() {
      return self.arrowNavContainer;
    },
  };
  self.init();
  return self;
}


/***/ }),

/***/ "./scripts/lib-franklin.js":
/*!*********************************!*\
  !*** ./scripts/lib-franklin.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_COUNTRY: () => (/* binding */ DEFAULT_COUNTRY),
/* harmony export */   DEFAULT_LANGUAGE: () => (/* binding */ DEFAULT_LANGUAGE),
/* harmony export */   SUPPORTED_COUNTRIES: () => (/* binding */ SUPPORTED_COUNTRIES),
/* harmony export */   SUPPORTED_LANGUAGES: () => (/* binding */ SUPPORTED_LANGUAGES),
/* harmony export */   addDivider: () => (/* binding */ addDivider),
/* harmony export */   addSpacer: () => (/* binding */ addSpacer),
/* harmony export */   adjustAssetURL: () => (/* binding */ adjustAssetURL),
/* harmony export */   buildBlock: () => (/* binding */ buildBlock),
/* harmony export */   createDomStructure: () => (/* binding */ createDomStructure),
/* harmony export */   createMetadata: () => (/* binding */ createMetadata),
/* harmony export */   createOptimizedPicture: () => (/* binding */ createOptimizedPicture),
/* harmony export */   decorateBlock: () => (/* binding */ decorateBlock),
/* harmony export */   decorateBlockImgs: () => (/* binding */ decorateBlockImgs),
/* harmony export */   decorateBlocks: () => (/* binding */ decorateBlocks),
/* harmony export */   decorateButtons: () => (/* binding */ decorateButtons),
/* harmony export */   decorateIcons: () => (/* binding */ decorateIcons),
/* harmony export */   decorateSections: () => (/* binding */ decorateSections),
/* harmony export */   decorateSupScript: () => (/* binding */ decorateSupScript),
/* harmony export */   decorateSupScriptInTextBelow: () => (/* binding */ decorateSupScriptInTextBelow),
/* harmony export */   decorateTemplateAndTheme: () => (/* binding */ decorateTemplateAndTheme),
/* harmony export */   executionContext: () => (/* binding */ executionContext),
/* harmony export */   fetchPlaceholders: () => (/* binding */ fetchPlaceholders),
/* harmony export */   getAllMetadata: () => (/* binding */ getAllMetadata),
/* harmony export */   getConfigValue: () => (/* binding */ getConfigValue),
/* harmony export */   getInfo: () => (/* binding */ getInfo),
/* harmony export */   getMetadata: () => (/* binding */ getMetadata),
/* harmony export */   getPreferredCountry: () => (/* binding */ getPreferredCountry),
/* harmony export */   getPreferredLanguage: () => (/* binding */ getPreferredLanguage),
/* harmony export */   getProduct: () => (/* binding */ getProduct),
/* harmony export */   getProductDB: () => (/* binding */ getProductDB),
/* harmony export */   getProducts: () => (/* binding */ getProducts),
/* harmony export */   loadBlock: () => (/* binding */ loadBlock),
/* harmony export */   loadBlocks: () => (/* binding */ loadBlocks),
/* harmony export */   loadCSS: () => (/* binding */ loadCSS),
/* harmony export */   loadFooter: () => (/* binding */ loadFooter),
/* harmony export */   loadHeader: () => (/* binding */ loadHeader),
/* harmony export */   loadScript: () => (/* binding */ loadScript),
/* harmony export */   normalizeHeadings: () => (/* binding */ normalizeHeadings),
/* harmony export */   readBlockConfig: () => (/* binding */ readBlockConfig),
/* harmony export */   readExactBlockConfig: () => (/* binding */ readExactBlockConfig),
/* harmony export */   sampleRUM: () => (/* binding */ sampleRUM),
/* harmony export */   setActiveLink: () => (/* binding */ setActiveLink),
/* harmony export */   setLanguage: () => (/* binding */ setLanguage),
/* harmony export */   setup: () => (/* binding */ setup),
/* harmony export */   toCamelCase: () => (/* binding */ toCamelCase),
/* harmony export */   toClassName: () => (/* binding */ toClassName),
/* harmony export */   translate: () => (/* binding */ translate),
/* harmony export */   updateSectionsStatus: () => (/* binding */ updateSectionsStatus),
/* harmony export */   waitForLCP: () => (/* binding */ waitForLCP)
/* harmony export */ });
/* eslint-disable max-classes-per-file */
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const PDF_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">'
  + '<!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) -->'
  + '<path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>'
  + '</svg>';

/**
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 */
function sampleRUM(checkpoint, data = {}) {
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname] || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain
    || ((dfnname, fn) => {
      sampleRUM[dfnname] = fn;
      sampleRUM.defer
        .filter(({ fnname }) => dfnname === fnname)
        .forEach(({ fnname, args }) => sampleRUM[fnname](...args));
    });
  sampleRUM.always = sampleRUM.always || [];
  sampleRUM.always.on = (chkpnt, fn) => {
    sampleRUM.always[chkpnt] = fn;
  };
  sampleRUM.on = (chkpnt, fn) => {
    sampleRUM.cases[chkpnt] = fn;
  };
  defer('observe');
  defer('cwv');
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight = usp.get('rum') === 'on' ? 1 : 100; // with parameter, weight is 1. Defaults to 100.
      const id = Array.from({ length: 75 }, (_, i) => String.fromCharCode(48 + i))
        .filter((a) => /\d|[A-Z]/i.test(a))
        .filter(() => Math.random() * 75 > 70)
        .join('');
      const random = Math.random();
      const isSelected = random * weight < 1;
      const firstReadTime = Date.now();
      const urlSanitizers = {
        full: () => window.location.href,
        origin: () => window.location.origin,
        path: () => window.location.href.replace(/\?.*$/, ''),
      };
      // eslint-disable-next-line object-curly-newline, max-len
      window.hlx.rum = {
        weight,
        id,
        random,
        isSelected,
        firstReadTime,
        sampleRUM,
        sanitizeURL: urlSanitizers[window.hlx.RUM_MASK_URL || 'path'],
      };
    }
    const { weight, id, firstReadTime } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const knownProperties = [
        'weight',
        'id',
        'referer',
        'checkpoint',
        't',
        'source',
        'target',
        'cwv',
        'CLS',
        'FID',
        'LCP',
        'INP',
      ];
      const sendPing = (pdata = data) => {
        // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
        const body = JSON.stringify(
          {
            weight,
            id,
            referer: window.hlx.rum.sanitizeURL(),
            checkpoint,
            t: Date.now() - firstReadTime,
            ...data,
          },
          knownProperties,
        );
        const url = `https://rum.hlx.page/.rum/${weight}`;
        // eslint-disable-next-line no-unused-expressions
        navigator.sendBeacon(url, body);
        // eslint-disable-next-line no-console
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          // use classic script to avoid CORS issues
          const script = document.createElement('script');
          script.src = 'https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js';
          document.head.appendChild(script);
          return true;
        },
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) {
        sampleRUM.cases[checkpoint]();
      }
    }
    if (sampleRUM.always[checkpoint]) {
      sampleRUM.always[checkpoint](data);
    }
  } catch (error) {
    // something went wrong
  }
}

const HEAD_RESOURCE_TYPES = {
  LINK: {
    tagName: 'link',
    attributes: [['rel', 'stylesheet']],
    sourceAttribute: 'href',
  },
  SCRIPT: {
    tagName: 'script',
    attributes: [],
    sourceAttribute: 'src',
  },
};

const loadHeadResource = (href, type, callback) => {
  if (!document.querySelector(`head > ${type.tagName}[${type.sourceAttribute}="${href}"]`)) {
    const element = document.createElement(type.tagName);
    element.setAttribute(type.sourceAttribute, href);
    type.attributes.forEach((attribute) => {
      element.setAttribute(attribute[0], attribute[1]);
    });

    if (typeof callback === 'function') {
      element.onload = (e) => callback(e.type);
      element.onerror = (e) => callback(e.type);
    }
    document.head.appendChild(element);
  } else if (typeof callback === 'function') {
    callback('noop');
  }
};

function loadScript(href, callback) {
  loadHeadResource(href, HEAD_RESOURCE_TYPES.SCRIPT, callback);
}

/**
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 * @param {function} callback A function called after CSS is loaded
 */
function loadCSS(href, callback) {
  loadHeadResource(href, HEAD_RESOURCE_TYPES.LINK, callback);
}

/**
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value(s)
 */
function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

function createMetadata(name, value) {
  const meta = document.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', value);

  document.head.append(meta);
}

/**
 * Sanitizes a string for use as class name.
 * @param {string} name The unsanitized string
 * @returns {string} The class name
 */
function toClassName(name) {
  return typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : '';
}

/**
 * Sanitizes a string for use as a js property name.
 * @param {string} name The unsanitized string
 * @returns {string} The camelCased name
 */
function toCamelCase(name) {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Gets all the metadata elements that are in the given scope.
 * @param {String} scope The scope/prefix for the metadata
 * @returns an array of HTMLElement nodes that match the given scope
 */
function getAllMetadata(scope) {
  return [...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)]
    .reduce((res, meta) => {
      const id = toClassName(meta.name
        ? meta.name.substring(scope.length + 1)
        : meta.getAttribute('property').split(':')[1]);
      res[id] = meta.getAttribute('content');
      return res;
    }, {});
}

const ICONS_CACHE = {};
/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} [element] Element containing icons
 */
async function decorateIcons(element) {
  // Prepare the inline sprite
  let svgSprite = document.getElementById('franklin-svg-sprite');
  if (!svgSprite) {
    const div = document.createElement('div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="franklin-svg-sprite" style="display: none"></svg>';
    svgSprite = div.firstElementChild;
    document.body.append(div.firstElementChild);
  }

  // Download all new icons
  const icons = [...element.querySelectorAll('span.icon')];
  await Promise.all(icons.map(async (span) => {
    const iconName = Array.from(span.classList).find((c) => c.startsWith('icon-')).substring(5);
    if (!ICONS_CACHE[iconName]) {
      ICONS_CACHE[iconName] = true;
      try {
        const response = await fetch(`${window.hlx.codeBasePath}/icons/${iconName}.svg`);
        if (!response.ok) {
          ICONS_CACHE[iconName] = false;
          return;
        }
        // Styled icons don't play nice with the sprite approach because of shadow dom isolation
        const svg = await response.text();
        if (svg.match(/(<style | class=)/)) {
          ICONS_CACHE[iconName] = { styled: true, html: svg };
        } else {
          ICONS_CACHE[iconName] = {
            html: svg
              .replace('<svg', `<symbol id="icons-sprite-${iconName}"`)
              .replace(/ width=".*?"/, '')
              .replace(/ height=".*?"/, '')
              .replace('</svg>', '</symbol>'),
          };
        }
      } catch (error) {
        ICONS_CACHE[iconName] = false;
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }));

  const symbols = Object.values(ICONS_CACHE).filter((v) => !v.styled).map((v) => v.html).join('\n');
  svgSprite.innerHTML += symbols;

  icons.forEach((span) => {
    const iconName = Array.from(span.classList).find((c) => c.startsWith('icon-')).substring(5);
    const parent = span.firstElementChild?.tagName === 'A' ? span.firstElementChild : span;

    // Set aria-label if the parent is an anchor tag
    const spanParent = span.parentElement;
    if (spanParent.tagName === 'A' && !spanParent.hasAttribute('aria-label')) {
      spanParent.setAttribute('aria-label', iconName);
    }

    // Styled icons need to be inlined as-is, while unstyled ones can leverage the sprite
    if (ICONS_CACHE[iconName] && ICONS_CACHE[iconName].styled) {
      parent.innerHTML = ICONS_CACHE[iconName].html;
    } else {
      parent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-${iconName}"/></svg>`;
    }
  });
}

/**
 * Creates a (nested) dom structure based on a given template and appends or prepends
 * it to a given parentElement (default is the document body).
 * @param {object} structure The template
 * @param {object} parentElement The dom element to append or prepend to.
 */
function createDomStructure(structure, parentElement = document.body) {
  structure.forEach((element) => {
    const domElement = document.createElement(element.type);
    if (element.attributes) {
      Object.keys(element.attributes).forEach((attr) => {
        domElement.setAttribute(attr, element.attributes[attr]);
      });
    }

    if (element.textContent) {
      domElement.textContent = element.textContent;
    }

    if (element.children) {
      createDomStructure(element.children, domElement);
    }

    if (element.classes) {
      element.classes.forEach((c) => domElement.classList.add(c));
    }

    if (element.position === 'prepend') {
      parentElement.prepend(domElement);
    } else {
      parentElement.appendChild(domElement);
    }
  });
}

/**
 * Gets placeholders object.
 * @param {string} [prefix] Location of placeholders
 * @returns {object} Window placeholders object
 */
async function fetchPlaceholders(prefix = 'default') {
  window.placeholders = window.placeholders || {};
  const loaded = window.placeholders[`${prefix}-loaded`];
  if (!loaded) {
    window.placeholders[`${prefix}-loaded`] = new Promise((resolve, reject) => {
      fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error(`${resp.status}: ${resp.statusText}`);
        }).then((json) => {
          const placeholders = {};
          if (json[':type'] === 'multi-sheet') {
            json[':names'].forEach((name) => {
              placeholders[name] = {};
              json[name].data
                .filter((placeholder) => placeholder.Key && placeholder.Text)
                .forEach((placeholder) => {
                  placeholders[name][toCamelCase(placeholder.Key)] = placeholder.Text;
                });
            });
          } else {
            json.data
              .filter((placeholder) => placeholder.Key && placeholder.Text)
              .forEach((placeholder) => {
                placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
              });
          }
          window.placeholders[prefix] = placeholders;
          resolve();
        }).catch((error) => {
          // error loading placeholders
          window.placeholders[prefix] = {};
          reject(error);
        });
    });
  }
  await window.placeholders[`${prefix}-loaded`];
  return window.placeholders[prefix];
}

async function getPlaceHolder(root, key) {
  const placeholders = await fetchPlaceholders();
  if (placeholders[root] && placeholders[root][key]) {
    return placeholders[root][key];
  }
  throw new Error('undefined');
}

async function getConfigValue(key, defaultValue) {
  try {
    return await getPlaceHolder('config', key);
  } catch (error) {
    return defaultValue;
  }
}

async function translate(key, defaultText) {
  const i18n = `i18n-${window.location.pathname.split('/')[1]}`;
  const i18nDefault = 'i18n-en';
  try {
    return await getPlaceHolder(i18n, key, defaultText);
  } catch (error) { /* empty */ }
  if (i18n !== i18nDefault) {
    try {
      return await getPlaceHolder(i18nDefault, key);
    } catch (error) { /* empty */ }
  }
  return defaultText;
}

function decorateSupScript(string, result = [], inside = false, first = true) {
  if (!string) {
    return result;
  }
  if (inside && first && ['TM', 'tm'].includes(string)) {
    result.push(
      {
        type: 'span',
        textContent: string,
        classes: ['tm'],
      },
    );
    return result;
  }

  const idx = string.search(/®|™|©/);

  if (idx !== -1) {
    const sup = string.substr(idx, 1);
    const tm = sup === '™';
    result.push(
      {
        type: 'span',
        textContent: string.substr(0, idx),
      },
      {
        type: inside ? 'span' : 'sup',
        textContent: tm ? 'TM' : sup,
        classes: tm ? ['tm'] : undefined,
      },
    );

    return decorateSupScript(string.substr(idx + 1), result, inside, false);
  }

  result.push({
    type: 'span',
    textContent: string,
  });

  return result;
}

function walkNodeTree(root, { inspect, collect, callback } = {}) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_ALL,
    {
      acceptNode(node) {
        if (inspect && !inspect(node)) { return NodeFilter.FILTER_REJECT; }
        if (collect && !collect(node)) { return NodeFilter.FILTER_SKIP; }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
  );

  let n = walker.nextNode();
  while (n) {
    const next = walker.nextNode();
    callback?.(n);
    n = next;
  }
}

/* depending on the content length amount of work in decorateSupScriptInTextBelow might cause the
  * entire caller function to block main-thread more than 50ms to finish. For that reason and to
  * prevent future content-led perf. degradations, decorateSupScriptInTextBelow function should
  * run in a separate event-loop task
  */
function decorateSupScriptInTextBelow(el) {
  return new Promise((resolve) => {
    setTimeout(() => {
      walkNodeTree(el, {
        inspect: (n) => !['STYLE', 'SCRIPT'].includes(n.nodeName),
        collect: (n) => (n.nodeType === Node.TEXT_NODE),
        callback: (n) => {
          const inside = n.parentElement.tagName === 'SUP';
          const result = decorateSupScript(n.textContent, [], inside);
          if (result.length > 1) {
            const replacementNode = document.createElement('span');
            const newHtml = result.filter((p) => p.textContent !== '').map((p) => `<${p.type}${p.classes ? ` class=${p.classes.join()}` : ''}>${p.textContent}</${p.type}>`).join('');
            n.parentNode.insertBefore(replacementNode, n);
            n.parentNode.removeChild(n);
            replacementNode.outerHTML = newHtml;
          } else if (inside && result.length === 1 && result[0].classes?.includes('tm')) {
            n.parentElement.classList.add('tm');
          }
        },
      });
      resolve();
    }, 0);
  });
}

function getInfo() {
  const [, country, language] = window.location.pathname.split('/');
  const getUrlPath = (path) => new URL(path, origin).pathname;

  return {
    country,
    language,
    productDB: getUrlPath('/products.json'),
    productSupport: getUrlPath(`/${country}/${language}/product-support`),
    queryIndex: getUrlPath(`/${country}/${language}/query-index.json`),
  };
}

function adjustAssetURL(asset) {
  if (asset?.URL) {
    const url = new URL(asset.URL, window.location);
    const isLocalOrHlx = ['localhost', '-mammotome--mbehzad.hlx.page', '-mammotome--mbehzad.hlx.live', '-mammotome--mbehzad.aem.page', '-mammotome--mbehzad.aem.live']
      .some((domain) => url.hostname.endsWith(domain));

    if (isLocalOrHlx) {
      asset.URL = url.pathname;
    }
  }
  return asset;
}

async function getProductDB() {
  if (!window.productDB) {
    const { productDB } = getInfo();
    const resp = await fetch(`${productDB}?limit=10000`);
    if (!resp.ok) {
      throw new Error(`${resp.status}: ${resp.statusText}`);
    }
    window.productDB = await resp.json();
    const adjustData = (f) => (field) => {
      if (window.productDB[field]?.data) {
        window.productDB[field].data = window.productDB[field].data.map(f);
      }
    };

    ['ProductAsset', 'eIFU'].forEach(adjustData(adjustAssetURL));
  }
  return window.productDB;
}

function productDBMatches(entry, country, language) {
  if (country && entry.Countries !== '') {
    const countries = entry.Countries.toUpperCase().split('|');
    if (!countries.includes(country.toUpperCase())) {
      return false;
    }
  }

  if (language && entry.Languages !== '') {
    const languages = entry.Languages.toUpperCase().split('|');
    if (!languages.includes(language.toUpperCase())) {
      return false;
    }
  }

  return true;
}

async function getProduct(page, country, language) {
  const productDB = await getProductDB();

  const product = productDB.Product.data
    .find((entry) => entry.Page === page && productDBMatches(entry, country));

  if (product) {
    const translation = productDB.ProductTranslation.data
      .find((entry) => entry.Page === product.Page && productDBMatches(entry, country, language));

    product.Name = translation?.Name || product.Name;
    product.Description = translation?.Description || product.Description;
    product.Image = translation?.Image || product.Image;

    product.assets = productDB.ProductAsset.data.filter(
      (asset) => asset.Page === product.Page && productDBMatches(asset, country, language),
    );
  }

  return product;
}

async function getProducts(country, language) {
  const productDB = await getProductDB();

  return (await Promise.all(productDB.Product.data
    .map(async (product) => getProduct(product.Page, country, language))))
    .filter((product) => product);
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
function decorateBlock(block) {
  const shortBlockName = block.classList[0];
  if (shortBlockName) {
    block.classList.add('block');
    block.dataset.blockName = shortBlockName;
    block.dataset.blockStatus = 'initialized';
    const blockWrapper = block.parentElement;
    blockWrapper.classList.add(`${shortBlockName}-wrapper`);
    const section = block.closest('.section');
    if (section) section.classList.add(`${shortBlockName}-container`);
  }
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = toClassName(cols[0].textContent);
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else value = row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
// eslint-disable-next-line import/prefer-default-export
function readExactBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope > div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = cols[0].textContent.trim();
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else value = row.children[1].innerHTML;
        config[name] = value;
      }
    }
  });
  return config;
}



/**
 * Returns a picture element with webp and fallbacks
 * @param {HTMLPictureElement|null} picture The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 */
function createOptimizedPicture(picture, eager = false, breakpoints = [{ media: '(min-width: 750px)', width: '2000' }, { media: '(min-width: 450px)', width: '750' }, { width: '450' }]) {
  console.time('createOptimizedPicture');
  performance.mark('createOptimizedPicture');
  if (!picture) return;

  console.log('picture:', picture);

  const img = picture.querySelector('img');
  picture.querySelectorAll('source').forEach((source) => source.remove());
  const url = new URL(img.src, window.location.href);
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);

    img.insertAdjacentElement("beforebegin", source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      img.insertAdjacentElement("beforebegin", source);
    } else {
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  console.timeEnd('createOptimizedPicture');

  return picture;
}

/**
 * Add a divider into section from Section Metadata block
 * @param section section element
 * @param type primary (grey) or secondary (blue)
 */
function addDivider(section, type) {
  const divider = document.createElement('hr');
  divider.classList.add('divider', type);
  section.appendChild(divider);
}

/** Add a spacer into section from Section Metadata block
 * @param section section element
 * @param heightValue height of spacer in px
 * @param position after or before
 */
function addSpacer(section, heightValue, position) {
  const spacerHeight = parseInt(heightValue, 10) || 0;
  const spacerDiv = document.createElement('div');
  section.classList.add('spacer');
  spacerDiv.setAttribute('style', `height: ${spacerHeight}px;`);
  if (position === 'before') {
    section.insertBefore(spacerDiv, section.firstChild);
  } else if (position === 'after') {
    section.appendChild(spacerDiv);
  }
}

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.dataset.sectionStatus = 'initialized';
    section.style.display = 'none';
    performance.mark('decorateSections');
    section
      .querySelectorAll('picture').forEach(pic => createOptimizedPicture(pic))



    /* process section metadata */
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') {
          const styles = meta.style.split(',').map((style) => toClassName(style.trim()));
          styles.forEach((style) => style && section.classList.add(style));
        } else if (key === 'divider') { // add divider from section metadata
          const dividerMeta = meta.divider.split(',').map((divider) => toClassName(divider.trim()));
          const dividerType = dividerMeta[0] === 'secondary' ? 'secondary' : 'primary';
          addDivider(section, dividerType);
        } else if (key === 'spacer') {
          const spacerMeta = meta.spacer.split(',').map((spacer) => toClassName(spacer.trim()));
          const spacerValue = parseInt(spacerMeta[0], 10) || '0';
          if (spacerMeta.length > 1) {
            const spacerPositions = spacerMeta.slice(1, spacerMeta.length);
            spacerPositions.forEach((position) => {
              addSpacer(section, spacerValue, position.trim());
            });
          } else {
            addSpacer(section, spacerValue, 'after');
          }
        } else if (key === 'button-width') { // set fixed button width from section metadata
          const buttonWidthInt = parseInt(meta['button-width'], 10);
          const buttonWidth = buttonWidthInt ? `${buttonWidthInt}px` : '100%';
          const aButtons = section.querySelectorAll('p a');
          aButtons.forEach((aButton) => {
            aButton.setAttribute('style', `width: ${buttonWidth};`);
            aButton.classList.add('button-width');
          });
        } else {
          section.dataset[toCamelCase(key)] = meta[key];
        }
      });
      sectionMeta.parentNode.remove();
    }
  });
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 */
function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope > div.section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.dataset.sectionStatus;
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]');
      if (loadingBlock) {
        section.dataset.sectionStatus = 'loading';
        break;
      } else {
        section.dataset.sectionStatus = 'loaded';
        section.style.display = null;
      }
    }
  }
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 */
function decorateBlocks(main) {
  main
    .querySelectorAll('div.section > div > div')
    .forEach(decorateBlock);
}

/**
 * Builds a block DOM Element from a two-dimensional array, string, or object
 * @param {string} blockName name of the block
 * @param {*} content two dimensional array or string or object of content
 */
function buildBlock(blockName, content) {
  const blockEl = document.createElement('div');
  blockEl.classList.add(blockName);

  if (content === null) {
    return blockEl;
  }

  const table = Array.isArray(content) ? content : [[content]];

  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      const vals = col.elems ? col.elems : [col];
      vals.forEach((val) => {
        if (val) {
          if (typeof val === 'string') {
            colEl.innerHTML += val;
          } else {
            colEl.appendChild(val);
          }
        }
      });
      rowEl.appendChild(colEl);
    });
    blockEl.appendChild(rowEl);
  });
  return (blockEl);
}

/**
 * Loads JS and CSS for a module and executes it's default export.
 * @param {string} name The module name
 * @param {string} jsPath The JS file to load
 * @param {string} [cssPath] An optional CSS file to load
 * @param {object[]} [args] Parameters to be passed to the default export when it is called
 */
async function loadModulePlugin(name, ...args) {
  /* const cssLoaded = cssPath
    ? new Promise((resolve) => { loadCSS(cssPath, resolve); })
    : Promise.resolve(); */
  const decorationComplete =  true
    ? new Promise((resolve) => {
      (async () => {
        let mod;
        try {
          mod = await __webpack_require__("./plugins eager recursive ^\\.\\/.*\\/src\\/index\\.js$")(`./${name}/src/index.js`);
          if (mod.default) {
            await mod.default.apply(null, args);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${name}`, error);
        }
        resolve(mod);
      })();
    })
    : 0;
  return Promise.all([decorationComplete])
    .then(([, api]) => api);
}

/**
 * Loads JS and CSS for a module and executes it's default export.
 * @param {string} name The module name
 * @param {string} jsPath The JS file to load
 * @param {string} [cssPath] An optional CSS file to load
 * @param {object[]} [args] Parameters to be passed to the default export when it is called
 */
async function loadModuleBlock(name, ...args) {
  /* const cssLoaded = cssPath
    ? new Promise((resolve) => { loadCSS(cssPath, resolve); })
    : Promise.resolve(); */
  const decorationComplete =  true
    ? new Promise((resolve) => {
      (async () => {
        let mod;
        try {
          mod = await __webpack_require__("./blocks eager recursive ^\\.\\/.*\\/.*\\.js$")(`./${name}/${name}.js`);
          if (mod.default) {
            await mod.default.apply(null, args);
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`failed to load module for ${name}`, error);
        }
        resolve(mod);
      })();
    })
    : 0;
  return Promise.all([/* cssLoaded, */decorationComplete])
    .then(([, api]) => api);
}

/**
 * Gets the configuration for the given block, and also passes
 * the config through all custom patching helpers added to the project.
 *
 * @param {Element} block The block element
 * @returns {Object} The block config (blockName, cssPath and jsPath)
 */
function getBlockConfig(block) {
  const { blockName } = block.dataset;
  const cssPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`;
  const jsPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`;
  const original = { blockName, cssPath, jsPath };
  return (window.hlx.patchBlockConfig || [])
    .filter((fn) => typeof fn === 'function')
    .reduce((config, fn) => fn(config, original), { blockName, cssPath, jsPath });
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} block The block element
 */
async function loadBlock(block) {
  const status = block.dataset.blockStatus;
  if (status !== 'loading' && status !== 'loaded') {
    block.dataset.blockStatus = 'loading';
    const { blockName, cssPath, jsPath } = getBlockConfig(block);
    try {
      await loadModuleBlock(blockName, block);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load block ${blockName}`, error);
    }
    block.dataset.blockStatus = 'loaded';
    console.timeEnd('loadHeader');
  }
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 */
async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    /* await */loadBlock(blocks[i]).then(() => updateSectionsStatus(main));
  }
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} el The container element
 * @param {string} allowedHeadings The list of allowed headings (h1 ... h6)
 */
function normalizeHeadings(el, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
    const h = tag.tagName.toLowerCase();
    if (allowed.indexOf(h) === -1) {
      // current heading is not in the allowed list -> try first to "promote" the heading
      let level = parseInt(h.charAt(1), 10) - 1;
      while (allowed.indexOf(`h${level}`) === -1 && level > 0) {
        level -= 1;
      }
      if (level === 0) {
        // did not find a match -> try to "downgrade" the heading
        while (allowed.indexOf(`h${level}`) === -1 && level < 7) {
          level += 1;
        }
      }
      if (level !== 7) {
        tag.outerHTML = `<h${level} id="${tag.id}">${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * Set template (page structure) and theme (page styles).
 */
function decorateTemplateAndTheme() {
  const addClasses = (element, classes) => {
    classes.split(',').forEach((c) => {
      element.classList.add(toClassName(c.trim()));
    });
  };
  const template = getMetadata('template');
  if (template) addClasses(document.body, template);
  const theme = getMetadata('theme');
  if (theme) addClasses(document.body, theme);
}

/**
 * Set Link class to active when on the same page
 * @param links {NodeListOf<Element>} Array of links to check
 * @param className {string} Class to add to active link
 */
function setActiveLink(links, className) {
  if (!links || links.length === 0) return;
  const ogUrl = getMetadata('og:url');
  const slicer = ogUrl.endsWith('/') ? -2 : -1;
  const actualPage = ogUrl.split('/').slice(slicer)[0].toLowerCase();
  links.forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href.includes(actualPage)) {
      a.classList.add(className);
    }
  });
}

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */
function decorateButtons(element) {
  const excludedParentClasses = ['.prev-next', '.tab-navigation'];

  const isSingleChild = (el, tagName) => el.childNodes.length === 1 && el.tagName === tagName;
  const addClassAndContainer = (el, a, className, containerClass) => {
    a.className = className;
    el.classList.add(containerClass);
  };
  const handlePdfLink = (a, parent, url) => {
    if (url.pathname.endsWith('.pdf')) {
      a.target = '_blank';
      if (parent.tagName.toLowerCase() === 'div' && parent.classList.contains('button-container')) {
        const icon = document.createElement('i');
        icon.classList.add('link-icon');
        icon.innerHTML = PDF_ICON;
        const spanText = document.createElement('span');
        spanText.innerHTML = a.innerHTML;
        a.innerHTML = '';
        a.append(icon, spanText);
      }
    }
  };

  element.querySelectorAll('a').forEach((a) => {
    // Suppress a-to-button decoration when in excludedParentClasses
    if (!excludedParentClasses.some((className) => a.closest(className))) {
      const parent = a.parentElement;
      const grandparent = parent.parentElement;

      a.title = a.title || a.textContent;
      a.setAttribute('aria-label', a.title);

      if (a.href !== a.textContent && !a.querySelector('img')) {
        if (isSingleChild(parent, 'P') || isSingleChild(parent, 'DIV')) {
          addClassAndContainer(parent, a, 'button primary', 'button-container');
        } else if (isSingleChild(parent, 'STRONG') && isSingleChild(grandparent, 'P')) {
          addClassAndContainer(grandparent, a, 'button primary', 'button-container');
        } else if (isSingleChild(parent, 'EM') && isSingleChild(grandparent, 'P')) {
          addClassAndContainer(grandparent, a, 'button secondary', 'button-container');
        }

        const url = new URL(a.href);
        handlePdfLink(a, parent, url);
      }
    }
  });
}

function decorateBlockImgs(block) {
  return;
  block.querySelectorAll('img')
    .forEach((img) => {
      const { hostname } = new URL(img.src, window.location.href);
      if (hostname === window.location.hostname
        || hostname.endsWith('-mammotome--mbehzad.hlx.page')
        || hostname.endsWith('-mammotome--mbehzad.hlx.live')
        || hostname.endsWith('-mammotome--mbehzad.aem.page')
        || hostname.endsWith('-mammotome--mbehzad.aem.live')
        || hostname === 'localhost') {
        img.replaceWith(
          createOptimizedPicture(img.src, img.alt, false, img.width, img.height),
        );
      }
    });
}

/**
 * Load LCP block and/or wait for LCP in default content.
 */
async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.dataset.blockName));
  if (hasLCPBlock) await loadBlock(block);

  // document.body.style.display = null;
  const lcpCandidate = document.querySelector('main img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', resolve);
      lcpCandidate.addEventListener('error', resolve);
    } else {
      resolve();
    }
  });
}

const SUPPORTED_LANGUAGES = ['de', 'en', 'es', 'fr', 'it', 'pl'];
const DEFAULT_LANGUAGE = 'en';

const SUPPORTED_COUNTRIES = ['de', 'es', 'fr', 'uk', 'it', 'pl', 'us', 'dj-test'];
const DEFAULT_COUNTRY = 'us';

function getPreferredLanguage() {
  return navigator.languages.find(
    (l) => SUPPORTED_LANGUAGES.includes(l),
  ) || DEFAULT_LANGUAGE;
}

function getPreferredCountry() {
  return DEFAULT_COUNTRY;
}

function setLanguage() {
  const [, country, language] = window.location.pathname.split('/');
  const preferredLanguage = SUPPORTED_LANGUAGES.includes(language)
    ? language : getPreferredLanguage();
  const preferredCountry = SUPPORTED_COUNTRIES.includes(country)
    ? country : getPreferredCountry();
  const preferredCountryAndLanguagePath = `/${preferredCountry}/${preferredLanguage}/`;

  if (window.location.pathname === '/' && window.location.origin.match(/\.hlx\.(page|live)$/)) {
    window.location.replace(preferredCountryAndLanguagePath);
  }

  document.documentElement.lang = language;

  createMetadata('nav', `${preferredCountryAndLanguagePath}nav`);
  createMetadata('footer', `${preferredCountryAndLanguagePath}footer`);
}

/**
 * Loads a block named 'header' into header
 * @param {Element} header header element
 * @returns {Promise}
 */
async function loadHeader(header) {
  performance.mark("loadHeader");
  console.time('loadHeader');
  const headerBlock = buildBlock('header', null);
  header.append(headerBlock);
  decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * Loads a block named 'footer' into footer
 * @param footer footer element
 * @returns {Promise}
 */
async function loadFooter(footer) {
  const footerBlock = buildBlock('footer', null);
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

function parsePluginParams(id, config) {
  const pluginId = !config
    ? id.split('/').splice(id.endsWith('/') ? -2 : -1, 1)[0].replace(/\.js/, '')
    : id;
  const pluginConfig = {
    load: 'eager',
    ...(typeof config === 'string' || !config
      ? { url: (config || id).replace(/\/$/, '') }
      : config),
  };
  pluginConfig.options ||= {};
  return { id: pluginId, config: pluginConfig };
}

// Define an execution context for plugins
const executionContext = {
  createOptimizedPicture,
  getAllMetadata,
  getMetadata,
  decorateBlock,
  decorateButtons,
  decorateIcons,
  loadBlock,
  loadCSS,
  loadScript,
  sampleRUM,
  toCamelCase,
  toClassName,
};

class PluginsRegistry {
  #plugins;

  constructor() {
    this.#plugins = new Map();
  }

  // Register a new plugin
  add(id, config) {
    const { id: pluginId, config: pluginConfig } = parsePluginParams(id, config);
    this.#plugins.set(pluginId, pluginConfig);
  }

  // Get the plugin
  get(id) { return this.#plugins.get(id); }

  // Check if the plugin exists
  includes(id) { return !!this.#plugins.has(id); }

  // Load all plugins that are referenced by URL, and updated their configuration with the
  // actual API they expose
  async load(phase) {
    [...this.#plugins.entries()]
      .filter(([, plugin]) => plugin.condition
      && !plugin.condition(document, plugin.options, executionContext))
      .map(([id]) => this.#plugins.delete(id));
    return Promise.all([...this.#plugins.entries()]
      // Filter plugins that don't match the execution conditions
      .filter(([, plugin]) => (
        (!plugin.condition || plugin.condition(document, plugin.options, executionContext))
        && phase === plugin.load && plugin.url
      ))
      .map(async ([key, plugin]) => {
        try {
          // If the plugin has a default export, it will be executed immediately
          const pluginApi = (await loadModulePlugin(
            key,
            //! plugin.url.endsWith('.js') ? `${plugin.url}/${key}.js` : plugin.url,
            //! plugin.url.endsWith('.js') ? `${plugin.url}/${key}.css` : null,
            document,
            plugin.options,
            executionContext,
          )) || {};
          this.#plugins.set(key, { ...plugin, ...pluginApi });
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Could not load specified plugin', key);
        }
      }));
  }

  // Run a specific phase in the plugin
  async run(phase) {
    return [...this.#plugins.values()]
      .reduce((promise, plugin) => ( // Using reduce to execute plugins sequencially
        plugin[phase] && (!plugin.condition
            || plugin.condition(document, plugin.options, executionContext))
          ? promise.then(() => plugin[phase](document, plugin.options, executionContext))
          : promise
      ), Promise.resolve());
  }
}

class TemplatesRegistry {
  // Register a new template
  // eslint-disable-next-line class-methods-use-this
  add(id, url) {
    if (Array.isArray(id)) {
      id.forEach((i) => window.hlx.templates.add(i));
      return;
    }
    const { id: templateId, config: templateConfig } = parsePluginParams(id, url);
    templateConfig.condition = () => toClassName(getMetadata('template')) === templateId;
    window.hlx.plugins.add(templateId, templateConfig);
  }

  // Get the template
  // eslint-disable-next-line class-methods-use-this
  get(id) { return window.hlx.plugins.get(id); }

  // Check if the template exists
  // eslint-disable-next-line class-methods-use-this
  includes(id) { return window.hlx.plugins.includes(id); }
}

/**
 * Setup block utils.
 */
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.codeBasePath = '';
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';
  window.hlx.patchBlockConfig = [];
  window.hlx.plugins = new PluginsRegistry();
  window.hlx.templates = new TemplatesRegistry();

  const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
  if (scriptEl) {
    try {
      [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts/scripts.js');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

/**
 * Auto initializiation.
 */
function init() {
  // document.body.style.display = 'none';
  setup();
  sampleRUM('top');

  window.addEventListener('load', () => sampleRUM('load'));

  window.addEventListener('unhandledrejection', (event) => {
    sampleRUM('error', { source: event.reason.sourceURL, target: event.reason.line });
  });

  window.addEventListener('error', (event) => {
    sampleRUM('error', { source: event.filename, target: event.lineno });
  });
}

init();


/***/ }),

/***/ "./scripts/lib-history-section.js":
/*!****************************************!*\
  !*** ./scripts/lib-history-section.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decorateHistorySection: () => (/* binding */ decorateHistorySection),
/* harmony export */   getNextSiblings: () => (/* binding */ getNextSiblings),
/* harmony export */   observeHistorySection: () => (/* binding */ observeHistorySection)
/* harmony export */ });
/* harmony import */ var _lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib-franklin.js */ "./scripts/lib-franklin.js");
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */



function* getNextSiblings(element, selector) {
  let nextElement = element.nextElementSibling;
  while (nextElement) {
    if (selector && nextElement.matches(selector)) {
      return;
    }
    yield nextElement;
    nextElement = nextElement.nextElementSibling;
  }
}

/**
 * Decorates the history page.
 * @param {Element} section The section
 */
// eslint-disable-next-line import/prefer-default-export
async function decorateHistorySection(section) {
  try {
    const parent = section.querySelector('.default-content-wrapper');
    const firstH3 = parent.querySelector('h3');

    // wrap all H3 and p in a timeline element
    const timelineBlock = (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('timeline', null);
    parent.insertBefore(timelineBlock, firstH3);
    timelineBlock.append(firstH3, ...getNextSiblings(firstH3));

    // create small "year blocks" for every year
    const yearBlocks = [];
    [...timelineBlock.children].forEach((el) => {
      if (el.tagName === 'H3') {
        const yearBlock = (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('year', null);
        yearBlocks.push([yearBlock, [el, ...getNextSiblings(el, 'H3')]]);
      }
    });

    yearBlocks.forEach((block) => {
      const [yearBlock, descriptionBlockChildren] = block;
      timelineBlock.append(yearBlock);

      // create small "description block" for every year
      const descriptionBlock = (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('description', null);
      yearBlock.append(descriptionBlock);
      descriptionBlock.append(...descriptionBlockChildren);

      // append calendar icon (as sprite)
      const icon = document.createElement('span');
      icon.classList.add('icon', 'icon-calendar');
      yearBlock.append(icon);
    });

    await (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(section);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Decorating History page failed', error);
  }
}
/**
 * Observe the history page for changes.
 * @param {Element} section The section
*/
// eslint-disable-next-line import/prefer-default-export
async function observeHistorySection(section) {
  try {
    const highlightWhenInViewport = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // leave this here for debugging: console.log(entry.target.querySelector('h3').innerText);
        const { isIntersecting } = entry;
        if (isIntersecting) {
          entry.target.classList.add('highlight');
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.classList.remove('highlight');
        }
      });
    }, {
      rootMargin: '50px',
      threshold: 1,
    });

    const yearBlocks = section.querySelectorAll('.timeline .year');
    yearBlocks.forEach((el) => highlightWhenInViewport.observe(el));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Observer of History page failed', error);
  }
}


/***/ }),

/***/ "./scripts/scripts.js":
/*!****************************!*\
  !*** ./scripts/scripts.js ***!
  \****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addFavIcon: () => (/* binding */ addFavIcon),
/* harmony export */   decorateMain: () => (/* binding */ decorateMain)
/* harmony export */ });
/* harmony import */ var _lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib-franklin.js */ "./scripts/lib-franklin.js");


const LCP_BLOCKS = ['hero', 'product-reference', 'product-support']; // add your LCP blocks to the list
window.hlx.RUM_GENERATION = 'mammotome'; // add your RUM generation information here

const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
  // define your custom audiences here as needed
  new: () => !localStorage.getItem('franklin-visitor-returning'),
  returning: () => !!localStorage.getItem('franklin-visitor-returning'),
};

window.hlx.plugins.add('rum-conversion', {
  url: '/plugins/rum-conversion/src/index.js',
  load: 'lazy',
});

window.hlx.plugins.add('experimentation', {
  url: '/plugins/experimentation/src/index.js',
  condition: () => (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getMetadata)('experiment')
    || Object.keys((0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getAllMetadata)('campaign')).length
    || Object.keys((0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.getAllMetadata)('audience')).length,
  options: { audiences: AUDIENCES },
  load: 'eager',
});

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector(':scope > div:first-child > h1');
  const h2 = main.querySelector(':scope > div:first-child > h2');
  const button = main.querySelector(':scope > div:first-child > p > a');
  const picture = main.querySelector(':scope > div:first-child picture');
  const overlayPicture = main.querySelector(':scope > div:first-of-type > p:nth-child(2) > picture');
  const metaData = main.querySelector(':scope > div:first-child .section-metadata');

  const setHeroType = (heroType) => {
    const heroBlock = main.querySelector('.hero');
    heroBlock.classList.add(`hero-${heroType}`);
  };

  function doBuildBlock(section, elems) {
    if (button) {
      elems.push(button);
    }

    section.append((0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.buildBlock)('hero', { elems }));
    if (metaData) {
      section.append(metaData);
    }

    main.prepend(section);
  }

  // eslint-disable-next-line no-bitwise,max-len
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    const elems = [picture];

    if (overlayPicture) {
      elems.push(overlayPicture);
    }

    elems.push(h1);

    if (h2 && h1.nextElementSibling === h2) {
      elems.push(h2);
    }

    doBuildBlock(section, elems);
    setHeroType('big');
    // eslint-disable-next-line max-len,no-bitwise
  } else if (h1 && h2 && picture && (h2.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_FOLLOWING)) {
    // Hero light version
    const section = document.createElement('div');
    const elems = [h1];

    if (h2 && h1.nextElementSibling === h2) {
      elems.push(h2);
    }

    doBuildBlock(section, elems);
    setHeroType('light');
    // position PICTURE to the right place for hero light
    const newPictureParent = main.querySelector('.hero-light').firstChild;
    const newPictureDiv = document.createElement('div');
    newPictureDiv.appendChild(picture);
    newPictureParent.appendChild(newPictureDiv);
  } else if (h2 && picture
    // eslint-disable-next-line no-bitwise
    && (h2.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');

    const elems = [picture];

    if (overlayPicture) {
      elems.push(overlayPicture);
    }

    elems.push(h2);

    doBuildBlock(section, elems);
    setHeroType('big');
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  /*
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`, null);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
  */
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

const resizeListeners = new WeakMap();

/**
 * Sets an optimized background image for a given section element.
 * This function takes into account the device's viewport width and device pixel ratio
 * to choose the most appropriate image from the provided breakpoints.
 *
 * @param {HTMLElement} section - The section element to which the background image will be applied.
 * @param {string} bgImage - The base URL of the background image.
 * @param {Array<{width: string, media?: string}>} [breakpoints=[
 *  { width: '450' },
 *  { media: '(min-width: 450px)', width: '750' },
 *  { media: '(min-width: 750px)', width: '2000' }
 * ]] - An array of breakpoint objects. Each object contains a `width` which is the width of the
 * image to request, and an optional `media` which is a media query string indicating when this
 * breakpoint should be used.
 */
function createOptimizedBackgroundImage(section, bgImage, breakpoints = [{ width: '450' }, { media: '(min-width: 450px)', width: '750' }, { media: '(min-width: 750px)', width: '2000' }]) {
  const updateBackground = () => {
    const url = new URL(bgImage, window.location.href);
    const pathname = encodeURI(url.pathname);

    // Filter all matching breakpoints
    const matchedBreakpoints = breakpoints
      .filter((br) => !br.media || window.matchMedia(br.media).matches);

    // If there are any matching breakpoints, pick the one with the highest resolution
    let matchedBreakpoint;
    if (matchedBreakpoints.length) {
      matchedBreakpoint = matchedBreakpoints
        .reduce((acc, curr) => (parseInt(curr.width, 10) > parseInt(acc.width, 10) ? curr : acc));
    } else {
      [matchedBreakpoint] = breakpoints;
    }

    const adjustedWidth = matchedBreakpoint.width * window.devicePixelRatio;
    section.style.backgroundImage = `url(${pathname}?width=${adjustedWidth}&format=webply&optimize=medium)`;
    section.style.backgroundSize = 'cover';
  };

  // If a listener already exists for this section, remove it to prevent duplicates.
  if (resizeListeners.has(section)) {
    window.removeEventListener('resize', resizeListeners.get(section));
  }

  // Store the updateBackground function in the WeakMap for this section
  resizeListeners.set(section, updateBackground);

  // Now, attach the new listener
  window.addEventListener('resize', updateBackground);

  // Immediately update the background
  updateBackground();
}

/**
 * Finds all sections in the main element of the document
 * that require additional decoration: adding
 * a background image or an arc effect.
 * @param {Element} main
 */
function decorateStyledSections(main) {
  Array.from(main.querySelectorAll('.section[data-background-image]'))
    .forEach((section) => {
      const bgImage = section.dataset.backgroundImage;
      if (bgImage) {
        createOptimizedBackgroundImage(section, bgImage);
      }
    });
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
async function decorateMain(main) {
  // hopefully forward compatible button decoration
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateButtons)(main);
  await (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateIcons)(main);
  buildAutoBlocks(main);
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSections)(main);
  decorateStyledSections(main);
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateBlocks)(main);
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateSupScriptInTextBelow)(main);

  // import scripts, decorate and observe for page changes only
  // if the page contains a history section.
  const section = main.querySelector('.section.our-history');
  if (section) {
    const { decorateHistorySection, observeHistorySection } = await Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./lib-history-section.js */ "./scripts/lib-history-section.js"));
    await decorateHistorySection(section);
    await observeHistorySection(section);
  }
}

/**
 * Loads everything needed to get to LCP.
 * @param {Element|Document} doc The container element
 */
async function loadEager(doc) {
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.setLanguage)();
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.decorateTemplateAndTheme)();

  const main = doc.querySelector('main');
  if (main) {
    await window.hlx.plugins.run('loadEager');
    await decorateMain(main);
    // await waitForLCP(LCP_BLOCKS);
    document.body.classList.add('loaded');

    try {
      /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
      if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
        loadFonts();
      }
    } catch (e) {
      // do nothing
    }
  }
}

/**
 * Adds a favicon.
 * @param {string} href The favicon URL
 * @param {string} rel The icon rel
 */
function addFavIcon(
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
  /*await */(0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadBlocks)(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  /*await */(0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadHeader)(doc.querySelector('header'));
  /*await */(0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.loadFooter)(doc.querySelector('footer'));

  // is empty anyways
  // loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`, null);
  loadFonts();

  addFavIcon(`${window.hlx.codeBasePath}/styles/icons/favicon-32x32.png`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/icons/favicon-180x180.png`, 'apple-touch-icon');
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.createMetadata)('msapplication-TileImage', `${window.hlx.codeBasePath}/styles/icons/favicon-270x270.png`);
  (0,_lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM)('lazy');
  _lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  _lib_franklin_js__WEBPACK_IMPORTED_MODULE_0__.sampleRUM.observe(main.querySelectorAll('picture > img'));

  await window.hlx.plugins.run('loadLazy');

  // Mark customer as having viewed the page once
  localStorage.setItem('franklin-visitor-returning', Boolean(true).toString());

  document.dispatchEvent(new Event('franklin.loadLazy_completed'));
}

// google tag manager
function loadGTM() {
  if (window.location.hostname.includes('localhost') || document.location.hostname.includes('.hlx.page') || document.location.hostname.includes('.aem.page')) {
    return;
  }

  const scriptTag = document.createElement('script');
  scriptTag.innerHTML = `
  // googleTagManager
  (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
          'gtm.start':
              new Date().getTime(), event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', 'GTM-KNBZTHP');
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('set', {
      'cookie_flags': 'SameSite=None;Secure'
  });
  `;
  document.head.prepend(scriptTag);
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => loadGTM(), 500);
  window.setTimeout(() => {
    window.hlx.plugins.load('delayed');
    window.hlx.plugins.run('loadDelayed');
    // eslint-disable-next-line import/no-cycle
    return Promise.resolve(/*! import() eager */).then(__webpack_require__.bind(__webpack_require__, /*! ./delayed.js */ "./scripts/delayed.js"));
  }, 0);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await window.hlx.plugins.load('eager');
  await loadEager(document);
  await window.hlx.plugins.load('lazy');
  await loadLazy(document);
  loadDelayed();
}

await loadPage();

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/scripts.js");
/******/ 	
/******/ })()
;