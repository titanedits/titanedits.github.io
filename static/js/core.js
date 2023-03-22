// Videos
const template = document.getElementById("sectionTemplate").content.querySelector(".section");
const sections = document.getElementById("sections")
fetch('/static/json/videos.json')
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		console.log(data)
		data.forEach(item => {
			const section = template.cloneNode(true);
			console.log(section)
			const sectionTitle = section.querySelector(".section_title")
			const sectionDescription = section.querySelector(".section_description")
			const iframeContainer = section.querySelector(".iframe_container")
			
			sections.appendChild(section);
			sectionTitle.innerText = item.title
			sectionDescription.innerText = item.description
			
			if (item.hasCoolFont == true) {
				sectionTitle.classList.add("coolFont");
			}
			if (item.color != undefined) {
				section.style["background-color"] = item.color;
			}
			if (item.descriptionColor != undefined) {
				sectionDescription.style.color = item.descriptionColor;
			}

			let x = 789;
			let y = 442;

			if (item.videoLinks.length > 1) {
				x = 640;
				y = 360;
			}
			item.videoLinks.forEach(link => {
				const iframe = document.createElement("iframe")
				iframe.src = link[0]
				iframe.setAttribute("frameBorder", "0")
				iframe.setAttribute("allowfullscreen", "")
				if (link[1] == "VIDEO") {
					iframe.width = x
					iframe.height = y
				} else if (link[1] == "SHORT") {
					iframe.width = y
					iframe.height = x
				}
				iframeContainer.appendChild(iframe)
			})
		});

	})
	.catch(error => {
		console.error('Error fetching videos:', error);
		alert("Failed to retrieve video data, please try again later.");
	});


// Mobile Support & Overflow Detection
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

	if (isOverflowing) {
		header.classList.add('mobileHeader');
		title.classList.add('mobileTitle');
		headerlist.classList.add('mobileHeaderlist');
		main.classList.add('mobileMain');
	}

	const containers = document.querySelectorAll('.iframe_container');
	containers.forEach(container => {
		const isOverflowing = container.scrollWidth > container.clientWidth;

		if (isOverflowing) {
			container.style.flexDirection = 'column';
			container.style.gap = "16px";
		} else {
			container.style.flexDirection = 'row';
			container.style.gap = "";
		}
	})
}

// Call the function initially to set the correct classes
window.onload = updateClassesBasedOnOverflow;
document.addEventListener('DOMContentLoaded', updateClassesBasedOnOverflow);

// Attach the function to the window resize and orientationchange events
window.addEventListener('resize', updateClassesBasedOnOverflow);
window.addEventListener('orientationchange', updateClassesBasedOnOverflow);