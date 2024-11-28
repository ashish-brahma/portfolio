// Handler object to build views.
var viewBuilder = {
	// Convenience function to insert prepared inner html content using an element's Id.
	insertHtml : function (id, innerHtml) {
		document.getElementById(id).innerHTML += innerHtml;

		// Refresh scrollspy after inserting elements in DOM.
		bootstrap.ScrollSpy.getInstance($scrollSpyEl).refresh();
	},

	// Hide loading icon.
	hideLoadingIcon : function () {
		const loadingIcon = document.getElementById(K.loadingIconId);
		loadingIcon.style.display = "none";
	},

	// Set fonts across body elements.
	setFonts : function () {
		const body = document.querySelector(K.bodyElement);
		const font = contentHandler.fonts[K.regularFontIndex];
		body.classList.add(font);
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
				// Stop showing loading icon.
				viewBuilder.hideLoadingIcon();

				// Set language font.
				viewBuilder.setFonts();

				// Insert content of all sections using templates.
				sectionHandler.getSectionContent(responses); 
				templateHandler.injectMainContentTemplate();

				// Initiate event listeners for all dropdown togglers.
				dropdownHandler.persistToggleActive();

				// Initiate listeners for changes to project filter dropdown selection.
				dropdownHandler.listenNewSelection(K.projFilterId);

				// Initiate form submission event listener.
				formHandler.submitForm(event);
			});
	},

	// Build entire body content of index.html file.
	buildBody : function () {
		// Ensure that browser supports templating before building views.
		if (templateHandler.isTemplateSupported) {
			viewBuilder.buildNavbar();
			viewBuilder.buildMainContent();
		} else {
		// In case browser does not support template element, do something else.
			console.log("Templating not supported. Aborting...");
		}
	}
};