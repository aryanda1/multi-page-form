let pageNum = getCurrentPage();

const forms = document.getElementsByClassName("form");

let curPlan = getSelectedPlan();
let yearlyPlan = isPlanYearly();
const planPrices = document.getElementsByClassName("plan-price");
const addOnPriceComp = document.getElementsByClassName("addOn-price");
const priceSummaryContainer =
  document.getElementsByClassName("space-around-flex");

let finalPrice = 0;

const monthlyPlanPrices = [9, 12, 15];
const addOnPrices = [1, 2, 2];
const addOnLabels = [
  "Online Service",
  "Larger Storage",
  "Customizable profile",
];
const planLabels = ["Arcade", "Advanced", "Pro"];

const prevBut = document.getElementsByClassName("prev")[0];
const nextBut = document.getElementsByClassName("next")[0];

let name = "";
let email = "";
let phone = "";

function goNext() {
  pageNum = getCurrentPage();
  yearlyPlan = isPlanYearly();
  if (pageNum == "1") {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    const errs = document.getElementsByClassName("error-msg");
    if (name == "") errs[0].innerHTML = "This field is required";
    if (email == "") errs[1].innerHTML = "This field is required";
    if (phone == "") errs[2].innerHTML = "This field is required";
    if(email && !validateEmail(email)) errs[1].innerHTML = "Please enter a valid email";
    if (name == "" || email == "" || phone == "" || !validateEmail(email)) return;
    for(let i = 0; i < errs.length; i++) errs[i].innerHTML = "";
    prevBut.classList.remove("hidden");
  }
  if (pageNum == "2") {
    curPlan = getSelectedPlan();
    for (let i = 0; i < addOnPriceComp.length; i++)
      addOnPriceComp[i].textContent = yearlyPlan
        ? `+$${addOnPrices[i] * 10}/yr`
        : `+$${addOnPrices[i]}/mo`;
  }
  if (pageNum == "3") {
    let checkboxes = document.querySelectorAll(
      "input[type='checkbox'][name='addons[]']:checked"
    );
    finalPrice = monthlyPlanPrices[curPlan];

    for (let i = 1; i <= 3; i++)
      priceSummaryContainer[i].classList.add("hidden");
    for (let i = 0; i < checkboxes.length; i++) {
      let idx = checkboxes[i].value;
      priceSummaryContainer[idx].classList.remove("hidden");
      let pElements = priceSummaryContainer[idx].querySelectorAll("p");
      pElements[1].textContent = yearlyPlan
        ? `+$${addOnPrices[idx - 1] * 10}/yr`
        : `+$${addOnPrices[idx - 1]}/mo`;
      finalPrice += addOnPrices[idx - 1];
    }

    let finalPriceTitle = document.querySelector(
      ".padded.space-around-flex > p:first-child"
    );
    let finalPriceEle = document.getElementsByClassName("tot-amt")[0];
    finalPriceTitle.textContent = `Total (pre ${
      yearlyPlan ? "year" : "month"
    })`;
    finalPrice *= yearlyPlan ? 10 : 1;
    finalPriceEle.textContent = `$${finalPrice}/${yearlyPlan ? "yr" : "mo"}`;
    const planSelected =
      document.getElementsByClassName("plan-selected-name")[0];

    planSelected.textContent = `${planLabels[curPlan]} (${
      yearlyPlan ? "Yearly" : "Monthly"
    })`;
    document.getElementsByClassName("plan-amt")[0].textContent = yearlyPlan
      ? `$${10 * monthlyPlanPrices[curPlan]}/yr`
      : `$${monthlyPlanPrices[curPlan]}/mo`;

    nextBut.textContent = "Confirm";
  }
  if (pageNum == "4") {
    document.getElementsByClassName("button")[0].classList.add("hidden");
  }
  if (pageNum != "4")
    document.getElementById(`option${Number(pageNum) + 1}`).checked = true;
  forms[pageNum - 1].classList.add("hidden");
  forms[pageNum].classList.remove("hidden");
}

function goBack() {
  pageNum = getCurrentPage();
  document.getElementById(`option${pageNum - 1}`).checked = true;
  forms[pageNum - 1].classList.add("hidden");
  forms[pageNum - 2].classList.remove("hidden");
  if (pageNum == 2) prevBut.classList.add("hidden");
  if (pageNum == 4) nextBut.textContent = "Next Step";
}

function updateTogler(isYearly) {
  const planPromo = document.getElementsByClassName("plan-promo");
  for (let i = 0; i < planPromo.length; i++)
    if (isYearly) {
      planPromo[i].classList.remove("hidden");
      planPrices[i].textContent = `$${monthlyPlanPrices[i] * 10}/yr`;
    } else {
      planPromo[i].classList.add("hidden");
      planPrices[i].textContent = `$${monthlyPlanPrices[i]}/mo`;
    }
}

const toggler = document.querySelector(".toggle");
toggler.addEventListener("click", (event) => {
  event.preventDefault();
  const { clientX } = event;
  const labelRect = toggler.getBoundingClientRect();
  const plan_toggle = document.getElementById("plan-type");
  if (clientX < labelRect.left) {
    updateTogler(false);
    plan_toggle.checked = false;
  } else if (clientX > labelRect.right) {
    updateTogler(true);
    plan_toggle.checked = true;
  } else {
    updateTogler(!isPlanYearly());
    plan_toggle.checked = !isPlanYearly();
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
  nextBut.textContent = "Next Step";
  document.getElementById(`option1`).checked = true;
  goNext();
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
