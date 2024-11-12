// Handler object to manage dropdown events.
var dropdownHandler = {
	// Fetch current selection of the dropdown.
	activeId: function (dropdownId) {
		var currentSelection = K.emptyString;
		const dropdownMenuItems = document
									.getElementById(dropdownId)
									.querySelector(K.dropdownMenuClass)
									.querySelectorAll(K.listItemElement);
		dropdownMenuItems.forEach(
			function (node) {
				const btn = node.querySelector(K.buttonElement);
				// Rule out null value due to new selection.
				if ((btn != null) && (btn.classList.contains(K.activeClass))) {
					currentSelection = node.id;
				}
			}
		);
		return currentSelection;
	},

	// Switch active state to new dropdown selection.
	newSelection: function (dropdownId) {
		const dropdownMenuButtons = document
									.getElementById(dropdownId)
									.querySelector(K.dropdownMenuClass)
									.querySelectorAll(K.buttonElement);
		dropdownMenuButtons.forEach(
			function (node) {
				node.addEventListener (K.clickEvent, 
					function(event) {
						const activeBtn = 
									document
										.getElementById(dropdownHandler.activeId(dropdownId))
										.querySelector(K.buttonElement);
						activeBtn.classList.remove(K.activeClass);
						node.classList.add(K.activeClass);
						contentHandler.loadContent();
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