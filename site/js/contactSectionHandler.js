// Handler object to manage content of contact section.
var contactSectionHandler = {
	// Convenience function to read content.
	getContactObj : function () {
		return contentHandler.content[K.mainContentId][K.contactSecId];
	},

	// Convenience function to read form content.
	getFormObj : function () {
		return contactSectionHandler.getContactObj()[K.formIndex];
	},

	// Convenience function to read submit button content.
	getFormSubmitBtnObj : function () {
		return contactSectionHandler.getFormObj()[K.formSubmitBtnIndex];
	},

	// Convenience function to read input name content.
	getFormNameObj : function () {
		return contactSectionHandler.getFormObj()[K.inputNameIndex];
	},

	// Convenience function to read input email content.
	getFormEmailObj : function () {
		return contactSectionHandler.getFormObj()[K.inputEmailIndex];
	},

	// Convenience function to read input subject content.
	getFormSubjectObj : function () {
		return contactSectionHandler.getFormObj()[K.inputSubjectIndex];
	},

	// Convenience function to read textarea message content.
	getFormMessageObj : function () {
		return contactSectionHandler.getFormObj()[K.textAreaMessageIndex];
	},

	// Convenience function to read form label.
	getFormLabelObj : function (obj) {
		return obj[K.formLabelIndex];
	},

	// Convenience function to read form content.
	getFormFieldObj : function (obj) {
		const slicedEntries = new Map(Object.entries(obj).slice(1));
		const slicedObj = Object.fromEntries(slicedEntries);
		return slicedObj;
	},

	// Insert body content.
	insertContactBody : function () {
		const contactObj = contactSectionHandler.getContactObj();
		const contactBody = document.querySelector(K.periodSymbol + K.contactBodyClass);

		// Insert call to action.
		const font = contentHandler.fonts[K.semiboldFontIndex];
		const cta = contactBody.querySelector(K.periodSymbol + K.contactBodyCTAIndex);
		cta.classList.add(font);
		cta.textContent = contactObj[K.contactBodyCTAIndex];
		
		// Insert all paragraphs of body.
		const bodyText = contactBody.querySelector(K.periodSymbol + K.contactBodyTextIndex);
		const paragraphs = contactObj[K.contactBodyTextIndex];

		for (const para of paragraphs) {
			const p = bodyText.appendChild(document.createElement(K.paragraphElement));
			p.textContent = para;
		}
	},

	// Insert cloned templates of contact form.
	insertFormContent : function () {
		const formObj = contactSectionHandler.getFormObj();
		
		// Identify elements for #form-field template insertion.
		const formDiv = document.getElementById(K.formIndex);
		const form = formDiv.appendChild(document.createElement(K.formElement));
		const formFieldTemplate = document.getElementById(K.formFieldIndex);

		// TODO: Set form attributes for submission.
		const font = contentHandler.fonts[K.formElement];
		form.classList.add(font);
		
		// Insert cloned template in #form-field.
		templateHandler.setTemplate(formObj, form, 
										   formFieldTemplate, K.formFieldIndex);
	},

	// Insert content in label.
	insertLabelItem : function (labelObj, field) {
		const label = field.appendChild(document.createElement(K.labelElement));
		label.htmlFor = labelObj[K.fieldIdIndex];
		label.className = K.formlabelClasses;
		label.textContent = labelObj[K.formLabelIndex];
	},

	// Insert content in input.
	insertInputItem : function (inputObj, field, id) {
		const input = field.appendChild(document.createElement(K.inputElement));
		input.id = id;
		input.type = inputObj[K.inputTypeAttribute];
		input.classList.add(K.formControlClasses);
		
		if (Object.keys(inputObj).indexOf(K.ariaDescribedByAttribute) > -1) {
			input.setAttribute(K.ariaDescribedByAttribute, inputObj[K.ariaDescribedByAttribute]);
		}
		input.ariaLabel = inputObj[K.ariaLabelAttribute];
		
		input.placeholder = inputObj[K.placeholderAttribute];
		input.required = true;
	},

	// Insert input field.
	insertInputField : function (obj, field, id) {
		// Add label.
		const label = contactSectionHandler.getFormLabelObj(obj);
		var labelObj = {};
		labelObj[K.fieldIdIndex] = id;
		labelObj[K.formLabelIndex] = label;
		contactSectionHandler.insertLabelItem(labelObj, field);

		// Add input.
		const fieldObj = contactSectionHandler.getFormFieldObj(obj);
		contactSectionHandler.insertInputItem(fieldObj, field, id);
	},

	// Insert help text.
	insertHelpText : function (obj, field) {
		const help = field.appendChild(document.createElement(K.divElement));
		help.id = obj[K.formTextIndex][K.idIndex];
		help.className = K.formFieldHelpClasses;
		help.textContent = obj[K.formTextIndex][K.textIndex];
	},

	// Insert name field.
	insertNameField : function (id, field) {
		inputNameObj = contactSectionHandler.getFormNameObj();
		contactSectionHandler.insertInputField(inputNameObj, field, id);
	},

	// Insert email field.
	insertEmailField : function (id, field) {
		inputEmailObj = contactSectionHandler.getFormEmailObj();
		contactSectionHandler.insertInputField(inputEmailObj, field, id);
		contactSectionHandler.insertHelpText(inputEmailObj, field);
	},

	// Insert subject field.
	insertSubjectField : function (id, field) {
		inputSubjectObj = contactSectionHandler.getFormSubjectObj();
		contactSectionHandler.insertInputField(inputSubjectObj, field, id);
	},

	// Insert message field.
	insertMessageField : function (id, field) {
		messageObj = contactSectionHandler.getFormMessageObj();

		// Add label.
		const label = contactSectionHandler.getFormLabelObj(messageObj);
		var labelObj = {};
		labelObj[K.fieldIdIndex] = id;
		labelObj[K.formLabelIndex] = label;
		contactSectionHandler.insertLabelItem(labelObj, field);
		
		// Add textarea.
		const fieldObj = contactSectionHandler.getFormFieldObj(messageObj);
		const textarea = field.appendChild(document.createElement(K.textAreaElement));
		textarea.id = id;
		textarea.classList.add(K.formControlIndex);
		textarea.rows = 4;
		textarea.setAttribute(K.ariaDescribedByAttribute, fieldObj[K.ariaDescribedByAttribute]);
		textarea[K.ariaLabelAttribute] = fieldObj[K.ariaLabelAttribute];
		textarea.placeholder = fieldObj[K.placeholderAttribute];
		textarea.required = true;

		// Add help text.
		contactSectionHandler.insertHelpText(messageObj, field);
	},

	// Insert send button template.
	insertSendButton : function (formField) {
		const sendBtnObj = contactSectionHandler.getFormSubmitBtnObj();

		// Add send button div classes.
		formField.classList.add(...sendBtnObj[K.divElement]);
		
		// Identify send button pair in object.
		const slicedBtnEntry = new Map([Object.entries(sendBtnObj)[1]]);
		const slicedBtnObj = Object.fromEntries(slicedBtnEntry);
		
		// Identify elements for send button template insertion.
		const formSubmitBtnTemplate = document.getElementById(K.formSubmitBtnIndex);
		
		// Insert send button in #form-field.
		templateHandler.setTemplate(slicedBtnObj, formField, 
										   formSubmitBtnTemplate, K.formSubmitBtnIndex);
	},

	// Insert all content.
	insertContactTemplates : function () {
		contactSectionHandler.insertContactBody();
		contactSectionHandler.insertFormContent();
	},

	// Convenience function to delegate field insertion to appropriate handler method.
	insertField : function (id, field) {
		switch (id) {
		case K.inputNameIndex:
			contactSectionHandler.insertNameField(id, field);
			break;

		case K.inputEmailIndex:
			contactSectionHandler.insertEmailField(id, field);
			break;

		case K.inputSubjectIndex:
			contactSectionHandler.insertSubjectField(id, field);
			break;

		case K.textAreaMessageIndex:
			contactSectionHandler.insertMessageField(id, field);
			break;

		case K.formSubmitBtnIndex:
			contactSectionHandler.insertSendButton(field);
			break;

		default: 
			console.log("Field is undefined.");
		}
	},

	// Add new form field.
	cloneFormFields : function (clone, iterIndex) {
		// Add new field.
		let field = clone.querySelector(K.divElement);

		// Identify field data.
		const formObj = contactSectionHandler.getFormObj();
		const fieldId = Object.keys(formObj)[iterIndex];

		// Delegate field templation to appropriate handler method.
		contactSectionHandler.insertField(fieldId, field);
	},

	// Add send button.
	cloneSendButton : function (clone, iterIndex, obj) {
		let btn = clone.querySelector(K.hashSymbol + K.sendBtnId);
		btn.textContent = obj[K.sendBtnId];
	}
};