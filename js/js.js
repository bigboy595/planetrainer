document.addEventListener('DOMContentLoaded', function () {
    // Функция проверки мобильного устройства
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Lazy load изображений
    const images = document.querySelectorAll('img[data-src]');
    const loadImage = (img) => {
        img.src = img.dataset.src;
        img.onload = () => {
            img.classList.add('lazyloaded');
        };
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach((img) => observer.observe(img));

    // Функция для плавного изменения значения ползунка от min до max и обратно
    function animateSlider(slider, duration, min, max, callback) {
        let startTime = null;
        let isTouched = false;
        let animationFrameId = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = (progress / duration) * 100;

            if (!isTouched) {
                if (percent <= 50) {
                    slider.value = min + (percent / 50) * (max - min);
                } else {
                    slider.value = max - ((percent - 50) / 50) * (max - min);
                }

                if (callback) callback(slider.value);

                if (percent < 100) {
                    animationFrameId = requestAnimationFrame(step);
                } else {
                    startTime = null;
                    animationFrameId = requestAnimationFrame(step);
                }
            }
        }

        // Запускаем анимацию только если не мобильное устройство
        if (!isMobile()) {
            animationFrameId = requestAnimationFrame(step);
        }

        slider.addEventListener('mousedown', function () {
            isTouched = true;
            cancelAnimationFrame(animationFrameId);
        });

        slider.addEventListener('touchstart', function () {
            isTouched = true;
            cancelAnimationFrame(animationFrameId);
        });

        slider.addEventListener('mouseup', function () {
            isTouched = false;
            startTime = null;
            if (!isMobile()) {
                animationFrameId = requestAnimationFrame(step);
            }
        });

        slider.addEventListener('touchend', function () {
            isTouched = false;
            startTime = null;
            if (!isMobile()) {
                animationFrameId = requestAnimationFrame(step);
            }
        });
    }

    // Функции обновления интерфейса
    function updateNumbers(value) {
        const value1 = document.getElementById('value1');
        const value2 = document.getElementById('value2');
        const value3 = document.getElementById('value3');
        const value4 = document.getElementById('value4');

        value1.textContent = value;
        value2.textContent = value * 2;
        value3.textContent = value + 5;
        value4.textContent = value * 0.5;
    }

    function updateColumnsAnimation(value) {
        const columns = document.querySelector('.columns');
        const animationDuration = (100 - value) / 100 * 1.5 + 0.5;
        columns.style.animationDuration = `${animationDuration}s`;
    }

    function updateScreen2Fp(value) {
        const screen2 = document.querySelector('.screen2fp');
        let newTop;
        if (value >= 50) {
            newTop = 1 + (value - 50) * (4 / 50);
        } else {
            newTop = 1 - (50 - value) * (4 / 50);
        }
        screen2.style.top = `${newTop}vw`;
    }

    function updateScreen3Plashka(value) {
        const screen3Plashka = document.querySelector('.screen3plashka');
        const newTop = -9 + (value / 100) * 8.5;
        screen3Plashka.style.top = `${newTop}vw`;
    }

    function updateScreen1Plashka(value) {
        const screen1Plashka = document.querySelector('.screen1plashka');
        const newLeft = -14 + (value / 100) * 12.3;
        screen1Plashka.style.left = `${newLeft}vw`;
    }

    // Инициализация ползунков
    const centralSlider = document.getElementById('slider');
    animateSlider(centralSlider, 3000, 100, 600, updateNumbers);
    
    centralSlider.addEventListener('input', function () {
        updateNumbers(parseInt(this.value, 10));
    });

    const sliders = document.querySelectorAll('input[type="range"]:not(#slider)');
    sliders.forEach(slider => {
        if (!slider.hasAttribute('data-touched')) {
            animateSlider(slider, 3000, 0, 100, (value) => {
                switch (slider.id) {
                    case 'slider1': updateColumnsAnimation(value); break;
                    case 'slider2': updateScreen1Plashka(value); break;
                    case 'slider3': updateScreen2Fp(value); break;
                    case 'slider4': updateScreen3Plashka(value); break;
                }
            });
        }
    });

    sliders.forEach(slider => {
        slider.addEventListener('input', function () {
            const value = parseInt(this.value, 10);
            switch (slider.id) {
                case 'slider1': updateColumnsAnimation(value); break;
                case 'slider2': updateScreen1Plashka(value); break;
                case 'slider3': updateScreen2Fp(value); break;
                case 'slider4': updateScreen3Plashka(value); break;
            }
        });
    });

    // Drag and drop для багажа
    const bags = document.querySelectorAll('.bags div');
    const blackZone = document.querySelector('.blackzone');
    const greenZone = document.querySelector('.greenzone');
    const blueZone = document.querySelector('.bluezone');

    bags.forEach(bag => {
        bag.addEventListener('dragstart', function (e) {
            e.dataTransfer.setData('text/plain', e.target.className);
        });
    });

    [blackZone, greenZone, blueZone].forEach(zone => {
        zone.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            const bagClass = e.dataTransfer.getData('text/plain');
            const bagElement = document.querySelector(`.${bagClass}`);

            if (
                (zone.classList.contains('blackzone') && bagClass.includes('bagblack')) ||
                (zone.classList.contains('greenzone') && bagClass.includes('baggreen')) ||
                (zone.classList.contains('bluezone') && bagClass.includes('bagblue'))
            ) {
                bagElement.style.opacity = '0';
                setTimeout(() => {
                    bagElement.style.opacity = '1';
                }, 6000);
            } else {
                alert('Неверная зона! Перетащите элемент в правильную зону.');
            }
        });
    });

    // Обработчик для формы
    const formContainer = document.querySelector('.form-container');
    const inputField = document.querySelector('.input-field');
    const submitButton = document.querySelector('.submit-button');

    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        const text = inputField.value.trim();

        if (text) {
            alert(`Текст "${text}" успешно "отправлен"!`);
            inputField.value = '';
        } else {
            alert('Пожалуйста, введите текст!');
        }
    });

    // Управление цветными кнопками
    const aquaElement = document.querySelector('.screencenterstrowaqua');
    const pinkElement = document.querySelector('.screencenterstrowpink');
    const orangeElement = document.querySelector('.screencenterstroworange');
    const whiteElement = document.querySelector('.screencenterstrowwhite');

    const aquaButton = document.querySelector('.aqua-button');
    const pinkButton = document.querySelector('.pink-button');
    const orangeButton = document.querySelector('.orange-button');
    const whiteButton = document.querySelector('.white-button');

    function resetZIndex() {
        aquaElement.style.zIndex = 1;
        pinkElement.style.zIndex = 1;
        orangeElement.style.zIndex = 1;
        whiteElement.style.zIndex = 1;
    }

    aquaButton.addEventListener('click', function () {
        resetZIndex();
        aquaElement.style.zIndex = 10;
    });

    pinkButton.addEventListener('click', function () {
        resetZIndex();
        pinkElement.style.zIndex = 10;
    });

    orangeButton.addEventListener('click', function () {
        resetZIndex();
        orangeElement.style.zIndex = 10;
    });

    whiteButton.addEventListener('click', function () {
        resetZIndex();
        whiteElement.style.zIndex = 10;
    });

    // Управление колесом и элементами
    const leftButton = document.querySelector('.left');
    const rightButton = document.querySelector('.right');
    const wheel = document.querySelector('.wheel');
    const clouds1 = document.querySelector('.clouds1');
    const sun = document.querySelector('.sun');

    function rotateElement(element, degrees) {
        element.style.transition = 'transform 0.5s ease';
        element.style.transform = `rotate(${degrees}deg)`;

        setTimeout(() => {
            element.style.transition = 'transform 0.5s ease';
            element.style.transform = 'rotate(0deg)';
        }, 2000);
    }

    leftButton.addEventListener('click', function () {
        rotateElement(wheel, -30);
        rotateElement(clouds1, 30);
        rotateElement(sun, 30);
    });

    rightButton.addEventListener('click', function () {
        rotateElement(wheel, 30);
        rotateElement(clouds1, -30);
        rotateElement(sun, -30);
    });

    // Обработчик изменения размера окна
    window.addEventListener('resize', function() {
        // При изменении размера окна можно перезапустить логику
        // если нужно, но в данном случае это не требуется
    });
});