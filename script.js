"use strict";
const cbxs = document.querySelectorAll("input[type=checkbox]");
const submit = document.querySelector("button[type=submit]");
const input = document.querySelector("input[type=text]");
const errorTag = document.querySelector("#error");
const checked = () => document.querySelectorAll("input[type=checkbox]:checked").length;
const validate = () => {
    if (input.validity.valid) {
        input.setCustomValidity("");
    }
    else if (+input.value > 10 || +input.value < 1) {
        input.setCustomValidity("Between 1 and 10");
    }
    else if (input.validity.patternMismatch) {
        input.setCustomValidity("Only numbers are allowed");
    }
    else {
        input.setCustomValidity("");
    }
    input.reportValidity();
    console.log(input.validationMessage);
    errorTag.textContent = input.validationMessage;
};
const unlockSubmit = () => {
    cbxs.forEach((cbx) => {
        cbx.addEventListener("click", () => {
            checked() == cbxs.length ? (submit.disabled = false) : (submit.disabled = true);
        });
    });
};
const unlockCheckboxes = () => {
    let cap = +input.value;
    for (let cbx of cbxs) {
        cap > 0 ? (cbx.disabled = false) : (cbx.disabled = true);
        cap--;
    }
};
input.addEventListener("keyup", () => {
    validate();
    unlockCheckboxes();
    unlockSubmit();
});
