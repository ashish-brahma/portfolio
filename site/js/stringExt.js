// Extension to process strings.
var stringExt = {
	// Capitalize first letter of string.
	capitalize : function (text) {
		return String(text).charAt(0).toUpperCase() + String(text).slice(1);
	},

	// Extract and capitalize first four letters of string.
	fourCaps : function (text) {
		return text.substr(0,4).toUpperCase();
	},

	// Get second sub-string from a kebab case string.
	secondSubstr : function (text) {
		return text.split(K.hyphenSymbol)[1];
	}  
};

