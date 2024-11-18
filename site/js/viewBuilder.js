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
		const snippetURL = K.snippetsLocation + K.sidebarNavId + K.htmlFileExtension;
		
		const navPromise = contentHandler.fetchContent(snippetURL, false);

		/* Pass defualt language selection to navHandler as 
		   it inaccessible in thenable block of navPromise. (Likely a bug.) */
		navHandler.activeLang = contentHandler.getLang();
		
		navPromise
			.then((response) => {
				viewBuilder.insertHtml(K.sidebarNavId, response);
				
				// Insert nav items using templates.
				templateHandler.injectSidebarNavTemplate();

				// Initiate listeners for changes to language dropdown selection.
				dropdownHandler.listenNewSelection(K.langDropdownId);
			});
	},

	// Fetch and insert all sections of #main-content.
	buildMainContent : function () {
		var sectionPromises = [];
		const totalSections = sectionHandler.getTotalSections();
		
		for (var i = 0; i < totalSections; i++) {
			var snippetURL =  K.snippetsLocation + sectionHandler.getSecObj()[i] 
																+ K.htmlFileExtension;
			
			sectionPromises[i] = contentHandler.fetchContent(snippetURL, false);
		}
		
		Promise.all(sectionPromises)
			.then((responses) => {
				// Insert content of all sections using templates.
				sectionHandler.getSectionContent(responses); 
				templateHandler.injectMainContentTemplate();

				// Initiate listeners for changes to project filter dropdown selection.
				dropdownHandler.listenNewSelection(K.projFilterId);
			});
	},

	// Build entire body content of index.html file.
	buildBody : function () {
		// Ensure that browser supports templating before building views.
		if (templateHandler.isTemplateSupported) {
			viewBuilder.buildNavbar();
			viewBuilder.buildMainContent();
		} else {
		// TODO: In case browser does not support template element, do something else.
		}
	}
};