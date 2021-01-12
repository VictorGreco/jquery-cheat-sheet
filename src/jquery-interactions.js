const load = () => {
    // helpers
    const getScreen = ev => ev?.target?.parentElement?.previousElementSibling;
    const elementGenerator = (tag, attributes) => Object.assign(document.createElement(tag), attributes);
    const clickButtonHandler = (ev, callback) => callback(getScreen(ev), ev);

    // cheet sheet functions
    const isDocumentLoaded = (screen, ev) => {
        $(() => {
            const message = 'Document loaded :D !';
            
            screen.append(elementGenerator('span', { textContent: message }));
    
            return ev.target.classList.add('disabled');
        })
    };

    const showClickedElement = (screen, ev) => {
        const handler = event => {
            screen.append(elementGenerator('pre', { 
                textContent: event.target.outerHTML
            }));

            return setInterval(() => { document.removeEventListener('click', handler) }, 2000);
        };

        screen.innerHTML = '';

        document.addEventListener('click', handler);

        return ev.target.classList.add('disabled');
    }

    const doubleClickItem = (screen, ev) => {
        const handler = () => {
            screen.append(elementGenerator('span', {
                textContent: 'Achivement: Faster doublecliker of the West :D'
            }))

            return document.removeEventListener('dblclick', handler);
        };

        document.addEventListener('dblclick', handler);

        return ev.target.classList.add('disabled');
    };

    const showKeyPress = (screen, ev) => {
        const handler = event => {
            const screenSpan = screen.querySelector('span');

            return !screenSpan ? screen.append(elementGenerator('span', {
                textContent: event.code
            })) : screenSpan.textContent = event.code;
        };

        document.addEventListener('keypress', handler);

        return ev.target.classList.add('disabled');
    };

    const mouseMove = (screen, ev) => {
        const handler = event => {
            const textContent = `X: ${event.offsetX}, Y: ${event.offsetX}`;

            screen.innerHTML = '';

            return screen.append(elementGenerator('span', {
                textContent: textContent
            }))
        };

        document.addEventListener('mousemove', handler);

        return ev.target.classList.add('disabled');
    };

    const inputValueChange = (screen, ev) => {
        const handler = event => {
            screen.innerHTML = '';
            const textContent = event.target.value;

            return screen.append(elementGenerator('span', {
                textContent: textContent
            }));
        };

        ev.target.nextElementSibling.addEventListener('input', handler);

        return ev.target.classList.add('disabled');
    }

    const isImageLoad = (screen, ev) => {
        const imageLoad = function() {
            return this.style.border = '5px solid green';
        } 

        const imageError = function() {
            return this.style.border = '5px solid red';
        } 

        const image = elementGenerator('img', {
            height: 50,
            width: 300,
            src: Math.random() > 0.5 ? 'https://i.imgur.com/8yKeaLf.jpeg' : './wrong-path',
            onload: imageLoad,
            onerror: imageError
        });
        screen.innerHTML = '';

        return screen.appendChild(image);
    };

    const wasFormSmubitted = (screen, ev) => {
        const form = ev.target.nextElementSibling;
        const handler = event => {
            event.preventDefault();
            screen.innerHTML = '';
            screen.appendChild(elementGenerator('span', {
                textContent: 'Form Submited, Yuju !'
            }));
        };

        form.addEventListener('submit', handler);

        return ev.target.classList.add('disabled');
    };

    const onSelectChange = (screen, ev) => {
        const select = ev.target?.nextElementSibling?.querySelector('select');
        const handler = event => {
            screen.innerHTML = '';

            return screen.appendChild(elementGenerator('span', {
                textContent: event.target.value
            }))
        };

        select.addEventListener('change', handler);

        return ev.target.classList.add('disabled');
    }

    const isMouseOver = (screen, ev) => {
        const labItem = ev.target?.nextElementSibling;
        const handler = () => {
            screen.innerHTML = '';
            return screen.appendChild(elementGenerator('span', {
                style: `height: 30px; width: 200px; background-color: #${Math.floor(Math.random() * 16777215).toString(16)};`
            }));
        };

        labItem.addEventListener('mouseover', handler);

        return ev.target.classList.add('disabled');
    }

    const isCheckboxChecked = (screen, ev) => {
        const labItem = ev.target.nextElementSibling;
        const handler = () => {
            const element = screen.querySelector('span') || elementGenerator('span', { textContent: 'Me debes una coca-cola :D' });
            
            return labItem.checked ? screen.appendChild(element) : screen.removeChild(element);
        }

        labItem.addEventListener('change', handler);

        return ev.target.classList.add('disabled');
    };

    const clickUlListItem = (screen, ev) => {
        const labItem = ev.target?.nextElementSibling;
        const labItemLiArray = labItem.querySelectorAll('li');
        const handler = ev => {
            screen.innerHTML = '';
            screen.appendChild(elementGenerator('li', { textContent: ev.target.textContent }));
        };

        labItemLiArray.forEach(li => li.addEventListener('click', handler));

        return ev.target.classList.add('disabled');
    };

    const randomHtmlElementAppender = (screen, ev) => {
        const labItemValue = ev.target?.nextElementSibling?.value;
        const tags = ['h1', 'h3', 'p', 'a', 'pre', 'button', 'strong'];
        const tag = tags[Math.floor(Math.random() * tags.length)];

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: labItemValue }))
    }

    const removeElementByTextContent = (screen, ev) => {
        const labItems = ev.target?.parentElement?.querySelectorAll('input');
        const textContent = labItems[0].value;
        const tag = labItems[1].value;
        const elementToRemove = document.evaluate(`//${tag}[contains(., '${textContent}')]`, document, null, XPathResult.ANY_TYPE, null).iterateNext();

        elementToRemove?.parentNode?.removeChild(elementToRemove);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: `removed ${elementToRemove.tagName}` }));
    };

    const htmlAbstractAppender = (screen, ev) => {
        const labItems = ev.target?.parentElement?.querySelectorAll('input');
        const textContent = labItems[0].value;
        const tag = labItems[1].value;
        const parentSelector = labItems[2].value;

        const element = document.evaluate(`//${tag}[contains(., '${textContent}')]`, document, null, XPathResult.ANY_TYPE, null).iterateNext();
        const parentElement = document.querySelector(parentSelector);

        parentElement.appendChild(element);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: `appended ${element.tagName} to ${parentElement.tagName}` }));
    };

    const htmlAbstractPrepender = (screen, ev) => {
        const labItems = ev.target?.parentElement?.querySelectorAll('input');
        const textContent = labItems[0].value;
        const tag = labItems[1].value;
        const parentSelector = labItems[2].value;
        const element = document.evaluate(`//${tag}[contains(., '${textContent}')]`, document, null, XPathResult.ANY_TYPE, null).iterateNext();
        const parentElement = document.querySelector(parentSelector);

        parentElement.prepend(element);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: `prepended ${element.tagName} to ${parentElement.tagName}` }))
    };


    const createElementAndAppend = (screen, ev) => {
        const labItems = ev.target?.parentElement.querySelectorAll('input');
        const textContent = labItems[0].value;
        const tag = labItems[1].value;
        const parentSelector = labItems[2].value
        const element = elementGenerator(tag, { textContent: textContent });
        const parentElement = document.querySelector(parentSelector);

        parentElement.appendChild(element);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: `element ${element.tagName} created and appended to ${parentElement.tagName}`}));
    };

    const createElementAndPrepend = (screen, ev) => {
        const labItems = ev.target?.parentElement.querySelectorAll('input');
        const textContent = labItems[0].value;
        const tag = labItems[1].value;
        const parentSelector = labItems[2].value;
        const parentElement = document.querySelector(parentSelector);
        const element = elementGenerator(tag, { textContent: textContent });

        parentElement.prepend(element);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator(tag, { textContent: `element ${element.tagName} created and prepended to ${parentElement.tagName}` }))
    };


    const cloneChildNode = (screen, ev) => {
        const labItems = ev.target?.parentElement?.querySelectorAll('input');
        const parentSelector = labItems[0].value;
        const childSelector = labItems[1].value;
        const clonedElement = document.querySelector(`${parentSelector} ${childSelector}`).cloneNode();

        screen.innerHTML = '';

        screen.appendChild(clonedElement)

        return screen.appendChild(elementGenerator('span', { textContent: `cloned child ${clonedElement.tagName} here! Check HTML !` }));
    };

    const addClass = (screen, ev) => {
        const labItems = ev?.target?.parentElement?.querySelectorAll('input');
        const element = document.querySelector(labItems[0].value);
        const classToAdd = labItems[1].value;
        element.classList.add(classToAdd);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `added class ${classToAdd} from ${element.tagName}` }));
    }

    const removeClass = (screen, ev) => {
        const labItems = ev?.target?.parentElement.querySelectorAll('input');
        const element = document.querySelector(labItems[0].value);
        const classToAdd = labItems[1].value;

        element.classList.remove(classToAdd);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `removed class ${classToAdd} from ${element.tagName}` }));
    }

    const toggleClass = (screen, ev) => {
        const labItems = ev.target?.parentElement?.querySelectorAll('input');
        const element = document.querySelector(labItems[0].value);
        const classToAdd = labItems[1].value;
        const elementClassList = element.classList;

        elementClassList.contains(classToAdd) ? elementClassList.remove(classToAdd) : elementClassList.add(classToAdd);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `${elementClassList.includes(classToAdd) ? 'removed': 'added'} class ${classToAdd}` }));
    }

    const disableElement = (screen, ev) => {
        const labItem = ev.target?.parentElement?.querySelector('input');
        const element = document.querySelector(labItem.value);

        element.setAttribute('disabled', true);

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `disabled ${element.tagName}` }));
    }

    const enableElement = (screen, ev) => {
        const labItem = ev.target?.parentElement?.querySelector('input');
        const element = document.querySelector(labItem.value);

        element.removeAttribute('disabled');

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `enabled ${element.tagName}` }));

    }

    const setDataSrc = screen => {
        const img = screen.querySelector('img');
        const src = 'https://i.imgur.com/8yKeaLf.jpeg';

        img?.setAttribute('data-src', src);

        return img.src = img?.getAttribute('data-src');
    }

    const removeDataSrc = (screen, ev) => {
        const img = screen.querySelector('img');

        img?.removeAttribute('data-src');

        return img.src = img?.getAttribute('data-src');
    }

    const hideElement = ev => {
        const labItem = ev?.target?.parentElement?.querySelector('input');
        const element = document.querySelector(labItem.value);

        return element.style.display = 'none';
    }

    const showElement = ev => {
        const labItem = ev.target?.parentElement.querySelector('input');
        const element = document.querySelector(labItem.value);

        return element.style.display = 'block';
    }

    const fadeIn = screen => {
        const element = screen.querySelector('span');

        element.style = 'opacity: 0; display: block;';
        (function fade() {
            var val = parseFloat(element.style.opacity);
            if (!((val += .1) > 1)) {
                element.style.opacity = val;
                requestAnimationFrame(fade);
            }
        })();
    };

    const fadeOut = screen => {
        const element = screen.querySelector('span');

        element.style.opacity = 1;
        (function fade() {
            if ((element.style.opacity -= .1) < 0) {
                element.style.display = 'none';
            } else {
                requestAnimationFrame(fade);
            }
        })();
    };

    const abstractColorator = (screen, ev) => {
        const liItems = ev.target?.parentElement?.querySelectorAll('ul li');
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        liItems.forEach(li => { li.style.color = randomColor;});

        screen.innerHTML = '';

        return screen.appendChild(elementGenerator('span', { textContent: `color ${randomColor}`, style: `color: ${randomColor};` }));
    }

    const changeParentFontWeight = (screen, ev) => {
        const labItems = ev?.target?.parentElement.querySelectorAll('input');
        const element = document.querySelector(labItems[0].value);
        const fontWeight = labItems[1].value;

        element.style.fontWeight = fontWeight

        return screen.appendChild(elementGenerator('span', { textContent: `set ${element.tagName} parent font wight to ${fontWeight}` }));
    }


    const changeChildrenFontWeight = (screen, ev) => {
        const labItems = ev?.target?.parentElement.querySelectorAll('input');
        const element = document.querySelector(labItems[0].value);
        const elementChildren = element.childNodes;
        const fontWeightValue = labItems[1].value;

        elementChildren.forEach(child => !!child.tagName && child.setAttribute('style', `fontWeight: ${fontWeightValue};`));

        return screen.appendChild(elementGenerator('span', { textContent: `set ${element.tagName} ${elementChildren.length + 1} childrens font wight to ${fontWeightValue}` }));
    }

    const changeFontWeightById = (screen, ev) => {
        const labItems = ev?.target?.parentElement?.querySelectorAll('input');
        const fontWeightValue = labItems[1].value;
        const element = document.getElementById(labItems[0].value);

        element.style.fontWeight = fontWeightValue;

        return screen.appendChild(elementGenerator('span', { textContent: `set ${element.tagName} font wight to ${fontWeightValue}` }));
    }

    const changeFontColorHiddenElementsByClass = (screen, ev) => {
        const labItem = ev?.target?.parentElement?.querySelector('input');
        const selector = labItem.value;
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        const elements = document.querySelectorAll(`${selector}[style*='display: none;']`);

        elements.forEach(element => element.style.color = randomColor);

        return screen.appendChild(elementGenerator('span', { textContent: `set color of ${elements.length} elements to ${randomColor}` }));
    }

    const getSelectedOptions = (screen, ev) => {
        const labItem = ev?.target?.parentElement?.querySelector('select option[selected]');

        return screen.appendChild(elementGenerator('span', { textContent: labItem.value }));
    };

    const changeHrefFirstA = screen => screen.querySelector('a').href = '#';

    const alertFirstInput = () => alert(document.querySelector('input')?.value);

    const removeItems = (screen, ev) => {
        const labItem = ev?.target?.parentElement?.querySelector('input');
        const items = document.querySelectorAll(labItem.value);

        items.forEach(item => item.parentElement.removeChild(item));

        return screen.appendChild(elementGenerator('span', { textContent: `removed ${items.length} items` }));
    };

    const animeteItem = screen => {
        const keyframes = [
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ];

        return screen.querySelector('img').animate(keyframes, { duration: 1000, iterations: Infinity });
    }

    var CLASS_TO_EVENT = {
        'jquery-isDocumentLoaded': ev => clickButtonHandler(ev, isDocumentLoaded),
        'jquery-showClickedElement': ev => clickButtonHandler(ev, showClickedElement),
        'jquery-doubleClickItem': ev => clickButtonHandler(ev, doubleClickItem),
        'jquery-showKeyPress': ev => clickButtonHandler(ev, showKeyPress),
        'jquery-mouseMove': ev => clickButtonHandler(ev, mouseMove),
        'jquery-inputValueChange': ev => clickButtonHandler(ev, inputValueChange),
        'jquery-isImageLoad': ev => clickButtonHandler(ev, isImageLoad),
        'jquery-wasFormSmubitted': ev => clickButtonHandler(ev, wasFormSmubitted),
        'jquery-onSelectChange': ev => clickButtonHandler(ev, onSelectChange),
        'jquery-isMouseOver': ev => clickButtonHandler(ev, isMouseOver),
        'jquery-isCheckboxChecked': ev => clickButtonHandler(ev, isCheckboxChecked),
        'jquery-clickUlListItem': ev => clickButtonHandler(ev, clickUlListItem),
        'jquery-randomHtmlElementAppender': ev => clickButtonHandler(ev, randomHtmlElementAppender),
        'jquery-removeElementByTextContent': ev => clickButtonHandler(ev, removeElementByTextContent),
        'jquery-htmlAbstractAppender': ev => clickButtonHandler(ev, htmlAbstractAppender),
        'jquery-htmlAbstractPrepender': ev => clickButtonHandler(ev, htmlAbstractPrepender),
        'jquery-createElementAndAppend': ev => clickButtonHandler(ev, createElementAndAppend),
        'jquery-createElementAndPrepend': ev => clickButtonHandler(ev, createElementAndPrepend),
        'jquery-cloneChildNode': ev => clickButtonHandler(ev, cloneChildNode),
        'jquery-addClass': ev => clickButtonHandler(ev, addClass),
        'jquery-removeClass': ev => clickButtonHandler(ev, removeClass),
        'jquery-toggleClass': ev => clickButtonHandler(ev, toggleClass),
        'jquery-disableElement': ev => clickButtonHandler(ev, disableElement),
        'jquery-enableElement': ev => clickButtonHandler(ev, enableElement),
        'jquery-setDataSrc': ev => clickButtonHandler(ev, setDataSrc),
        'jquery-removeDataSrc': ev => clickButtonHandler(ev, removeDataSrc),
        'jquery-hideElement': ev => clickButtonHandler(ev, hideElement),
        'jquery-showElement': ev => clickButtonHandler(ev, showElement),
        'jquery-fadeIn': ev => clickButtonHandler(ev, fadeIn),
        'jquery-fadeOut': ev => clickButtonHandler(ev, fadeOut),
        'jquery-abstractColorator': ev => clickButtonHandler(ev, abstractColorator),
        'jquery-changeParentFontWeight': ev => clickButtonHandler(ev, changeParentFontWeight),
        'jquery-changeChildrenFontWeight': ev => clickButtonHandler(ev, changeChildrenFontWeight),
        'jquery-changeFontWeightById': ev => clickButtonHandler(ev, changeFontWeightById),
        'jquery-changeFontColorHiddenElementsByClass': ev => clickButtonHandler(ev, changeFontColorHiddenElementsByClass),
        'jquery-getSelectedOptions': ev => clickButtonHandler(ev, getSelectedOptions),
        'jquery-changeHrefFirstA': ev => clickButtonHandler(ev, changeHrefFirstA),
        'jquery-alertFirstInput': ev => clickButtonHandler(ev, alertFirstInput),
        'jquery-removeItems': ev => clickButtonHandler(ev, removeItems),
        'jquery-animeteItem': ev => clickButtonHandler(ev, animeteItem)
    };

    (() => document.querySelectorAll('[id*="jquery"]').forEach(button =>
        button.addEventListener('click', CLASS_TO_EVENT[button.id]))
    )();
};

window.onload = load;