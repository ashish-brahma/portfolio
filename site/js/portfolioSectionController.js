// Controller object to manage content of portfolio section.
var portfolioSectionController = {
	// Current filter set in portfolio project dropdown. (default: All)
	getActiveProjFilter: function () {
		return dropdownController.activeId(K.projFilterId);
	},

	// Convenience function to read content.
	getPortfolioObj : function () {
		return contentController.content[K.mainContentId][K.portfolioSecId];
	},

	// Convenience function to read dropdown filter content.
	getProjFilterObj : function () {
		return portfolioSectionController.getPortfolioObj()[K.projFilterId];
	},

	// Convenience function to read content of all project cards.
	getProjRowObj : function () {
		return portfolioSectionController.getPortfolioObj()[K.projRowId];
	},

	// Add cloned buttons in project filter.
	insertProjFilter : function () {
		const pfObj = portfolioSectionController.getProjFilterObj();

		// Identify elements for #project-list-item template insertion.
		const projectFilterMenu = document.getElementById(K.projFilterMenuId);
		const projListItemTemplate = document.getElementById(K.projListItemId);
		
		// Insert cloned template in #project-filter-menu.
		templateController.setTemplate(pfObj, projectFilterMenu, 
										   projListItemTemplate, K.projFilterMenuId);
	},

	// Add cloned cards in columns of project row.
	insertProjCardGrid : function () {
		const projRowObj = portfolioSectionController.getProjRowObj();

		// Identify elements for #project-card template insertion.
		const projectCardsRow = document.getElementById(K.projRowId);
		const projCardTemplate = document.getElementById(K.projCardId);

		// Insert cloned templates in #project-cards-row.
		templateController.setTemplate(projRowObj, projectCardsRow, 
										   projCardTemplate, K.projRowId);
	},

	// Insert cloned templates in portfolio section.
	insertPortfolioTemplates : function () {
		portfolioSectionController.insertProjFilter();
		portfolioSectionController.insertProjCardGrid();
		portfolioSectionController.insertButtonLabels();
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
		const pfObj = portfolioSectionController.getPortfolioObj();
		const projRow = document.getElementById(K.projRowId);
		const projButtons = projRow.querySelectorAll(K.periodSymbol + K.btnLabelIndex);
		const btnFont = contentController.fonts[K.btnLabelIndex];
		projButtons.forEach(
			function (node) {
				node.textContent = pfObj[K.projButtonLabelIndex];
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
		const projRowObj = portfolioSectionController.getProjRowObj();
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
		const font = contentController.fonts[K.semiboldFontIndex];
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
			portfolioSectionController.insertDropdownDivider();
		}
		
		// Add new button.
		let btn = clone.querySelector(K.buttonElement);

		// Prepare content for cloning.
		const pfObj = portfolioSectionController.getProjFilterObj();

		// Add list item id.
		let li = clone.querySelector(K.listItemElement);
		const liId = Object.keys(pfObj)[iterIndex];
		li.id = pfObj[liId];
		
		// Add button classes.
		const activeFilter = portfolioSectionController.getActiveProjFilter();
		if (pfObj[liId] === activeFilter) {
			btn.classList.add(K.activeClass);
		} else btn.classList.add(K.projListColorClass);
		
		// Add button names.
		btn.innerHTML = liId;
	},

	// Load projects according to filter selected.
	filterSection : function () {
		const activeFilter = portfolioSectionController.getActiveProjFilter();
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