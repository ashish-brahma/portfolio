// Handler object to manage content of blog section.
var blogSectionHandler = {
	// Convenience function to read content.
	getBlogObj : function () {
		return contentHandler.content[K.mainContentId][K.blogSecId];
	},

	insertBlogTemplates : function () {
		const blogObj = blogSectionHandler.getBlogObj();

		const blogBody = document.getElementById(K.blogBodyIndex);
		const p = blogBody.appendChild(document.createElement(K.paragraphElement));
		p.textContent = blogObj[K.blogBodyIndex];
	}
};