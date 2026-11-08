
/* ==========================================
   NELLY SIBIYA - TEMPERATURE CONVERTER
   Complete JavaScript Functionality
========================================== */


/* 1. GET HTML ELEMENTS */

const converterForm = document.getElementById("converterForm");

const temperatureInput = document.getElementById("temperature");

const unitSelector = document.getElementById("unit");

const errorMessage = document.getElementById("errorMessage");

const celsiusResult = document.getElementById("celsiusResult");

const fahrenheitResult = document.getElementById("fahrenheitResult");

const kelvinResult = document.getElementById("kelvinResult");

const resultsSection = document.querySelector(".results-section");


/* 2. ABSOLUTE ZERO LIMITS */

const absoluteZeroLimits = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
};


/* 3. DISPLAY CONVERSION RESULTS */

function displayResults(celsius, fahrenheit, kelvin) {

    celsiusResult.textContent = `${celsius.toFixed(2)} °C`;

    fahrenheitResult.textContent = `${fahrenheit.toFixed(2)} °F`;

    kelvinResult.textContent = `${kelvin.toFixed(2)} K`;

}


/* 4. CLEAR RESULTS */

function clearResults() {

    celsiusResult.textContent = "-- °C";

    fahrenheitResult.textContent = "-- °F";

    kelvinResult.textContent = "-- K";

}


/* 5. DISPLAY ERROR MESSAGES */

function displayError(message) {

    errorMessage.textContent = message;

    clearResults();

}


/* 6. AUTOMATICALLY SCROLL TO RESULTS */

function scrollToResults() {

    requestAnimationFrame(function() {

        const resultsPosition =
            resultsSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({

            top: Math.max(0, resultsPosition - 20),

            behavior: "smooth"

        });

    });

}


/* 7. HANDLE TEMPERATURE CONVERSION */

converterForm.addEventListener("submit", function(event) {

    // Prevent the browser from refreshing the page
    event.preventDefault();

    // Remove previous error messages
    errorMessage.textContent = "";

    // Get the user's input
    const inputValue = temperatureInput.value.trim();

    const selectedUnit = unitSelector.value;


    // Check whether the input is empty
    if (inputValue === "") {

        displayError("Please enter a temperature value.");

        return;

    }


    // Check for invalid numeric input
    if (temperatureInput.validity.badInput) {

        displayError("Please enter a valid numeric temperature.");

        return;

    }


    // Convert the input into a number
    const temperature = Number(inputValue);


    // Ensure the input is a valid number
    if (!Number.isFinite(temperature)) {

        displayError("Please enter a valid numeric temperature.");

        return;

    }


    // Check for temperatures below absolute zero
    if (temperature < absoluteZeroLimits[selectedUnit]) {

        displayError(
            "Temperature cannot be below absolute zero. Please enter a valid temperature."
        );

        return;

    }


    /* 8. CONVERT INPUT INTO CELSIUS */

    let celsius;

    if (selectedUnit === "celsius") {

        celsius = temperature;

    } else if (selectedUnit === "fahrenheit") {

        celsius = (temperature - 32) * 5 / 9;

    } else if (selectedUnit === "kelvin") {

        celsius = temperature - 273.15;

    }


    /* 9. CONVERT CELSIUS INTO OTHER UNITS */

    const fahrenheit = (celsius * 9 / 5) + 32;

    const kelvin = celsius + 273.15;


    /* 10. DISPLAY ALL RESULTS */

    displayResults(celsius, fahrenheit, kelvin);


    /* 11. AUTOMATICALLY TAKE USER TO RESULTS */

    scrollToResults();

});


/* 12. HANDLE RESET BUTTON */

converterForm.addEventListener("reset", function() {

    errorMessage.textContent = "";

    clearResults();

});


/* 13. CLEAR ERROR WHEN USER CHANGES INPUT */

temperatureInput.addEventListener("input", function() {

    errorMessage.textContent = "";

});

unitSelector.addEventListener("change", function() {

    errorMessage.textContent = "";

});


/* 14. INITIALISE THE CONVERTER */

clearResults();
