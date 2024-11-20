// Handler to manage nav content.
navHandler = {
	// Set up an object to read current language.
	activeLang : K.emptyString,

	// Convenience function to read nav content.
	getNavObj : function () {
		return contentHandler.content[K.sidebarNavId];
	},

	// Convenience function to read language dropdown content.
	getLangDropdownObj : function () {
		return navHandler.getNavObj()[K.langDropdownId];
	},

	// Convenience function to read #nav-list content.
	getNavListObj : function () {
		return navHandler.getNavObj()[K.navListIndex];
	},

	// Convenience function to read #bio-list content.
	getInfobarObj : function () {
		return navHandler.getNavObj()[K.navBioIndex];
	},

	// Insert cloned templates in #lang-dropdown.
	insertLangDropdown : function () {
		const langDropdownObj = navHandler.getLangDropdownObj();

		const dropdownMenu = document
								.getElementById(K.langDropdownId)
								.querySelector(K.dropdownMenuClass);

		var langItemTemplate = document.getElementById(K.langItemId);

		templateHandler.setTemplate(langDropdownObj, dropdownMenu, 
										langItemTemplate, K.langDropdownId);
	},

	// Insert cloned templates in #nav-list.
	insertNavList : function () {
		const navListObj = navHandler.getNavListObj();

		// Identify elements for #nav-list template insertion.
		const navList = document.getElementById(K.navListIndex);
		var navItemTemplate = document.getElementById(K.navItemId);

		// Insert clone templates in #nav-list.
		templateHandler.setTemplate(navListObj, navList, 
										navItemTemplate, K.navListIndex);
	},

	// Insert cloned templates in #bio-list.
	insertInfobar : function () {
		const infobarObj = navHandler.getInfobarObj();

		// Identify elements for #bio-list template insertion.
		const bioList = document.getElementById(K.navBioIndex);
		var bioItemTemplate = document.getElementById(K.bioItemId);
		
		// Insert clone templates in #bio-list.
		templateHandler.setTemplate(infobarObj, bioList,
										bioItemTemplate, K.navBioIndex);
	},

	// Add new list item.
	cloneListItem : function (clone, iterIndex) {
		let li = clone.querySelector(K.listItemElement);
		const langDropdownObj = navHandler.getLangDropdownObj();
		li.id = Object.keys(langDropdownObj)[iterIndex];
		li.className = langDropdownObj[li.id][K.langFontIndex];
	},

	// Add thumbnail image.
	cloneThmbImage : function (clone, iterIndex) {
		let thumbnail = clone.querySelector(K.imageElement);
		const langDropdownObj = navHandler.getLangDropdownObj();
		const liId = Object.keys(langDropdownObj)[iterIndex];
		const countryCode = langDropdownObj[liId][K.langCountryCodeIndex];
		thumbnail.src = K.langFlagLocation + countryCode + K.svgFileExtension;
		const altText = langDropdownObj[liId][K.altIndex];
		thumbnail.alt = altText;
	},

	// Add button label.
	cloneBtn : function (clone, iterIndex) {
		let btn = clone.querySelector(K.buttonElement);
		const langDropdownObj = navHandler.getLangDropdownObj();
		const liId = Object.keys(langDropdownObj)[iterIndex];
		if (liId === navHandler.activeLang) {
			btn.classList.add(K.activeClass);
		}
		btn.innerHTML += langDropdownObj[liId][K.langLabelIndex];
	},

	// Add new nav list anchor.
	cloneAnchor : function (clone, iterIndex) {
		let anchor = clone.querySelector(K.anchorElement);
		const navListObj = navHandler.getNavListObj();
		const sectionId = Object.values(navListObj)[iterIndex];
		anchor.href = K.hashSymbol + sectionId;
		anchor.innerHTML = stringExt.capitalize(sectionId);
	},

	// Add new bio item title.
	cloneBioItemTitle : function (clone, iterIndex) {
		let bioItemTitle = clone.querySelector(K.bioItemTitleClass);
		const infobarObj = navHandler.getInfobarObj();
		const title = Object.keys(infobarObj)[iterIndex];
		bioItemTitle.innerHTML = title;
	},

	// Add new bio item description.
	cloneBioItemDescription : function (clone, iterIndex) {
		let bioItemDescription = clone.querySelector(K.bioItemDescriptionClass);
		const infobarObj = navHandler.getInfobarObj();
		const description = Object.values(infobarObj)[iterIndex];
		bioItemDescription.innerHTML = description;
	}
};