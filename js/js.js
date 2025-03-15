document.addEventListener('DOMContentLoaded', function () {
    // Первый блок кода для управления цифрами
    const slider = document.getElementById('slider');
    const value1 = document.getElementById('value1');
    const value2 = document.getElementById('value2');
    const value3 = document.getElementById('value3');
    const value4 = document.getElementById('value4');

    slider.addEventListener('input', function() {
        const sliderValue = parseInt(this.value, 10);

        // Логика для увеличения цифр
        value1.textContent = sliderValue; // Первая цифра равна значению ползунка
        value2.textContent = sliderValue * 2; // Вторая цифра в 2 раза больше
        value3.textContent = sliderValue + 5; // Третья цифра на 5 больше
        value4.textContent = sliderValue * 0.5; // Четвертая цифра в половину от значения
    });

    // Второй блок кода для управления анимацией
    const slider1 = document.getElementById('slider1');
    const columns = document.querySelector('.columns');

    slider1.addEventListener('input', function() {
        const slider1Value = parseInt(this.value, 10);

        // Преобразуем значение ползунка в диапазон для animation-duration
        const animationDuration = (100 - slider1Value) / 100 * 1.5 + 0.5;

        // Применяем новое значение animation-duration к элементу .columns
        columns.style.animationDuration = `${animationDuration}s`;
    });

    // Третий блок кода для управления элементом .screen2fp
    const slider3 = document.getElementById('slider3');
    const screen2 = document.querySelector('.screen2fp');

    slider3.addEventListener('input', function() {
        const slider3Value = parseInt(this.value, 10);

        // Логика для изменения свойства `top`
        if (slider3Value >= 50) {
            // Если ползунок движется вправо (значение от 50 до 100)
            const newTop = 1 + (slider3Value - 50) * (4 / 50); // Интерполяция от 1vw до 5vw
            screen2.style.top = `${newTop}vw`;
        } else {
            // Если ползунок движется влево (значение от 0 до 50)
            const newTop = 1 - (50 - slider3Value) * (4 / 50); // Интерполяция от 1vw до -3vw
            screen2.style.top = `${newTop}vw`;
        }
    });

    // Четвертый блок кода для управления элементом .screen3plashka
    const slider4 = document.getElementById('slider4');
    const screen3Plashka = document.querySelector('.screen3plashka');

    slider4.addEventListener('input', function() {
        const slider4Value = parseInt(this.value, 10);

        // Логика для изменения свойства `top`
        const newTop = -9 + (slider4Value / 100) * 8.5; // Интерполяция от -9vw до -0.5vw
        screen3Plashka.style.top = `${newTop}vw`;
    });

    // Пятый блок кода для управления элементом .screen1plashka
    const slider2 = document.getElementById('slider2');
    const screen1Plashka = document.querySelector('.screen1plashka');

    slider2.addEventListener('input', function() {
        const slider2Value = parseInt(this.value, 10);

        // Логика для изменения свойства `left`
        const newLeft = -14 + (slider2Value / 100) * 12.3; // Интерполяция от -14vw до -1.7vw
        screen1Plashka.style.left = `${newLeft}vw`;
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
                }, 2000); // 2000 мс = 2 секунды
            } else {
                // Если зона неправильная, показываем предупреждение
                alert('Неверная зона! Перетащите элемент в правильную зону.');
            }
        });
    });
});