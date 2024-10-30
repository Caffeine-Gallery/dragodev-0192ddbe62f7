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
    { id: 'socialLinks', name: 'Social Links', icon: 'share' }
];

let elements = [];
let draggedItem = null;
let selectedElement = null;
let history = [[]];
let historyIndex = 0;
let viewMode = 'desktop';

function initializeBuilder() {
    renderComponentList();
    setupEventListeners();
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

    componentList.addEventListener('dragstart', handleComponentDragStart);
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
    undoBtn.addEventListener('click', undo);
    redoBtn.addEventListener('click', redo);
    desktopViewBtn.addEventListener('click', () => setViewMode('desktop'));
    mobileViewBtn.addEventListener('click', () => setViewMode('mobile'));
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
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let insertIndex = Math.floor(y / 50);

    const newElement = {
        id: `${draggedItem.id}-${Date.now()}`,
        elementType: draggedItem.id,
        content: `New ${draggedItem.id}`,
        styles: {
            width: '100%',
            fontSize: '16px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: '16px',
            textAlign: 'left',
            fontWeight: 'normal',
            fontStyle: 'normal',
            textDecoration: 'none'
        }
    };

    elements.splice(insertIndex, 0, newElement);
    addToHistory(elements);
    renderElements();
}

function handleElementDrop(e) {
    const elementId = e.dataTransfer.getData('text');
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    let insertIndex = Math.floor(y / 50);

    const elementIndex = elements.findIndex(el => el.id === elementId);
    if (elementIndex !== -1) {
        const [movedElement] = elements.splice(elementIndex, 1);
        elements.splice(insertIndex, 0, movedElement);
        addToHistory(elements);
        renderElements();
    }
}

function renderElements() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'element mb-3 position-relative';
        elementDiv.draggable = true;
        elementDiv.dataset.elementId = element.id;
        elementDiv.style.cssText = Object.entries(element.styles).map(([key, value]) => `${key}: ${value}`).join(';');
        elementDiv.innerHTML = renderElementContent(element);
        elementDiv.onclick = () => selectElement(element);
        elementDiv.ondragstart = handleElementDragStart;
        elementDiv.ondragend = (e) => e.target.style.opacity = '1';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger position-absolute top-0 end-0';
        deleteBtn.innerHTML = '<i class="bi bi-trash"></i>';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            deleteElement(element.id);
        };

        elementDiv.appendChild(deleteBtn);
        canvas.appendChild(elementDiv);
    });
}

function renderElementContent(element) {
    switch (element.elementType) {
        case 'heading':
            return `<h2 contenteditable="true">${element.content}</h2>`;
        case 'paragraph':
            return `<p contenteditable="true">${element.content}</p>`;
        case 'image':
            return `<img src="https://via.placeholder.com/300x200" alt="Placeholder" style="max-width: 100%;">`;
        case 'button':
            return `<button class="btn btn-primary">${element.content}</button>`;
        case 'divider':
            return `<hr>`;
        case 'columns':
            return `<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div></div>`;
        case 'video':
            return `<div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen></iframe></div>`;
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
    `;
}

function updateElementStyle(property, value) {
    if (selectedElement) {
        selectedElement.styles[property] = value;
        addToHistory(elements);
        renderElements();
    }
}

function deleteElement(elementId) {
    elements = elements.filter(el => el.id !== elementId);
    addToHistory(elements);
    renderElements();
}

function addToHistory(newElements) {
    history = history.slice(0, historyIndex + 1);
    history.push(JSON.parse(JSON.stringify(newElements)));
    historyIndex = history.length - 1;
    updateUndoRedoButtons();
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        elements = JSON.parse(JSON.stringify(history[historyIndex]));
        renderElements();
        updateUndoRedoButtons();
    }
}

function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        elements = JSON.parse(JSON.stringify(history[historyIndex]));
        renderElements();
        updateUndoRedoButtons();
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

async function saveWebsite() {
    try {
        await backend.saveWebsite(elements);
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
