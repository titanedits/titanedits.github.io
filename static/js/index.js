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
			if (item.special == "PAST_CLIENTS") {
				const section = template.cloneNode(true);
				const sectionTitle = section.querySelector(".section_title")
				const sectionDescription = section.querySelector(".section_description")
				const pastClients = section.querySelector(".iframe_container")
				
				section.id = "pastClients"
				sections.appendChild(section);

				sectionTitle.innerText = "Past Clients"
				sectionDescription.innerText = "These are some of the past clients that I've worked with!"
				pastClients.classList.add("past_clients_container")

				// Past Clients
				const pastClientTemplate = document.getElementById("pastClientTemplate").content.querySelector(".past_client");
				fetch('/static/json/clients.json')
					.then(response => {
						if (!response.ok) {
							throw new Error('Network response was not ok');
						}
						return response.json();
					})
					.then(data => {
						data.forEach(client => {
							const pastClient = pastClientTemplate.cloneNode(true);
							const sectionTitle = pastClient.querySelector(".section_title")
							const sectionSubscribers = pastClient.querySelector(".past_client_subscribers")
							const sectionImage = pastClient.querySelector(".past_client_img")
							const sectionButton = pastClient.querySelector(".past_client_link")

							pastClients.appendChild(pastClient);
							sectionTitle.innerText = client.username
							sectionSubscribers.innerText = client.subscribers
							sectionImage.src = client.profilePicture
							sectionButton.innerText = client.linkText
							sectionButton.href = client.linkURL
						})
					})
					.catch(error => {
						console.error('Error fetching past clients:', error);
						alert("Failed to retrieve past client data, please try again later.");
					});
			} else if (item.special === "KWEBBELKOP") {
				const section = template.cloneNode(true);
				const sectionTitle = section.querySelector(".section_title")
				const sectionDescription = section.querySelector(".section_description")
				const pastClients = section.querySelector(".iframe_container")
				const button = pastClientTemplate.content.querySelector(".past_client_link").cloneNode(true);
				
				button.textContent = "View"
				button.style.width = "min-content"
				button.style.paddingLeft = "16px"
				button.style.paddingRight = "16px"
				button.style.backgroundColor = "#73460d"
				button.href = "/kwebbelkop"

				section.id = "kwebbelkop"
				pastClients.appendChild(button);
				sections.appendChild(section);

				sectionTitle.innerText = "Kwebbelkop"
				sections.querySelector("#kwebbelkop").style.backgroundColor = "#f8981d"

				sectionDescription.innerText = "View the video I made for Kwebbelkop!"

			} else {
				const section = template.cloneNode(true);
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
			}
		});

	})
	.catch(error => {
		console.error('Error fetching videos:', error);
		alert("Failed to retrieve video data, please try again later.");
	});