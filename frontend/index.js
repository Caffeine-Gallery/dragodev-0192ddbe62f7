import { backend } from 'declarations/backend';

const components = [
    { id: 'heading', name: 'Heading', icon: 'type' },
    { id: 'paragraph', name: 'Text Block', icon: 'text-paragraph' },
    { id: 'image', name: 'Image', icon: 'image' },
    { id: 'button', name: 'Button', icon: 'square' },
    { id: 'divider', name: 'Divider', icon: 'hr' },
    { id: 'columns', name: '2 Columns', icon: 'layout-split' },
    { id: 'video', name: 'Video', icon: 'youtube' },
    { id: 'contactForm', name: 'Contact Form', icon: 'envelope' },
    { id: 'socialLinks', name: 'Social Links', icon: 'share' },
    { id: 'slider', name: 'Slider', icon: 'sliders' },
    { id: 'accordion', name: 'Accordion', icon: 'list' },
    { id: 'tabs', name: 'Tabs', icon: 'folder' },
    { id: 'map', name: 'Map', icon: 'map' },
    { id: 'countdown', name: 'Countdown', icon: 'clock' },
];

let website = null;
let draggedItem = null;
let selectedElement = null;
let history = [];
let historyIndex = -1;
let viewMode = 'desktop';

async function initializeBuilder() {
    renderComponentList();
    setupEventListeners();
    await loadDefaultTemplate();
}

async function loadDefaultTemplate() {
    try {
        website = await backend.getDefaultTemplate();
        addToHistory(website);
        renderWebsite();
    } catch (error) {
        console.error('Error loading default template:', error);
        alert('Failed to load default template. Starting with an empty canvas.');
        website = { elements: [], colorScheme: 'default' };
    }
}

function renderComponentList() {
    const componentList = document.getElementById('componentList');
    components.forEach(component => {
        const componentDiv = document.createElement('div');
        componentDiv.className = 'component p-2 mb-2 bg-white rounded shadow-sm';
        componentDiv.draggable = true;
        componentDiv.innerHTML = `<i class="bi bi-${component.icon} me-2"></i>${component.name}`;
        componentDiv.dataset.componentId = component.id;
        componentList.appendChild(componentDiv);
    });
}

function setupEventListeners() {
    const componentList = document.getElementById('componentList');
    const canvas = document.getElementById('canvas');
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');
    const desktopViewBtn = document.getElementById('desktopViewBtn');
    const mobileViewBtn = document.getElementById('mobileViewBtn');
    const resetBtn = document.getElementById('resetBtn');
    const colorSchemeSelect = document.getElementById('colorSchemeSelect');

    componentList.addEventListener('dragstart', handleComponentDragStart);
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    desktopViewBtn.addEventListener('click', () => setViewMode('desktop'));
    mobileViewBtn.addEventListener('click', () => setViewMode('mobile'));
    resetBtn.addEventListener('click', loadDefaultTemplate);
    colorSchemeSelect.addEventListener('change', changeColorScheme);
}

function handleComponentDragStart(e) {
    draggedItem = { type: 'component', id: e.target.dataset.componentId };
}

function handleElementDragStart(e) {
    draggedItem = { type: 'element', id: e.target.dataset.elementId };
    e.dataTransfer.setData('text/plain', e.target.dataset.elementId);
    e.target.style.opacity = '0.5';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const afterElement = getDragAfterElement(e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
        e.target.appendChild(draggable);
    } else {
        e.target.insertBefore(draggable, afterElement);
    }
}

