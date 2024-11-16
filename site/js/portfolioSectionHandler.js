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

	// Insert cloned templates in portfolio section.
	insertPortfolioTemplates : function () {
		const pfObj = portfolioSectionHandler.getProjFilterObj();

		// Identify elements for #project-list-item template insertion.
		const projectFilterMenu = document.getElementById(K.projFilterMenuId);
		const projListItemTemplate = document.getElementById(K.projListItemId);
		
		// Insert cloned template in #project-filter-menu.
		templateHandler.setTemplate(pfObj, projectFilterMenu, 
										   projListItemTemplate, K.projFilterMenuId);

	},

	// Add dropdown divider
	insertDropdownDivider : function () {
	 	const divider = document
							.getElementById(K.projFilterMenuId)
							.appendChild(document.createElement(K.listItemElement));
		
		const hr = divider.appendChild(document.createElement(K.hrElement));
		hr.classList.add(K.dropdownDividerClassName);
	},

	// Insert button label
	insertButtonLabel : function () {
		viewBuilder.insertHtml(K.projButtonId, K.projButtonLabel);
	},

	// Add new filter button.
	cloneProjFilterListItem : function(clone, iterIndex) {
		if (iterIndex == 1) {
			portfolioSectionHandler.insertDropdownDivider();
		}
		let btn = clone.querySelector(K.buttonElement);
		const pfObj = portfolioSectionHandler.getProjFilterObj();
		const liId = Object.keys(pfObj)[iterIndex];
		const activeFilter = portfolioSectionHandler.getActiveProjFilter();
		if (liId === activeFilter) {
			btn.classList.add(K.activeClass);
		} else btn.classList.add(K.projColorClass);
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