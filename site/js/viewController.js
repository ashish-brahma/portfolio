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
			var sectionId = Object.keys(sectionController.getSecObj())[i];
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
				sectionController.setSectionContent(responses); 
				templateController.injectMainContentTemplate();

				// Initiate toggle event listeners for all dropdown togglers.
				dropdownController.persistToggleActive();

				// Initiate selection event listeners for project filter dropdown.
				dropdownController.listenNewSelection(K.projFilterId);

				// Initiate validation event listeners for all form fields.
				formController.validateFormFields();

				// Initiate form submission event listener.
				formController.submitForm(event);
			});
	},

	// Fetch and insert footer content.
	buildFooter : function () {
		const snippetURL = K.snippetsLocation + K.footerClass + K.htmlFileExtension;
		contentController.fetchContent(snippetURL, false)
			.then((response) => {
				const navFooter = document
									.getElementById(K.sidebarNavId)
									.querySelector(K.periodSymbol + K.containerClass)
									.appendChild(document.createElement(K.footerClass));
				navFooter.className = K.footerBaseClasses + K.navFooterClasses;
				navFooter.innerHTML = response;
				
				const mainFooter = document
									.getElementById(K.mainContentId)
									.appendChild(document.createElement(K.footerClass));
				mainFooter.className = K.footerBaseClasses + K.mainFooterClasses;
				mainFooter.innerHTML = response;
			});
	},

	// Build entire body content of index.html file.
	buildBody : function () {
		// Ensure that browser supports templating before building views.
		if (templateController.isTemplateSupported) {
			viewController.buildNavbar();
			viewController.buildMainContent();
			viewController.buildFooter();
		} else {
		// In case browser does not support template element, do something else.
			console.log("Templating not supported. Aborting...");
		}
	}
};