
// our fleet modal
const input = document.querySelector("#phone");
// console.log('input, :', input)
window.intlTelInput(input, {
  loadUtilsOnInit: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
  initialCountry: "ke",
	separateDialCode: true,
});
const iti = window.intlTelInput(input, {
  loadUtilsOnInit: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
  initialCountry: "ke",
  separateDialCode: true,
});

window.onload = generateCaptchasForAllForms;

const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
  exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an Ajax request here
    // and then do the updating in a callback.

    // Update the modal's content.
    const modalTitle = exampleModal.querySelector('.modal-title')
    const modalBodyInput = exampleModal.querySelector('.modal-body input')

    modalTitle.textContent = `New message to ${recipient}`
    modalBodyInput.value = recipient
  })
}


// Restrict travel date to upcoming dates only
document.addEventListener('DOMContentLoaded', () => {
  const travelDateInput = document.getElementById('travelDate');
  const today = new Date().toISOString().split('T')[0];
  travelDateInput.setAttribute('min', today);
});




// Array of form IDs
const formIDs = ['bookTransfers','carRental'];
   // Object to map form IDs to their corresponding template IDs
   const templateMap = {
    'bookTransfers': 'template_69kbfvu',
    'carRental': 'template_ramldpg'
};

 // Function to generate and display captcha for each form
 function generateCaptcha(formID) {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const question = `What is ${num1} + ${num2}?`;
  const answer = num1 + num2;

  // Set the question and correct answer for the specified form
  document.getElementById(`captchaQuestion${formID}`).innerText = question;
  document.getElementById(`captchaAnswer${formID}`).dataset.correctAnswer = answer;
  // console.log(formID, question, answer)
}

// Generate captchas for all forms when the page loads

 function generateCaptchasForAllForms() {
            formIDs.forEach(formID => generateCaptcha(formID));
        }


  // Event listener for modal launch buttons 
 // Event listener for modal launch buttons 
 document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => { button.addEventListener('click', function() { 
  const formID = this.getAttribute('data-form-id'); 
  const carID = this.getAttribute('data-car-id'); 
  // console.log('i have clicked :', carID)
  // Set the form's template ID 
  document.getElementById('carID').value = carID;
  
  generateCaptcha(formID); 
});
 });

// Function to validate the form
function validateForm(e, formID) {
  e.preventDefault();
  const form = e.target;
  let phone_number= iti.getNumber()

  form.querySelector(`#phone`).value= phone_number
 
  
  //   window.intlTelInput( {
  //   loadUtilsOnInit: "https://cdn.jsdelivr.net/npm/intl-tel-input@24.7.0/build/js/utils.js",
   
  // });
  
  
 
 
  // Validate Captcha
  const captchaAnswer = form.querySelector(`#captchaAnswer${formID}`).value;
  const correctAnswer = form.querySelector(`#captchaAnswer${formID}`).dataset.correctAnswer;
  if (parseInt(captchaAnswer) !== parseInt(correctAnswer)) {
      alert("Incorrect captcha answer. Please try again.");
      generateCaptcha(formID); // Regenerate captcha on failure
      return false;
  }

  // Validate Travel Date
  const travelDate = new Date(form.querySelector(`#travelDate`).value);
  // console.log('traveldate >', travelDate)
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Ignore time portion for comparison
  if (travelDate < today) {
      alert("Travel date cannot be in the past.");
      return false;
  }

  // Determine the email template based on form ID

  const templateID = templateMap[formID];

  const serviceID = 'default_service';
 
  // console.log('phone :', number)
  // Send form data using emailjs

  emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        // console.log('sendFrom')
          alert('Sent successfully!');
          form.reset();
          generateCaptcha(formID); // Regenerate captcha after successful submission
      })
      .catch((err) => {
          alert('Error sending form: ' + JSON.stringify(err));
      });

  return true;
}





