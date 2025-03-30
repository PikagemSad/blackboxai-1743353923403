"use strict";
// DOM элементы
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
// Валидация email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
// Обработка отправки формы
function handleSubmit(e) {
    e.preventDefault();
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    // Сброс предыдущих сообщений
    formMessage.className = 'form-message';
    formMessage.textContent = '';
    // Валидация
    if (nameInput.value.trim() === '') {
        formMessage.textContent = 'Пожалуйста, введите ваше имя';
        formMessage.classList.add('error');
        return;
    }
    if (!isValidEmail(emailInput.value.trim())) {
        formMessage.textContent = 'Пожалуйста, введите корректный email';
        formMessage.classList.add('error');
        return;
    }
    if (messageInput.value.trim() === '') {
        formMessage.textContent = 'Пожалуйста, введите сообщение';
        formMessage.classList.add('error');
        return;
    }
    // Имитация отправки (в реальном проекте здесь был бы fetch запрос)
    setTimeout(() => {
        formMessage.textContent = 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        formMessage.classList.add('success');
        contactForm.reset();
    }, 1000);
}
// Инициализация формы
function initContactForm() {
    contactForm.addEventListener('submit', handleSubmit);
}
// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initContactForm);
