
const inputName = document.getElementById("name");
const title = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const tshirtDesign = document.getElementById("design");
const tshirtColor = document.getElementById("color");
const tshirtTheme = tshirtColor.children;

inputName.focus();

// console.log(title);
// console.log(otherJobRole);

//Hiding other-job-roles by default unless 'other' is selected in the dropdown menu
otherJobRole.hidden = true;
title.addEventListener('change',(e) => {
    if(e.target.value === 'other') {
        otherJobRole.hidden = false;
    }
    else {
        otherJobRole.hidden = true;
    }
});

// console.log(tshirtDesign);
// console.log(tshirtColor);
// console.log(tshirtColor.children)

tshirtColor.disabled = true

tshirtDesign.addEventListener('change', (e) => {
    tshirtColor.disabled = false
    for(let i=0; i<tshirtTheme.length; i++) {
        if (e.target.value = tshirtColor.children[i].getAttribute("data-theme")) {
            tshirtTheme[i].hidden = false;
            tshirtTheme[i].setAttribute("selected", true);
        } else {
            tshirtTheme[i].hidden = true;
            tshirtTheme[i].removeAttribute("selected");
        }
        console.log(tshirtColor);
        console.log(tshirtColor.children)
    }
});
//Acticity selection that will also sum up the total cost when multiple activites are selected
const activities = document.getElementById("activities");
const activityTotal = document.getElementById("activities-cost");
let totalCost = 0

activities.addEventListener('change', (e) => {
    const boxCheck = e.target;

    if (boxCheck.type === 'checkbox') {
        const fee = parseInt(boxCheck.getAttribute('data-cost'));
        let totalCost = parseInt(activityTotal.textContent.replace(/[^0-9]/g, ''));

        if (boxCheck.checked) {
            totalCost += fee;
        } else {
            totalCost -= fee;
        }
            activityTotal.textContent = 'Total: $' + totalCost;
        }



})


//Payment info section.  Propely collects information
const paymentSelect = document.getElementById("payment");
const credit = document.getElementById("credit-card");
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");

// console.log(paymentSelection);
// console.log(credit);
// console.log(paypal);
// console.log(bitcoin);
paypal.hidden = true;
bitcoin.hidden = true;

paymentSelect.setAttribute("selected", true);

paymentSelect.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
        paypal.hidden = false;
        bitcoin.hidden = true;
        credit.hidden = true;
    } else if (e.target.value === "bitcoin" ) {
        paypal.hidden = true;
        bitcoin.hidden = false;
        credit.hidden = true;
    } else {
        paypal.hidden = true;
        bitcoin.hidden = true;
        credit.hidden = false;
    }
})
