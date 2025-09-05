// let toggler = document.getElementsByClassName("navbar-toggler")[0];
// // let buttonElement = toggler[0];
// let icon = document.getElementsByClassName("fa-times")[0];
// // let iconElement = icon[0];
// toggler.addEventListener("click", handleDisplay());

// function handleDisplay() {
//   // Toggle display instead of just setting to block
//   if (icon.style.display === "block") {
//     icon.style.display = "none";
//   } else {
//     icon.style.display = "block";
//   }
// }
// const toggler = document.querySelector(".navbar-toggler");
// const barsIcon = document.querySelector(".fa-bars");
// const timesIcon = document.querySelector(".fa-times");

// // toggler.addEventListener("click", function () {
// //   // Check if menu is expanded (open)
// //   const isExpanded = toggler.getAttribute("aria-expanded") === "true";

// //   // Toggle icons based on menu state
// //   barsIcon.style.display = isExpanded ? "block" : "none";
// //   timesIcon.style.display = isExpanded ? "none" : "block";
// // });

// // Listen for Bootstrap's collapse events on the navbar itself
// const navbarCollapse = document.getElementById("navbarSupportedContent");

// navbarCollapse.addEventListener("show.bs.collapse", function () {
//   // Menu is opening - show times icon
//   barsIcon.style.display = "none";
//   timesIcon.style.display = "block";
// });

// navbarCollapse.addEventListener("hide.bs.collapse", function () {
//   // Menu is closing - show bars icon
//   barsIcon.style.display = "block";
//   timesIcon.style.display = "none";
// });


// Function to initialize navbar icon toggling
function initNavbarIcons() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Check if navbar toggler exists on this page
    if (!navbarToggler) return;
    
    // Create icons if they don't exist
    if (!navbarToggler.querySelector('.fa-bars')) {
        navbarToggler.innerHTML = `
            <i class="fas fa-bars navbar-toggler-icon-fa" style="display: block;"></i>
            <i class="fas fa-times navbar-toggler-icon-fa" style="display: none;"></i>
        `;
    }
    
    const barsIcon = navbarToggler.querySelector('.fa-bars');
    const timesIcon = navbarToggler.querySelector('.fa-times');
    const targetId = navbarToggler.getAttribute('data-bs-target');
    const navbarContent = document.querySelector(targetId);
    
    // Use Bootstrap's collapse events
    navbarContent.addEventListener('show.bs.collapse', function() {
        barsIcon.style.display = 'none';
        timesIcon.style.display = 'block';
    });
    
    navbarContent.addEventListener('hide.bs.collapse', function() {
        barsIcon.style.display = 'block';
        timesIcon.style.display = 'none';
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initNavbarIcons);