const compute = document.getElementById("Compute");
const clear = document.getElementById("Clear");
const assingmentDiv = document.getElementById("section");
const curveCheckbox = document.getElementById("curve");

// Function to clear all input values, errors, and results
const clearAll = () => {
  // Clear all input values
  document.querySelectorAll(".earned").forEach((input) => {
    input.value = ""; // Clear input value
  });
  document.querySelectorAll(".max").forEach((input) => {
    input.value = ""; // Clear input value
  });

  // Clear all error messages
  clearErrors();

  // Remove result display if present
  const resultDiv = assingmentDiv.querySelector(".pass, .fail");
  if (resultDiv) {
    resultDiv.remove();
  }

  // Re-enable the checkbox
  curveCheckbox.disabled = true;
};

// Function to calculate and display percentage
const calculateAndDisplayPercentage = () => {
  curveCheckbox.disabled = false;
  clearErrors(); // Clear any existing error messages

  const earnedInputs = document.querySelectorAll(".earned");
  const maxInputs = document.querySelectorAll(".max");
  let totalMax = 0;
  let totalEarned = 0;

  // Sum the earned values
  earnedInputs.forEach((input) => {
    const earned = Number(input.value);
    if (isNaN(earned)) {
      const error = document.createElement("div");
      error.innerHTML = "Please enter numbers only";
      error.style.color = "red";
      error.className = "error";
      assingmentDiv.appendChild(error);
      console.log(error);
      return; // Terminate the process if any input is not a number
    }
    totalEarned += earned;
  });

  // Sum the max values
  maxInputs.forEach((input) => {
    const maxTotal = Number(input.value);
    if (isNaN(maxTotal)) {
      const error = document.createElement("div");
      error.innerHTML = "Please enter numbers only";
      error.style.color = "red";
      error.className = "error";
      assingmentDiv.appendChild(error);
      return; // Terminate the process if any input is not a number
    }
    totalMax += maxTotal;
  });

  // Compute the percentage
  if (totalMax === 0) {
    const error = document.createElement("div");
    error.innerHTML = "Total max cannot be zero";
    error.style.color = "red";
    error.className = "error";
    assingmentDiv.appendChild(error);
    return; // Prevent division by zero
  }

  let percentage = Math.round((totalEarned * 100) / totalMax);

  // Apply curve if checkbox is checked
  if (curveCheckbox.checked) {
    percentage += 5; // Add 5% for the curve
    if (percentage > 100) {
      percentage = 100; // Ensure the percentage does not exceed 100%
    }
    curveCheckbox.disabled = true; // Disable the checkbox after applying the curve
  }

  // Display result based on percentage
  const resultDiv = document.createElement("div");
  if (percentage >= 50) {
    resultDiv.innerHTML = `Total Mark: ${percentage}%`;
    resultDiv.className = "pass";
  } else {
    resultDiv.innerHTML = `Total Mark: ${percentage}%`;
    resultDiv.className = "fail";
  }
  assingmentDiv.appendChild(resultDiv);
  console.log(resultDiv);
};

// Event listener for the compute button
compute.addEventListener("click", calculateAndDisplayPercentage);

// Event listener for the clear button
clear.addEventListener("click", clearAll);

// Event listener for the curve checkbox
curveCheckbox.addEventListener("change", () => {
  if (curveCheckbox.checked) {
    calculateAndDisplayPercentage(); // Calculate and display the percentage when checkbox is clicked
  }
});

// Function to clear errors
const clearErrors = () => {
  const errors = assingmentDiv.querySelectorAll(".error");
  errors.forEach((error) => error.remove());
};

// Event listeners to clear errors when the user starts typing
document.querySelectorAll(".earned").forEach((input) => {
  input.addEventListener("input", () => {
    clearErrors();
  });
});
document.querySelectorAll(".max").forEach((input) => {
  input.addEventListener("input", () => {
    clearErrors();
  });
});
