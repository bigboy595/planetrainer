document.addEventListener('DOMContentLoaded', function () {
    
    // Функция для плавного изменения значения ползунка от min до max и обратно
    function animateSlider(slider, duration, min, max, callback) {
        let startTime = null;
        let isTouched = false; // Флаг для отслеживания, тронул ли пользователь ползунок
        let animationFrameId = null; // ID текущего кадра анимации

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = (progress / duration) * 100; // Процент завершения анимации

            if (!isTouched) { // Проверяем, не тронул ли пользователь ползунок
                if (percent <= 50) {
                    // Увеличиваем значение от min до max
                    slider.value = min + (percent / 50) * (max - min);
                } else {
                    // Уменьшаем значение от max до min
                    slider.value = max - ((percent - 50) / 50) * (max - min);
                }

                // Вызываем callback для обновления связанных элементов
                if (callback) callback(slider.value);

                if (percent < 100) {
                    animationFrameId = requestAnimationFrame(step); // Продолжаем анимацию
                } else {
                    startTime = null; // Сбрасываем время для нового цикла
                    animationFrameId = requestAnimationFrame(step); // Начинаем заново
                }
            }
            // Если isTouched = true, анимация прекращается
        }

        // Запускаем анимацию
        animationFrameId = requestAnimationFrame(step);

        // Останавливаем анимацию, если пользователь трогает ползунок
        slider.addEventListener('mousedown', function () {
            isTouched = true; // Останавливаем анимацию
            cancelAnimationFrame(animationFrameId); // Отменяем текущий кадр анимации
        });

        slider.addEventListener('touchstart', function () {
            isTouched = true; // Останавливаем анимацию для сенсорных устройств
            cancelAnimationFrame(animationFrameId); // Отменяем текущий кадр анимации
        });

        // Возобновляем анимацию, когда пользователь отпускает ползунок
        slider.addEventListener('mouseup', function () {
            isTouched = false; // Сбрасываем флаг
            startTime = null; // Сбрасываем время для нового цикла
            animationFrameId = requestAnimationFrame(step); // Запускаем анимацию снова
        });

        slider.addEventListener('touchend', function () {
            isTouched = false; // Сбрасываем флаг
            startTime = null; // Сбрасываем время для нового цикла
            animationFrameId = requestAnimationFrame(step); // Запускаем анимацию снова
        });
    }

    // Функция для обновления цифр
    function updateNumbers(value) {
        const value1 = document.getElementById('value1');
        const value2 = document.getElementById('value2');
        const value3 = document.getElementById('value3');
        const value4 = document.getElementById('value4');

        value1.textContent = value; // Первая цифра равна значению ползунка
        value2.textContent = value * 2; // Вторая цифра в 2 раза больше
        value3.textContent = value + 5; // Третья цифра на 5 больше
        value4.textContent = value * 0.5; // Четвертая цифра в половину от значения
    }

    // Функция для обновления анимации .columns
    function updateColumnsAnimation(value) {
        const columns = document.querySelector('.columns');
        const animationDuration = (100 - value) / 100 * 1.5 + 0.5;
        columns.style.animationDuration = `${animationDuration}s`;
    }

    // Функция для обновления позиции .screen2fp
    function updateScreen2Fp(value) {
        const screen2 = document.querySelector('.screen2fp');
        let newTop;
        if (value >= 50) {
            newTop = 1 + (value - 50) * (4 / 50); // Интерполяция от 1vw до 5vw
        } else {
            newTop = 1 - (50 - value) * (4 / 50); // Интерполяция от 1vw до -3vw
        }
        screen2.style.top = `${newTop}vw`;
    }

    // Функция для обновления позиции .screen3plashka
    function updateScreen3Plashka(value) {
        const screen3Plashka = document.querySelector('.screen3plashka');
        const newTop = -9 + (value / 100) * 8.5; // Интерполяция от -9vw до -0.5vw
        screen3Plashka.style.top = `${newTop}vw`;
    }

    // Функция для обновления позиции .screen1plashka
    function updateScreen1Plashka(value) {
        const screen1Plashka = document.querySelector('.screen1plashka');
        const newLeft = -14 + (value / 100) * 12.3; // Интерполяция от -14vw до -1.7vw
        screen1Plashka.style.left = `${newLeft}vw`;
    }

    // Центральный ползунок (slider) с анимацией
    const centralSlider = document.getElementById('slider');
    animateSlider(centralSlider, 3000, 100, 600, (value) => {
        updateNumbers(value); // Обновляем только цифры
    });

    // Обработчик для ручного управления центральным ползунком
    centralSlider.addEventListener('input', function () {
        const sliderValue = parseInt(this.value, 10);
        updateNumbers(sliderValue); // Обновляем цифры
    });

    // Запускаем анимацию для остальных ползунков
    const sliders = document.querySelectorAll('input[type="range"]:not(#slider)');
    sliders.forEach(slider => {
        if (!slider.hasAttribute('data-touched')) { // Проверяем, трогал ли пользователь ползунок
            animateSlider(slider, 3000, 0, 100, (value) => {
                // Обновляем связанные элементы для каждого ползунка
                switch (slider.id) {
                    case 'slider1':
                        updateColumnsAnimation(value);
                        break;
                    case 'slider2':
                        updateScreen1Plashka(value);
                        break;
                    case 'slider3':
                        updateScreen2Fp(value);
                        break;
                    case 'slider4':
                        updateScreen3Plashka(value);
                        break;
                }
            });
        }
    });

    // Обработчики для ручного управления остальными ползунками
    sliders.forEach(slider => {
        slider.addEventListener('input', function () {
            const value = parseInt(this.value, 10);

            // Обновляем связанные элементы для каждого ползунка
            switch (slider.id) {
                case 'slider1':
                    updateColumnsAnimation(value);
                    break;
                case 'slider2':
                    updateScreen1Plashka(value);
                    break;
                case 'slider3':
                    updateScreen2Fp(value);
                    break;
                case 'slider4':
                    updateScreen3Plashka(value);
                    break;
            }
        });
    });

    // Шестой блок кода для перетаскивания элементов
    const bags = document.querySelectorAll('.bags div');
    const blackZone = document.querySelector('.blackzone');
    const greenZone = document.querySelector('.greenzone');
    const blueZone = document.querySelector('.bluezone');

    // Обработчик начала перетаскивания
    bags.forEach(bag => {
        bag.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.className); // Сохраняем класс элемента
        });
    });

    // Обработчик для зон (разрешаем drop)
    [blackZone, greenZone, blueZone].forEach(zone => {
        zone.addEventListener('dragover', function (e) {
            e.preventDefault(); // Разрешаем drop
        });

        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            const bagClass = e.dataTransfer.getData('text/plain'); // Получаем класс перетаскиваемого элемента
            const bagElement = document.querySelector(`.${bagClass}`); // Находим элемент

            // Проверяем, в какую зону попал элемент
            if (
                (zone.classList.contains('blackzone') && bagClass.includes('bagblack')) ||
                (zone.classList.contains('greenzone') && bagClass.includes('baggreen')) ||
                (zone.classList.contains('bluezone') && bagClass.includes('bagblue'))
            ) {
                // Если зона правильная, скрываем элемент и возвращаем через 2 секунды
                bagElement.style.opacity = '0'; // Плавное исчезновение
                setTimeout(() => {
                    bagElement.style.opacity = '1'; // Плавное появление
                }, 6000); // 2000 мс = 2 секунды
            } else {
                // Если зона неправильная, показываем предупреждение
                alert('Неверная зона! Перетащите элемент в правильную зону.');
            }
        });
    });



