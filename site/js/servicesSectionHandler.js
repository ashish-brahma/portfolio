// Handler object to manage content of services section.
var servicesSectionHandler = {
	// Convenience function to read content.
	getServicesObj : function () {
		return contentHandler.content[K.mainContentId][K.servicesSecId];
	},

	getServicesRowObj : function () {
		return servicesSectionHandler.getServicesObj()[K.servicesRowId];
	},

	// Insert content of introduction.
	insertIntro : function () {
		const introObj = servicesSectionHandler.getServicesObj()[K.introId];
		const intro = document.getElementById(K.introId);
		intro.appendChild(document.createElement(K.paragraphElement));
		intro.querySelector(K.paragraphElement).textContent = introObj[K.paragraphElement];
	},
	
	// Insert content of #download-btn.
	insertDownloadBtn : function () {
		const btnObj = servicesSectionHandler.getServicesObj()[K.downloadBtnId];
		const btnFont = contentHandler.fonts[K.btnLabelIndex];
		const downloadBtn = document.getElementById(K.downloadBtnId);
		downloadBtn.href = btnObj[K.hrefIndex];
		const label = downloadBtn.querySelector(K.periodSymbol + K.btnLabelIndex);
		label.textContent = btnObj[K.spanElement];
		label.classList.add(btnFont);
	},

	// Add cloned cards in rows of service col.
	insertServiceCardGrid : function () {
		const servicesRowObj = servicesSectionHandler.getServicesRowObj();

		// Identify elements for #service-card template insertion.
		const serviceCardsRow = document.getElementById(K.servicesRowId);
		const serviceCardTemplate = document.getElementById(K.serviceCardId);

		// Insert cloned templates in #service-cards-row.
		templateHandler.setTemplate(servicesRowObj, serviceCardsRow, 
										   serviceCardTemplate, K.servicesRowId);
	},

	// Insert cloned templates in services section.
	insertServicesTemplates : function () {
		servicesSectionHandler.insertIntro();
		servicesSectionHandler.insertDownloadBtn();
		servicesSectionHandler.insertServiceCardGrid();
	},

	// Add new service card.
	cloneServiceCard : function (clone, iterIndex) {
		// Add new card.
		let card = clone.querySelector(K.periodSymbol + K.cardIndex);

		// Prepare content for cloning.
		const servicesRowObj = servicesSectionHandler.getServicesRowObj();
		const serviceId = Object.keys(servicesRowObj)[iterIndex];

		// Add icon class.
		const icon = card.querySelector(K.iconElement);
		icon.classList.add(servicesRowObj[serviceId][K.iconElement]);

		// Add card title.
		const font = contentHandler.fonts[K.semiboldFontIndex];
		let cardTitle = card.querySelector(K.periodSymbol + K.cardTitleIndex);
		cardTitle.classList.add(font);
		cardTitle.textContent = servicesRowObj[serviceId][K.cardTitleIndex];

		// Add card text.
		let cardText = card.querySelector(K.periodSymbol + K.cardTextIndex);
		cardText.textContent = servicesRowObj[serviceId][K.cardTextIndex];
	}

};