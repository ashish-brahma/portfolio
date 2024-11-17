// Handler object to insert templates
templateHandler = {
	// Boolean to check browser support for HTML template element.
	isTemplateSupported : "content" in document.createElement("template"),

	// Delegate clone insertion to appropritate handler method.
	cloneItems : function (clone, targetId, iterIndex) {
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

		case K.projColId:
			// Clone cols for all projects.
			portfolioSectionHandler.cloneProjCol(clone, iterIndex);
			break;

		default:
			console.log("Templating ...");
		}
	},

	// Insert cloned template items in the target element.
	setTemplate : function (obj, target, template, objId) {
		var totalItems = Object.keys(obj).length;
		for (var i = 0; i < totalItems; i++) {
			const clone = template.content.cloneNode(true);
			templateHandler.cloneItems(clone, objId, i);
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
};