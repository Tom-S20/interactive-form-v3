
const inputName = document.getElementById("name");
const inputEmail = document.getElementById("email");
const ccNum = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const form = document.querySelector("form");
const title = document.getElementById("title");
const otherJobRole = document.getElementById("other-job-role");
const tshirtDesign = document.getElementById("design");
const tshirtColor = document.getElementById("color");
const tshirtTheme = tshirtColor.children;

inputName.focus();

// console.log(inputName);
// console.log(inputEmail);
// console.log(ccNum);
// console.log(zipCode);
// console.log(cvv);
// console.log(form);


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
    const design = tshirtDesign.value;

    for(let i=0; i<tshirtTheme.length; i++) {
        const option = tshirtColor.options[i];
        const theme = option.getAttribute('data-theme');

        if (theme === design)  {
            option.style.display = 'inline';
            tshirtTheme[i].hidden = false;
            tshirtTheme[i].setAttribute("selected", true);
        } else {
            option.style.display = 'none';
            tshirtTheme[i].hidden = true;
            tshirtTheme[i].removeAttribute("selected");

        }
    //     if (e.target.value = tshirtTheme[i].getAttribute("data-theme")) {
    //         option.style.display = 'block';

    // //         tshirtTheme[i].hidden = false;
    // //         tshirtTheme[i].setAttribute("selected", true);
    //     } else {
    //         option.style.display = 'none';

    //     }
    // //     console.log(tshirtColor);
    // //     console.log(tshirtColor.children)
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
const ccExpMonth = document.getElementById("exp-month");
const ccExpYear = document.getElementById("exp-year");

paypal.hidden = true;
bitcoin.hidden = true;

paymentSelect.selectedIndex=1;

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

//Form Validation
const activityValid = activities.querySelectorAll('input[type="checkbox"]:checked');
// const
const nameHint = document.getElementById("name-hint");
const emailHint = document.getElementById('email-hint');
const activitiesHint = document.getElementById('activities-hint');
const ccHint = document.getElementById('cc-hint');
const zipHint = document.getElementById('zip-hint');
const cvvHint = document.getElementById('cvv-hint');

form.addEventListener("submit", (e) => {

    const nameValue = inputName.value;
    const nameRegex = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/;
    const validName = nameRegex.test(nameValue);

    if (inputName.value.trim() === '') {
        e.preventDefault();
        inputName.parentElement.classList.add('not-valid');
        inputName.parentElement.classList.remove('valid');
        nameHint.style.display = 'block'

    } else {
        inputName.parentElement.classList.add('valid');
        inputName.parentElement.classList.remove('not-valid');
        nameHint.style.display = 'none'
    }
    console.log(nameValue);
    console.log(validName);

    const emailValue = inputEmail.value;
    const emailRegex = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validEmail = emailRegex.test(emailValue);
    // console.log(emailValue);
    // console.log(validEmail)

    if (!validEmail) {
        e.preventDefault();
        inputEmail.parentElement.classList.add('not-valid');
        inputEmail.parentElement.classList.remove('valid');
        emailHint.style.display = 'block';

    } else {
        inputEmail.parentElement.classList.add('valid');
        inputEmail.parentElement.classList.remove('not-valid');
        emailHint.style.display = 'none';

    }

    //Register Activities has items checked and will focus or blur sections to
    // promote accessibility and provide validation of selections without conflicts.
    if (activityValid.length === 0) {
        e.preventDefault();
        activities.parentElement.classList.add('not-valid');
        activities.parentElement.classList.remove('valid');
        activitiesHint.style.display = 'block';
    } else {
        activities.parentElement.classList.add('valid');
        activities.parentElement.classList.remove('not-valid');
        activitiesHint.style.display = 'none';

    }

    //Validating Credit Card fields only if credit card payment is selected

    if (paymentSelect.value === credit) {


        //Validate Card Number
        const cardValue = ccNum.value;
        const cardRegex = /^[0-9]{13,16}$/;
        const validCard = cardRegex.test(cardValue);

        if (!validCard) {
        e.preventDefault();
        ccNum.parentElement.classList.add('not-valid');
        ccNum.parentElement.classList.remove('valid');
        ccHint.style.display = 'block';
         } else {
        ccNum.parentElement.classList.add('valid');
        ccNum.parentElement.classList.remove('not-valid');
        ccHint.style.display = 'none';
        }

        //Validate Zip code
        const zipValue = zipCode.value;
        const zipRegex = /^[0-9]{5}$/;
        const validZip = zipRegex.test(zipValue);

        if (!validZip) {
            e.preventDefault();
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipHint.style.display = 'block';
             } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipHint.style.display = 'none';
            }


        //Validate cvv

        const cvvValue = cvv.value;
        const cvvRegex = /^[0-9]{3}$/;
        const validCvv = cvvRegex.test(cvvValue);

        if (!validCvv) {
            e.preventDefault();
            cvv.parentElement.classList.add('not-valid');
            cvv.parentElement.classList.remove('valid');
            cvvHint.style.display = 'block';
             } else {
            cvv.parentElement.classList.add('valid');
            cvv.parentElement.classList.remove('not-valid');
            cvvHint.style.display = 'none';
            }

        }


})
