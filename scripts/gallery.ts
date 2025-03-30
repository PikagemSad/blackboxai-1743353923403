import { photos, Photo } from './photos.js';

// DOM элементы
const galleryGrid = document.getElementById('gallery-grid') as HTMLDivElement;
const loadMoreBtn = document.getElementById('load-more') as HTMLButtonElement;
const lightbox = document.getElementById('lightbox') as HTMLDivElement;
const lightboxImg = document.getElementById('lightbox-img') as HTMLImageElement;
const lightboxTitle = document.getElementById('lightbox-title') as HTMLHeadingElement;
const lightboxTags = document.getElementById('lightbox-tags') as HTMLDivElement;
const closeLightbox = document.getElementById('close-lightbox') as HTMLSpanElement;

// Переменные состояния
let currentPage = 1;
const photosPerPage = 6;

// Функция для отрисовки фотографий
function renderPhotos(page: number) {
    const startIndex = (page - 1) * photosPerPage;
    const endIndex = startIndex + photosPerPage;
    const photosToRender = photos.slice(0, endIndex);

    galleryGrid.innerHTML = '';
    
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
        
        photoCard.addEventListener('click', () => openLightbox(photo));
        galleryGrid.appendChild(photoCard);
    });

    // Скрываем кнопку, если все фото загружены
    if (endIndex >= photos.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Функция для открытия lightbox
function openLightbox(photo: Photo) {
    lightboxImg.src = photo.url;
    lightboxImg.alt = photo.title;
    lightboxTitle.textContent = photo.title;
    lightboxTags.innerHTML = photo.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Функция для закрытия lightbox
function closeLightboxHandler() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Инициализация галереи
function initGallery() {
    renderPhotos(currentPage);
    
    // Обработчики событий
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderPhotos(currentPage);
    });
    
    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightboxHandler();
        }
    });
}

// Запуск галереи после загрузки DOM
document.addEventListener('DOMContentLoaded', initGallery);