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



    const slider1 = document.getElementById('slider1');
        const columns = document.querySelector('.columns');

        slider1.addEventListener('input', function() {
            // Получаем значение ползунка (от 0 до 100)
            const slider1Value = slider1.value;

            // Преобразуем значение ползунка в диапазон для animation-duration
            // Например, от 0.5s до 2s
            const animationDuration = (100 - slider1Value) / 100 * 1.5 + 0.5;

            // Применяем новое значение animation-duration к элементу .columns
            columns.style.animationDuration = `${animationDuration}s`;
        });



        document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('slider3'); // Получаем ползунок
    const screen = document.querySelector('.screen2fp'); // Получаем элемент, который будем двигать

    slider.addEventListener('input', function () {
        const sliderValue = parseInt(this.value, 10); // Получаем значение ползунка (от 0 до 100)

        // Логика для изменения свойства `top`
        if (sliderValue >= 50) {
            // Если ползунок движется вправо (значение от 50 до 100)
            const newTop = 1 + (sliderValue - 50) * (4 / 50); // Интерполяция от 1vw до 5vw
            screen.style.top = `${newTop}vw`;
        } else {
            // Если ползунок движется влево (значение от 0 до 50)
            const newTop = 1 - (50 - sliderValue) * (4 / 50); // Интерполяция от 1vw до -3vw
            screen.style.top = `${newTop}vw`;
        }
    });
});



})