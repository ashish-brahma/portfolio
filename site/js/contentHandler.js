// Handler object to manage content.
var contentHandler = {
	// Current language set for content. (default: en-us)
	getLang: function () {
		const langDropdown = document.getElementById(K.langDropdown);
		if (langDropdown == null) {
			lang = 'en-us';
		} else lang =  dropdownHandler.activeId(K.langDropdown);
		return lang;
	},

	getBaseURL: function () {
		return K.snippetsLocation + contentHandler.getLang();
	},

	getContentURL: function () {
		return contentHandler.getBaseURL() + K.contentLocation;
	},

	// Set up an object to store list of body elements to be read from content file.
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
				// Read HTML body elements from fetched content.
				contentHandler.content = data[K.bodyIndex];
				
				// Use view builder to build entire HTML body.
				viewBuilder.buildBody();
		});
	},

	// Fetch section being currently viewed using scrollspy.
	currentSection:	function (event) {
		// Expose element which is being targeted by Scroll Spy. (#main-content)
		window.$scrollSpyEl = document.querySelector(K.scrollSpyEl);

		$scrollSpyEl.addEventListener(K.scrollSpyActivatedEvent, () => {
			/* Capture instance of the element which is currently being 
			targeted by Scroll Spy. */
			var scrollInstance = bootstrap.ScrollSpy.getInstance($scrollSpyEl);

			// Fetch list of sections.
			const secObj = contentHandler.content[K.sectionIndex];
			
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