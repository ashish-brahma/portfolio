// Handler object to manage dropdown events.
var dropdownHandler = {
	// Fetch current selection of the dropdown.
	activeId: function (dropdownId) {
		var currentSelection = K.emptyString;
		const dropdown = document.getElementById(dropdownId);
		
		// Rule out null condition caused by absence of populated content.
		if (dropdown !== null) {
			const dropdownMenuItems = document
										.getElementById(dropdownId)
										.querySelector(K.dropdownMenuClass)
										.querySelectorAll(K.listItemElement);
			
			dropdownMenuItems.forEach(
				function (node) {
					const btn = node.querySelector(K.buttonElement);
					if ((btn != null) && (btn.classList.contains(K.activeClass))) {
						currentSelection = node.id;
					}
				}
			);
		} 
		
		// In case current selection could not be assigned, use defaults.
		if ((currentSelection === K.emptyString) || (currentSelection == null)) {
			currentSelection = dropdownHandler.defaultId(dropdownId);
		}
		
		return currentSelection;
	},

	// Convenience function to get default selection of dropdown.
	defaultId : function (dropdownId) {
		switch (dropdownId) {
		case K.langDropdownId:
			return K.defaultLang;
			break;
		case K.projFilterId:
			return K.defaultProjFilter;
			break;
		default:
			console.log("Unable to fetch default settings for dropdown.");
		}
	},

	// Switch active state to new dropdown selection.
	listenNewSelection: function (dropdownId) {
		const dropdownMenuButtons = document
									.getElementById(dropdownId)
									.querySelector(K.dropdownMenuClass)
									.querySelectorAll(K.buttonElement);
		dropdownMenuButtons.forEach(
			function (node) {
				node.addEventListener (K.clickEvent, 
					function(event) {
						var activeId = dropdownHandler.activeId(dropdownId);
						const activeBtn = document
												.getElementById(activeId)
												.querySelector(K.buttonElement);
						activeBtn.classList.remove(K.activeClass);
						activeBtn.className = node.className;
						node.classList.add(K.activeClass);
						contentHandler.reloadContent(dropdownId);
					}
				);
			}
		)
	},

	// Persist active state of dropdown toggler.
	persistToggleActive: function (event) {
		const dropdownToggleList = document.querySelectorAll(K.dropdownToggleClass);
		
		dropdownToggleList.forEach( 
			function (node) {
				// Toggle button state upon click
				node.addEventListener(K.clickEvent, function (event) {
					if (this.classList.contains(K.activeClass)) {
						this.classList.remove(K.activeClass);
					} else this.classList.add(K.activeClass);
				});

				// Make state inactive when button loses focus
				node.addEventListener(K.blurEvent, function (event) {
					this.classList.remove(K.activeClass);
				});
			}
		);
	} 
};