# shri2015
Tests for admission to Yandex SHRI 2015

## Задание №1

### Описание
 Сверстайте табло аэропорта. На нём должны быть представлены следующие данные:
 
 * тип рейса (вылет/прилёт; например это может быть иконка);
 * номер рейса;
 * авиакомпания;
 * логотип авиакомпании;
 * тип воздушного судна;
 * аэропорт назначения;
 * плановое время вылета или прилёта;
 * статус рейса (для вылетающих: регистрация, ожидание посадки, посадка закончена, вылетел; для прилетающих: по расписанию, летит, приземлился; для всех: задерживается до HH:MM, отменён);
 * примечание (например, информация о код-шеринге с другими авиакомпаниями).
 * В качестве источника можно использовать данные онлайн-табло любого аэропорта мира.
 * Дизайн оформления выберите на своё усмотрение, при этом необходимо реализовать следующее:
 
 
 1. по наведению курсора на определённое место в табло контрастным цветом выделяются соответствующие строка и столбец;
 2. нечётные строки табло темнее чётных;
 3. количество отображаемых данных по высоте больше высоты экрана, при прокрутке заголовок таблицы приклеивается к верхней части видимой области окна браузера;
 4. при изменении ширины экрана браузера в табло автоматически скрываются и/или сокращаются значения наименее важных столбцов (например, при ширине 1000 пикселей вы показываете всю таблицу, при ширине 900 пикселей — убираете название авиакомпании, оставляя только логотип, 800 пикселей — сокращаете название воздушного судна (Boeing 737-800 -> B737) и так далее);
 5. в дополнение к предыдущему пункту сделайте так, чтобы по клику на соответствующую строчку в выплывающем окне показывались все данные рейса;
 6. два чекбокса над самим табло: прилёт и вылет, по нажатию показываются только соответствующие рейсы.
 7. Плюсом будет, если вам удастся реализовать табло без JavaScript.

### Решение

 Пара отступлений:
 - данные для табло генерируются js (хотел правда подключить апи) ибо html выглядит ну очень ущербно
 - т.к. поддержка css sticky ограничена, для приклеивания шапки используется js
 - для настройки сетки взял стили бутстрапа
 - логотипы тырятся со стороннего ресурса

 А теперь по пунктам:
 1. со строками все просто (выделяем перебивая все прочие стили), столбцы оформляются растяжкой псевдоэлементов по высоте
 2. основная сложность разлиновки в чередовании правил при переключении прибытие/отправление т.к. приходится использовать
 селектор учитывающий тип контейнера, на мой взгляд эта фича css очень не удобная
 3. лучше использования скрипта придумать не смог, вариант фиксить сразу не рассматривал вообще (как в случае с примером, выше табло есть текст)
 4. использована сетка бутстрапа, в шапке и js-шаблоне строки табло - классы легко поменять на нужные
 5. хорошо подходил для выделения селектор :focus, но IE заставил использовать псевдокласс выделения хеша в строке браузера
 6. реализовано через :checked и разделение строк по классам прилета и вылета, которые и отключаются при выборе нужного значени
 7. пара строчек для приклеивания шапки можно заменить строгой фиксацией и сдвигом табло вверх, генерацию данных можно заменить обычным HTML


## Задание №2

### Описание
Существует API, которое умеет отвечать по трём URL: /countries, /cities и /populations.
Клиентское приложение подсчитывает численность населения в Африке.
Запросы друг от друга не зависят. Чтобы браузер пользователя не простаивал, клиентскому приложению важно уметь делать все три запроса одновременно.
Реализацией API является функция getData(url, callback), которая принимает строку с URL запроса и функцию обратного вызова.
В случае ошибки в callback первым аргументом будет передана строка ошибки, в случае успеха вторым аргументом будет передан ответ API.

Вам досталась реализация клиентского приложения, которое должно решать описанную выше задачу. Но в коде приложения есть ошибки, из-за которых фактический результат работы отличается от ожидаемого. Сам код [здесь](https://gist.github.com/verkholantsev/4d14ce053b009dac1225).

Как должно быть: приложение выводит в консоль суммарную популяцию в Африке.
Как на самом деле: приложение не выводит в консоль ничего.

1. Найдите ошибку в коде приложения, из-за которой реальный результат работы отличается от ожидаемого.
2. Опишите, как эта ошибка могла возникнуть и как её избежать в будущем.
3. Добавьте в приложение новую возможность — диалог с пользователем. Приложение спрашивает название страны или города, а затем показывает численность населения. Для диалога можно использовать window.prompt.

### Решение

 1. Ошибка в переменной request используемой внутри функции callback.
 Если точнее - создается впечатление что переменная на каждом витке цикла будет сохранена в теле функции,
  на практике же в теле будет использовано значение переменной request существующее на момент вызова (т.е. /populations).
 2. Могла возникнуть если ранее функция использовалась в синхронном контексте.
 Чтобы избежать нужно стараться не использовать глобальные переменные и замыкать все нужные для работы 
 функции переменные в отдельном контексте выполнения.
 3. Диалог с пользователем решено сделать на основе полей формы (более удобно в плане выбора и исключаются лишние действия
 для определения ввода пользователя). В коде логика разделена на рассчет населения (функция count),
 отображение населения (функция show), получение данных с сервера (представлено в виде обработчика кнопки "Население").
 При получении данных сохранен исходный функционал с устраненной ошибкой. 
 
## Задание №3
 
### Описание
 
Создайте с помощью WebAudio API плеер, который:

1. умеет открывать аудиофайлы (поддерживаемых браузером форматов) с локального диска;
2. поддерживает drag'n'drop;
3. имеет кнопки play и stop;
4. выводит название проигрываемого файла;
5. умеет отображать хотя бы один вариант визуализации (waveform или spectrum);
6. работает в Яндекс.Браузере, Safari, Chrome, Firefox.

Дополнительно реализуйте возможность:

7. выбора настройки эквалайзера (pop, rock, jazz, classic, normal);
8. вывод названия песни и исполнителя из метаданных аудиофайла.
 
### Решение

 Пара отступлений:
 - на момент начала работы над заданием оставалось 2 дня до сдачи, нулевые знания в области аудио, канве, а о web audio api слушал на Web Standards Days
 - огромное спасибо mozilla за визуализацию в виде waveform

 А теперь по пунктам:
 1. умеет, создается файловый инпут не добавленный в дерево (как источник данных для api), активируется при нажатии на абстрактную область загрузки трэка
 2. поддерживает, здесь используется тот же элемент что и выше, только загребает данные привязанные к event-у
 3. имеет, play по задумке работает еще как пауза (сохраняя время паузы и стартуя новый ресурс созданный на основе старого буфера данных)
 4. выводит, просто имя файла при его получении через Input или DnD
 5. отображает waveform
 6. работает в хроме и ишаке //todo проверить остальные
 7. для быстрой настройки создана "псевдонода" эквалайзера включающая 10 фильтров с разными частотами, благодаря перегрузке метода connect связывается как отдельный фильтр, ну и имеет возможность настройки
 8. из-за отсутствия времени подгрузил сторонний фреймворк