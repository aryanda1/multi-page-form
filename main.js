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
let planIsYearly = getPlanType();
const planPrices = document.getElementsByClassName("plan-price");
const addOnPriceComp = document.getElementsByClassName('addOn-price')

const monthlyPlanPrices = ["9", "12", "15"];
const addOnPrices = [1,2,2];

const prevBut = document.getElementsByClassName('prev')[0];
console.log(planIsYearly);
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
    if (name == "" || email == "" || phone == "")
    return;
    prevBut.classList.remove('hidden');
  }
  if(pageNum=='2'){
    for(let i = 0;i<addOnPriceComp.length;i++)
    addOnPriceComp[i].textContent = planIsYearly=='on'?`+$${addOnPrices[i]*10}/yr`:`+$${addOnPrices[i]}/mo`;
  }
  if(pageNum=='3'){

  }
  document.getElementById(`option${Number(pageNum)+1}`).checked = true;
  forms[pageNum-1].classList.add('hidden');
  forms[pageNum].classList.remove('hidden');
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
    planIsYearly = getPlanType();
    console.log(planIsYearly);
    const planPromo = document.getElementsByClassName("plan-promo");
    for (let i = 0; i < planPromo.length; i++)
      if (planIsYearly == "on") {
        planPromo[i].classList.remove("hidden");
        planPrices[i].textContent = `$${monthlyPlanPrices[i] * 10}/yr`;
      } else {
        planPromo[i].classList.add("hidden");
        planPrices[i].textContent = `$${monthlyPlanPrices[i]}/mo`;
      }
  }, 10);
  if (pageNum == "2") {
  }
}


function updateLabelStyle(checkbox) {
  var label = checkbox.parentNode;
  if (checkbox.checked) {
    label.classList.add("checked");
  } else {
    label.classList.remove("checked");
  }
}
