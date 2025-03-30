document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загрузилась! Ура!');
    
    function checkMobile() {
        if (window.innerWidth <= 768) {
            return true;
        } else {
            return false;
        }
    }
    
    var lazyImages = document.querySelectorAll('img[data-src]');
    
    function loadImg(img) {
        console.log('Загружаю картинку...');
        img.src = img.getAttribute('data-src');
        
        img.onload = function() {
            console.log('Картинка загрузилась!');
            img.classList.add('lazyloaded');
        };
    }
    
    var imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                loadImg(entry.target);
                imgObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    lazyImages.forEach(function(img) {
        imgObserver.observe(img);
    });
    
    function animateSlider(slider, time, min, max, callback) {
        var start = null;
        var touched = false;
        var animId = null;
        
        function animate(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            var percent = (progress / time) * 100;
            
            if (!touched) {
                if (percent <= 50) {
                    slider.value = min + (percent / 50) * (max - min);
                } else {
                    slider.value = max - ((percent - 50) / 50) * (max - min);
                }
                
                if (callback) callback(slider.value);
                
                if (percent < 100) {
                    animId = requestAnimationFrame(animate);
                } else {
                    start = null;
                    animId = requestAnimationFrame(animate);
                }
            }
        }
        
        if (!checkMobile()) {
            animId = requestAnimationFrame(animate);
        }
        
        slider.addEventListener('mousedown', function() {
            touched = true;
            cancelAnimationFrame(animId);
        });
        
        slider.addEventListener('touchstart', function() {
            touched = true;
            cancelAnimationFrame(animId);
        });
        
        slider.addEventListener('mouseup', function() {
            touched = false;
            start = null;
            if (!checkMobile()) {
                animId = requestAnimationFrame(animate);
            }
        });
        
        slider.addEventListener('touchend', function() {
            touched = false;
            start = null;
            if (!checkMobile()) {
                animId = requestAnimationFrame(animate);
            }
        });
    }
    
    function updateNumbers(num) {
        console.log('Обновляю цифры:', num);
        document.getElementById('value1').textContent = num;
        document.getElementById('value2').textContent = num * 2;
        document.getElementById('value3').textContent = num + 5;
        document.getElementById('value4').textContent = Math.floor(num * 0.5);
    }
    
    function updateColumns(speed) {
        var columns = document.querySelector('.columns');
        var duration = (100 - speed) / 100 * 1.5 + 0.5;
        columns.style.animationDuration = duration + 's';
    }
    
    function moveScreen2(pos) {
        var screen2 = document.querySelector('.screen2fp');
        var newTop;
        if (pos >= 50) {
            newTop = 1 + (pos - 50) * (4 / 50);
        } else {
            newTop = 1 - (50 - pos) * (4 / 50);
        }
        screen2.style.top = newTop + 'vw';
    }
    
    function moveScreen3Plashka(pos) {
        var plashka = document.querySelector('.screen3plashka');
        var newTop = -9 + (pos / 100) * 8.5;
        plashka.style.top = newTop + 'vw';
    }
    
    function moveScreen1Plashka(pos) {
        var plashka = document.querySelector('.screen1plashka');
        var newLeft = -14 + (pos / 100) * 12.3;
        plashka.style.left = newLeft + 'vw';
    }
    
    var mainSlider = document.getElementById('slider');
    animateSlider(mainSlider, 3000, 100, 600, updateNumbers);
    
    mainSlider.addEventListener('input', function() {
        updateNumbers(parseInt(this.value));
    });
    
    var otherSliders = document.querySelectorAll('input[type="range"]:not(#slider)');
    
    otherSliders.forEach(function(slider) {
        if (!slider.hasAttribute('data-touched')) {
            animateSlider(slider, 3000, 0, 100, function(value) {
                if (slider.id === 'slider1') {
                    updateColumns(value);
                } else if (slider.id === 'slider2') {
                    moveScreen1Plashka(value);
                } else if (slider.id === 'slider3') {
                    moveScreen2(value);
                } else if (slider.id === 'slider4') {
                    moveScreen3Plashka(value);
                }
            });
        }
    });
    
    otherSliders.forEach(function(slider) {
        slider.addEventListener('input', function() {
            var value = parseInt(this.value);
            if (slider.id === 'slider1') {
                updateColumns(value);
            } else if (slider.id === 'slider2') {
                moveScreen1Plashka(value);
            } else if (slider.id === 'slider3') {
                moveScreen2(value);
            } else if (slider.id === 'slider4') {
                moveScreen3Plashka(value);
            }
        });
    });
    
    var bags = document.querySelectorAll('.bags div');
    var blackArea = document.querySelector('.blackzone');
    var greenArea = document.querySelector('.greenzone');
    var blueArea = document.querySelector('.bluezone');
    
    bags.forEach(function(bag) {
        bag.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text', e.target.className);
        });
    });
    
    [blackArea, greenArea, blueArea].forEach(function(area) {
        area.addEventListener('dragover', function(e) {
            e.preventDefault();
        });
        
        area.addEventListener('drop', function(e) {
            e.preventDefault();
            var bagClass = e.dataTransfer.getData('text');
            var bag = document.querySelector('.' + bagClass);
            
            if ((area.classList.contains('blackzone') && bagClass.includes('bagblack')) ||
                (area.classList.contains('greenzone') && bagClass.includes('baggreen')) ||
                (area.classList.contains('bluezone') && bagClass.includes('bagblue'))) {
                
                bag.style.opacity = '0';
                setTimeout(function() {
                    bag.style.opacity = '1';
                }, 6000);
            } else {
                alert('Неправильная зона! Попробуйте другую.');
            }
        });
    });
    
    var form = document.querySelector('.form-container');
    var input = document.querySelector('.input-field');
    var button = document.querySelector('.submit-button');
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        var text = input.value.trim();
        
        if (text) {
            alert('Вы ввели: ' + text);
            input.value = '';
        } else {
            alert('Напишите что-нибудь!');
        }
    });
    
    var aquaBtn = document.querySelector('.aqua-button');
    var pinkBtn = document.querySelector('.pink-button');
    var orangeBtn = document.querySelector('.orange-button');
    var whiteBtn = document.querySelector('.white-button');
    
    var aquaEl = document.querySelector('.screencenterstrowaqua');
    var pinkEl = document.querySelector('.screencenterstrowpink');
    var orangeEl = document.querySelector('.screencenterstroworange');
    var whiteEl = document.querySelector('.screencenterstrowwhite');
    
    function resetLayers() {
        aquaEl.style.zIndex = 1;
        pinkEl.style.zIndex = 1;
        orangeEl.style.zIndex = 1;
        whiteEl.style.zIndex = 1;
    }
    
    aquaBtn.addEventListener('click', function() {
        resetLayers();
        aquaEl.style.zIndex = 10;
    });
    
    pinkBtn.addEventListener('click', function() {
        resetLayers();
        pinkEl.style.zIndex = 10;
    });
    
    orangeBtn.addEventListener('click', function() {
        resetLayers();
        orangeEl.style.zIndex = 10;
    });
    
    whiteBtn.addEventListener('click', function() {
        resetLayers();
        whiteEl.style.zIndex = 10;
    });
    
    var leftBtn = document.querySelector('.left');
    var rightBtn = document.querySelector('.right');
    var wheel = document.querySelector('.wheel');
    var clouds = document.querySelector('.clouds1');
    var sun = document.querySelector('.sun');
    
    function rotate(el, deg) {
        el.style.transition = 'transform 0.5s';
        el.style.transform = 'rotate(' + deg + 'deg)';
        
        setTimeout(function() {
            el.style.transition = 'transform 0.5s';
            el.style.transform = 'rotate(0deg)';
        }, 2000);
    }
    
    leftBtn.addEventListener('click', function() {
        rotate(wheel, -30);
        rotate(clouds, 30);
        rotate(sun, 30);
    });
    
    rightBtn.addEventListener('click', function() {
        rotate(wheel, 30);
        rotate(clouds, -30);
        rotate(sun, -30);
    });
    
    window.addEventListener('resize', function() {
        console.log('Окно изменило размер!');
    });
});