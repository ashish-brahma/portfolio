// Controller object to manage section content.
var sectionController = {
	// Convenience function to read sections.
	getSecObj : function () {
		return navController.getNavObj()[K.navListIndex];
	},

	// Convenience function to insert total sections in section indicator.
	insertTotalSections : function () {
		const secObj = sectionController.getSecObj();
		const lastIndex = Object.keys(secObj).length - 1;
		const zeroString = navController.getNavObj()[K.zeroStringIndex];
		const totalSections = Object.keys(secObj)[lastIndex];
		viewController.insertHtml(K.totalSectionsId,
				(lastIndex < 10) ? (zeroString + totalSections) : totalSections);
	},

	// Set up an object for section content to be inserted.
	sectionContent: {},

	// Convenience function to collect reponses of section promises for templating.
	getSectionContent : function (responses) {
		sectionController.sectionContent = responses;
	},

	// Convenience function to insert section heading.
	insertSectionHeading : function (id) {
		const section = document.getElementById(id);
		var heading = K.emptyString;
		const header = section.querySelector(K.headerElement);
		const headingFont = contentController.fonts[K.boldFontIndex];
		
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
			const lvlTwoFont = contentController.fonts[K.boldFontIndex];
			lvlTwoHeading.classList.add(headingFont, K.lvlTwoFontColorClass);
			heading = lvlTwoHeading;
		}
		
		switch (id) {
		case K.homeSecId:
			let bioNameIndex = Object.keys(navController.getInfobarObj())[0];
			heading.textContent = navController.getInfobarObj()[bioNameIndex];
			break;
		
		case K.contactSecId:
			let headingIndex = Object.keys(contactSectionController.getContactObj())[0];
			heading.textContent = contactSectionController.getContactObj()[headingIndex];
			break;

		default:
			heading.textContent = stringExt.capitalize(id);
		}
	},

	// Delegate templating to appropriate Controller method.
	templateSection : function (id) {
		switch(id) {
		case K.homeSecId:
			homeSectionController.insertHomeTemplates();
			break;

		case K.servicesSecId:
			servicesSectionController.insertServicesTemplates();
			break;
			
		case K.portfolioSecId:
			portfolioSectionController.insertPortfolioTemplates();
			break;
		
		case K.experienceSecId:
			experienceSectionController.insertExperienceTemplates();
			break;

		case K.skillsSecId:
			skillsSectionController.insertSkillTemplates();
			break;

		case K.contactSecId:
			contactSectionController.insertContactTemplates();
			break; 

		case K.blogSecId:
			blogSectionController.insertBlogTemplates();
			break;
		
		default:
			console.log("Templating ...");
		}
	},

	// Add all sections.
	insertSections : function () {
		const secObj = sectionController.getSecObj();
		const totalSections = Object.keys(secObj).length;
		const mainContent = document.getElementById(K.mainContentId);
		var classes = K.homeSecClasses;
		
		for (var i = 0; i < totalSections; i++ ) {
			const section = mainContent.appendChild(document.createElement(K.divElement));
			
			section.id = Object.values(sectionController.getSecObj())[i];

			section.className = K.defaultSecClasses + classes;
			
			if (section.id === K.homeSecId) {
				classes = K.genericSecClasses;
			}
			
			section.innerHTML = sectionController.sectionContent[i];

			sectionController.insertSectionHeading(section.id);

			sectionController.templateSection(section.id);
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
			const secObj = sectionController.getSecObj();
			const navObj = navController.getNavObj();
			
			// Get Id of current section using hash property of the instance's active target.
			var sectionId = scrollInstance
								._activeTarget
								.hash
								.replaceAll(K.hashSymbol, K.emptyString);

			// Set current section's number using sectionId.
			const index = Object.values(secObj).indexOf(sectionId);
			const sectionNum = Object.keys(secObj)[index];
			const zeroString = navObj[K.zeroStringIndex];
			
			// Update section indicator.
			document
				.getElementById(K.currentSectionId)
				.textContent = (index + 1 < 10) ?  (zeroString + sectionNum) : sectionNum;
		});
	}
};