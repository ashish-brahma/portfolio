// Extension to process strings.
var stringExt = {
	// Capitalize first letter of string.
	capitalize : function (text) {
		return String(text).charAt(0).toUpperCase() + String(text).slice(1);
	},

	// Get second item from kebab case string.
	clean : function (text) {
		return text.split(K.hyphenSymbol)[1];
	}  
};

