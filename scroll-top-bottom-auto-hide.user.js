// ==UserScript==
// @name         Scroll Top/Bottom Buttons (Auto Hide)
// @namespace    https://github.com/Fire-Loki/scroll-buttons-auto-hide
// @version      1.1
// @description  Кнопки вверх/вниз появляются только при прокрутке и исчезают через N секунд
// @author       Fire-Loki
// @match        *://*/*
// @grant        none
// @run-at       document-end
// @downloadURL  https://raw.githubusercontent.com/Fire-Loki/scroll-buttons-auto-hide/main/scroll-top-bottom-auto-hide.user.js
// @updateURL    https://raw.githubusercontent.com/Fire-Loki/scroll-buttons-auto-hide/main/scroll-top-bottom-auto-hide.user.js
// ==/UserScript==

(function() {
    'use strict';

    // ==================== НАСТРОЙКИ ====================
    const HIDE_DELAY = 1500;        // Через сколько мс исчезают кнопки (1500 = 1.5 сек)
    const SHOW_AFTER = 150;         // После скольких пикселей прокрутки показывать кнопки
    const BUTTON_SIZE = 44;         // Размер кнопок в пикселях
    const RIGHT_OFFSET = 20;        // Отступ справа
    const BOTTOM_OFFSET = 30;       // Отступ снизу для нижней кнопки
    const GAP = 12;                 // Расстояние между кнопками
    const SCROLL_BEHAVIOR = 'smooth'; // 'smooth' или 'auto' (мгновенно)
    // ===================================================

    // Создаём контейнер
    const container = document.createElement('div');
    container.id = 'stt-buttons-container';
    Object.assign(container.style, {
        position: 'fixed',
        right: RIGHT_OFFSET + 'px',
        bottom: BOTTOM_OFFSET + 'px',
        zIndex: '999999',
        display: 'flex',
        flexDirection: 'column',
        gap: GAP + 'px',
        opacity: '0',
        visibility: 'hidden',
        transition: 'opacity 0.25s ease, visibility 0.25s ease',
        pointerEvents: 'none'
    });

    // Стили кнопок
    const buttonStyle = {
        width: BUTTON_SIZE + 'px',
        height: BUTTON_SIZE + 'px',
        borderRadius: '50%',
        border: 'none',
        background: 'rgba(0, 0, 0, 0.65)',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        transition: 'background 0.2s, transform 0.15s',
        pointerEvents: 'auto',
        userSelect: 'none'
    };

    // Кнопка "Вверх"
    const btnTop = document.createElement('button');
    btnTop.innerHTML = '↑';
    btnTop.title = 'В начало страницы';
    Object.assign(btnTop.style, buttonStyle);

    // Кнопка "Вниз"
    const btnBottom = document.createElement('button');
    btnBottom.innerHTML = '↓';
    btnBottom.title = 'В конец страницы';
    Object.assign(btnBottom.style, buttonStyle);

    // Hover-эффекты
    [btnTop, btnBottom].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.background = 'rgba(0, 0, 0, 0.85)';
            btn.style.transform = 'scale(1.08)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.background = 'rgba(0, 0, 0, 0.65)';
            btn.style.transform = 'scale(1)';
        });
    });

    // Действия
    btnTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: SCROLL_BEHAVIOR });
    });

    btnBottom.addEventListener('click', () => {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: SCROLL_BEHAVIOR });
    });

    container.appendChild(btnTop);
    container.appendChild(btnBottom);
    document.body.appendChild(container);

    // Логика показа / скрытия
    let hideTimer = null;
let isVisible = false;

    function getScrollInfo() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        );
        const maxScroll = documentHeight - windowHeight;

        return {
            scrollTop,
            maxScroll,
            atTop: scrollTop <= 10,
            atBottom: scrollTop >= maxScroll - 10
        };
    }

    function updateButtonsVisibility() {
        const { scrollTop, atTop, atBottom } = getScrollInfo();

        // Скрываем кнопки на краях
        btnTop.style.opacity = atTop ? '0' : '1';
        btnTop.style.pointerEvents = atTop ? 'none' : 'auto';

        btnBottom.style.opacity = atBottom ? '0' : '1';
        btnBottom.style.pointerEvents = atBottom ? 'none' : 'auto';

        // Показываем контейнер только если прокрутили достаточно далеко
        if (scrollTop > SHOW_AFTER && !atTop) {
            showButtons();
        }
    }

    function showButtons() {
        if (!isVisible) {
            container.style.opacity = '1';
            container.style.visibility = 'visible';
            container.style.pointerEvents = 'auto';
            isVisible = true;
        }

        clearTimeout(hideTimer);
        hideTimer = setTimeout(hideButtons, HIDE_DELAY);
    }

    function hideButtons() {
        container.style.opacity = '0';
        container.style.visibility = 'hidden';
        container.style.pointerEvents = 'none';
        isVisible = false;
    }

    // Обработка прокрутки
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateButtonsVisibility();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // На всякий случай при загрузке
    window.addEventListener('load', updateButtonsVisibility);
    updateButtonsVisibility();
})();
