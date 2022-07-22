const selector = document.querySelector('#city-selector');
const aqi = document.querySelector('#city-aqi');
const cigs = document.querySelector('#city-cigs');
const icons = document.querySelector('#smoke-icons');

selector.addEventListener('change', function() {

    // If no city selected clear all values
    if (selector.value === 'none') {
        aqi.innerText = '';
        cigs.innerText = '';
        icons.innerHTML = '';
        return;
    }

    // If a city is selected then parse the required data from the selector value
    const values = JSON.parse(selector.value);
    aqi.innerText = values.aqi.concat(' PM2.5'); // Need to use concat method instead of string template literals as IE11 does not support these
    cigs.innerText = values.cigs.concat(' cigarettes');

    // Clear any current child elements from the icon list before adding new ones
    icons.innerHTML = ''

    // Create a number of cigarette icons equal to the city value
    for (let x = 0; x < values.cigs; x++) {
        let smokeIcon = document.createElement('i');
        smokeIcon.classList.add('fa-solid', 'fa-smoking', 'fa-lg');
        icons.appendChild(smokeIcon);
    }

})