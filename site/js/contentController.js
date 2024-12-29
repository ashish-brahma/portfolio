// Controller object to manage content.
var contentController = {
	// Current language set for content. (default: en-us)
	getLang : function () {
		return dropdownController.activeId(K.langDropdownId);
	},

	// Convenience function to access content json file of selected language.
	getContentURL : function () {
		const lang = contentController.getLang();
		document.documentElement.setAttribute(K.langAttribute, lang);
		return K.contentLocation + lang + K.jsonFileExtension;
	},

	// Convenience function to access content json file of #lang-dropdown.
	getLangDropdownURL : function () {
		return K.contentLocation + K.langDropdownId + K.jsonFileExtension;
	},

	// Set up an object to load font pack.
	fonts : {},

	// Set up an object to store language dropdown content.
	langDropdown: {},

	// Set up an object to store list of body elements to be read from language content file.
	content : {},

	// Fetch content from URL
	fetchContent : async function (fetchURL, isJsonResponse) {
		try {
			const response = await fetch(fetchURL);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = isJsonResponse ? await response.json() : response.text();
			return data;
		} catch (error) {
			console.error(`Could not load content: ${error}`);
		}
	},

	// Process request for fetching and inserting content into HTML body.
	loadContent : function () {
		// Start fetching content from dropdown url.
		contentController.fetchContent(contentController.getLangDropdownURL(), true)
			.then((langDropdownObj) => {
				// Read language dropdown content.
				contentController.langDropdown = langDropdownObj;
			});

		// Start fetching content from language url.
		contentController.fetchContent(contentController.getContentURL(), true)
			.then((data) =>  { 
				// Read fonts.
				contentController.fonts = data[K.fontPackIndex];

				// Read HTML body elements from fetched content.
				contentController.content = data[K.bodyIndex];

				// Use view controller to build entire HTML body.
				viewController.buildBody();
			});
	},

	// Invoke relevant method to dynamically load/filter content depending upon dropdown Id.
	reloadContent : function (dropdownId) {
		switch (dropdownId) {
		case K.langDropdownId:
			contentController.loadContent();
			break;
		
		case K.projFilterId:
			portfolioSectionController.filterSection();
			break;
		
		default:
			console.log("Unable to reload content.");
		}
	}
};