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