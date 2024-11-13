// Invoke function to load content.
contentHandler.loadContent();

// Update current section of section indicator.
document.addEventListener(K.domContentLoadedEvent, 
								contentHandler.currentSection(event));

// Persist active state of dropdown toggler.
document.addEventListener(K.domContentLoadedEvent, 
								dropdownHandler.persistToggleActive(event));