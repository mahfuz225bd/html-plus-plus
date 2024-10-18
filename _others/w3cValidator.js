// Function to validate HTML using the W3C Validator API
const html = async (htmlString) => {
    const endpoint = 'https://validator.w3.org/nu/?out=json';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
            },
            body: htmlString,
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error validating HTML:', error);
    }
};

// Function to validate CSS using W3C Validator API
const css = async (cssString) => {
    const endpoint = 'https://jigsaw.w3.org/css-validator/validator?output=json';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `text=${encodeURIComponent(cssString)}`,
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error validating CSS:', error);
    }
};

// Function to validate SVG using the W3C Validator API
const svg = async (svgString) => {
    const endpoint = 'https://validator.w3.org/nu/?out=json';

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'image/svg+xml; charset=utf-8',
            },
            body: svgString,
        });

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error validating SVG:', error);
    }
};


export default w3cValidator = () => {
    if (navigator.onLine) {
        return {html, css, svg}
    } else {
        alert("You'r now offline, unable to use w3cValidator.")
    }
}