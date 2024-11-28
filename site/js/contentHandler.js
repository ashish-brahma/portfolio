// Handler object to manage content.
var contentHandler = {
	// Current language set for content. (default: en-us)
	getLang: function () {
		return dropdownHandler.activeId(K.langDropdownId);
	},

	// Convenience function to access content json file of selected language.
	getContentURL: function () {
		return K.langContentLocation + contentHandler.getLang() + K.contentLocation;
	},

	// Set up an object to load font pack.
	fonts: {},

	// Set up an object to store list of body elements to be read from language content file.
	content: {},

	// Fetch content from URL
	fetchContent: async function (fetchURL, isJsonResponse) {
		try {
			const response = await fetch(fetchURL);
			if (!response.ok) {
				throw new Error(`HTTP error: ${response.status}`);
			}
			const data = isJsonResponse ? await response.json() : response.text();
			return data;
		} catch (error) {
			console.error(`Could not load content: ${error}`)
		}
	},

	// Process request for fetching and inserting content into HTML body.
	loadContent : function () {
		// Start fetching content from the url.
		contentHandler.fetchContent(contentHandler.getContentURL(), true)
			.then((data) =>  { 
				// Read fonts.
				contentHandler.fonts = data[K.fontPackIndex];

				// Read HTML body elements from fetched content.
				contentHandler.content = data[K.bodyIndex];

				// Use view builder to build entire HTML body.
				viewBuilder.buildBody();
			});
	},

	// Invoke relevant method to dynamically load/filter content depending upon dropdown Id.
	reloadContent : function (dropdownId) {
		switch (dropdownId) {
		case K.langDropdownId:
			contentHandler.loadContent();
			break;
		
		case K.projFilterId:
			portfolioSectionHandler.filterSection();
			break;
		
		default:
			console.log("Unable to reload content.");
		}
	}
};