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

	// Display confirmation.
	showConfirmation : function () {
		// TODO: Popover modal containing delivery status information.
	},

	// Display error.
	showError : function (error) {
		// TODO: Popover modal containing error status information.
	},

	// Send confirmation response and service request emails.
	sendData : async function () {
		const form = document.querySelector(K.periodSymbol + K.formWasValidatedClass);
		const submitter = document.getElementById(K.sendBtnId);
		const formData = new FormData(form, submitter);

		try {
			// Create request object.
			const request = await fetch(K.requestIndex + K.jsonFileExtension);
			const reqObj = await request.json();
			Object.assign(reqObj, {"body": formData});

			// TODO: Replace placeholder url upon configuration.
			const response = await fetch("http://examplehost.com", reqObj);

			// console.log(await response.json());
		    formController.showConfirmation();
		} catch(error) {
			console.error(error.message);
			formController.showError(error.message);
		}
	},
	
	// Submit form data to send email request.
	submitForm : function (event) {
		const form = document.querySelector(K.periodSymbol + K.formNeedsValidationClass);
		form.addEventListener(K.submitEvent, (event) => {
			// Prevent form submission.
			event.preventDefault();

			// Prevent submission of form data.
			if (!form.checkValidity()) {
		    	event.stopPropagation();
		    }

	    	// Replace form validation class after establishing validity.
	    	form.classList.remove(K.formNeedsValidationClass);
	    	form.classList.add(K.formWasValidatedClass);
	    	
	    	// Send data.
	    	formController.sendData();
		}, false);
	}
};