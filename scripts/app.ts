import { photos, Photo } from './photos.js';

// DOM элементы
const photoGrid = document.getElementById('photo-grid') as HTMLDivElement;
const searchInput = document.getElementById('search') as HTMLInputElement;
const searchBtn = document.getElementById('search-btn') as HTMLButtonElement;

// Функция для отрисовки фотографий
function renderPhotos(photosToRender: Photo[]) {
    photoGrid.innerHTML = '';
    
    photosToRender.forEach(photo => {
        const photoCard = document.createElement('div');
        photoCard.className = 'photo-card';
        
        photoCard.innerHTML = `
            <img src="${photo.thumb}" alt="${photo.title}" class="photo-img">
            <div class="photo-info">
                <h3 class="photo-title">${photo.title}</h3>
                <div class="photo-tags">
                    ${photo.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        photoCard.addEventListener('click', () => {
            // В будущем можно добавить открытие модального окна
            console.log('Открыть фото:', photo.url);
        });
        
        photoGrid.appendChild(photoCard);
    });
}

// Функция для поиска фотографий
function searchPhotos() {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        renderPhotos(photos);
        return;
    }
    
    const filteredPhotos = photos.filter(photo => 
        photo.title.toLowerCase().includes(searchTerm) || 
        photo.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    
    renderPhotos(filteredPhotos);
}

// Инициализация приложения
function init() {
    renderPhotos(photos);
    
    // Обработчики событий
    searchBtn.addEventListener('click', searchPhotos);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchPhotos();
        }
    });
}

// Запуск приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', init);