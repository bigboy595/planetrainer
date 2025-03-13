document.addEventListener('DOMContentLoaded', function () {


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
    value3.textContent = sliderValue + 5; // Третья цифра на 10 больше
    value4.textContent = sliderValue * 0.5; // Четвертая цифра в половину от значения
});




document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider'); // Контейнер ползунка
    const thumb = document.querySelector('.thumb');   // Бегунок
    const inputRange = document.getElementById('slider'); // input range

    // Обработчик для input range
    inputRange.addEventListener('input', function () {
        const value = this.value;
        const min = this.min;
        const max = this.max;

        // Вычисляем положение бегунка в процентах
        const percent = ((value - min) / (max - min)) * 100;

        // Обновляем положение бегунка
        thumb.style.left = `calc(${percent}% - ${thumb.offsetWidth / 2}px)`;
    });

    // Обработчик для перемещения бегунка мышью
    thumb.addEventListener('mousedown', function (event) {
        event.preventDefault(); // Предотвращаем выделение текста

        const sliderRect = slider.getBoundingClientRect();
        const thumbWidth = thumb.offsetWidth;

        // Функция для перемещения бегунка
        function onMouseMove(event) {
            let newLeft = event.clientX - sliderRect.left - thumbWidth / 2;

            // Ограничиваем движение бегунка в пределах ползунка
            if (newLeft < 0) newLeft = 0;
            if (newLeft > sliderRect.width - thumbWidth) newLeft = sliderRect.width - thumbWidth;

            // Обновляем положение бегунка
            thumb.style.left = `${newLeft}px`;

            // Обновляем значение input range
            const percent = (newLeft / (sliderRect.width - thumbWidth)) * 100;
            inputRange.value = Math.round((percent / 100) * (inputRange.max - inputRange.min)) + Number(inputRange.min);
        }

        // Функция для завершения перемещения
        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        // Добавляем обработчики событий
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    // Предотвращаем стандартное поведение перетаскивания
    thumb.addEventListener('dragstart', function () {
        return false;
    });
});

// Ждем, пока загрузится DOM
        document.addEventListener('DOMContentLoaded', function () {
            // Находим кнопку и div
            const button = document.getElementById('colorButton');
            const targetDiv = document.getElementById('targetDiv');

            // Проверяем, что элементы найдены
            if (!button || !targetDiv) {
                console.error('Не удалось найти кнопку или div');
                return;
            }

            // Обработчик клика по кнопке
            button.addEventListener('click', function () {
                // Переключаем класс у div
                if (targetDiv.classList.contains('default-color')) {
                    targetDiv.classList.remove('default-color');
                    targetDiv.classList.add('new-color');
                } else {
                    targetDiv.classList.remove('new-color');
                    targetDiv.classList.add('default-color');
                }
            });
        });



})