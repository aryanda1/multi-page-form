let pageNum = document.querySelector(
  "input[type='radio'][name=options]:checked"
).value;

const forms = document.getElementsByClassName('form');

function getPlanType() {
  let check = document.querySelector(
    "input[type='checkbox'][name='plan-type']:checked"
  );
  return check ? check.value : "off";
}
let planMOnthlyorYearly = getPlanType();
const planPrices = document.getElementsByClassName("plan-price");
const monthlyPlanPrices = ["9", "12", "15"];
const prevBut = document.getElementsByClassName('prev')[0];
console.log(planMOnthlyorYearly);
// console.log(pageNum);
let name = "";
let email = "";
let phone = "";

function goNext() {
  pageNum = document.querySelector(
    "input[type='radio'][name=options]:checked"
  ).value;
  if (pageNum == "1") {
    name = document.getElementById("name").value;
    email = document.getElementById("email").value;
    phone = document.getElementById("phone").value;
    const errs = document.getElementsByClassName("error-msg");
    if (name == "") errs[0].innerHTML = "This field is required";
    if (email == "") errs[1].innerHTML = "This field is required";
    if (phone == "") errs[2].innerHTML = "This field is required";
    if (name != "" && email != "" && phone != "") {
      document.getElementById("option2").checked = true;
      forms[0].classList.add('hidden');
      forms[1].classList.remove('hidden');
      prevBut.classList.remove('hidden');
    }
  }
}

function goBack(){
  pageNum = Number(document.querySelector(
    "input[type='radio'][name=options]:checked"
  ).value);
  document.getElementById(`option${pageNum-1}`).checked = true;
  forms[pageNum-1].classList.add('hidden');
  forms[pageNum-2].classList.remove('hidden');
  if(pageNum==2)
  prevBut.classList.add('hidden');
}

function monthlyToggler() {
  setTimeout(() => {
    planMOnthlyorYearly = getPlanType();
    console.log(planMOnthlyorYearly);
    const planPromo = document.getElementsByClassName("plan-promo");
    for (let i = 0; i < planPromo.length; i++)
      if (planMOnthlyorYearly == "on") {
        planPromo[i].classList.remove("hidden");
        planPrices[i].textContent = `$${monthlyPlanPrices[i] * 10}/yr`;
      } else {
        planPromo[i].classList.add("hidden");
        planPrices[i].textContent = `$${monthlyPlanPrices[i]*10}/mo`;
      }
  }, 10);
  if (pageNum == "2") {
  }
}
