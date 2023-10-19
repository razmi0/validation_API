const cbxs = document.querySelectorAll("input[type=checkbox]") as NodeListOf<HTMLInputElement>,
  submit = document.querySelector("button[type=submit]") as HTMLButtonElement,
  input = document.querySelector("input[type=text]") as HTMLInputElement,
  errorTag = document.querySelector("#error") as HTMLDivElement,
  checked = () => document.querySelectorAll("input[type=checkbox]:checked").length,
  // Listen for input event on num of checkboxes to enable/disable
  validate = () => {
    if (input.validity.valid) {
      input.setCustomValidity("");
    } else if (+input.value > 10 || +input.value < 1) {
      input.setCustomValidity("Between 1 and 10");
    } else if (input.validity.patternMismatch) {
      input.setCustomValidity("Only numbers are allowed");
    } else {
      input.setCustomValidity("");
    }
    input.reportValidity();
    console.log(input.validationMessage);
    errorTag.textContent = input.validationMessage;
  },
  // Listen if all checkboxes are checked
  unlockSubmit = () => {
    cbxs.forEach((cbx) => {
      cbx.addEventListener("click", () => {
        checked() == cbxs.length ? (submit.disabled = false) : (submit.disabled = true);
      });
    });
  },
  unlockCheckboxes = () => {
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
