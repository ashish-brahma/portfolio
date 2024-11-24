// Handler object to insert templates
templateHandler = {
	// Boolean to check browser support for HTML template element.
	isTemplateSupported : "content" in document.createElement("template"),

	// Insert cloned template items in the target element.
	setTemplate : function (obj, target, template, objId) {
		var totalItems = Object.keys(obj).length;
		for (var i = 0; i < totalItems; i++) {
			const clone = template.content.cloneNode(true);
			templateHandler.cloneItems(clone, objId, i, obj);
			target.appendChild(clone);
		}
	},

	// Insert template content of #sidebar-nav.
	injectSidebarNavTemplate : function () {
		// Insert templates for #lang-dropdown.
		navHandler.insertLangDropdown();
		
		// Insert templates for #offcanvasNavbar.
		navHandler.insertNavList();

		// Insert templates for #infobar.
		navHandler.insertInfobar();
	},

	// Insert template content of #main-content.
	injectMainContentTemplate : function () {
		sectionHandler.insertSections();

		// Update section indicator.
		sectionHandler.insertTotalSections();

		// Insert template of individual sections.
		sectionHandler.templateSections();
	},

	// Delegate clone insertion to appropritate handler method.
	cloneItems : function (clone, targetId, iterIndex, obj) {
		switch (targetId) {
		case K.langDropdownId :
			// Clone new list item.
			navHandler.cloneListItem(clone, iterIndex);
			
			// Insert thumbnail image.
			navHandler.cloneThmbImage(clone, iterIndex);
			
			// Add button label.
			navHandler.cloneBtn(clone, iterIndex);
			break;

		case K.navListIndex :
			// Clone anchor elements of nav buttons.
			navHandler.cloneAnchor(clone, iterIndex);
			break;

		case K.navBioIndex :
			// Clone title and description items of infobar.
			navHandler.cloneBioItemTitle(clone, iterIndex);
			navHandler.cloneBioItemDescription(clone, iterIndex);
			break;

		case K.mainContentId :
			// Clone sections of #main-content.
			sectionHandler.cloneSection(clone, iterIndex);
			break;

		case K.projFilterMenuId:
			// Clone elements of #project-filter-menu.
			portfolioSectionHandler.cloneProjFilterListItem(clone, iterIndex);
			break;

		case K.projRowId:
			// Clone cards for all projects.
			portfolioSectionHandler.cloneProjCard(clone, iterIndex);
			break;

		case K.socialId:
			// Clone social media buttons.
			homeSectionHandler.cloneSocialButton(clone, iterIndex);
			break;

		case K.servicesRowId:
			// Clone cards for all services.
			servicesSectionHandler.cloneServiceCard(clone, iterIndex);
			break;

		case K.expBodyId:
			// Clone items under experience.
			experienceSectionHandler.cloneExpListItem(clone, iterIndex);
			break;

		case K.skillsBodyId:
			// Clone items under skills.
			skillsSectionHandler.cloneSkillsListItem(clone, iterIndex);
			break;

		case K.skillChartIndex:
			// Clone charts.
			skillsSectionHandler.cloneChart(clone, iterIndex, obj);
			break;
			
		default:
			console.log("Templating ...");
		}
	},
};