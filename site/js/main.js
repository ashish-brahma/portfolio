// Invoke function to load content.
contentHandler.loadContent();

// Initiate scrollspy event listener.
document.addEventListener(K.domContentLoadedEvent, 
						sectionHandler.listenCurrentSection(event));