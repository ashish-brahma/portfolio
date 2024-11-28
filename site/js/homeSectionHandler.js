// Handler object to manage content of home section.
var homeSectionHandler = {
	// Convenience function to read content.
	getHomeObj : function () {
		return contentHandler.content[K.mainContentId][K.homeSecId];
	},

	// Convenience function to read picture source content.
	getPicSourceObj : function () {
		return homeSectionHandler.getHomeObj()[K.profilePicIndex][K.imgSourceElement];
	},

	// Convenience function to read picture image content.
	getImageObj : function () {
		return homeSectionHandler.getHomeObj()[K.profilePicIndex][K.imageElement];
	},

	// Insert responsive sources in #profile-picture.
	insertPictureSources : function () {
		const sourceObj = homeSectionHandler.getPicSourceObj();
		const profilePicture = document.getElementById(K.profilePicIndex);
		for (const srcId of Object.keys(sourceObj)) {
			var source = profilePicture.appendChild(document.createElement(K.imgSourceElement));
			source.media = sourceObj[srcId][K.sourceMediaAttribute];
			source.srcset = K.imagesLocation 
									+ sourceObj[srcId][K.sourceSrcsetAttribute] 
									+ K.svgFileExtension;
		}
	},
	
	// Insert image content of #profile-picture.
	insertImage : function () {
		const imgObj = homeSectionHandler.getImageObj();
		const profilePicture = document.getElementById(K.profilePicIndex);
		profilePicture.appendChild(document.createElement(K.imageElement));
		profileImage = profilePicture.querySelector(K.imageElement);
		profileImage.src = K.imagesLocation + imgObj[K.imgSrcAttribute] + K.svgFileExtension;
		profileImage.alt = imgObj[K.altIndex];
	},

	// Insert cloned templates of #profile-picture.
	insertProfilePicture : function () {
		homeSectionHandler.insertPictureSources();
		homeSectionHandler.insertImage();
	},

	// Insert content of #about.
	insertAbout : function () {
		const aboutObj = homeSectionHandler.getHomeObj()[K.aboutId];
		const aboutBody = document.getElementById(K.aboutId);
		aboutBody.appendChild(document.createElement(K.paragraphElement));
		p = aboutBody.querySelector(K.paragraphElement);
		p.textContent = aboutObj[K.paragraphElement];
	},

	// Insert cloned templates of #social-links.
	insertSocialLinks : function () {
		const socialObj = homeSectionHandler.getHomeObj()[K.socialId];

		// Identify elements for #social-links template insertion.
		const socialLinks = document.getElementById(K.socialId);
		const btnTemplate = document.getElementById(K.socialIconId);

		// Insert cloned template in #social-links.
		templateHandler.setTemplate(socialObj, socialLinks, btnTemplate, K.socialId);
	},

	// Insert cloned templates in home section.
	insertHomeTemplates : function () {
		homeSectionHandler.insertProfilePicture();
		homeSectionHandler.insertAbout();
		homeSectionHandler.insertSocialLinks();
	},

	// Add new social button.
	cloneSocialButton : function (clone, iterIndex) {
		let btn = clone.querySelector(K.spanElement);

		// Prepare button data.
		const btnObj = homeSectionHandler.getHomeObj()[K.socialId];
		const btnId = Object.keys(btnObj)[iterIndex];

		// Add button alt text.
		btn.alt = btnObj[btnId][K.altIndex];

		// Add external link.
		let anchor = btn.querySelector(K.anchorElement);
		anchor.href = btnObj[btnId][K.hrefIndex];

		// Add icon class.
		let icon = btn.querySelector(K.iconElement);
		icon.classList.add(btnObj[btnId][K.iconElement]);
	}
};