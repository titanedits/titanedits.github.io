const header = document.getElementById('header');
const title = document.getElementById('title');
const headerlist = document.getElementById('headerlist');
const main = document.getElementById('main');

function updateClassesBasedOnOverflow() {
	// Temporarily remove classes to get accurate measurements
	header.classList.remove('mobileHeader');
	title.classList.remove('mobileTitle');
	headerlist.classList.remove('mobileHeaderlist');
	main.classList.remove('mobileMain');
	
	const headerlistRightEdge = headerlist.getBoundingClientRect().right;
	const windowWidth = window.innerWidth;
	
	const isOverflowing = headerlistRightEdge > windowWidth;
	console.log(isOverflowing);

	if (isOverflowing) {
		header.classList.add('mobileHeader');
		title.classList.add('mobileTitle');
		headerlist.classList.add('mobileHeaderlist');
		main.classList.add('mobileMain');
	}
}

// Call the function initially to set the correct classes
window.onload = updateClassesBasedOnOverflow;
document.addEventListener('DOMContentLoaded', updateClassesBasedOnOverflow);

// Attach the function to the window resize and orientationchange events
window.addEventListener('resize', updateClassesBasedOnOverflow);
window.addEventListener('orientationchange', updateClassesBasedOnOverflow);