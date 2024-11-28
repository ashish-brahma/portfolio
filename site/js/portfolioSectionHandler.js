// Handler object to manage content of portfolio section.
var portfolioSectionHandler = {
	// Current filter set in portfolio project dropdown. (default: All)
	getActiveProjFilter: function () {
		return dropdownHandler.activeId(K.projFilterId);
	},

	// Convenience function to read content.
	getPortfolioObj : function () {
		return contentHandler.content[K.mainContentId][K.portfolioSecId];
	},

	// Convenience function to read dropdown filter content.
	getProjFilterObj : function () {
		return portfolioSectionHandler.getPortfolioObj()[K.projFilterId];
	},

	// Convenience function to read content of all project cards.
	getProjRowObj : function () {
		return portfolioSectionHandler.getPortfolioObj()[K.projRowId];
	},

	// Add cloned buttons in project filter.
	insertProjFilter : function () {
		const pfObj = portfolioSectionHandler.getProjFilterObj();

		// Identify elements for #project-list-item template insertion.
		const projectFilterMenu = document.getElementById(K.projFilterMenuId);
		const projListItemTemplate = document.getElementById(K.projListItemId);
		
		// Insert cloned template in #project-filter-menu.
		templateHandler.setTemplate(pfObj, projectFilterMenu, 
										   projListItemTemplate, K.projFilterMenuId);
	},

	// Add cloned cards in columns of project row.
	insertProjCardGrid : function () {
		const projRowObj = portfolioSectionHandler.getProjRowObj();

		// Identify elements for #project-card template insertion.
		const projectCardsRow = document.getElementById(K.projRowId);
		const projCardTemplate = document.getElementById(K.projCardId);

		// Insert cloned templates in #project-cards-row.
		templateHandler.setTemplate(projRowObj, projectCardsRow, 
										   projCardTemplate, K.projRowId);
	},

	// Insert cloned templates in portfolio section.
	insertPortfolioTemplates : function () {
		portfolioSectionHandler.insertProjFilter();
		portfolioSectionHandler.insertProjCardGrid();
		portfolioSectionHandler.insertButtonLabels();
	},

	// Add dropdown divider
	insertDropdownDivider : function () {
	 	const divider = document
							.getElementById(K.projFilterMenuId)
							.appendChild(document.createElement(K.listItemElement));
		
		const hr = divider.appendChild(document.createElement(K.hrElement));
		hr.classList.add(K.dropdownDividerClassName);
	},

	// Insert button label in #project-btn.
	insertButtonLabels : function () {
		const projRow = document.getElementById(K.projRowId);
		const projButtons = projRow.querySelectorAll(K.periodSymbol + K.btnLabelIndex);
		const btnFont = contentHandler.fonts[K.btnLabelIndex];
		projButtons.forEach(
			function (node) {
				node.textContent = K.projButtonLabel;
				node.classList.add(btnFont);
				const icon = node.appendChild(document.createElement(K.iconElement));
				icon.className = K.projButtonIconClassName;
			}
		);
	},

	// Add new project card.
	cloneProjCard : function (clone, iterIndex) {
		// Add new card.
		let card = clone.querySelector(K.periodSymbol + K.cardIndex);
		
		// Prepare content for cloning.
		const projRowObj = portfolioSectionHandler.getProjRowObj();
		const projId = Object.keys(projRowObj)[iterIndex];

		// Add project filter classes.
		card.classList.add(...projRowObj[projId][K.cardIndex]);

		// Add project image.
		let cardImg = card.querySelector(K.imageElement);
		cardImg.src = K.imagesLocation 
						+ projRowObj[projId][K.cardImageTopClassName] 
						+ K.pngFileExtension;
		cardImg.alt = projRowObj[projId][K.altIndex];

		// Add project title.
		const font = contentHandler.fonts[K.semiboldFontIndex];
		let cardTitle = card.querySelector(K.periodSymbol + K.cardTitleIndex);
		cardTitle.classList.add(font);
		cardTitle.textContent = projRowObj[projId][K.cardTitleIndex];

		// Add body text.
		let cardText = card.querySelector(K.periodSymbol + K.cardTextIndex);
		cardText.textContent = projRowObj[projId][K.cardTextIndex];

		// Add project button. Insert labels later.
		let btn = card.querySelector(K.hashSymbol + K.projButtonId);
		btn.href = projRowObj[projId][K.hrefIndex];
	},

	// Add new filter button.
	cloneProjFilterListItem : function (clone, iterIndex) {
		// Insert dropdown divider after first button.
		if (iterIndex == 1) {
			portfolioSectionHandler.insertDropdownDivider();
		}
		
		// Add new button.
		let btn = clone.querySelector(K.buttonElement);

		// Prepare content for cloning.
		const pfObj = portfolioSectionHandler.getProjFilterObj();

		// Add list item id.
		let li = clone.querySelector(K.listItemElement);
		const liId = Object.keys(pfObj)[iterIndex];
		li.id = pfObj[liId];
		
		// Add button classes.
		const activeFilter = portfolioSectionHandler.getActiveProjFilter();
		if (liId === activeFilter) {
			btn.classList.add(K.activeClass);
		} else btn.classList.add(K.projListColorClass);
		
		// Add button names.
		btn.innerHTML = liId;
	},

	// Load projects according to filter selected.
	filterSection : function () {
		const activeFilter = portfolioSectionHandler.getActiveProjFilter();
		const projRow = document.getElementById(K.projRowId);
		const cols = projRow.querySelectorAll(K.periodSymbol + K.colClass);

		cols.forEach(
			function (node) {
				const self = node;
				const cards = node.querySelectorAll(K.periodSymbol + K.cardIndex);
				cards.forEach (
					function (node) {
						self.style.display = (node
												.classList
												.contains(activeFilter)) ? "block" : "none";
					}
				);
			}
		);
	}
};