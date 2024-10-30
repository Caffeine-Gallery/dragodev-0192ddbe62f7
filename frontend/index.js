import { backend } from 'declarations/backend';

const components = [
    { id: 'heading', name: 'Heading', category: 'Basic' },
    { id: 'paragraph', name: 'Text Block', category: 'Basic' },
    { id: 'image', name: 'Image', category: 'Basic' },
    { id: 'button', name: 'Button', category: 'Basic' },
    { id: 'columns', name: '2 Columns', category: 'Layout' },
    { id: 'contactForm', name: 'Contact Form', category: 'Forms' },
];

let elements = [];
let draggedItem = null;
let selectedElement = null;

function initializeBuilder() {
    renderComponentList();
    setupEventListeners();
}

function renderComponentList() {
    const componentList = document.getElementById('componentList');
    const categories = [...new Set(components.map(c => c.category))];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3 class="mt-3">${category}</h3>`;
        
        const categoryComponents = components.filter(c => c.category === category);
        categoryComponents.forEach(component => {
            const componentDiv = document.createElement('div');
            componentDiv.className = 'component p-2 mb-2 bg-white rounded shadow-sm';
            componentDiv.draggable = true;
            componentDiv.innerHTML = component.name;
            componentDiv.dataset.componentId = component.id;
            categoryDiv.appendChild(componentDiv);
        });

        componentList.appendChild(categoryDiv);
    });
}

function setupEventListeners() {
    const componentList = document.getElementById('componentList');
    const canvas = document.getElementById('canvas');

    componentList.addEventListener('dragstart', handleDragStart);
    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);
}

function handleDragStart(e) {
    draggedItem = e.target.dataset.componentId;
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    if (draggedItem) {
        const rect = e.currentTarget.getBoundingClientRect();
        const y = e.clientY - rect.top;
        let insertIndex = Math.floor(y / 50);

        const newElement = {
            id: `${draggedItem}-${Date.now()}`,
            elementType: draggedItem,
            content: `New ${draggedItem}`,
            styles: {
                width: '100%',
                padding: '10px',
                margin: '5px 0',
                border: '1px solid #ccc',
                borderRadius: '4px'
            }
        };

        elements.splice(insertIndex, 0, newElement);
        renderElements();
        draggedItem = null;
    }
}

function renderElements() {
    const canvas = document.getElementById('canvas');
    canvas.innerHTML = '';
    elements.forEach(element => {
        const elementDiv = document.createElement('div');
        elementDiv.className = 'element';
        elementDiv.style.cssText = Object.entries(element.styles).map(([key, value]) => `${key}: ${value}`).join(';');
        elementDiv.innerHTML = renderElementContent(element);
        elementDiv.onclick = () => selectElement(element);
        canvas.appendChild(elementDiv);
    });
}

function renderElementContent(element) {
    switch (element.elementType) {
        case 'heading':
            return `<h2>${element.content}</h2>`;
        case 'paragraph':
            return `<p>${element.content}</p>`;
        case 'image':
            return `<img src="https://via.placeholder.com/300x200" alt="Placeholder" style="max-width: 100%;">`;
        case 'button':
            return `<button class="btn btn-primary">${element.content}</button>`;
        case 'columns':
            return `<div class="row"><div class="col">Column 1</div><div class="col">Column 2</div></div>`;
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
        default:
            return '';
    }
}

function selectElement(element) {
    selectedElement = element;
    // Here you would typically show some UI for editing the selected element
    console.log('Selected element:', element);
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

// Expose saveWebsite function globally
window.saveWebsite = saveWebsite;
