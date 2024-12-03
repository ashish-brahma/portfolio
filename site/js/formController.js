// Controller object to manage form processing.
var formController = {
	// Set form field as valid or invalid.
	setFieldValidity : function (div, feedback) {
		const invalidField = div.querySelector(K.colonSymbol 
													+ K.formFieldInvalidPseudoClass);	
		if (invalidField != null) {
			// Set .is-invalid class if field is invalid.
			invalidField.classList.remove(K.formFieldIsValidClass);
			invalidField.classList.add(K.formFieldIsInvalidClass);
			
			// Add feedback for invalid field if it doesn't exist yet.
			if (feedback == null) {
				const fieldObj = contactSectionController.getFormObj()[invalidField.id];
				feedback = div.appendChild(document.createElement(K.divElement));
				feedback.className = K.formInvalidFeedbackClass;
				feedback.textContent = fieldObj[K.formInvalidFeedbackClass];
			}
		}

		const validField = div.querySelector(K.colonSymbol 
												+ K.formFieldValidPseudoClass);
		if (validField != null) {
			// Set .is-valid class if field is valid.
			validField.classList.remove(K.formFieldIsInvalidClass);
			validField.classList.add(K.formFieldIsValidClass);

			// Remove feedback from valid field, if any.
			if (feedback != null) {
				div.removeChild(feedback);
			}
		}
	},

	// Perform inline form validation.
	validateFormFields : function () {
		const form = document.querySelector(K.periodSymbol + K.formNeedsValidationClass);
		const fields = form.querySelectorAll(K.periodSymbol + K.formControlIndex);

		fields.forEach( field => {
			// Listen user input for each form field.
			field.addEventListener(K.inputEvent, () => {
				const div = form.querySelector(K.hashSymbol + field.id 
														+ K.hyphenSymbol + K.fieldString);

				var feedback = div.querySelector(K.periodSymbol 
														+ K.formInvalidFeedbackClass);
		
				formController.setFieldValidity(div, feedback);
			});
		});
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

	// Display confirmation.
	showConfirmation : function () {

	},

	
	// Submit form and display confirmation.
	submitForm : function (event) {
		const form = document.querySelector(K.periodSymbol + K.formNeedsValidationClass);
		form.addEventListener(K.submitEvent, (event) => {
			// Prevent form submission in case of invalid data.
			if (!form.checkValidity()) {
		    	event.preventDefault();
		    	event.stopPropagation();
		    }

			// Replace form validation class after establishing validity.
		    form.classList.remove(K.formNeedsValidationClass);
		    form.classList.add(K.formWasValidatedClass);
		}, false);
	}
};