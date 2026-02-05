// Initialize intlTelInput for phone number input
const input = document.querySelector("#phone");
const iti = window.intlTelInput(input, {
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
  initialCountry: "ke",
  separateDialCode: true
});

window.onload = generateCaptchasForAllForms;

// Modal event listener
const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const recipient = button.getAttribute('data-bs-whatever')
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.modal-body input')
    modalTitle.textContent = `New message to ${recipient}`
    modalBodyInput.value = recipient
  })
}

// Control Selection of From/To inputs
document.addEventListener('DOMContentLoaded', () => {
  const fromSelect = document.getElementById('from-select');
  const toSelect = document.getElementById('to-select');
  const fromInput = document.getElementById('from-input');
  const toInput = document.getElementById('to-input');

  const allOptions = ["SGR/Airport", "Nyali", "Shanzu", "Mtwapa", "Naivas", "Ukunda", "Shimon","Watamu", "Malindi", "Diani", "Naivas Ukunda","Other"];

  const exclusionRules = {
    "SGR/Airport": ["SGR/Airport"],
    "Nyali": ["Nyali"],
    "Shanzu": ["Shanzu"],
    "Mtwapa": ["Mtwapa"],
    "Naivas": ["Naivas"],
    "Ukunda": ["Ukunda"],
    "Shimon": ["Shimon"],
    "Watamu": ["Watamu"],
    "Malindi": ["Malindi"],
    "Diani": ["Diani"],
    "Naivas Ukunda": ["Naivas Ukunda"],
    "Other": ["Other"]
  }

  function populateSelect(selectElement, defaultText) {
    selectElement.innerHTML = '';
    const defaultOption = document.createElement("option");
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = defaultText;
    selectElement.appendChild(defaultOption);

    allOptions.forEach(option => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    });
  }

  function toggleInputDisplay(selectElement, inputElement, selectName) {
    if (selectElement.value === 'Other') {
      inputElement.style.display = 'block';
      inputElement.name = selectName;
      inputElement.required = true;
      selectElement.name = '';
    } else {
      inputElement.style.display = 'none';
      inputElement.name = '';
      inputElement.required = false;
      selectElement.name = selectName;
    }
  }

  function updateToOptions() {
    const selectedFrom = fromSelect.value;

    for (const option of toSelect.options) {
      option.disabled = false;
    }

    if (selectedFrom !== 'Other' && exclusionRules[selectedFrom]) {
      for (const option of toSelect.options) {
        if (exclusionRules[selectedFrom].includes(option.value)) {
          option.disabled = true;
        }
      }
    }
  }

  fromSelect.addEventListener('change', () => {
    toggleInputDisplay(fromSelect, fromInput, 'from');
    updateToOptions();
  });

  toSelect.addEventListener('change', () => {
    toggleInputDisplay(toSelect, toInput, 'to');
  });

  populateSelect(fromSelect, 'Select Starting Point');
  populateSelect(toSelect, 'Select Destination');
  toggleInputDisplay(fromSelect, fromInput, 'from');
  toggleInputDisplay(toSelect, toInput, 'to');
  updateToOptions();
});

// Restrict travel date to upcoming dates only
document.addEventListener('DOMContentLoaded', () => {
  const travelDateInput = document.getElementById('travelDate');
  const today = new Date().toISOString().split('T')[0];
  travelDateInput.setAttribute('min', today);
});

const formIDs = ['bookTransfers','carRental'];

const templateMap = {
  'bookTransfers': 'template_69kbfvu',
  'carRental': 'template_ramldpg'
};

function generateCaptcha(formID) {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `What is ${num1} + ${num2}?`;
  const answer = num1 + num2;

  document.getElementById(`captchaQuestion${formID}`).innerText = question;
  document.getElementById(`captchaAnswer${formID}`).dataset.correctAnswer = answer;
}

function generateCaptchasForAllForms() {
  formIDs.forEach(formID => generateCaptcha(formID));
}

document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => { 
  button.addEventListener('click', function() { 
    const formID = this.getAttribute('data-form-id'); 
    const carID = this.getAttribute('data-car-id'); 
    document.getElementById('carID').value = carID;
    generateCaptcha(formID); 
  });
});

function validateForm(e, formID) {
  e.preventDefault();
  const form = e.target;
  let phone_number = iti.getNumber();
  form.querySelector(`#phone`).value = phone_number;
  
  const captchaAnswer = form.querySelector(`#captchaAnswer${formID}`).value;
  const correctAnswer = form.querySelector(`#captchaAnswer${formID}`).dataset.correctAnswer;
  if (parseInt(captchaAnswer) !== parseInt(correctAnswer)) {
    alert("Incorrect captcha answer. Please try again.");
    generateCaptcha(formID);
    return false;
  }

  const travelDate = new Date(form.querySelector(`#travelDate`).value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (travelDate < today) {
    alert("Travel date cannot be in the past.");
    return false;
  }

  const templateID = templateMap[formID];
  const serviceID = 'default_service';

  emailjs.sendForm(serviceID, templateID, form)
    .then(() => {
      alert('Sent successfully!');
      form.reset();
      generateCaptcha(formID);
    })
    .catch((err) => {
      alert('Error sending form: ' + JSON.stringify(err));
    });

  return true;
}

// Travel destination package selection
document.addEventListener("DOMContentLoaded", function() {
  const packageSelect1 = document.getElementById('package1');
  const selectedPackage1 = document.getElementById('selected-package1');
  
  const packageSelect2 = document.getElementById('package2');
  const selectedPackage2 = document.getElementById('selected-package2');
  
  const packageSelect3 = document.getElementById('package3');
  const selectedPackage3 = document.getElementById('selected-package3');
  
  packageSelect1.addEventListener('change', function() {
    const selectedValue = packageSelect1.value;
    selectedPackage1.textContent = selectedValue || "None";
  });

  packageSelect2.addEventListener('change', function() {
    const selectedValue = packageSelect2.value;
    selectedPackage2.textContent = selectedValue || "None";
  });

  packageSelect3.addEventListener('change', function() {
    const selectedValue = packageSelect3.value;
    selectedPackage3.textContent = selectedValue || "None";
  });
});