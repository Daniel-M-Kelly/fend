# Udacity Landing Page Project Dec 2020

## Table of Contents

* [Functionality] (#Functionality)
* [Changes from Template](#Changes from Template)

## Functionality
Sections in the index.html are automatically added to the NavBar with their "data-nav" attribute as the link text and their "id" attribute as the reference.

Clicking a Section link in the NavBar will smooth scroll to the section.

Sections with 25% or more visible in the browser window will have their NavBar link highlighted. The sections will also be marked with the the "your-active-class" class that adds the rotating circles.

## Changes from Template

### Index.html
Added javascript import to header to allow it to load earlier, and set it as deferred to improve performance of page load.

Used onload attribute to make stylesheets and fonts load asynchronously as well.

Added a 4th section to demonstrate dynamic building of unordered Navigation list.

Removed default "your-active-class" class from Section 1

### app.js
Added an event listener to wait for the DOM to load before executing functions. 

Created navBar unordered list based on sections in index.html using querySelectorALL.

Used "your-active-class" to style active sections based on intersection observer output

Used window.scroll to smooth scroll to section when clicked on navigation bar, using an event listener and ignoring the default action.
### style.css
Modified the ".navbar__menu ul" style to use a flexbox to organize the nav items into a row, and justify the content.

Created a ".navbar__menu .active__section" to highlight the nav item related to the section that is currently visible in the browser window.
