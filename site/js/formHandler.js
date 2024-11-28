// Handler object to manage form processing.
var formHandler = {
	// Set up an object to store form data.
	data : {},

	// Store captured form data.
	getFormData : function () {
		// body...
	},

	// Validate captured form data.
	validateFormData : function () {
		// body...
	},

	// Prepare validated data using HTML templating.
	prepareData : function () {
		// body...
	},

	// Embed HTML payload in interchange file.
	loadInterchangeFile : function (template) {
		// body...
	},

	// Send processed file to Inbox.
	sendFileToInbox : function (file) {
		// body...
	},

	// Display confirmation popover modal.
	showConfirmation : function () {
		// body...
	},

	// Display rejection popover modal.
	showRejection : function (error) {
		// body...
	},

	// Submit form and display confirmation.
	submitForm : function (event) {
		// Listen for send button click events.
		const sendBtn = document.getElementById(K.sendBtnId);
		sendBtn.addEventListener(K.clickEvent, (event) => {
				// Store captured form data.
				
				// Validate captured form data.

				// Embed HTML payload in interchange file.

				// Send processed file to Inbox.

				// Display confirmation popover modal if successful.

				// Display rejection popover modal if unsuccessful.
		});
	}
};