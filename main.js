let currentPageNumber = getCurrentPage();

const forms = document.getElementsByClassName("form");

let currentPlan = getSelectedPlan();
let isPlanYear = isPlanYearly();
const planPrices = document.getElementsByClassName("plan-price");
const addOnPriceComponents = document.getElementsByClassName("addOn-price");
const priceSummaryContainer =
  document.getElementsByClassName("space-around-flex");
const errorMessages = document.getElementsByClassName("error-msg");

const monthlyPlanPrices = [9, 12, 15];
const addOnPrices = [1, 2, 2];
let finalPrice = 0;

const planLabels = ["Arcade", "Advanced", "Pro"];

const previousButton = document.getElementsByClassName("prev")[0];
const nextButton = document.getElementsByClassName("next")[0];

let nameInput = "";
let emailInput = "";
let phoneInput = "";


nextButton.addEventListener("click", function () {
  goToNextPage();
});
function goToNextPage(pageNum = getCurrentPage()) {
  isPlanYear = isPlanYearly();
  if (pageNum === 0) previousButton.classList.add("hidden");
  else previousButton.classList.remove("hidden");
  if (pageNum === 1) {
    if (validateFirstPage()) return;
  }
  if (pageNum === 2) {
    currentPlan = getSelectedPlan();
    for (let i = 0; i < addOnPriceComponents.length; i++)
      addOnPriceComponents[i].textContent = `+$${
        addOnPrices[i] * (isPlanYear ? 10 : 1)
      }/${getSuffix()}`;
  }
  if (pageNum >= 0 && pageNum <= 3) {
    updateRadioCursor(labels[pageNum]);
    nextButton.textContent = "Next Step";
    console.log(`option${Number(pageNum) + 1}`);
    setTimeout(() => {
      document.getElementById(`option${Number(pageNum) + 1}`).checked = true;
    }, 10);
  }
  if (pageNum === 3) {
    updateFinalPage();
    nextButton.textContent = "Confirm";
  }
  if (pageNum === 4) {
    document.getElementsByClassName("button")[0].classList.add("hidden");
  }
  forms[(pageNum - 1 + 4) % 4].classList.add("hidden");
  forms[pageNum].classList.remove("hidden");
}

function goBack() {
  currentPageNumber = getCurrentPage();
  document.getElementById(`option${currentPageNumber - 1}`).checked = true;
  forms[currentPageNumber - 1].classList.add("hidden");
  forms[currentPageNumber - 2].classList.remove("hidden");
  if (currentPageNumber === 2) previousButton.classList.add("hidden");
  if (currentPageNumber === 4) nextButton.textContent = "Next Step";
  updateRadioCursor(labels[currentPageNumber - 2]);
}

function updateToggler(isYearly) {
  const planPromo = document.getElementsByClassName("plan-promo");
  for (let i = 0; i < planPromo.length; i++) {
    if (isYearly) {
      planPromo[i].classList.remove("hidden");
      planPrices[i].textContent = `$${monthlyPlanPrices[i] * 10}/yr`;
    } else {
      planPromo[i].classList.add("hidden");
      planPrices[i].textContent = `$${monthlyPlanPrices[i]}/mo`;
    }
  }
}

//used for toggling the monthly/yearly plan
const toggler = document.querySelector(".toggle");
toggler.addEventListener("click", (event) => {
  event.preventDefault();
  const { clientX } = event;
  const labelRect = toggler.getBoundingClientRect();
  const planToggle = document.getElementById("plan-type");
  if (clientX < labelRect.left) {
    updateToggler(false);
    planToggle.checked = false;
  } else if (clientX > labelRect.right) {
    updateToggler(true);
    planToggle.checked = true;
  } else {
    updateToggler(!isPlanYearly());
    planToggle.checked = !isPlanYearly();
  }
});

//used for adding styles for input parent
function updateLabelStyle(checkbox) {
  let label = checkbox.parentNode;
  if (checkbox.checked) label.classList.add("checked");
  else label.classList.remove("checked");
}