function getDragAfterElement(y) {
    const draggableElements = [...document.querySelectorAll('.element:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedItem.type === 'component') {
        handleComponentDrop(e);
    } else if (draggedItem.type === 'element') {
        handleElementDrop(e);
    }
    draggedItem = null;
}

function handleComponentDrop(e) {
    const newElement = createNewElement(draggedItem.id);
    const afterElement = getDragAfterElement(e.clientY);
    const parentElement = getParentElement(e.target);
    
    if (parentElement) {
        const index = afterElement ? 
            parentElement.children.findIndex(el => el.id === afterElement.dataset.elementId) :
            parentElement.children.length;
        parentElement.children.splice(index, 0, newElement);
    } else {
        const index = afterElement ?
            website.elements.findIndex(el => el.id === afterElement.dataset.elementId) :
            website.elements.length;
        website.elements.splice(index, 0, newElement);
    }

    addToHistory(website);
    renderWebsite();
}

function handleElementDrop(e) {
    const elementId = e.dataTransfer.getData('text');
    const afterElement = getDragAfterElement(e.clientY);
    const parentElement = getParentElement(e.target);
    
    let draggedElement;
    let draggedElementIndex;

    if (parentElement) {
        draggedElementIndex = parentElement.children.findIndex(el => el.id === elementId);
        if (draggedElementIndex !== -1) {
            [draggedElement] = parentElement.children.splice(draggedElementIndex, 1);
        }
    } else {
        draggedElementIndex = website.elements.findIndex(el => el.id === elementId);
        if (draggedElementIndex !== -1) {
            [draggedElement] = website.elements.splice(draggedElementIndex, 1);
        }
    }

    if (draggedElement) {
        if (parentElement) {
            const index = afterElement ? 
                parentElement.children.findIndex(el => el.id === afterElement.dataset.elementId) :
                parentElement.children.length;
            parentElement.children.splice(index, 0, draggedElement);
        } else {
            const index = afterElement ?
                website.elements.findIndex(el => el.id === afterElement.dataset.elementId) :
                website.elements.length;
            website.elements.splice(index, 0, draggedElement);
        }

        addToHistory(website);
        renderWebsite();
    }
}

function getParentElement(target) {
    let current = target;
    while (current !== null) {
        if (current.classList && current.classList.contains('element') && current.dataset.elementId) {
            return findElementById(website.elements, current.dataset.elementId);
        }
        current = current.parentElement;
    }
    return null;
}

function findElementById(elements, id) {
    for (let element of elements) {
        if (element.id === id) {
            return element;
        }
        if (element.children && element.children.length > 0) {
            const found = findElementById(element.children, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
}

function createNewElement(elementType) {
    return {
        id: `${elementType}-${Date.now()}`,
        elementType: elementType,
        content: `New ${elementType}`,
        styles: {
            width: '100%',
            height: 'auto',
            fontSize: '16px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: '16px',
            margin: '0',
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none',
            borderRadius: '0',
            boxShadow: 'none'
        },
        children: []
    };
}

function renderWebsite() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    website.elements.forEach(element => {
        canvas.appendChild(renderElement(element));
    });
    updateUndoRedoButtons();
}

function renderElement(element) {
    const elementDiv = document.createElement('div');
    elementDiv.className = 'element mb-3 position-relative';
    elementDiv.draggable = true;
    elementDiv.dataset.elementId = element.id;
    elementDiv.style.cssText = Object.entries(element.styles).map(([key, value]) => `${key}: ${value}`).join(';');
    elementDiv.innerHTML = renderElementContent(element);
    elementDiv.onclick = (e) => {
        e.stopPropagation();
        selectElement(element);
    };
    elementDiv.ondragstart = handleElementDragStart;
    elementDiv.ondragend = (e) => {
        e.target.style.opacity = '1';
        e.target.classList.remove('dragging');
    };
    elementDiv.ondrag = (e) => {
        e.target.classList.add('dragging');
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0';
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
    deleteBtn.onclick = (e) => {
        e.stopPropagation();
        deleteElement(element.id);
    };

    elementDiv.appendChild(deleteBtn);

    if (element.children && element.children.length > 0) {
        const childrenContainer = document.createElement('div');
        childrenContainer.className = 'children-container';
        element.children.forEach(child => {
            childrenContainer.appendChild(renderElement(child));
        });
        elementDiv.appendChild(childrenContainer);
    }

    return elementDiv;
}

function renderElementContent(element) {
    switch (element.elementType) {
        case 'heading':
            return `<h2 contenteditable="true">${element.content}</h2>`;
        case 'paragraph':
            return `<p contenteditable="true">${element.content}</p>`;
        case 'image':
            return `<img src="${element.content}" alt="Image" style="max-width: 100%;">`;
        case 'button':
            return `<button class="btn btn-primary">${element.content}</button>`;
        case 'divider':
            return `<hr>`;
        case 'columns':
            return `<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div></div>`;
        case 'video':
            return `<div class="ratio ratio-16x9"><iframe src="${element.content}" allowfullscreen></iframe></div>`;
        case 'contactForm':
            return `
                <form>
                    <div class="mb-3">
                        <input type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="mb-3">
                        <input type="email" class="form-control" placeholder="Email">
                    </div>
                    <div class="mb-3">
                        <textarea class="form-control" rows="3" placeholder="Message"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Send</button>
                </form>
            `;
        case 'socialLinks':
            return `
                <div class="d-flex gap-3">
                    <i class="bi bi-facebook fs-4"></i>
                    <i class="bi bi-twitter fs-4"></i>
                    <i class="bi bi-instagram fs-4"></i>
                </div>
            `;
        case 'slider':
            return `<div class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://via.placeholder.com/800x400?text=Slide+1" class="d-block w-100" alt="Slide 1">
                            </div>
                            <div class="carousel-item">
                                <img src="https://via.placeholder.com/800x400?text=Slide+2" class="d-block w-100" alt="Slide 2">
                            </div>
                            <div class="carousel-item">
                                <img src="https://via.placeholder.com/800x400?text=Slide+3" class="d-block w-100" alt="Slide 3">
                            </div>
                        </div>
                    </div>`;
        case 'accordion':
            return `<div class="accordion" id="accordionExample">
                        <div class="accordion-item">
                            <h2 class="accordion-header">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    Accordion Item #1
                                </button>
                            </h2>
                            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    Content for accordion item #1
                                </div>
                            </div>
                        </div>
                    </div>`;
        case 'tabs':
            return `<ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab">Home</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab">Profile</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel">Home content</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel">Profile content</div>
                    </div>`;
        case 'map':
            return `<div id="map" style="height: 400px;">Map placeholder</div>`;
        case 'countdown':
            return `<div class="countdown">Countdown placeholder</div>`;
        default:
            return '';
    }
}

function selectElement(element) {
    selectedElement = element;
    showStyleEditor();
}

function showStyleEditor() {
    const styleEditor = document.getElementById('styleEditor');
    const styleOptions = document.getElementById('styleOptions');
    styleEditor.style.display = 'block';
    styleOptions.innerHTML = `
        <div class="mb-3">
            <label>Text Alignment</label>
            <div class="btn-group" role="group">
                <button class="btn btn-outline-secondary" onclick="updateElementStyle('textAlign', 'left')"><i class="bi bi-text-left"></i></button>
                <button class="btn btn-outline-secondary" onclick="updateElementStyle('textAlign', 'center')"><i class="bi bi-text-center"></i></button>
                <button class="btn btn-outline-secondary" onclick="updateElementStyle('textAlign', 'right')"><i class="bi bi-text-right"></i></button>
            </div>
        </div>
        <div class="mb-3">
            <label>Text Color</label>
            <input type="color" class="form-control" value="${selectedElement.styles.color}" onchange="updateElementStyle('color', this.value)">
        </div>
        <div class="mb-3">
            <label>Background Color</label>
            <input type="color" class="form-control" value="${selectedElement.styles.backgroundColor}" onchange="updateElementStyle('backgroundColor', this.value)">
        </div>
        <div class="mb-3">
            <label>Padding</label>
            <input type="range" class="form-range" min="0" max="48" value="${parseInt(selectedElement.styles.padding)}" onchange="updateElementStyle('padding', this.value + 'px')">
        </div>
        <div class="mb-3">
            <label>Font Size</label>
            <input type="range" class="form-range" min="8" max="72" value="${parseInt(selectedElement.styles.fontSize)}" onchange="updateElementStyle('fontSize', this.value + 'px')">
        </div>
        <div class="mb-3">
            <label>Font Weight</label>
            <select class="form-select" onchange="updateElementStyle('fontWeight', this.value)">
                <option value="normal" ${selectedElement.styles.fontWeight === 'normal' ? 'selected' : ''}>Normal</option>
                <option value="bold" ${selectedElement.styles.fontWeight === 'bold' ? 'selected' : ''}>Bold</option>
            </select>
        </div>
        <div class="mb-3">
            <label>Border Radius</label>
            <input type="range" class="form-range" min="0" max="50" value="${parseInt(selectedElement.styles.borderRadius)}" onchange="updateElementStyle('borderRadius', this.value + 'px')">
        </div>
    `;
}

function updateElementStyle(property, value) {
    if (selectedElement) {
        selectedElement.styles[property] = value;
        addToHistory(website);
        renderWebsite();
    }
}

function deleteElement(elementId) {
    website.elements = removeElementById(website.elements, elementId);
    addToHistory(website);
    renderWebsite();
}

function removeElementById(elements, id) {
    return elements.filter(el => {
        if (el.id === id) {
            return false;
        }
        if (el.children && el.children.length > 0) {
            el.children = removeElementById(el.children, id);
        }
        return true;
    });
}

function addToHistory(newWebsite) {
    history = history.slice(0, historyIndex + 1);
    history.push(JSON.parse(JSON.stringify(newWebsite)));
    historyIndex = history.length - 1;
    updateUndoRedoButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        website = JSON.parse(JSON.stringify(history[historyIndex]));
        renderWebsite();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        website = JSON.parse(JSON.stringify(history[historyIndex]));
        renderWebsite();
    }
}

function updateUndoRedoButtons() {
    document.getElementById('undoBtn').disabled = historyIndex === 0;
    document.getElementById('redoBtn').disabled = historyIndex === history.length - 1;
}

function setViewMode(mode) {
    viewMode = mode;
    const canvas = document.getElementById('canvas');
    if (mode === 'mobile') {
        canvas.style.maxWidth = '375px';
        canvas.style.margin = '0 auto';
    } else {
        canvas.style.maxWidth = '100%';
        canvas.style.margin = '0';
    }
}

function changeColorScheme(e) {
    website.colorScheme = e.target.value;
    addToHistory(website);
    applyColorScheme();
}

function applyColorScheme() {
    const root = document.documentElement;
    switch (website.colorScheme) {
        case 'dark':
            root.style.setProperty('--primary-color', '#3498db');
            root.style.setProperty('--secondary-color', '#2c3e50');
            root.style.setProperty('--background-color', '#34495e');
            root.style.setProperty('--text-color', '#ecf0f1');
            break;
        case 'light':
            root.style.setProperty('--primary-color', '#3498db');
            root.style.setProperty('--secondary-color', '#bdc3c7');
            root.style.setProperty('--background-color', '#ecf0f1');
            root.style.setProperty('--text-color', '#2c3e50');
            break;
        default:
            root.style.setProperty('--primary-color', '#3498db');
            root.style.setProperty('--secondary-color', '#2ecc71');
            root.style.setProperty('--background-color', '#ffffff');
            root.style.setProperty('--text-color', '#2c3e50');
    }
}

async function saveWebsite() {
    try {
        await backend.saveWebsite(website);
        alert('Website saved successfully!');
    } catch (error) {
        console.error('Error saving website:', error);
        alert('Failed to save website. Please try again.');
    }
}

window.addEventListener('load', initializeBuilder);

// Expose functions globally
window.updateElementStyle = updateElementStyle;
window.saveWebsite = saveWebsite;
window.changeColorScheme = changeColorScheme;
