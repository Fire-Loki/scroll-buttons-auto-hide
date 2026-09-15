# Scroll Top/Bottom Buttons (Auto Hide)

Простой и удобный userscript, который добавляет кнопки **«Вверх»** и **«Вниз»** на любую страницу.

Кнопки появляются **только во время прокрутки** и автоматически исчезают через короткое время бездействия (по умолчанию 1,5 секунды).  
Работает очень похоже на оверлей-скроллбар в современных браузерах и операционных системах.

## Особенности

- Кнопки появляются только при прокрутке
- Автоматически исчезают через заданное время
- Плавное появление и исчезновение
- Настраиваемые размер, отступы и скорость прокрутки
- Лёгкий и не мешает работе сайтов
- Работает почти на всех сайтах

## Установка

### 1. Установите менеджер скриптов
- [Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (рекомендуется)
- или [Violentmonkey](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag)

### 2. Установка скрипта
Нажмите на кнопку ниже:

[![Install](https://img.shields.io/badge/Install-UserScript-blue?style=for-the-badge)](https://raw.githubusercontent.com/Fire-Loki/scroll-buttons-auto-hide/main/scroll-top-bottom-auto-hide.user.js)

Или вручную:
1. Открой [raw-версию файла](https://raw.githubusercontent.com/Fire-Loki/scroll-buttons-auto-hide/main/scroll-top-bottom-auto-hide.user.js)
2. Tampermonkey предложит установить скрипт

## Настройки

Все настройки находятся в начале скрипта:

| Параметр          | Описание                              | По умолчанию |
|-------------------|---------------------------------------|--------------|
| `HIDE_DELAY`      | Через сколько мс исчезают кнопки      | `1500`       |
| `BUTTON_SIZE`     | Размер кнопок (px)                    | `44`         |
| `RIGHT_OFFSET`    | Отступ справа                         | `20`         |
| `BOTTOM_OFFSET`   | Отступ снизу                          | `30`         |
| `GAP`             | Расстояние между кнопками             | `12`         |
| `SCROLL_BEHAVIOR` | `'smooth'` или `'auto'`               | `'smooth'`   |

Чтобы изменить настройки:
1. Открой Tampermonkey → Dashboard
2. Найди скрипт → нажми «Редактировать»
3. Измени нужные значения
4. Сохрани (`Ctrl + S`)

## Обновление

Скрипт поддерживает автоматическое обновление через `@updateURL`.  
Tampermonkey будет периодически проверять наличие новой версии.

## Лицензия

MIT
