document.getElementById('generateButton').addEventListener('click', () => {
    /* Because of our color value contain the (#) at the beginning of all the value
     here we're replacing it with an empty string*/
    const inputColor = document.getElementById('colorInput').value.replace('#', '');
    const selectedMode = document.getElementById('modeDropdown').value;

    // For readability purposes we're are saving our API URL in a variable to make it easy to read
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${selectedMode}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            /* confusing right don't worries as you can see all we are doing here is to limit our color scheme to 5, and in the .map function we give it 2 object: value and name why? to get the  hex value and name of the color. */
            const colorScheme = data.colors.slice(0, 5).map(({ hex: { value }, name }) => ({ value, name }));
            displayColorScheme(colorScheme);
        })
});

// The displayColorScheme function is to display the colorSheme, name and value on browsers
function displayColorScheme(colorScheme) {
    const colorSchemeOutput = document.getElementById('colorSchemeOutput');
    colorSchemeOutput.innerHTML = '';

    colorScheme.forEach(color => {
        //Here we create a section that will contain our  colorSheme, name and value
        const colorSection = document.createElement('section');
        colorSection.className = 'colorSection';
        colorSection.style.backgroundColor = color.value;

        //Here we create a (p) element that will contain the  name of the color
        const colorName = document.createElement('p');
        colorName.className = 'colorName';
        colorName.textContent = color.name.value;

        //Here we create a (p) element that will contain the  value of the color
        const colorValue = document.createElement('p');
        colorValue.className = 'colorValue';
        colorValue.textContent = color.value;

        //Lastly we are adding them in our section element
        colorSection.appendChild(colorValue);
        colorSection.appendChild(colorName);
        colorSchemeOutput.appendChild(colorSection);
    });
}
