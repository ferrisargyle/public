javascript: (function() {
	/* Use this script as a bookmark to toggle a condensed Google Drive UI */
	var newFontSize = '11px';
	var newFolderHeight = '20px';
	var newFileHeight = '20px';

	var initialize = true;
	var folderFontSizeRowArr = ['a-Fa-U', 'k-ca-q-P'];
	var folderFontSizeRowArrLen = folderFontSizeRowArr.length;
	var fileFontSizeRowArr = ['a-pa-ob-Ff'];
	var fileFontSizeRowArrLen = fileFontSizeRowArr.length;
	var folderHeightArr = ['a-U-H'];
	var myDriveExclusionClass = 'a-U-Bb-H';
	var folderFontSizeRowArr = ['a-Fa-U', 'k-ca-q-P'];
	var folderFontSizeRowArrLen = folderFontSizeRowArr.length;
	var fileHeightArr = ['a-u-H-ll'];
	var fileFontSizeRowArr = ['a-pa-ob-Ff'];
	var fileFontSizeRowArrLen = fileFontSizeRowArr.length;

	addCSSRule('.new_font_size', 'font-size: ' + newFontSize);
	addCSSRule('.new_folder_height', 'height: ' + newFolderHeight);
	addCSSRule('.new_file_height', 'height: ' + newFileHeight + '!important');

	var element;
	for (var i = folderFontSizeRowArr.length; i--;) {
		element = document.getElementsByClassName(folderFontSizeRowArr[i])[0];
		if (element) {
			if (element.classList.contains('new_font_size')) {
				element.className = element.className.replace(/(?:^|\s)new_font_size(?!\S)/g , '');
			}
			else {
				element.className += ' new_font_size';
			}
		}
	}

	for (var i = fileFontSizeRowArr.length; i--;) {
		var elementArr = document.getElementsByClassName(fileFontSizeRowArr[i]);
		if (elementArr) {
			for (var j in elementArr) {
				element = elementArr[j];
				if (element.classList) {
					if (element.classList.contains('new_font_size')) {
						element.className = element.className.replace(/(?:^|\s)new_font_size(?!\S)/g , '');
					}
					else {
						element.className += ' new_font_size';
					}
				}
			}
		}
	}

	for (var i = folderHeightArr.length; i--;) {
		var elementArr = document.getElementsByClassName(folderHeightArr[i]);
		if (elementArr) {
			for (var j in elementArr) {
				element = elementArr[j];
				if (element.classList && !element.classList.contains(myDriveExclusionClass)) {
					if (element.classList.contains('new_folder_height')) {
						element.className = element.className.replace(/(?:^|\s)new_folder_height(?!\S)/g , '');
					}
					else {
						if (initialize) {
							/* removing new folder class doesn't reset height, 
							so store default height in a class for explicit reset */
							initialize = false;
							var defaultRowHeight = getStyle(element, 'height');
							addCSSRule('.default_row_height', 'height:' + defaultRowHeight);
						}
						element.className += ' new_folder_height';
					}
				}
			}
		}
	}

	for (var i = fileHeightArr.length; i--;) {
		var elementArr = document.getElementsByClassName(fileHeightArr[i]);
		if (elementArr) {
			for (var j in elementArr) {
				element = elementArr[j];
				if (element.classList) {;
					if (element.classList.contains('new_file_height')) {
						element.className = element.className.replace(/(?:^|\s)new_file_height(?!\S)/g , '');
					}
					else {
						element.className += ' new_file_height';
					}
				}
			}
		}
	}

	var defaultRowHeight;
	var defaultRowHeightRule = getCSSRule('.default_row_height');
	if (defaultRowHeightRule) {
		defaultRowHeight = defaultRowHeightRule.style.getPropertyValue('height');
	}

	/* Set folder height explicitly: it's inherited, so adding a class doesn't do it */
	toggleProperty('height', folderHeightArr, defaultRowHeight, newFolderHeight);


	/**
	 * Toggle Style property between original and new value
	 *
	 * @param {String} property The Property to toggle
	 * @param {Array} classArr The array of classes for which to toggle the property
	 * @param {String} originalValue The original value of the property
	 * @param {String} newValue The new value of the property
	 */
	function toggleProperty(property, classArr, originalValue, newValue) {

		var currValue;
		var styleSheetsList = document.styleSheets;
		var styleSheetsListLen = styleSheetsList.length;

		var classArrLen = classArr.length;
		for (var i = styleSheetsListLen; i--;) {
			styleSheet = styleSheetsList[i];
			cssRulesArr = styleSheet.cssRules;
			cssRulesArrLen = cssRulesArr.length;
			for (var j = cssRulesArrLen; j--;) {
				for (var k = classArrLen; k--;) {
					if (cssRulesArr[j].selectorText == '.'+ classArr[k]) {
						currValue = cssRulesArr[j].style.getPropertyValue(property);
						if (currValue == newValue) {
							cssRulesArr[j].style.setProperty(property, originalValue);
						}
						else {
							cssRulesArr[j].style.setProperty(property, newValue);
						}
					}
				}
			}
		}
	}


	/* statemodule approach doesn't appear to work across invocations,
	so need to persist info to stylesheet */

	/**
	 * Get a CSS Rule
	 *
	 * @see http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
	 *
	 * @param {String} ruleName A CSS Rule Name
	 * @return {CSSStyleRule} The style rule
	 */
	function getCSSRule(ruleName) {
		var retVal = false;
		ruleName = ruleName.toLowerCase();
		var styleSheets = document.styleSheets;
		if (styleSheets) {
			var styleSheetsLen = document.styleSheets.length;
			for (var i = 0; i < styleSheetsLen; i++) {
				var styleSheet = styleSheets[i];
				var cssRule = false;
				var cssRulesLen = styleSheet.cssRules.length;
				for (var ii = cssRulesLen; ii--;) {
					cssRule = styleSheet.cssRules[ii];
					if (cssRule && cssRule.selectorText && cssRule.selectorText.toLowerCase() == ruleName) {
						retVal = cssRule;
					}
				}
			}
		}
		return retVal;
	}

	/**
	 * Add a CSS Rule if it doesn't already exist
	 *
	 * @see http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
	 *
	 * @param {String} ruleName A CSS Rule Name
	 * @param {String} rule A CSS rule without the surrounding curly brackets
	 * @return {CSSStyleRule} The style rule which was added or the pre-existing one
	 */
	function addCSSRule(ruleName, rule) {
		if (!getCSSRule(ruleName)) {
			document.styleSheets[0].insertRule(ruleName + ' {' + rule + ' }', 0);
		}
		return getCSSRule(ruleName);
	}

	/**
	 * Deletes a CSS Rule
	 * Not used: included for completeness
	 *
	 * @see http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
	 *
	 * @param {String} ruleName A CSS Rule Name
	 * @param {String} styleProp A CSS style property, formatted in CSS notation.
	 * @return {CSSStyleRule} The style rule which was deleted
	 */
	function deleteCSSRule(ruleName) {
		return getCSSRule(ruleName, 'delete');
	}

	/**
	 * Retrieves a CSS style directly set for or inherited by a given dom node.
	 *
	 * @see www.quirksmode.org/dom/getstyles.html
	 *
	 * @param {Node} node A dom node.
	 * @param {String} styleProp A CSS style property, formatted in CSS notation.
	 * @return {String} The inherited style of the given node. Undefined if the node does not have the style.
	 *                 If the node is not an element, then the first ancestor element is selected.
	 *
	 */
	function getStyle(node, styleProp) {

	    while (node && node.nodeType != Node.ELEMENT_NODE) {
	        node = node.parentNode;
	    }
	    if (!node) return;

	    if (window.getComputedStyle) { /* DOM Spec */
	       return document.defaultView.getComputedStyle(node, '').getPropertyValue(styleProp);

	    } else if (node.currentStyle) { /* MS HTML */

	        /* Convert CSS Style notation to Javascript notation */
	        var index = styleProp.indexOf('-');
	        while (index > -1) {
	            styleProp = (index == (styleProp.length - 1)) ?
	                styleProp.substr(0, index) :
	                styleProp.substr(0, index) + styleProp.charAt(index + 1).toUpperCase() + styleProp.substr(index + 2);
	            index = styleProp.indexOf('-');
	        }

	        return node.currentStyle[styleProp];

	    }
	    /* Otherwise undefined... */
	}

})();
void(0);
