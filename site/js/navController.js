// Controller to manage nav content.
var navController = {
	// Set up an object to read current language.
	activeLang : K.emptyString,

	// Convenience function to read nav content.
	getNavObj : function () {
		return contentController.content[K.sidebarNavId];
	},

	// Convenience function to read language dropdown content.
	getLangDropdownObj : function () {
		return contentController.langDropdown;
	},

	// Convenience function to read #nav-list content.
	getNavListObj : function () {
		return navController.getNavObj()[K.navListIndex];
	},

	// Convenience function to read #bio-list content.
	getInfobarObj : function () {
		return navController.getNavObj()[K.navBioIndex];
	},

	// Insert cloned templates in #lang-dropdown.
	insertLangDropdown : function () {
		const langDropdownObj = navController.getLangDropdownObj();

		const dropdownMenu = document
								.getElementById(K.langDropdownId)
								.querySelector(K.dropdownMenuClass);

		var langItemTemplate = document.getElementById(K.langItemId);

		templateController.setTemplate(langDropdownObj, dropdownMenu, 
										langItemTemplate, K.langDropdownId);
	},

	// Insert cloned templates in #nav-list.
	insertNavList : function () {
		const navListObj = navController.getNavListObj();

		// Identify elements for #nav-list template insertion.
		const navList = document.getElementById(K.navListIndex);
		var navItemTemplate = document.getElementById(K.navItemId);

		// Insert clone templates in #nav-list.
		templateController.setTemplate(navListObj, navList, 
										navItemTemplate, K.navListIndex);
	},

	// Insert cloned templates in #bio-list.
	insertInfobar : function () {
		const infobarObj = navController.getInfobarObj();

		// Identify elements for #bio-list template insertion.
		const bioList = document.getElementById(K.navBioIndex);
		var bioItemTemplate = document.getElementById(K.bioItemId);
		
		// Insert clone templates in #bio-list.
		templateController.setTemplate(infobarObj, bioList,
										bioItemTemplate, K.navBioIndex);
	},

	// Add new list item.
	cloneListItem : function (clone, iterIndex, obj) {
		let li = clone.querySelector(K.listItemElement);
		li.id = Object.keys(obj)[iterIndex];
		li.className = obj[li.id][K.langFontIndex];
	},

	// Add thumbnail image.
	cloneThmbImage : function (clone, iterIndex, obj) {
		let thumbnail = clone.querySelector(K.imageElement);
		const liId = Object.keys(obj)[iterIndex];
		const countryCode = obj[liId][K.langCountryCodeIndex];
		thumbnail.src = K.langFlagLocation + countryCode + K.svgFileExtension;
		const altText = obj[liId][K.altIndex];
		thumbnail.alt = altText;
	},

	// Add button label.
	cloneBtn : function (clone, iterIndex, obj) {
		let btn = clone.querySelector(K.buttonElement);
		const liId = Object.keys(obj)[iterIndex];
		if (liId === navController.activeLang) {
			btn.classList.add(K.activeClass);
		}
		const label = btn.appendChild(document.createElement(K.spanElement));
		label.setAttribute(K.langAttribute, liId);
		label.textContent = obj[liId][K.langLabelIndex];
	},

	// Add new nav list anchor.
	cloneAnchor : function (clone, iterIndex) {
		let anchor = clone.querySelector(K.anchorElement);
		const navListObj = navController.getNavListObj();
		const sectionId = Object.values(navListObj)[iterIndex];
		anchor.href = K.hashSymbol + sectionId;
		anchor.textContent = stringExt.capitalize(sectionId);
	},

	// Add new bio item title.
	cloneBioItemTitle : function (clone, iterIndex) {
		let bioItemTitle = clone.querySelector(K.bioItemTitleClass);
		const font = contentController.fonts[K.mediumFontIndex];
		bioItemTitle.classList.add(font);
		const infobarObj = navController.getInfobarObj();
		const title = Object.keys(infobarObj)[iterIndex];
		bioItemTitle.textContent = title;
	},

	// Add new bio item description.
	cloneBioItemDescription : function (clone, iterIndex) {
		let bioItemDescription = clone.querySelector(K.bioItemDescriptionClass);
		const font = contentController.fonts[K.semiboldFontIndex];
		bioItemDescription.classList.add(font);
		const infobarObj = navController.getInfobarObj();
		const description = Object.values(infobarObj)[iterIndex];
		bioItemDescription.textContent = description;
	}
};