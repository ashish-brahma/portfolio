// Controller object to insert templates
var templateController = {
	// Boolean to check browser support for HTML template element.
	isTemplateSupported : "content" in document.createElement("template"),

	// Insert cloned template items in the target element.
	setTemplate : function (obj, target, template, objId) {
		var totalItems = Object.keys(obj).length;
		for (var i = 0; i < totalItems; i++) {
			const clone = template.content.cloneNode(true);
			templateController.cloneItems(clone, objId, i, obj);
			target.appendChild(clone);
		}
	},

	// Insert template content of #sidebar-nav.
	injectSidebarNavTemplate : function () {
		// Insert templates for #lang-dropdown.
		navController.insertLangDropdown();
		
		// Insert templates for #offcanvasNavbar.
		navController.insertNavList();

		// Insert templates for #infobar.
		navController.insertInfobar();
	},

	// Insert template content of #main-content.
	injectMainContentTemplate : function () {
		sectionController.insertSections();

		// Update section indicator.
		sectionController.insertTotalSections();
	},

	// Delegate clone insertion to appropritate Controller method.
	cloneItems : function (clone, targetId, iterIndex, obj) {
		switch (targetId) {
		case K.langDropdownId :
			// Clone new list item.
			navController.cloneListItem(clone, iterIndex, obj);
			
			// Insert thumbnail image.
			navController.cloneThmbImage(clone, iterIndex, obj);
			
			// Add button label.
			navController.cloneBtn(clone, iterIndex, obj);
			break;

		case K.navListIndex :
			// Clone anchor elements of nav buttons.
			navController.cloneAnchor(clone, iterIndex);
			break;

		case K.navBioIndex :
			// Clone title and description items of infobar.
			navController.cloneBioItemTitle(clone, iterIndex);
			navController.cloneBioItemDescription(clone, iterIndex);
			break;

		case K.projFilterMenuId:
			// Clone elements of #project-filter-menu.
			portfolioSectionController.cloneProjFilterListItem(clone, iterIndex);
			break;

		case K.projRowId:
			// Clone cards for all projects.
			portfolioSectionController.cloneProjCard(clone, iterIndex);
			break;

		case K.socialId:
			// Clone social media buttons.
			homeSectionController.cloneSocialButton(clone, iterIndex);
			break;

		case K.servicesRowId:
			// Clone cards for all services.
			servicesSectionController.cloneServiceCard(clone, iterIndex);
			break;

		case K.expBodyId:
			// Clone items under experience.
			experienceSectionController.cloneExpListItem(clone, iterIndex);
			break;

		case K.skillsBodyId:
			// Clone items under skills.
			skillsSectionController.cloneSkillsListItem(clone, iterIndex);
			break;

		case K.skillChartIndex:
			// Clone charts.
			skillsSectionController.cloneChart(clone, iterIndex, obj);
			break;
		
		case K.formFieldIndex:
			// Clone form fields.
			contactSectionController.cloneFormDivs(clone, iterIndex);
			break;

		case K.formSubmitBtnIndex:
			// Clone submit button of form.
			contactSectionController.cloneSendButton(clone, iterIndex, obj);
			break;

		default:
			console.log("Templating ...");
		}
	},
};