// Handler object to manage content of experience section.
experienceSectionHandler = {
	// Convenience function to read content.
	getExpObj : function () {
		return contentHandler.content[K.mainContentId][K.experienceSecId];
	},

	// Insert cloned templates of experience section.
	insertExperienceTemplates : function () {
		const expObj = experienceSectionHandler.getExpObj();

		// Identify elements for #exp-list-item template insertion.
		const expListFlexbox = document.getElementById(K.expBodyId);
		const expListItemTemplate = document.getElementById(K.expListItemId);
		
		// Insert cloned template in #exp-list-flexbox.
		templateHandler.setTemplate(expObj, expListFlexbox, 
										   expListItemTemplate, K.expBodyId);
	},

	// Add new job experience item.
	cloneExpListItem : function (clone, iterIndex) {
		// Prepare content for cloning.
		const expObj = experienceSectionHandler.getExpObj();
		const expId = Object.keys(expObj)[iterIndex];

		// Add year.
		let year = clone.querySelector(K.periodSymbol + K.yearIndex);
		year.textContent = expObj[expId][K.yearIndex];

		// Add designation.
		let des = clone.querySelector(K.periodSymbol + K.desginationIndex);
		des.textContent = expObj[expId][K.desginationIndex];

		// Add start and end dates.
		let startDate = clone.querySelector(K.periodSymbol + K.startDateIndex);
		startDate.textContent = expObj[expId][K.startDateIndex];
		let endDate = clone.querySelector(K.periodSymbol + K.endDateIndex);
		endDate.textContent = expObj[expId][K.endDateIndex];

		// Add new role description.
		let ul = clone.querySelector(K.unorderedListElement);
		const liList = expObj[expId][K.unorderedListElement];
		for (const item of liList) {
			var li = ul.appendChild(document.createElement(K.listItemElement));
			li.textContent = item;
		}
	}
};