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

	// Insert validated data into html content.
	prepareData : function (formData) {
		// Create data object using mapped entries from form data.
		const dataMap = new Map(Array.from(formData));
		const dataObj = Object.fromEntries(dataMap);

		// Insert generated service request id into email data.
		emailComposeController
				.data[K.requestIdIndex] = emailComposeController
												.setServiceRequestId(dataObj[K.nameIndex]);
		
		// Append form data object to email data.
		Object.assign(emailComposeController.data, dataObj);

		// Construct body of confirmation email using html.
		return emailComposeController.prepareEmailContent(true);
	},

	// Display confirmation.
	showConfirmation : function () {
		// TODO: Popover modal containing delivery status information.
	},

	// Display error.
	showError : function () {
		// TODO: Popover modal containing error status information.
	},

	// Send processed data as an email to inbox.
	sendData : async function () {
		// Prepare data to be sent in email body.
		const form = document.querySelector(K.periodSymbol + K.formWasValidatedClass);
		const submitter = document.getElementById(K.sendBtnId);
		const formData = new FormData(form, submitter);

		// Send populated html to inbox.
		formController.prepareData(formData)
			.then((data) => {
				emailComposeController.prepareEmailContent(false);
				// TODO: nodemailer api calls.

				formController.showConfirmation();
			})
			.catch((error) => {
				console.error(`Could not send data: ${error}`);
				formController.showError();
			});
	},
	
	// Submit form and display confirmation.
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
	    	
	    	// Send email.
	    	formController.sendData();
		}, false);
	}
};