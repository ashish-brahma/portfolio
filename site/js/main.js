// Invoke function to load content.
contentHandler.loadContent();

// TODO: Listen for changes to language.
// document.addEventListener(K.domContentLoadedEvent, 
// 						dropdownHandler.newSelection(K.langDropdown));

// TODO: Listen for changes to project-filter.
// document.addEventListener(K.domContentLoadedEvent, 
// 								dropdownHandler.newSelection(K.projFilter));

// Update current section of section indicator.
document.addEventListener(K.domContentLoadedEvent, 
								contentHandler.currentSection(event));

// Persist active state of dropdown toggler.
document.addEventListener(K.domContentLoadedEvent, 
								dropdownHandler.persistToggleActive(event));