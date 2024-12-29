// Controller object to manage email composition.
var emailComposeController = {
    // Set up an object to save form data and request id.
    data : {},
    
    // Set up a document object to store html content.
    email : new Document(),

    // Convenience function to get font family using font class name.
    getFont : function (index) {
        var font = contentController.fonts[index];
        font = font.replace(K.hyphenSymbol + K.regularFontIndex, K.emptyString);
        
        var fontArray = font.split(K.hyphenSymbol);
        fontArray = fontArray.map((text) => stringExt.capitalize(text));
        
        font = fontArray.join(K.spaceString) + K.commaSymbol + K.altFontFamily;
        return font;
    },

    // Convenience function to access content element.
    getContent : function () {
        const email = emailComposeController.email;
        const content = email.querySelector(K.periodSymbol + K.contentClass);
        content.style.fontFamily = emailComposeController.getFont(K.regularFontIndex);
        return content;
    },

    // Convenience function to break to a new line.
    newline : function (doc, element) {
        const range = Array.from({length: 2}, (_, i) => i);
        range.forEach (() => {
            element.appendChild(doc.createElement(K.brElement));
        });
    },

    // Convenience function to format text content of element.
    formatText : function (element, format) {
        const email = emailComposeController.email;
        var formattedElement = email.element;
        
        switch (format) {
        case K.boldElement:
            formattedElement = element.appendChild(email.createElement(K.boldElement));
            break;
        
        case K.smallElement:
            formattedElement = element.appendChild(email.createElement(K.smallElement));
            break;

        case K.centerAlignment:
            formattedElement = element.appendChild(email.createElement(K.divElement));
            formattedElement.style.textAlign = K.centerAlignment;
            break;
        
        default:
            console.log("Could not format element.");
        }
        return formattedElement;
    },

    // Insert response content into table cell.
    insertResponseCellContent : function (cell, id, textArray) {
        const data = emailComposeController.data;
        const email = emailComposeController.email;
        
        switch (id) {
        case K.headerClass:
            // Add title.
            cell.textContent = textArray;
            cell.style.backgroundColor = K.titleBgColor;
            cell.style.color = K.titleColor;
            cell.style.padding = K.padding;
            cell.style.textAlign = K.centerAlignment;
            cell.style.lineHeight = K.lineHeight;
            break;
        
        case K.bodyClass:
            cell.style.padding = K.padding;
            cell.style.textAlign = K.leftAlignment;
            cell.style.fontSize = K.bodyFontSize;
            cell.style.lineHeight = K.lineHeight;
            cell.style.backgroundColor = K.bodyBgColor;

            // Add salutation.
            const sal = textArray[K.salutationIndex];
            const name = data[K.nameIndex];
            cell.innerHTML = sal[0] + name + sal[1];

            // Add new line.
            emailComposeController.newline(email, cell);

            // Add greetings.
            cell.innerHTML += textArray[K.greetingsIndex];

            // Add new line.
            emailComposeController.newline(email, cell);

            // Add details.
            const details = textArray[K.detailsIndex];

            cell.innerHTML += details[0] 

            const subject = data[K.subjectIndex];
            
            const sub = emailComposeController
                                .formatText(cell, K.boldElement);
            
            sub.innerHTML = subject;
            
            cell.innerHTML += details[1];

            const serviceRequestId = emailComposeController
                                            .formatText(cell, K.boldElement);
            
            serviceRequestId.innerHTML = data[K.requestIdIndex];

            // Add new line.
            emailComposeController.newline(email, cell);

            cell.innerHTML += details[2];

            // Add new line.
            emailComposeController.newline(email, cell);

            cell.innerHTML += details[3];

            // Add new line.
            emailComposeController.newline(email, cell);

            // Add signature.
            const signature = textArray[K.signatureIndex];
            cell.innerHTML += signature[0];

            // Go to new line.
            cell.appendChild(email.createElement(K.brElement));

            cell.innerHTML += signature[1];

            break;
        
        case K.footerClass:
            cell.style.padding = K.padding;
            cell.style.backgroundColor = K.footerBgColor;
            cell.style.color = K.footerColor;
            
             // Add copyrights.
            const copyrightsDiv = emailComposeController
                                        .formatText(cell, K.centerAlignment);
            
            const copyrights = emailComposeController
                                        .formatText(copyrightsDiv, K.smallElement);
            
            copyrights.innerHTML = K.copyrightEntity + textArray[K.copyrightsIndex];

            // Go to new line.
            cell.appendChild(email.createElement(K.brElement));

            // Add disclaimer.
            const disclaimerDiv = cell.appendChild(email.createElement(K.divElement));
            
            disclaimerDiv.style.fontFamily = emailComposeController
                                                    .getFont(K.btnLabelIndex);
            
            const disclaimer = emailComposeController
                                        .formatText(disclaimerDiv, K.smallElement);
            
            disclaimer.innerHTML = textArray[K.disclaimerIndex];

            break;
        
        default:
            console.log("Could not load email content.");
        }
    },

    // Insert response email content to be sent as confirmation.
    insertResponseContent : function () {
        const emailObj = contactSectionController.getContactObj()[K.emailIndex];
        const emailObjSize = Object.keys(emailObj).length;

        const email = emailComposeController.email;
        const content = emailComposeController.getContent();

        for(var i = 0; i < emailObjSize; i++) {
            const tr = content.appendChild(email.createElement(K.tableRow));
            const td = tr.appendChild(email.createElement(K.tableData));
            
            // Set data class.
            contentId = Object.keys(emailObj)[i];
            td.className = contentId;
            
            // Set inner text or html content.
            const contentArray = emailObj[contentId];
            
            // Insert response content into email html table.
            emailComposeController
                .insertResponseCellContent(td, contentId, contentArray); 

        }
    },

    // Insert service request email content for record-keeping.
    insertRequestContent  : function () {
        const data = emailComposeController.data;
        const email = emailComposeController.email;
        const content = emailComposeController.getContent();

        // Add title.
        const titleDiv = emailComposeController.formatText(content, K.centerAlignment);
        titleDiv.style.padding = K.padding;
        const title = emailComposeController.formatText(titleDiv, K.boldElement);
        title.textContent = K.requestTitle;

        // Populate form data.
        const dataSize = Object.keys(data).length;
        for(var i = 0; i < dataSize; i++) {
            const fieldId = Object.keys(data)[i];

            // Skip intent field and populate the rest.
            if (fieldId !== K.intentIndex) {
                const tr = content.appendChild(email.createElement(K.tableRow));
                const td = tr.appendChild(email.createElement(K.tableData));

                // Add field name.
                const field = emailComposeController
                                            .formatText(td, K.boldElement);

                field.textContent = stringExt.capitalize(fieldId);
                
                // Add field data.
                const value = tr.appendChild(email.createElement(K.tableData));
                value.textContent = data[fieldId];
            }
        }
    },

    // Fetch and insert email content.
    prepareEmailContent : function (isResponse) {
        const snippetURL = K.snippetsLocation + K.emailSnippetId + K.htmlFileExtension;
        const emailPromise = contentController.fetchContent(snippetURL, false);

        return emailPromise
                .then((response) => {
                    // Parse response html and insert content.
                    emailComposeController.email = Document.parseHTMLUnsafe(response);
                    if (isResponse) {
                        emailComposeController.insertResponseContent();
                    } else {
                        emailComposeController.insertRequestContent();
                    }
                    console.log(emailComposeController.email);
                    return emailComposeController.email;
                });
    } 
};