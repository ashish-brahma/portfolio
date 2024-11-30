// Controller object to manage content of portfolio section.
var skillsSectionController = {
	// Convenience function to read content.
	getSkillsObj : function () {
		return contentController.content[K.mainContentId][K.skillsSecId];
	},

	// Set up an object to store chart types by skill Id.
	chartObj : {},

	// Add cloned templates of all charts.
	insertCharts : function () {
		const chartObj = skillsSectionController.chartObj;
		const totalCharts = Object.keys(chartObj).length;
		
		for (var i = 0; i < totalCharts; i++) {
			// Slice chart object to pass only one chart entry.
			const slicedChartEntry = new Map([Object.entries(chartObj)[i]]);
			const slicedChartObj = Object.fromEntries(slicedChartEntry);

			// Identify chart elements for insertion.
			const skillId = Object.keys(chartObj)[i];
			const chartId = skillId + K.hyphenSymbol + K.skillChartIndex;
			const chartType = chartObj[skillId];
			
			// Get elements by their identity.
			const skillChart = document.getElementById(chartId);
			const chartTemplate = document.querySelector(K.hashSymbol + chartType);
			
			// Insert cloned template of the chart identified using skill id.
			templateController.setTemplate(slicedChartObj, skillChart, 
													chartTemplate, K.skillChartIndex);
		}
	},

	// Add cloned charts in #skills-body.
	insertSkillsBody : function () {
		const skillsObj = skillsSectionController.getSkillsObj();

		// Identify elements for #skills-list-item template insertion.
		const skillsBody = document.getElementById(K.skillsBodyId);
		const skillsListItemTemplate = document.getElementById(K.skillsListItemId);
		
		// Insert cloned template in #skills-body.
		templateController.setTemplate(skillsObj, skillsBody, 
										   skillsListItemTemplate, K.skillsBodyId);
	},

	// Insert cloned templates of #skills.
	insertSkillTemplates : function () {
		skillsSectionController.insertSkillsBody();
		skillsSectionController.insertCharts();
	},

	// Add new skill item.
	cloneSkillsListItem : function (clone, iterIndex) {
		const skillsObj = skillsSectionController.getSkillsObj();
		skillId = Object.keys(skillsObj)[iterIndex];

		// Add col class.
		let col = clone.querySelector(K.periodSymbol + K.colClass);
		col.classList.add(skillsObj[skillId][K.colClass]);

		// Prepare chart content.
		let chart = clone.querySelector(K.periodSymbol + K.skillChartIndex);
		const chartType = skillsObj[skillId][K.skillChartIndex];
		chart.id = skillId + K.hyphenSymbol + K.skillChartIndex;
		chart.classList.add(chartType);
		skillsSectionController.chartObj[skillId] = chartType;

		// Add skill class based on chart type.
		let skill = clone.querySelector(K.periodSymbol + K.skillClass);
		if (chartType === K.skillDonutClass) {
			skill.classList.add(K.justifyContentCentreClass);
		}

		// Add skill label.
		const font = contentController.fonts[K.semiboldFontIndex];
		let skillLabel = clone.querySelector(K.periodSymbol + K.skillsLabelIndex);
		skillLabel.classList.add(font);
		skillLabel.textContent = skillsObj[skillId][K.skillsLabelIndex];
	},

	// Add new chart.
	cloneChart : function (clone, iterIndex, obj) {
		const skillsObj = skillsSectionController.getSkillsObj();

		// iterIndex is zero as obj is a single pair of skill id and chart type.
		const skillId = Object.keys(obj)[iterIndex];

		// Add skill Id to #skill-flexbox.
		let skillFbox = clone.querySelector(K.hashSymbol + K.skillFlexBoxId);
		skillFbox.classList.add(skillId);

		// Add percentage.
		const font = contentController.fonts[K.skillsPercentageIndex];
		let percentage = clone.querySelector(K.periodSymbol + K.skillsPercentageIndex);
		percentage.classList.add(font);
		percentage.textContent = skillsObj[skillId][K.skillsPercentageIndex];
	}

};