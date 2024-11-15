// Invoke function to load content.
contentHandler.loadContent();

// Initiate scrollspy event listener.
document.addEventListener(K.domContentLoadedEvent, 
								sectionHandler.listenCurrentSection(event));

// Initiate event listeners for all dropdown togglers.
document.addEventListener(K.domContentLoadedEvent, 
								dropdownHandler.persistToggleActive(event));