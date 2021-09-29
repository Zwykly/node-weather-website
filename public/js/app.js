const search = document.querySelector('input');
const weatherForm = document.querySelector('form');
const forecast = document.querySelector('.forecast');

const loc = document.getElementById('location');
const temp = document.getElementById('temperature');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var url = `/weather?address=${search.value}`;

    loc.innerHTML = 'Loading...';
    temp.innerHTML = ' ';

    fetch(url).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                return loc.innerHTML = data.error;
            }
            loc.innerHTML = `<B>${data.placeName}</B>`;
            temp.innerHTML = `It is currently <B>${data.description}</B> and the temperature is <B>${data.temperature}</B> degrees Celcius, but feels like <B>${data.feelslike}</B>. Humidity is at <B>${data.humidity}%</B>.`;
        });
    });
})