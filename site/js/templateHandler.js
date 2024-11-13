// Handler object to insert templates
templateHandler = {
	// Boolean to check browser support for HTML template element.
	isTemplateSupported : "content" in document.createElement("template"),

	// Convenience function to determine insertion method.
	injectTemplate : function (id, lang) {
		if (templateHandler.isTemplateSupported) {
			switch (id) {
			case K.sidebarNavId:
				templateHandler.injectSidebarNavTemplate(lang);
				break;
			default:
				console.log(`No suitable template method for Id ${id}.`);
			}
		} else {
		// TODO: Browser does not support template element. Fix it.
		}
	},

	// Insert template content of #sidebar-nav.
	injectSidebarNavTemplate : function (lang) {
		// Prepare content to be inserted for #lang-dropdown.
		const navObj = contentHandler.content[K.sidebarNavId];
		const langDropdownObj = navObj[K.langDropdownId];
		var totalItems = Object.keys(langDropdownObj).length;
		
		// Identify elements for #lang-dropdown template insertion.
		const dropdownMenu = document
								.getElementById(K.langDropdownId)
								.querySelector(K.dropdownMenuClass);

		var template = document.getElementById(K.langItemId);

		// Clone the new list items and insert them into #dropdown-menu. 
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
				btn.classList.add(K.activeClass);
			}
			btn.innerHTML += langDropdownObj[li.id][K.langLabelIndex];
			
			dropdownMenu.appendChild(clone); 
		}

		// Prepare content to be inserted.
		const navListObj = contentHandler.content[K.sectionIndex];
		totalItems = Object.keys(navListObj).length;

		// Identify elements for #nav-list template insertion.
		const navList = document.getElementById(K.navListIndex);
		template = document.getElementById(K.navItemId);

		// Clone the new nav items and insert them into #nav-list.
		for (var i = 0; i < totalItems; i++) {
			// Clone new nav item.
			const clone = template.content.cloneNode(true);
			let anchor = clone.querySelector("a");
			const sectionId = Object.values(navListObj)[i];
			anchor.href = K.hashSymbol + sectionId;
			anchor.innerHTML = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
			navList.appendChild(clone);
		}		
	},
};