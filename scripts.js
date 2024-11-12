// nav item on click

// document.querySelectorAll('.dropdown-item').forEach(item => { item.addEventListener('click', event => { // Remove custom-click class from all items 
//     document.querySelectorAll('.dropdown-item').forEach(el => el.classList.remove('greenBackground')); 
//     console.log("clikced")
//     // Add custom-click class to the clicked item 
//     item.classList.add('greenBackground'); 
// }); 
// });

// our fleet modal

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

// const form = {
//     from_name: 'Sender',
//     message: 'Test Message',
//     reply_to:'alexbarasa0723@gmail.com',

//   };
const form = document.getElementById('bookingForm')
function validateForm(e) {
    console.log('e :', e)
    e.preventDefault()
    // Validate Captcha
    const captchaAnswer = document.getElementById("captchaAnswer").value;
    if (parseInt(captchaAnswer) !== 20) {
      alert("Incorrect captcha answer. Please try again.");
      return false;
    }
  
    // Check Travel Date
    const travelDate = new Date(document.getElementById("travelDate").value);
    const today = new Date();
    if (travelDate < today) {
      alert("Travel date cannot be in the past.");
      return false;
    }

    // Email.send({
    //     Host: "smtp.elasticemail.com",
    //     Username: "tranquiltourstravel@gmail.com",
    //     Password: "5138F83E0C5BDD01204C3701A1F76C11460D",
    //     To: 'tranquiltourstravel@gmail.com',
    //     From: "tranquiltourstravel@gmail.com",
    //     Subject: "Sending Email using javascript",
    //     Body: "Well that was easy!!",
    // })
    //     .then(function (message) {
    //         alert("mail sent successfully")
    //     });

        // btn.value = 'Sending...';

        const serviceID = 'default_service';
        const templateID = 'template_69kbfvu';
     
        emailjs.sendForm(serviceID, templateID, form)
         .then(() => {
        //    btn.value = 'Send Email';
           alert('Sent!');
         }, (err) => {
        //    btn.value = 'Send Email';
           alert(JSON.stringify(err));
         });
    
  
    // alert("Booking confirmed successfully!");
    // return true;
  }
