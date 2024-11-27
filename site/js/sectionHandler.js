// Handler object to manage section content.
sectionHandler = {
	// Convenience function to read sections.
	getSecObj : function () {
		return contentHandler.content[K.sidebarNavId][K.navListIndex];
	},

	// Convenience function to calculate total sections.
	getTotalSections : function () {
		const secObj = sectionHandler.getSecObj();
		const totalSections = Object.keys(secObj).length;
		return totalSections;
	},

	// Convenience function to insert total sections in section indicator.
	insertTotalSections : function () {
		const totalSections = sectionHandler.getTotalSections();
		viewBuilder.insertHtml(K.totalSectionsId,
				(totalSections < 10) ? (K.zeroString + totalSections) : totalSections);
	},

	// Set up an object for section content to be inserted.
	sectionContent: {},

	// Convenience function to collect reponses of section promises for templating.
	getSectionContent : function (responses) {
		sectionHandler.sectionContent = responses;
	},

	// Add all sections.
	insertSections : function () {
		const secObj = sectionHandler.getSecObj();

		// Identify elements for #section-block template insertion.
		const mainContent = document.getElementById(K.mainContentId);
		const secTemplate = document.getElementById(K.sectionBlockId);

		// Insert cloned template in #main-content.
		templateHandler.setTemplate(secObj, mainContent, secTemplate, K.mainContentId);
	},

	// Clone new section.
	cloneSection : function (clone, iterIndex) {
		let section = clone.querySelector(K.divElement);
		section.id = sectionHandler.getSecObj()[iterIndex];
		
		const classes = (section.id === K.homeSecId) ? 
						        K.homeSecClasses : K.genericSecClasses;
		
		section.className = classes;

		section.innerHTML = sectionHandler.sectionContent[iterIndex];
	},

	// Convenience function to insert section heading.
	insertSectionHeading : function (id) {
		const section = document.getElementById(id);
		var heading = K.emptyString;
		const header = section.querySelector(K.headerElement);
		const headingFont = contentHandler.fonts[K.boldFontIndex];
		
		// No header element in home section.
		if (header == null) {
			const about = section.querySelector(K.hashSymbol + K.aboutId);
			const lvlOneHeading = about
									.appendChild(document
													.createElement(K.lvlOneHeadingElement));
			lvlOneHeading.classList.add(headingFont);
			heading = lvlOneHeading;
		
		} else {    // All other sections contain header element.
			const lvlTwoHeading = header
								.appendChild(document
												.createElement(K.lvlTwoHeadingElement));
			const lvlTwoFont = contentHandler.fonts[K.boldFontIndex];
			lvlTwoHeading.classList.add(headingFont, K.lvlTwoFontColorClass);
			heading = lvlTwoHeading;
		}
		
		switch (id) {
		case K.homeSecId:
			heading.textContent = navHandler.getInfobarObj()[K.bioNameIndex];
			break;
		
		case K.contactSecId:
			heading.textContent = contactSectionHandler.getContactObj()[K.headingIndex];
			break;

		default:
			heading.textContent = stringExt.capitalize(id);
		}
	},

	// Delegate cloning to appropriate handler method.
	templateSectionById : function (iterIndex) {
		const sectionId = sectionHandler.getSecObj()[iterIndex];
		
		switch(sectionId) {
		case K.homeSecId:
			homeSectionHandler.insertHomeTemplates();
			break;

		case K.servicesSecId:
			servicesSectionHandler.insertServicesTemplates();
			break;
			
		case K.portfolioSecId:
			portfolioSectionHandler.insertPortfolioTemplates();
			break;
		
		case K.experienceSecId:
			experienceSectionHandler.insertExperienceTemplates();
			break;

		case K.skillsSecId:
			skillsSectionHandler.insertSkillTemplates();
			break;

		case K.contactSecId:
			contactSectionHandler.insertContactTemplates();
			break; 

		case K.blogSecId:
			blogSectionHandler.insertBlogTemplates();
			break;
		
		default:
			console.log("Templating ...");
		}
	},

	// Template all sections.
	templateSections : function () {
		const secObj = sectionHandler.getSecObj();
		const totalSections = sectionHandler.getTotalSections();
		for (var i = 0; i < totalSections; i++ ) {
			// Insert section heading.
			const sectionId = Object.values(secObj)[i];
			sectionHandler.insertSectionHeading(sectionId);
			
			// Insert section template.
			sectionHandler.templateSectionById(i);
		}
	},

	// Fetch section being currently viewed using scrollspy.
	listenCurrentSection : function (event) {
		// Expose element which is being targeted by Scroll Spy. (#main-content)
		window.$scrollSpyEl = document.querySelector(K.scrollSpyEl);

		$scrollSpyEl.addEventListener(K.scrollSpyActivatedEvent, () => {
			/* Capture instance of the element which is currently being 
			targeted by Scroll Spy. */
			var scrollInstance = bootstrap.ScrollSpy.getInstance($scrollSpyEl);

			// Fetch list of sections.
			const secObj = sectionHandler.getSecObj();
			
			// Get Id of current section using hash property of the instance's active target.
			var sectionId = scrollInstance
								._activeTarget
								.hash
								.replaceAll(K.hashSymbol, K.emptyString);

			// Set current section's number using sectionId.
			var sectionNum = Object.values(secObj).indexOf(sectionId) + 1;

			// Update section indicator.
			document
				.getElementById(K.currentSectionId)
				.textContent = (sectionNum < 10) ? (K.zeroString + sectionNum) : sectionNum;
		});
	}
};