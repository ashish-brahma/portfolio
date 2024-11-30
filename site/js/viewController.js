// Controller object to build views.
var viewController = {
	// Convenience function to insert prepared inner html content using an element's Id.
	insertHtml : function (id, innerHtml) {
		document.getElementById(id).innerHTML += innerHtml;

		// Refresh scrollspy after inserting elements in DOM.
		bootstrap.ScrollSpy.getInstance($scrollSpyEl).refresh();
	},

	// Convenience function to remove inner HTML.
	clearHTML : function (id) {
		const element = document.getElementById(id);
		while (element.hasChildNodes()) {
			element.removeChild(element.firstChild);
		}
	},

	// Show loading icon.
	showLoadingIcon: function (id) {
		const spinnerTemplate = document.getElementById(K.loadingSpinnerIconId);
		const clone = spinnerTemplate.content.cloneNode(true);
		const spinner = clone.querySelector(K.loadingIconId);
		document.getElementById(id).appendChild(clone);
	},

	// Set fonts across body elements.
	setFonts : function () {
		const body = document.querySelector(K.bodyElement);
		const font = contentController.fonts[K.regularFontIndex];
		body.className = font;
	},

	// Fetch and insert #sidebar-nav content.
	buildNavbar : function () {
		const snippetURL = K.snippetsLocation + K.sidebarNavId + K.htmlFileExtension;
		
		const navPromise = contentController.fetchContent(snippetURL, false);

		/* Pass defualt language selection to navController as 
		   it inaccessible in thenable block of navPromise. (Likely a bug.) */
		navController.activeLang = contentController.getLang();

		viewController.showLoadingIcon(K.sidebarNavId);
		
		navPromise
			.then((response) => {
				viewController.clearHTML(K.sidebarNavId);

				viewController.insertHtml(K.sidebarNavId, response);
				
				// Insert nav items using templates.
				templateController.injectSidebarNavTemplate();

				// Initiate listeners for changes to language dropdown selection.
				dropdownController.listenNewSelection(K.langDropdownId);
			});
	},

	// Fetch and insert all sections of #main-content.
	buildMainContent : function () {
		var sectionPromises = [];
		const secObj = sectionController.getSecObj();
		const totalSections = Object.keys(secObj).length;
		
		for (var i = 0; i < totalSections; i++) {
			var sectionId = Object.values(sectionController.getSecObj())[i];
			var snippetURL =  K.snippetsLocation + sectionId + K.htmlFileExtension;
			
			sectionPromises[i] = contentController.fetchContent(snippetURL, false);
		}
		
		viewController.showLoadingIcon(K.mainContentId);

		Promise.all(sectionPromises)
			.then((responses) => {
				viewController.clearHTML(K.mainContentId);

				// Set language font.
				viewController.setFonts();

				// Insert content of all sections using templates.
				sectionController.getSectionContent(responses); 
				templateController.injectMainContentTemplate();

				// Initiate event listeners for all dropdown togglers.
				dropdownController.persistToggleActive();

				// Initiate listeners for changes to project filter dropdown selection.
				dropdownController.listenNewSelection(K.projFilterId);

				// Initiate form input event listener.
				formController.listenFieldInput();

				// Initiate form submission event listener.
				formController.submitForm(event);
			});
	},

	// Build entire body content of index.html file.
	buildBody : function () {
		// Ensure that browser supports templating before building views.
		if (templateController.isTemplateSupported) {
			viewController.buildNavbar();
			viewController.buildMainContent();
		} else {
		// In case browser does not support template element, do something else.
			console.log("Templating not supported. Aborting...");
		}
	}
};