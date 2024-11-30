// Invoke function to load content.
contentController.loadContent();

// Initiate scrollspy event listener.
document.addEventListener(K.domContentLoadedEvent, 
						sectionController.listenCurrentSection(event));