function goToPlanPage() {
  forms[3].classList.add("hidden");
  nextButton.textContent = "Next Step";
  document.getElementById(`option1`).checked = true;
  goToNextPage();
}

function isPlanYearly() {
  let check = document.querySelector(
    "input[type='checkbox'][name='plan-type']:checked"
  );
  return check ? true : false;
}

function getSelectedPlan() {
  return document.querySelector(
    "input[type='radio'][name='plan-options']:checked"
  ).value;
}

function getCurrentPage() {
  return Number(
    document.querySelector("input[type='radio'][name=rad]:checked").value
  );
}

const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

function getSuffix() {
  return isPlanYearly() ? "yr" : "mo";
}

function validateFirstPage() {
  nameInput = document.getElementById("name").value;
  emailInput = document.getElementById("email").value;
  phoneInput = document.getElementById("phone").value;
  validateInput(document.getElementById("name"));
  validateInput(document.getElementById("phone"));
  validateInput(document.getElementById("email"));
  if (
    nameInput === "" ||
    emailInput === "" ||
    phoneInput === "" ||
    !validateEmail(emailInput)
  )
    return true;
  return false;
}

function updateFinalPage() {
  currentPlan = getSelectedPlan();
  let checkboxes = document.querySelectorAll(
    "input[type='checkbox'][name='addons[]']:checked"
  );
  finalPrice = monthlyPlanPrices[currentPlan];
  for (let i = 1; i <= 3; i++) {
    priceSummaryContainer[i].classList.add("hidden");
  }
  for (let i = 0; i < checkboxes.length; i++) {
    let idx = checkboxes[i].value;
    priceSummaryContainer[idx].classList.remove("hidden");
    let pElements = priceSummaryContainer[idx].querySelectorAll("p");
    pElements[1].textContent = `+$${
      addOnPrices[idx - 1] * (isPlanYear ? 10 : 1)
    }/${getSuffix()}`;
    finalPrice += addOnPrices[idx - 1];
  }
  finalPrice *= isPlanYear ? 10 : 1;
  let finalPriceTitle = document.querySelector(
    ".padded.space-around-flex > p:first-child"
  );
  finalPriceTitle.textContent = `Total (per ${isPlanYear ? "year" : "month"})`;
  let finalPriceElement = document.querySelector(".tot-amt");
  finalPriceElement.textContent = `$${finalPrice}/${getSuffix()}`;

  const planSelected = document.querySelector(".plan-selected-name");
  planSelected.textContent = `${planLabels[currentPlan]} (${
    isPlanYear ? "Yearly" : "Monthly"
  })`;
  document.querySelector(".plan-amt").textContent = `$${
    monthlyPlanPrices[currentPlan] * (isPlanYear ? 10 : 1)
  }/${getSuffix()}`;
}

//used for validating the input fields on blur
function validateInput(input) {
  const idx = input.name === "name" ? 0 : input.name === "phone" ? 2 : 1;
  if (input.value === "") {
    errorMessages[idx].innerHTML = "This field is required";
  } else {
    if (input.name != "email") errorMessages[idx].innerHTML = "";
    else if (!validateEmail(input.value)) {
      errorMessages[idx].innerHTML = "Please enter a valid email";
    } else errorMessages[idx].innerHTML = "";
  }
}

const labels = document.querySelectorAll(".rad-label");
let prevLabel = labels[0];
labels.forEach((label) => {
  const input = label.querySelector(".rad-input");
  input.addEventListener("click", function (e) {
    e.preventDefault();
    if (input.parentNode == prevLabel || validateFirstPage()) return;
    const pageNum = parseInt(input.value);
    goToNextPage(pageNum - 1);
  });
});

function updateRadioCursor(label) {
  label.classList.add("default-cursor");
  prevLabel.classList.remove("default-cursor");
  forms[prevLabel.querySelector(".rad-input").value - 1].classList.add(
    "hidden"
  );
  prevLabel = label;
}
