"use strict";
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const submitButton = document.querySelector("button[type=submit]");
const inputField = document.querySelector("input[type=text]");
const errorTag = document.querySelector("#error");
const validateDom = () => {
    if (!checkboxes)
        throw new Error("Checkboxes not found");
    if (!submitButton)
        throw new Error("Submit button not found");
    if (!inputField)
        throw new Error("Input field not found");
    if (!errorTag)
        throw new Error("Error tag not found");
};
const countCheckedCheckboxes = () => Array.from(checkboxes).filter((cbx) => cbx.checked).length;
const validateInput = () => {
    if (!inputField)
        throw new Error("Input field not found");
    if (!errorTag)
        throw new Error("Error tag not found");
    if (+inputField.value > 10) {
        inputField.setCustomValidity("Maximum 10 allowed");
    }
    else if (+inputField.value < 0) {
        inputField.setCustomValidity("Minimum 0 allowed");
    }
    else if (inputField.validity.patternMismatch) {
        inputField.setCustomValidity("Only numbers are allowed");
    }
    else if (inputField.validity.valueMissing) {
        inputField.setCustomValidity("Required");
    }
    else {
        inputField.setCustomValidity("");
    }
    inputField.reportValidity();
    errorTag.textContent = inputField.validationMessage;
};
const enableOrDisableCheckboxes = () => {
    if (inputField) {
        let capacity = +inputField.value;
        if (isNaN(capacity))
            capacity = 0;
        checkboxes.forEach((cbx) => {
            cbx.disabled = capacity <= 0;
            capacity--;
        });
    }
};
if (inputField) {
    inputField.addEventListener("keyup", () => {
        validateInput();
        enableOrDisableCheckboxes();
        if (submitButton) {
            submitButton.disabled = countCheckedCheckboxes() !== checkboxes.length;
        }
    });
}
checkboxes.forEach((cbx) => {
    cbx.addEventListener("click", () => {
        if (submitButton) {
            submitButton.disabled = countCheckedCheckboxes() !== checkboxes.length;
        }
    });
});
