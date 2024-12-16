// Controller object to manage email composition.
var emailComposeController = {
    // Set up a document object to store html content.
    email : new Document(),

    // Convenience function to break to a new line.
    newline : function (doc, element) {
        const range = Array.from({length: 2}, (_, i) => i);
        range.forEach (() => {
            element.appendChild(doc.createElement(K.brElement));
        });
    },

    // Convenience function to format text content of element.
    formatText : function (element, formatTag) {
        const email = emailComposeController.email;
        var formattedElement = email.element;
        
        switch (formatTag) {
        case K.boldElement:
            formattedElement = element.appendChild(email.createElement(K.boldElement));
            break;
        
        case K.smallElement:
            formattedElement = element.appendChild(email.createElement(K.smallElement));
            break;
        
        default:
            console.log("Could not format element.");
        }
        return formattedElement;
    },

    // Insert content into table cell.
    insertResponseCellContent : function (cell, id, textArray) {
        var content = K.emptyString;
        const data = formController.data;

        const email = emailComposeController.email;
        
        switch (id) {
        case K.headerClass:
            // Add title.
            cell.align = K.centerAlignment;
            
            const title = emailComposeController
                                .formatText(cell, K.boldElement);
            
            title.textContent = textArray;

            // Add new line.
            emailComposeController.newline(email, cell);
            
            break;
        
        case K.bodyClass:
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
            // TODO: Generate random number.
            serviceRequestId.innerHTML = 1234567;

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
            // Add new line.
            emailComposeController.newline(email, cell);

            // Add horizontal rule.
            cell.appendChild(email.createElement(K.hrElement));
            
             // Add copyrights.
            const copyrights = emailComposeController.formatText(cell, K.smallElement);
            copyrights.innerHTML += K.copyrightEntity + textArray[K.copyrightsIndex];

            // Add new line.
            emailComposeController.newline(email, cell);

            // Add disclaimer.
            const disclaimer = emailComposeController.formatText(cell, K.smallElement);
            disclaimer.innerHTML = textArray[K.disclaimerIndex];

            break;
        
        default:
            console.log("Could not load email content.");
        }
    },

    // Insert confirmation email content into email html table content.
    insertResponseContent : function () {
        const emailObj = contactSectionController.getContactObj()[K.emailIndex];
        const emailObjSize = Object.keys(emailObj).length;

        const email = emailComposeController.email;
        const content = email.querySelector(K.periodSymbol + K.contentClass);

        for(var i = 0; i < emailObjSize; i++) {
            const tr = content.appendChild(email.createElement(K.tableRow));
            const td = tr.appendChild(email.createElement(K.tableData));
            
            // Set data class.
            contentId = Object.keys(emailObj)[i];
            td.className = contentId;
            
            // Set inner text or html content.
            const contentArray = emailObj[contentId];
            emailComposeController
                        .insertResponseCellContent(td, contentId, contentArray);
        }
    },

    // TODO: Insert service request email content for record-keeping.
    insertRequestContent : function () {

    },

    // Fetch and insert email content.
    prepareResponseEmail : function () {
        const snippetURL = K.snippetsLocation + K.emailSnippetId + K.htmlFileExtension;
        const emailPromise = contentController.fetchContent(snippetURL, false);

        return emailPromise
                .then((response) => {
                    // Parse response html and insert content.
                    emailComposeController.email = Document.parseHTMLUnsafe(response);
                    emailComposeController.insertResponseContent();
                    console.log(emailComposeController.email);
                    return emailComposeController.email;
                });
    } 
};