const K = {
	domContentLoadedEvent: "DOMContentLoaded",
	scrollSpyEl:'[data-bs-spy="scroll"]',
	scrollSpyActivatedEvent: 'activate.bs.scrollspy',
	bodyElement: "body",
	fontPackIndex: "fonts",
	regularFontIndex: "regular",
	mediumFontIndex: "medium",
	semiboldFontIndex: "semibold",
	boldFontIndex: "bold",
	langAttribute: "lang",
	defaultLang: 'en-US',
	langDropdownId: "lang-dropdown",
	homeSecId: "home",
	defaultSecClasses: "container-fluid g-0",
	homeSecClasses: " clearfix bg-gray-100",
	genericSecClasses: " secondary-bg-section secondary-text-section",
	sidebarNavId: "sidebar-nav",
	loadingIconId : "loading-icon",
	loadingSpinnerIconId: "loading-spinner-icon",
	mainContentId: "main-content",
	langContentLocation: "lang/",
	snippetsLocation: "snippets/",
	jsonFileExtension: ".json",
	bodyIndex: "body",
	navListIndex: "nav-list",
	navBioIndex: "bio-list",
	langLabelIndex: "label",
	langFontIndex: "font",
	langCountryCodeIndex: "country-code",
	langFlagLocation: "images/flags/",
	imageElement : "img",
	svgFileExtension: ".svg",
	altIndex: "alt",
	currentSectionId: "current-section",
	totalSectionsId: "total-sections",
	hashSymbol: "#",
	emptyString: "",
	zeroStringIndex:"zero-string",
	noneString: "none",
	navItemId: "nav-item",
	bioItemId: "bio-list-item",
	bioItemTitleClass: ".bio-item-title",
	bioItemDescriptionClass: ".bio-item-description",
	sectionBlockId: "section-block",
	divElement: "div",
	dropdownClass:".dropdown",
	dropdownMenuClass: ".dropdown-menu",
	dropdownToggleClass: ".dropdown-toggle",
	dropdownDividerClassName: "dropdown-divider",
	unorderedListElement: "ul",
	listItemElement: "li",
	langItemId: "lang-item",
	buttonElement: "button",
	anchorElement: "a",
	clickEvent: "click",
	blurEvent: "blur",
	activeClass: "active",
	forwardSlash: "/",
	htmlFileExtension: ".html",
	bioNameIndex: "name",
	headerElement: "header",
	lvlOneHeadingElement: "h1",
	lvlTwoHeadingElement: "h2",
	lvlTwoFontColorClass: "secondary-headings-label",
	hrElement: "hr",
	profilePicIndex: "profile-picture",
	pictureSourceId: "picture-source",
	imgSourceElement: "source",
	sourceMediaAttribute: "media",
	sourceSrcsetAttribute: "srcset",
	imgSrcAttribute: "src",
	aboutId: "about",
	paragraphElement: "p",
	socialId: "social-links",
	socialIconId: "social-icon-btn",
	spanElement: "span",
	servicesSecId: "services",
	introId: "intro",
	downloadBtnId: "download-btn",
	btnLabelIndex: "btn-label",
	servicesRowId: "service-cards-row",
	serviceCardId: "service-card",
	portfolioSecId: "portfolio",
	projFilterId: "project-filter",
	defaultProjFilter: "All",
	projFilterMenuId: "project-filter-menu",
	projListItemId: "project-list-item",
	projListColorClass: "gray-100",
	projRowId: "project-cards-row",
	projColId: "project-cards-col",
	colClass: "col",
	projCardId: "project-card",
	periodSymbol: ".",
	cardIndex: "card",
	cardImageTopClassName: "card-img-top",
	imagesLocation: "images/",
	pngFileExtension: ".png",
	cardTitleIndex: "card-title",
	cardTextIndex: "card-text",
	projButtonId: "project-btn",
	hrefIndex: "href",
	btnLabelIndex: "btn-label",
	projButtonLabel: "See Project",
	iconElement: "i",
	projButtonIconClassName: "bi bi-box-arrow-up-right",
	experienceSecId: "experience",
	expBodyId: "exp-body",
	expListItemId: "exp-list-item",
	yearIndex: "year",
	desginationIndex: "designation",
	startDateIndex: "start-date",
	endDateIndex: "end-date",
	skillsSecId: "skills",
	skillsBodyId: "skills-body",
	skillChartIndex: "skill-chart",
	hyphenSymbol: "-",
	skillsListItemId: "skills-list-item",
	skillFlexBoxId: "skill-flexbox",
	skillsPercentageIndex: "percentage",
	skillClass: "skill",
	skillsLabelIndex: "skill-label",
	skillDonutClass: "skill-donut",
	justifyContentCentreClass: "justify-content-center",
	contactSecId: "contact",
	headingIndex: "heading",
	contactBodyClass: "contact-body",
	contactBodyCTAIndex: "body-cta",
	contactBodyTextIndex: "body-text",
	formIndex: "contact-form",
	formElement: "form",
	formNeedsValidationClass: "needs-validation",
	formWasValidatedClass: "was-validated",
	formFieldIsInvalidClass: "is-invalid",
	formFieldIsValidClass: "is-valid",
	colonSymbol: ":",
	formFieldInvalidPseudoClass: "invalid",
	formFieldValidPseudoClass: "valid",
	formInvalidFeedbackClass: "invalid-feedback",
	inputEvent: "input",
	formFieldIndex: "form-field",
	fieldString: "field",
	labelElement: "label",
	formlabelClasses: "form-label visually-hidden",
	formLabelIndex: "form-label",
	inputElement: "input",
	onString: "on",
	formControlIndex: "form-control",
	formControlClasses: "form-control",
	inputTypeAttribute: "type",
	textareaItemIndex: "textarea-item",
	fieldIdIndex: "field-id",
	inputNameIndex: "input-name",
	formFieldHelpClasses: "form-text gray-button",
	formTextIndex: "form-text",
	textIndex: "text",
	idIndex: "id",
	inputEmailIndex: "input-email",
	inputSubjectIndex: "input-subject",
	textAreaElement: "textarea",
	textAreaMessageIndex: "textarea-message",
	formSubmitBtnIndex: "form-submit-btn",
	sendBtnId: "send-btn",
	submitEvent: "submit",
	ariaLabelAttribute: "aria-label",
	ariaDescribedByAttribute: "aria-describedby",
	placeholderAttribute: "placeholder",
	emailSnippetId: "email",
	emailIndex: "email-response",
	requestTitle: "New Request: Mobile App Development",
	requestIdIndex: "Service Request Id",
	intentIndex: "intent",
	contentClass: "content",
	altFontFamily: "sans-serif",
	spaceString: " ",
	commaSymbol: ", ",
	tableRow: "tr",
	tableData: "td",
	padding: "40px",
	lineHeight: 1.6,
	centerAlignment: "center",
	titleBgColor: "#44260A",
	titleColor: "#FC8E26",
	boldElement: "b",
	headerClass: "header",
	bodyClass: "body",
	leftAlignment: "left",
	bodyFontSize: "16px",
	bodyBgColor: "#FFFFF6",
	footerClass: "footer",
	footerBgColor: "#2F1B07",
	footerColor: "#B0631A",
	salutationIndex: "salutation",
	nameIndex: "name",
	greetingsIndex: "greetings",
	detailsIndex: "details",
	subjectIndex: "subject",
	signatureIndex: "signature",
	disclaimerIndex: "disclaimer",
	copyrightsIndex: "copyrights",
	brElement: "br",
	smallElement: "small",
	copyrightEntity: "&copy;",
	blogSecId: "blog",
	blogBodyIndex: "blog-body"
};