/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
//create a variable containing the sections in the HTML doc
const sectionlist = document.querySelectorAll("section");

//create a variable equal to the navbar__list section
const navbarlist = document.getElementById("navbar__list");

const navlinks = document.getElementsByClassName("menu__link");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Smooth scroll to the top of the specified section. 
scrollTo = (section) => {
    window.scroll({
    behavior: "smooth",
    top: section.offsetTop
    });
}

observer = new IntersectionObserver(entries => {
    for (entry of entries) {
        if (entry.isIntersecting) {
            entry.target.classList.add("your-active-class");
            for (navlink of navlinks) {
                if (navlink.getAttribute("href") == entry.target.getAttribute("id")){
                    navlink.classList.add("active__section");
                };
            };
        } else {
            entry.target.classList.remove("your-active-class");
            for (navlink of navlinks) {
                if (navlink.getAttribute("href") == entry.target.getAttribute("id")){
                    navlink.classList.remove("active__section");
                };
            };
        }
    };
},
{
    root: document.getElementById("main"),
    threshold: 0.25
}
);

activeSection = () => {
    for (section of sectionlist) {
        observer.observe(section);
    };
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

//Function to build the nav

buildNavList = (navlist, sections, ) => {
    //Loop through found sections to create navbar items.
    for (section of sections){

        //create new list item
        const item = document.createElement("li");
        //create new anchor
        const anchor = document.createElement("a");

        //set anchor href to section id
        anchor.setAttribute("href", section.getAttribute("id"));
        //set anchor text to the data-Nav attribute
        anchor.textContent = section.getAttribute("data-Nav");
        
        //add the menu__link class to the anchor
        anchor.classList.add("menu__link");

        //append the anchor to the item, then the item to the parent list
        item.appendChild(anchor);
        navlist.appendChild(item);
        
    }
};

// Add class 'active' to section when near top of viewport



// Scroll to anchor ID using scrollTO event
scrollToSection = () => {
    //Add an event listener for when items in the Navbar are clicked
    navbarlist.addEventListener("click", (evt) => {
        
        //Prevent the default click action
        evt.preventDefault();

        //Get the section element referenced in the navbar link
        scrollTo(document.getElementById(evt.target.getAttribute("href")));
        }, false);
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

//Once the page content is loaded
document.addEventListener("DOMContentLoaded", function () {

// Build menu 
    buildNavList(navbarlist, sectionlist);

// Scroll to section on link click
    scrollToSection()   

// Set sections as active
    activeSection()

});
