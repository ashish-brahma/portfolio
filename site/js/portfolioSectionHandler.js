// Handler object to manage content of portfolio section.
portfolioSectionHandler = {
	// Current filter set in portfolio project dropdown. (default: All)
	getActiveProjFilter: function () {
		const projDropdown = document.getElementById(K.projFilterId);
		if ((projDropdown === null)) {
			var projFilter = 'All';
		} else projFilter =  dropdownHandler.activeId(K.projFilterId);
		return "All";
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

	// Insert link symbol in #project-btn.
	insertButtonLabels : function () {
		const projRow = document.getElementById(K.projRowId);
		const projButtons = projRow.querySelectorAll(K.periodSymbol + K.btnLabelIndex);
		projButtons.forEach(
			function (node) {
				node.innerHTML = K.projButtonLabel;
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

		// Add project filter class.
		card.classList.add(projRowObj[projId][K.cardIndex]);

		// Add project image.
		let cardImg = card.querySelector(K.imageElement);
		cardImg.src = K.cardImageLocation 
						+ projRowObj[projId][K.cardImageTopClassName] 
						+ K.pngFileExtension;
		cardImg.alt = projRowObj[projId][K.cardImageAltIndex];

		// Add project title.
		let cardTitle = card.querySelector(K.periodSymbol + K.cardTitleIndex);
		cardTitle.innerHTML = projRowObj[projId][K.cardTitleIndex];

		// Add body text.
		let cardText = card.querySelector(K.periodSymbol + K.cardTextIndex);
		cardText.innerHTML = projRowObj[projId][K.cardTextIndex];

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
		const liId = Object.keys(pfObj)[iterIndex];
		
		// Add button classes.
		const activeFilter = portfolioSectionHandler.getActiveProjFilter();
		if (liId === activeFilter) {
			btn.classList.add(K.activeClass);
		} else btn.classList.add(K.projListColorClass);
		
		// Add button names.
		btn.innerHTML = liId;
	},

	// Reload portfolio section using filters.
	reloadPortfolioSection : function () {
		const projFilter = portfolioSectionHandler.getActiveProjFilter();
		const cards = document.querySelector(K.cardClass);

		// TODO: Fix this loop to display only cards containing filter.
		cards.forEach(
			function (node) {
				if (node.classList.contains(projFilter)) {
					node.style.display = "";
				} else {
					node.style.display = "none";
				}
			}
		);
	}
};