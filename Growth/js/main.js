//Faq Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-content');

    faqContainer.addEventListener('click', (e) => {
        const groupHeader = e.target.closest('.faq-group-header');
        if(!groupHeader) return;

        const group = groupHeader.parentElement;
        const groupBody = group.querySelector('.faq-group-body');
        const icon = groupHeader.querySelector('i');


        //Toggle icon
        icon.classList.toggle('fa-plus')
        icon.classList.toggle('fa-minus')

        // toggle visibility of body
        groupBody.classList.toggle('open')

        // close other open Faq bodies

        const otherGroups = faqContainer.querySelectorAll(".faq-group")

         otherGroups.forEach((other) => {
            if(other !== group){
                const otherGroupBody = other.querySelector('.faq-group-body')
                const otherIcon = other.querySelector('.faq-group-header i')
              
                 otherGroupBody.classList.remove('open')
                 otherIcon.classList.remove('fa-minus')
                 otherIcon.classList.add('fa-plus')

            }
         })
    })
})

// hamburger styles
document.addEventListener("DOMContentLoaded", () =>{
    const hamburgerBtn = document.querySelector(".hamburger-btn")
    const mobileMenu = document.querySelector(".mobile-menu");
    
    hamburgerBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle('active')
    })
})