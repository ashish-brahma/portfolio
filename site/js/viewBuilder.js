// Handler object to build views.
viewBuilder = {
	// Convenience function to insert prepared inner html content using an element's Id.
	insertHtml : function (id, innerHtml) {
		document.getElementById(id).innerHTML += innerHtml;

		// Refresh scrollspy after inserting elements in DOM.
		bootstrap.ScrollSpy.getInstance($scrollSpyEl).refresh();
	},

	// Fetch and insert #sidebar-nav content.
	buildNavbar : function () {
		const snippetURL = contentHandler.getBaseURL() + K.forwardSlash 
									+ K.sidebarNavId + K.htmlFileExtension;
		
		const navPromise = contentHandler.fetchContent(snippetURL, false);

		// Read language before entering thenable because
		// contentHandler is inaccessible inside. (appears to be a bug.)
		lang = contentHandler.getLang();
		
		navPromise
			.then((response) => {
				viewBuilder.insertHtml(K.sidebarNavId, response);
				
				// Insert nav items using templates.
				templateHandler.injectTemplate(K.sidebarNavId, lang);
				
				// Update section indicator to reflect total sections fetched.
				const totalSections = viewBuilder.getTotalSections();
				viewBuilder.insertHtml(K.totalSectionsId,
						(totalSections < 10) ? (K.zeroString + totalSections) : totalSections);

				// Initiate listeners for changes to language dropdown selection.
				dropdownHandler.newSelection(K.langDropdownId);
			});
	},

	// Convenience function to read sections.
	getSecObj : function () {
		return contentHandler.content[K.sectionIndex];
	},

	// Convenience function to calculate total sections.
	getTotalSections : function() {
		const secObj = viewBuilder.getSecObj();
		const totalSections = Object.keys(secObj).length;
		return totalSections;
	},

	// Fetch content of all sections.
	getSectionContent : function () {
		var sectionPromises = [];
		const totalSections = viewBuilder.getTotalSections();
		
		for (var i = 0; i < totalSections; i++) {
			var snippetURL = contentHandler.getBaseURL() + K.forwardSlash 
								+ viewBuilder.getSecObj()[i] + K.htmlFileExtension;
			
			sectionPromises[i] = contentHandler.fetchContent(snippetURL, false);
		}
		
		return Promise.all(sectionPromises);
	},

	// TODO: Handle dropdown filtering.
	sectionComposer : function(id, filter, content) {
		
	},

	// Compose individual sections of #main-content.
	buildSection : function (id, classes, content) {
		var sectionContent = content;

		// Dynamically update content based on filter selection.
		const sectionEl = document.getElementById(id);
		if (sectionEl != null) {
			const dropdowns = sectionEl.querySelectorAll(K.dropdownClass);

			var currentFilter = [];
			dropdowns.forEach(
				function (node) {
				currentFilter += dropdownHandler.activeId(node.id);
			})

			if (currentFilter.length === 0) {
				sectionContent = viewBuilder.sectionComposer(id, currentFilter, content);
			}
		}

		var innerHtml = `<div id="${id}" class="${classes}">`+ sectionContent +`</div>`;

		return innerHtml
	},

	// Compose inner html content of #main-content.
	buildMainContent : function () {
		viewBuilder.getSectionContent()
			.then((responses) => {
				var i = 0;
				for (const response of responses) {
					var sectionId = contentHandler.content[K.sectionIndex][i];
					var classes = (sectionId === K.homeSec) ? 
									K.homeSecClasses : K.genericSecClasses;
					
					var innerHtml = 
						viewBuilder.buildSection(sectionId, classes, response);
					
					viewBuilder.insertHtml(K.mainContentId, innerHtml);
					i++;
				}
			});
	},

	// Build entire body content of index.html file.
	buildBody : function () {
		viewBuilder.buildNavbar();
		viewBuilder.buildMainContent();
	}
};