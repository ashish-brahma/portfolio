// Handler object to build views.
viewBuilder = {
	// Convenience function to insert prepared inner html content using an element's Id.
	insertHtml : function (id, innerHtml) {
		document.getElementById(id).innerHTML += innerHtml;
		
		// Refresh scrollspy after inserting elements in DOM.
		bootstrap.ScrollSpy.getInstance($scrollSpyEl).refresh();
	},

	// Boolean to check browser support for HTML template element.
	isTemplateSupported : "content" in document.createElement("template"),

	// Insert template content of #sidebar-nav.
	injectSidebarNavTemplate : function (lang) {
		// Prepare content to be inserted.
		const navObj = contentHandler.content[K.sidebarNavId];
		const langDropdownObj = navObj[K.langDropdownId];
		const totalItems = Object.keys(langDropdownObj).length;
		
		// Identify elements for template insertion.
		const dropdownMenu = document
								.getElementById(K.langDropdownId)
								.querySelector(K.dropdownMenuClass);

		const template = document.getElementById(K.langItemId);

		// Clone the new list item and insert it into #dropdown-menu. 
		for (var i = 0; i < totalItems; i++) {
			// Clone new list item.
			const clone = template.content.cloneNode(true);
			let li = clone.querySelector("li");
			li.id = Object.keys(langDropdownObj)[i];
			li.className = langDropdownObj[li.id][K.langFontIndex];
			
			// Insert thumbnail image.
			let thumbnail = clone.querySelector("img");
			const countryCode = langDropdownObj[li.id][K.langCountryCodeIndex];
			thumbnail.src = K.langFlagLocation + countryCode + K.svgFileExtension;
			const altText = langDropdownObj[li.id][K.langAltTextIndex];
			thumbnail.alt = altText;
			
			// Add button label.
			let btn = clone.querySelector("button");
			if (li.id === lang) {
				btn.className += K.activeClass;
			}
			btn.innerHTML += langDropdownObj[li.id][K.langLabelIndex];
			
			dropdownMenu.appendChild(clone); 
		}
	},

	// Fetch and insert #sidebar-nav content.
	buildNavbar : function () {
		const snippetURL = contentHandler.getBaseURL() + K.forwardSlash 
									+ K.sidebarNavId + K.htmlFileExtension;
		
		const navPromise = contentHandler.fetchContent(snippetURL, false);

		// Read language before entering thenable because
		// contentHandler is inaccessible inside. (appears to be buggy.)
		lang = contentHandler.getLang();
		
		navPromise
			.then((response) => {
				viewBuilder.insertHtml(K.sidebarNavId, response);

				// Insert nav items using templates.
				if (viewBuilder.isTemplateSupported) {
					viewBuilder.injectSidebarNavTemplate(lang);
				} else {
					// TODO: Browser does not support template element. Fix it.
				}

				// Update section indicator to reflect total sections fetched.
				const totalSections = viewBuilder.getTotalSections();
				viewBuilder.insertHtml(K.totalSectionsId,
						(totalSections < 10) ? (K.zeroString + totalSections) : totalSections);
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