// Controller object to manage content of blog section.
var blogSectionController = {
	// Convenience function to read content.
	getBlogObj : function () {
		return contentController.content[K.mainContentId][K.blogSecId];
	},

	insertBlogTemplates : function () {
		const blogObj = blogSectionController.getBlogObj();

		const blogBody = document.getElementById(K.blogBodyIndex);
		const p = blogBody.appendChild(document.createElement(K.paragraphElement));
		p.textContent = blogObj[K.blogBodyIndex];
	}
};