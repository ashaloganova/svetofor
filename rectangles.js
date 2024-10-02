ymaps.ready(init);

function init() {
    // Создаем карту
    var myMap = new ymaps.Map('map', {
        center: [57.156581, 65.533576],
        zoom: 11
    }, {
        searchControlProvider: 'yandex#search'
    });

    // Загрузка данных из JSON файла
    fetch('rectangles_data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(function(item) {
                // Создаем прямоугольник для каждой строки из данных
                var myRectangle = new ymaps.Rectangle([
                    [item.point1_lat, item.point1_lon], // Верхний левый угол
                    [item.point2_lat, item.point2_lon]  // Нижний правый угол
                ], {
                    // Свойства
                    hintContent: 'Ранг: ' + item.rank,
                    balloonContent: 'Координаты: [' + item.latitude + ', ' + item.longitude + ']'
                }, {
                    // Опции
                    fillColor: item.color, // Цвет из DataFrame
                    fillOpacity: 0.5, // Прозрачность заливки
                    strokeColor: '#0000FF', // Цвет обводки
                    strokeOpacity: 0.5, // Прозрачность обводки
                    strokeWidth: 0, // Ширина линии обводки
                    borderRadius: 0 // Без скругления углов
                });

                // Добавляем прямоугольник на карту
                myMap.geoObjects.add(myRectangle);
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
        });
}
