// Controller object to manage form processing.
var formController = {
	// Insert feedback in the form div.
	insertFeedback : function (form, field) {
		const fieldObj = contactSectionController.getFormObj()[field.id];
		const formDivs = form.querySelectorAll(K.divElement);
		
		// Insert feedback in div containing invalid field.
		formDivs.forEach(div => {
			const feedback = div.querySelector(K.periodSymbol + K.formInvalidFeedbackClass);
			if (feedback == null) {
				for ( const node of div.childNodes) {
					if (node.id === field.id) {
						const feedback = div.appendChild(document.createElement(K.divElement));
						feedback.className = K.formInvalidFeedbackClass;
						feedback.textContent = fieldObj[K.formInvalidFeedbackClass];
					}
				}
			}
		});
	},

	// Convenience function to set invalid fields.
	setInvalidFields : function (form) {
		const invalidFields = Array.from(
	    	form.querySelectorAll(K.formFieldInvalidPseudoClass)
	    );

		invalidFields.forEach(field => {
	    	// Add .is-invalid class for server-side validation.
	    	field.classList.add(K.formFieldIsInvalidClass);

	    	// Insert feedback for all invalid fields.
	    	formController.insertFeedback(form, field);
	    });
	},

	// Convenience function to set valid fields.
	setValidFields : function (form) {
		const validFields = Array.from(
	    	form.querySelectorAll(K.formFieldValidPseudoClass)
	    );

	     // Replace field validation class after validity is established.
	    validFields.forEach(field => {
	    	field.classList.remove(K.formFieldIsInvalidClass);
	    	field.classList.add(K.formFieldIsValidClass);
	    });
	},

	// Listen for user input in form fields.
	listenFieldInput : function () {
		const form = document.querySelector(K.periodSymbol + K.formNeedsValidationClass);
		form.addEventListener(K.inputEvent, (event) => {
			const formDivs = form.querySelectorAll(K.divElement);
			const validFields = Array.from(
		    	form.querySelectorAll(K.formFieldValidPseudoClass)
		    );

			// Remove feedback from all divs containing a valid field.
		    validFields.forEach(field => {
				formDivs.forEach(div => {
					const feedback = div.querySelector(K.periodSymbol + K.formInvalidFeedbackClass);
					if (feedback != null) {
						for ( const node of div.childNodes) {
							if (node.id === field.id) {
								div.removeChild(feedback);
							}
						}
					}
				});
		    });
		});
	},

	// Validate captured form data.
	validateFormData : function () {
		const form = document.querySelector(K.periodSymbol + K.formNeedsValidationClass);
		form.addEventListener(K.submitEvent, (event) => {
			if (!form.checkValidity()) {
				// Prevent form submission in case of invalid data.
		    	event.preventDefault();
		    	event.stopPropagation();

		    	// Set form field classes and insert feedback.
			    formController.setInvalidFields(form);
			    formController.setValidFields(form);
		      	
		    }
		    
		    // Replace form validation class after performing validation.
		    form.classList.remove(K.formNeedsValidationClass);
		    form.classList.add(K.formWasValidatedClass);
		}, false);
	},
	
	// Set up an object to store form data.
	data : {},

	// Store validated form data.
	saveFormData : function () {
		
	},

	// Prepare validated data using HTML templating.
	prepareData : function () {
		
	},

	// Embed HTML payload in interchange file.
	loadInterchangeFile : function (template) {
		
	},

	// Send processed file to Inbox.
	sendFileToInbox : function (file) {
		
	},

	
	// Submit form and display confirmation.
	submitForm : function (event) {
		// Validate captured form data.
		formController.validateFormData();
	}
};