// Обработчик для формы
const formContainer = document.querySelector('.form-container');
const inputField = document.querySelector('.input-field');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', function (e) {
    e.preventDefault(); // Предотвращаем реальную отправку формы

    const text = inputField.value.trim();

    if (text) {
        alert(`Текст "${text}" успешно "отправлен"!`); // Имитация отправки
        inputField.value = ''; // Очищаем поле ввода
    } else {
        alert('Пожалуйста, введите текст!'); // Если поле пустое
    }
});


// Получаем элементы
const aquaElement = document.querySelector('.screencenterstrowaqua');
const pinkElement = document.querySelector('.screencenterstrowpink');
const orangeElement = document.querySelector('.screencenterstroworange');
const whiteElement = document.querySelector('.screencenterstrowwhite');

const aquaButton = document.querySelector('.aqua-button');
const pinkButton = document.querySelector('.pink-button');
const orangeButton = document.querySelector('.orange-button');
const whiteButton = document.querySelector('.white-button');

// Функция для сброса z-index всех элементов
function resetZIndex() {
    aquaElement.style.zIndex = 1;
    pinkElement.style.zIndex = 1;
    orangeElement.style.zIndex = 1;
    whiteElement.style.zIndex = 1;
}

// Обработчики для кнопок
aquaButton.addEventListener('click', function () {
    resetZIndex();
    aquaElement.style.zIndex = 10; // Выводим циановый элемент на передний план
});

pinkButton.addEventListener('click', function () {
    resetZIndex();
    pinkElement.style.zIndex = 10; // Выводим розовый элемент на передний план
});

orangeButton.addEventListener('click', function () {
    resetZIndex();
    orangeElement.style.zIndex = 10; // Выводим оранжевый элемент на передний план
});

whiteButton.addEventListener('click', function () {
    resetZIndex();
    whiteElement.style.zIndex = 10; // Выводим белый элемент на передний план
});



// Получаем элементы
const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const wheel = document.querySelector('.wheel');
const clouds1 = document.querySelector('.clouds1');
const sun = document.querySelector('.sun');

// Функция для поворота элемента
function rotateElement(element, degrees) {
    element.style.transition = 'transform 0.5s ease'; // Плавная анимация
    element.style.transform = `rotate(${degrees}deg)`; // Поворот

    // Возвращаем элемент в исходное положение через 2 секунды
    setTimeout(() => {
        element.style.transition = 'transform 0.5s ease'; // Плавная анимация
        element.style.transform = 'rotate(0deg)'; // Возвращаем в исходное положение
    }, 2000); // 2000 мс = 2 секунды
}

// Обработчики для кнопок
leftButton.addEventListener('click', function () {
    rotateElement(wheel, -30); // Поворачиваем wheel на 30 градусов влево (старая логика)
    rotateElement(clouds1, 30); // Поворачиваем clouds1 на 30 градусов вправо (новая логика)
    rotateElement(sun, 30); // Поворачиваем sun на 30 градусов вправо (новая логика)
});

rightButton.addEventListener('click', function () {
    rotateElement(wheel, 30); // Поворачиваем wheel на 30 градусов вправо (старая логика)
    rotateElement(clouds1, -30); // Поворачиваем clouds1 на 30 градусов влево (новая логика)
    rotateElement(sun, -30); // Поворачиваем sun на 30 градусов влево (новая логика)
});






});
