// Controller object to manage content of contact section.
var contactSectionController = {
	// Convenience function to read content.
	getContactObj : function () {
		return contentController.content[K.mainContentId][K.contactSecId];
	},

	// Convenience function to read form content.
	getFormObj : function () {
		return contactSectionController.getContactObj()[K.formIndex];
	},

	// Convenience function to read submit button content.
	getFormSubmitBtnObj : function () {
		return contactSectionController.getFormObj()[K.formSubmitBtnIndex];
	},

	// Convenience function to read input name content.
	getFormNameObj : function () {
		return contactSectionController.getFormObj()[K.inputNameIndex];
	},

	// Convenience function to read input email content.
	getFormEmailObj : function () {
		return contactSectionController.getFormObj()[K.inputEmailIndex];
	},

	// Convenience function to read input subject content.
	getFormSubjectObj : function () {
		return contactSectionController.getFormObj()[K.inputSubjectIndex];
	},

	// Convenience function to read textarea message content.
	getFormMessageObj : function () {
		return contactSectionController.getFormObj()[K.textAreaMessageIndex];
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
		const contactObj = contactSectionController.getContactObj();
		const contactBody = document.querySelector(K.periodSymbol + K.contactBodyClass);

		// Insert call to action.
		const font = contentController.fonts[K.semiboldFontIndex];
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
		const formObj = contactSectionController.getFormObj();
		
		// Identify elements for #form-field template insertion.
		const contactForm = document.getElementById(K.formIndex);
		const form = contactForm.appendChild(document.createElement(K.formElement));
		const formFieldTemplate = document.getElementById(K.formFieldIndex);

		// Set font.	
		const font = contentController.fonts[K.formElement];
		form.classList.add(font);

		// Set default validation class.
		form.classList.add(K.formNeedsValidationClass);
		form.noValidate = true;
		
		// Insert cloned template in #form-field.
		templateController.setTemplate(formObj, form, 
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
		input.name = stringExt.secondSubstr(id);
		input.type = inputObj[K.inputTypeAttribute];
		input.classList.add(K.formControlClasses);
		
		if (Object.keys(inputObj).indexOf(K.ariaDescribedByAttribute) > -1) {
			input.setAttribute(K.ariaDescribedByAttribute, inputObj[K.ariaDescribedByAttribute]);
		}
		input.ariaLabel = inputObj[K.ariaLabelAttribute];
		
		input.placeholder = inputObj[K.placeholderAttribute];
		input.autocomplete = K.onString;
		input.required = true;
	},

	// Insert input field.
	insertInputField : function (obj, field, id) {
		// Add label.
		const label = contactSectionController.getFormLabelObj(obj);
		var labelObj = {};
		labelObj[K.fieldIdIndex] = id;
		labelObj[K.formLabelIndex] = label;
		contactSectionController.insertLabelItem(labelObj, field);

		// Add input.
		const fieldObj = contactSectionController.getFormFieldObj(obj);
		contactSectionController.insertInputItem(fieldObj, field, id);
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
		inputNameObj = contactSectionController.getFormNameObj();
		contactSectionController.insertInputField(inputNameObj, field, id);
	},

	// Insert email field.
	insertEmailField : function (id, field) {
		inputEmailObj = contactSectionController.getFormEmailObj();
		contactSectionController.insertInputField(inputEmailObj, field, id);
		contactSectionController.insertHelpText(inputEmailObj, field);
	},

	// Insert subject field.
	insertSubjectField : function (id, field) {
		inputSubjectObj = contactSectionController.getFormSubjectObj();
		contactSectionController.insertInputField(inputSubjectObj, field, id);
	},

	// Insert message field.
	insertMessageField : function (id, field) {
		messageObj = contactSectionController.getFormMessageObj();

		// Add label.
		const label = contactSectionController.getFormLabelObj(messageObj);
		var labelObj = {};
		labelObj[K.fieldIdIndex] = id;
		labelObj[K.formLabelIndex] = label;
		contactSectionController.insertLabelItem(labelObj, field);
		
		// Add textarea.
		const fieldObj = contactSectionController.getFormFieldObj(messageObj);
		const textarea = field.appendChild(document.createElement(K.textAreaElement));
		textarea.id = id;
		textarea.name = stringExt.secondSubstr(K.textAreaMessageIndex);
		textarea.classList.add(K.formControlIndex);
		textarea.rows = 4;
		textarea.setAttribute(K.ariaDescribedByAttribute, fieldObj[K.ariaDescribedByAttribute]);
		textarea[K.ariaLabelAttribute] = fieldObj[K.ariaLabelAttribute];
		textarea.placeholder = fieldObj[K.placeholderAttribute];
		textarea.maxLength = 300;
		textarea.required = true;

		// Add help text.
		contactSectionController.insertHelpText(messageObj, field);
	},

	// Insert send button template.
	insertSendButton : function (div) {
		const sendBtnObj = contactSectionController.getFormSubmitBtnObj();

		// Add send button div classes.
		div.classList.add(...sendBtnObj[K.divElement]);
		
		// Identify send button pair in object.
		const slicedBtnEntry = new Map([Object.entries(sendBtnObj)[1]]);
		const slicedBtnObj = Object.fromEntries(slicedBtnEntry);
		
		// Identify elements for send button template insertion.
		const formSubmitBtnTemplate = document.getElementById(K.formSubmitBtnIndex);
		
		// Insert send button in #form-field.
		templateController.setTemplate(slicedBtnObj, div, 
										   formSubmitBtnTemplate, K.formSubmitBtnIndex);
	},

	// Insert all content.
	insertContactTemplates : function () {
		contactSectionController.insertContactBody();
		contactSectionController.insertFormContent();
	},

	// Convenience function to delegate div insertion to appropriate Controller method.
	insertDiv : function (index, div) {
		switch (index) {
		case K.inputNameIndex:
			contactSectionController.insertNameField(index, div);
			break;

		case K.inputEmailIndex:
			contactSectionController.insertEmailField(index, div);
			break;

		case K.inputSubjectIndex:
			contactSectionController.insertSubjectField(index, div);
			break;

		case K.textAreaMessageIndex:
			contactSectionController.insertMessageField(index, div);
			break;

		case K.formSubmitBtnIndex:
			contactSectionController.insertSendButton(div);
			break;

		default: 
			console.log("Div is undefined.");
		}
	},

	// Add new form child div element.
	cloneFormDivs : function (clone, iterIndex) {
		// Add new container div.
		let div = clone.querySelector(K.divElement);

		// Identify div data.
		const formObj = contactSectionController.getFormObj();
		const divIndex = Object.keys(formObj)[iterIndex];

		// Add div id.
		div.id = (divIndex === K.formSubmitBtnIndex) ? 
							divIndex : divIndex + K.hyphenSymbol + K.fieldString;

		// Delegate div templation to appropriate Controller method.
		contactSectionController.insertDiv(divIndex, div);
	},

	// Add send button.
	cloneSendButton : function (clone, iterIndex, obj) {
		let btn = clone.querySelector(K.hashSymbol + K.sendBtnId);
		btn.textContent = obj[K.sendBtnId];
	}
};