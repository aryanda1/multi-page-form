let currentPageNumber = getCurrentPage();

const forms = document.getElementsByClassName("form");

let currentPlan = getSelectedPlan();
let isPlanYear = isPlanYearly();
const planPrices = document.getElementsByClassName("plan-price");
const addOnPriceComponents = document.getElementsByClassName("addOn-price");
const priceSummaryContainer = document.getElementsByClassName("space-around-flex");

let finalPrice = 0;

const monthlyPlanPrices = [9, 12, 15];
const addOnPrices = [1, 2, 2];
const addOnLabels = [
  "Online Service",
  "Larger Storage",
  "Customizable Profile",
];
const planLabels = ["Arcade", "Advanced", "Pro"];

const previousButton = document.getElementsByClassName("prev")[0];
const nextButton = document.getElementsByClassName("next")[0];

let nameInput = "";
let emailInput = "";
let phoneInput = "";

nextButton.addEventListener("click", goToNextPage);
function goToNextPage() {
  currentPageNumber = getCurrentPage();
  isPlanYear = isPlanYearly();
  if (currentPageNumber === "1") {
    nameInput = document.getElementById("name").value;
    emailInput = document.getElementById("email").value;
    phoneInput = document.getElementById("phone").value;
    const errorMessages = document.getElementsByClassName("error-msg");
    if (nameInput === "") errorMessages[0].innerHTML = "This field is required";
    if (emailInput === "") errorMessages[1].innerHTML = "This field is required";
    if (phoneInput === "") errorMessages[2].innerHTML = "This field is required";
    if (emailInput && !validateEmail(emailInput)) errorMessages[1].innerHTML = "Please enter a valid email";
    if (nameInput === "" || emailInput === "" || phoneInput === "" || !validateEmail(emailInput)) return;
    for (let i = 0; i < errorMessages.length; i++) errorMessages[i].innerHTML = "";
    previousButton.classList.remove("hidden");
  }
  if (currentPageNumber === "2") {
    currentPlan = getSelectedPlan();
    for (let i = 0; i < addOnPriceComponents.length; i++) {
      addOnPriceComponents[i].textContent = isPlanYear
        ? `+$${addOnPrices[i] * 10}/yr`
        : `+$${addOnPrices[i]}/mo`;
    }
  }
  if (currentPageNumber === "3") {
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
      pElements[1].textContent = isPlanYear
        ? `+$${addOnPrices[idx - 1] * 10}/yr`
        : `+$${addOnPrices[idx - 1]}/mo`;
      finalPrice += addOnPrices[idx - 1];
    }

    let finalPriceTitle = document.querySelector(
      ".padded.space-around-flex > p:first-child"
    );
    let finalPriceElement = document.getElementsByClassName("tot-amt")[0];
    finalPriceTitle.textContent = `Total (pre ${isPlanYear ? "year" : "month"})`;
    finalPrice *= isPlanYear ? 10 : 1;
    finalPriceElement.textContent = `$${finalPrice}/${isPlanYear ? "yr" : "mo"}`;
    const planSelected = document.getElementsByClassName("plan-selected-name")[0];

    planSelected.textContent = `${planLabels[currentPlan]} (${isPlanYear ? "Yearly" : "Monthly"})`;
    document.getElementsByClassName("plan-amt")[0].textContent = isPlanYear
      ? `$${10 * monthlyPlanPrices[currentPlan]}/yr`
      : `$${monthlyPlanPrices[currentPlan]}/mo`;

    nextButton.textContent = "Confirm";
  }
  if (currentPageNumber === "4") {
    document.getElementsByClassName("button")[0].classList.add("hidden");
  }
  if (currentPageNumber !== "4") {
    document.getElementById(`option${Number(currentPageNumber) + 1}`).checked = true;
  }
  forms[currentPageNumber - 1].classList.add("hidden");
  forms[currentPageNumber].classList.remove("hidden");
}

function goBack() {
  currentPageNumber = getCurrentPage();
  document.getElementById(`option${currentPageNumber - 1}`).checked = true;
  forms[currentPageNumber - 1].classList.add("hidden");
  forms[currentPageNumber - 2].classList.remove("hidden");
  if (currentPageNumber === 2) previousButton.classList.add("hidden");
  if (currentPageNumber === 4) nextButton.textContent = "Next Step";
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

function updateLabelStyle(checkbox) {
  var label = checkbox.parentNode;
  if (checkbox.checked) {
    label.classList.add("checked");
  } else {
    label.classList.remove("checked");
  }
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
  return document.querySelector("input[type='radio'][name=rad]:checked").value;
}

const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}
