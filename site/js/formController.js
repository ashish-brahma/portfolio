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

	// Set up an object to save form data.
	data : {},

	// Convenience function to break line in html.
	newline : function (doc, element) {
		const range = Array.from({length: 2}, (_, i) => i);
		range.forEach (() => {
			element.appendChild(doc.createElement(K.brElement));
		});
	}, 

	// Convenience function to insert content into table cell.
	insertCellContent : function (email, cell, id, textArray) {
		var content = K.emptyString;
		const data = formController.data;
		
		switch (id) {
		case K.headerClass:
			// Add title.
			cell.align = K.centerAlignment;
			const bold = cell.appendChild(email.createElement(K.boldElement));
			bold.textContent = textArray;

			// Add new line.
			formController.newline(email, cell);
			break;
		
		case K.bodyClass:
			// Add salutation.
			const sal = textArray[K.salutationIndex];
			const name = data[K.nameIndex];
			cell.innerHTML = sal[0] + name + sal[1];

			// Add new line.
			formController.newline(email, cell);

			// Add greetings.
			cell.innerHTML += textArray[K.greetingsIndex];

			// Add details.
			const details = textArray[K.detailsIndex];
			const subject = data[K.subjectIndex];
			cell.innerHTML += details[0] + subject + details[1];

			// Add new line.
			formController.newline(email, cell);

			// TODO: Generate random number.
			const serviceRequestId = 1234567;
			cell.innerHTML += details[2] + serviceRequestId;

			// Add new line.
			formController.newline(email, cell);

			cell.innerHTML += details[3];

			// Add new line.
			formController.newline(email, cell);

			cell.innerHTML += details[4];

			// Add new line.
			formController.newline(email, cell);

			// Add signature.
			const signature = textArray[K.signatureIndex];
			cell.innerHTML += signature[0];

			// Go to new line.
			cell.appendChild(email.createElement(K.brElement));

			cell.innerHTML += signature[1];

			break;
		
		case K.footerClass:
			// Add new line.
			formController.newline(email, cell);

			cell.align = K.centerAlignment;

			// Add horizontal rule.
			cell.appendChild(email.createElement(K.hrElement));
			
			// Add disclaimer.
			const disclaimer = cell.appendChild(email.createElement(K.smallElement));
			disclaimer.innerHTML = textArray[K.disclaimerIndex];

			// Add new line.
			formController.newline(email, cell);

			// Add copyrights.
			const copyrightsElement = cell.appendChild(email.createElement(K.smallElement));
			const copyrights = textArray[K.copyrightsIndex];
			copyrightsElement.innerHTML += copyrights[0] + K.copyrightEntity + copyrights[1];

			break;
		
		default:
			console.log("Could not load email content.");
		}
	},

	// Convenience function to insert content into email's html.
	insertEmailContent : function (email) {
		const emailObj = contactSectionController.getContactObj()[K.emailIndex];
		const emailObjSize = Object.keys(emailObj).length;

		const content = email.querySelector(K.periodSymbol + K.contentClass);

		for(var i = 0; i < emailObjSize; i++) {
			const tr = content.appendChild(email.createElement(K.tableRow));
			const td = tr.appendChild(email.createElement(K.tableData));
			
			// Set data class.
			contentId = Object.keys(emailObj)[i];
			td.className = contentId;
			
			// Set inner text or html content.
			const contentArray = emailObj[contentId];
			formController.insertCellContent(email, td, contentId, contentArray);
		}
		// console.log(content);
	},

	// Insert validated data into html content.
	prepareData : function (formData) {
		const dataMap = new Map(Array.from(formData));
		formController.data = Object.fromEntries(dataMap);

		// Construct email body using html.
		const snippetURL = K.snippetsLocation + K.emailSnippetId + K.htmlFileExtension;
		const emailPromise = contentController.fetchContent(snippetURL, false);
		return emailPromise
				.then((response) => {
					// Parse response html and insert content.
					const email = Document.parseHTMLUnsafe(response);
					formController.insertEmailContent(email);
					console.log(email);
					return email;
				});
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
				// TODO: emailer api calls.

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