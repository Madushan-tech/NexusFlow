// Global scripts will be added here

// Script for 01_splash.html
if (document.querySelector('.splash-container')) { // Check if on splash page
    setTimeout(function() {
      const isLoggedIn = localStorage.getItem('nexusflow_logged_in');
      if (isLoggedIn === 'true') {
        window.location.href = '#03_home.html';
      } else {
        window.location.href = '#02_welcome.html';
      }
    }, 3000);
}

// Script for 02_welcome.html
if (document.getElementById('googleLoginBtn')) { // Check if on welcome page
    document.getElementById('googleLoginBtn').addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.setItem('nexusflow_logged_in', 'true');
      window.location.href = '#03_home.html';
    });
}

// Scripts for 06_profile.html
if (document.getElementById('brand-dropdown-toggle')) { // Check if on profile page
    // Toggle dropdown when clicking on brand name
    document.getElementById('brand-dropdown-toggle').addEventListener('click', function() {
        document.getElementById('brand-dropdown').classList.toggle('show');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', function(event) {
        if (!event.target.closest('#brand-dropdown-toggle') && !event.target.closest('#brand-dropdown')) {
            const brandDropdown = document.getElementById('brand-dropdown');
            if (brandDropdown && brandDropdown.classList.contains('show')) {
                 brandDropdown.classList.remove('show');
            }
        }
    });

    // Show Add Account popup
    const addAccountButton = document.querySelector('#brand-dropdown button');
    const addAccountPopup = document.getElementById('add-account-popup');
    if (addAccountButton && addAccountPopup) {
        addAccountButton.addEventListener('click', function() {
            addAccountPopup.classList.remove('hidden');
            if (document.getElementById('brand-dropdown')) {
                document.getElementById('brand-dropdown').classList.remove('show');
            }
        });
    }

    // Close Add Account popup (specific to profile page's add account popup)
    const profileClosePopupButton = addAccountPopup ? addAccountPopup.querySelector('#close-popup') : null;
    if (profileClosePopupButton && addAccountPopup) {
        profileClosePopupButton.addEventListener('click', function() {
            addAccountPopup.classList.add('hidden');
        });
    }

    // Toggle content details for Best Content section
    document.querySelectorAll('.content-toggle').forEach(function(button) {
        button.addEventListener('click', function() {
            const contentId = this.getAttribute('data-content-id');
            const contentElement = document.getElementById(contentId);
            if (contentElement) {
                contentElement.classList.toggle('expanded');
                // Rotate arrow icon
                if (contentElement.classList.contains('expanded')) {
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,154.34a8,8,0,0,1-11.32,0L128,80,53.66,154.34a8,8,0,0,1-11.32-11.32l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,213.66,154.34Z"></path></svg>';
                } else {
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>';
                }
            }
        });
    });
}

// Scripts for 07_setting.html
if (document.getElementById('aboutBtn')) { // Check if on settings page
    const aboutPopupSettings = document.getElementById('aboutPopup'); // Renamed to avoid conflict
    const closePopupBtnSettings = aboutPopupSettings ? aboutPopupSettings.querySelector('#closePopup') : null;

    document.getElementById('aboutBtn').addEventListener('click', function() {
        if (aboutPopupSettings) aboutPopupSettings.classList.remove('hidden');
    });

    if (closePopupBtnSettings) {
        closePopupBtnSettings.addEventListener('click', function() {
            if (aboutPopupSettings) aboutPopupSettings.classList.add('hidden');
        });
    }

    if (aboutPopupSettings) {
        aboutPopupSettings.addEventListener('click', function(e) {
            if (e.target === this) { // Clicked on overlay itself
                this.classList.add('hidden');
            }
        });
    }
}

// Scripts for 5_opacity.html
if (document.getElementById('opacity-slider') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Opacity') {

    const opacitySlider_OpacityPage = document.getElementById('opacity-slider');
    const opacityValue_OpacityPage = document.getElementById('opacity-value');

    if(opacitySlider_OpacityPage && opacityValue_OpacityPage) {
        opacitySlider_OpacityPage.addEventListener('input', function() {
            opacityValue_OpacityPage.textContent = `Opacity - ${this.value}%`;
            // Add logic here to actually change image/layer opacity if needed
            // e.g., document.querySelector('.preview-image').style.opacity = this.value / 100;
        });
    }

    const undoBtn_OpacityPage = document.getElementById('undo-btn');
    const redoBtn_OpacityPage = document.getElementById('redo-btn');
    const saveBtn_OpacityPage = document.getElementById('save-btn');

    let history_OpacityPage = [];
    let currentStep_OpacityPage = -1;

    function addToHistory_OpacityPage(action) {
        if (currentStep_OpacityPage < history_OpacityPage.length - 1) {
            history_OpacityPage = history_OpacityPage.slice(0, currentStep_OpacityPage + 1);
        }
        history_OpacityPage.push(action);
        currentStep_OpacityPage = history_OpacityPage.length - 1;
        updateButtons_OpacityPage();
    }

    function undo_OpacityPage() {
        if (currentStep_OpacityPage > 0) {
            currentStep_OpacityPage--;
            const prevState = history_OpacityPage[currentStep_OpacityPage];
            if (opacitySlider_OpacityPage && (prevState.type === 'opacity' || prevState.type === 'init' || prevState.type === 'reset')) {
                 opacitySlider_OpacityPage.value = prevState.opacity;
                 if(opacityValue_OpacityPage) opacityValue_OpacityPage.textContent = `Opacity - ${prevState.opacity}%`;
                 // Update actual preview opacity: document.querySelector('.preview-image').style.opacity = prevState.opacity / 100;
            }
            updateButtons_OpacityPage();
            // console.log('Undo to step', currentStep_OpacityPage, prevState);
        }
    }

    function redo_OpacityPage() {
        if (currentStep_OpacityPage < history_OpacityPage.length - 1) {
            currentStep_OpacityPage++;
            const nextState = history_OpacityPage[currentStep_OpacityPage];
             if (opacitySlider_OpacityPage && (nextState.type === 'opacity' || nextState.type === 'init' || nextState.type === 'reset')) {
                 opacitySlider_OpacityPage.value = nextState.opacity;
                 if(opacityValue_OpacityPage) opacityValue_OpacityPage.textContent = `Opacity - ${nextState.opacity}%`;
                 // Update actual preview opacity: document.querySelector('.preview-image').style.opacity = nextState.opacity / 100;
            }
            updateButtons_OpacityPage();
            // console.log('Redo to step', currentStep_OpacityPage, nextState);
        }
    }

    function updateButtons_OpacityPage() {
        if(undoBtn_OpacityPage) {
            undoBtn_OpacityPage.disabled = currentStep_OpacityPage <= 0;
            undoBtn_OpacityPage.style.opacity = undoBtn_OpacityPage.disabled ? '0.5' : '1';
        }
        if(redoBtn_OpacityPage) {
            redoBtn_OpacityPage.disabled = currentStep_OpacityPage >= history_OpacityPage.length - 1;
            redoBtn_OpacityPage.style.opacity = redoBtn_OpacityPage.disabled ? '0.5' : '1';
        }
    }

    if(undoBtn_OpacityPage) undoBtn_OpacityPage.addEventListener('click', undo_OpacityPage);
    if(redoBtn_OpacityPage) redoBtn_OpacityPage.addEventListener('click', redo_OpacityPage);
    if(saveBtn_OpacityPage) saveBtn_OpacityPage.addEventListener('click', function() {
        console.log('Saving current state on Opacity Page');
        // Actual save implementation
    });

    if(opacitySlider_OpacityPage) {
        opacitySlider_OpacityPage.addEventListener('change', function() {
            addToHistory_OpacityPage({ type: 'opacity', opacity: this.value });
        });
    }

    const resetBtn_OpacityPage = document.getElementById('reset-btn');
    if(resetBtn_OpacityPage && opacitySlider_OpacityPage && opacityValue_OpacityPage) {
        resetBtn_OpacityPage.addEventListener('click', function() {
            const defaultValue = 20; // Default reset value from HTML
            opacitySlider_OpacityPage.value = defaultValue;
            opacityValue_OpacityPage.textContent = `Opacity - ${defaultValue}%`;
            // document.querySelector('.preview-image').style.opacity = defaultValue / 100;
            addToHistory_OpacityPage({ type: 'reset', opacity: defaultValue });
        });
    }

    addToHistory_OpacityPage({ type: 'init', opacity: opacitySlider_OpacityPage ? opacitySlider_OpacityPage.value : 20 });
}

// Scripts for 6_scale.html
if (document.getElementById('scale-slider') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Scale') {

    const scaleSlider_ScalePage = document.getElementById('scale-slider');
    const scaleValue_ScalePage = document.getElementById('scale-value');

    if (scaleSlider_ScalePage && scaleValue_ScalePage) {
        scaleSlider_ScalePage.addEventListener('input', function() {
            scaleValue_ScalePage.textContent = `Scale: ${this.value}%`;
            // Add logic here to actually change image/layer scale
            // e.g., document.querySelector('.preview-image').style.transform = `scale(${this.value / 100})`;
        });
    }

    const undoBtn_ScalePage = document.getElementById('undo-btn');
    const redoBtn_ScalePage = document.getElementById('redo-btn');
    const saveBtn_ScalePage = document.getElementById('save-btn');

    let history_ScalePage = [];
    let currentStep_ScalePage = -1;
    let currentDirection_ScalePage = 'horizontal'; // Default

    function addToHistory_ScalePage(action) {
        if (currentStep_ScalePage < history_ScalePage.length - 1) {
            history_ScalePage = history_ScalePage.slice(0, currentStep_ScalePage + 1);
        }
        history_ScalePage.push(action);
        currentStep_ScalePage = history_ScalePage.length - 1;
        updateButtons_ScalePage();
    }

    function applyState_ScalePage(state) {
        if (scaleSlider_ScalePage && (state.type === 'scale' || state.type === 'init' || state.type === 'reset')) {
            scaleSlider_ScalePage.value = state.scale;
            if(scaleValue_ScalePage) scaleValue_ScalePage.textContent = `Scale: ${state.scale}%`;
            // Update preview scale
        }
        if (state.type === 'direction' || state.type === 'init' || state.type === 'reset') {
            currentDirection_ScalePage = state.direction; // Keep track of current direction
            if (horizontalBtn_ScalePage && verticalBtn_ScalePage) {
                if (state.direction === 'horizontal') {
                    horizontalBtn_ScalePage.classList.add('btn-scale-active');
                    horizontalBtn_ScalePage.classList.remove('btn-scale-inactive');
                    verticalBtn_ScalePage.classList.add('btn-scale-inactive');
                    verticalBtn_ScalePage.classList.remove('btn-scale-active');
                } else { // vertical
                    verticalBtn_ScalePage.classList.add('btn-scale-active');
                    verticalBtn_ScalePage.classList.remove('btn-scale-inactive');
                    horizontalBtn_ScalePage.classList.add('btn-scale-inactive');
                    horizontalBtn_ScalePage.classList.remove('btn-scale-active');
                }
            }
            // Update preview based on direction
        }
    }

    function undo_ScalePage() {
        if (currentStep_ScalePage > 0) {
            currentStep_ScalePage--;
            applyState_ScalePage(history_ScalePage[currentStep_ScalePage]);
            updateButtons_ScalePage();
        }
    }

    function redo_ScalePage() {
        if (currentStep_ScalePage < history_ScalePage.length - 1) {
            currentStep_ScalePage++;
            applyState_ScalePage(history_ScalePage[currentStep_ScalePage]);
            updateButtons_ScalePage();
        }
    }

    function updateButtons_ScalePage() {
        if(undoBtn_ScalePage) {
            undoBtn_ScalePage.disabled = currentStep_ScalePage <= 0;
            undoBtn_ScalePage.style.opacity = undoBtn_ScalePage.disabled ? '0.5' : '1';
        }
        if(redoBtn_ScalePage) {
            redoBtn_ScalePage.disabled = currentStep_ScalePage >= history_ScalePage.length - 1;
            redoBtn_ScalePage.style.opacity = redoBtn_ScalePage.disabled ? '0.5' : '1';
        }
    }

    if(undoBtn_ScalePage) undoBtn_ScalePage.addEventListener('click', undo_ScalePage);
    if(redoBtn_ScalePage) redoBtn_ScalePage.addEventListener('click', redo_ScalePage);
    if(saveBtn_ScalePage) saveBtn_ScalePage.addEventListener('click', function() {
        console.log('Saving current state on Scale Page');
    });

    if(scaleSlider_ScalePage) {
        scaleSlider_ScalePage.addEventListener('change', function() {
            addToHistory_ScalePage({ type: 'scale', scale: this.value, direction: currentDirection_ScalePage });
        });
    }

    const horizontalBtn_ScalePage = document.getElementById('horizontal-btn');
    const verticalBtn_ScalePage = document.getElementById('vertical-btn');

    if(horizontalBtn_ScalePage && verticalBtn_ScalePage){
        horizontalBtn_ScalePage.addEventListener('click', function() {
            applyState_ScalePage({type: 'direction', direction: 'horizontal', scale: scaleSlider_ScalePage.value});
            addToHistory_ScalePage({ type: 'direction', direction: 'horizontal', scale: scaleSlider_ScalePage.value });
        });

        verticalBtn_ScalePage.addEventListener('click', function() {
            applyState_ScalePage({type: 'direction', direction: 'vertical', scale: scaleSlider_ScalePage.value});
            addToHistory_ScalePage({ type: 'direction', direction: 'vertical', scale: scaleSlider_ScalePage.value });
        });
    }

    const resetBtn_ScalePage = document.getElementById('reset-btn');
    if(resetBtn_ScalePage && scaleSlider_ScalePage && scaleValue_ScalePage) {
        resetBtn_ScalePage.addEventListener('click', function() {
            const defaultScale = 50;
            const defaultDirection = 'horizontal';
            applyState_ScalePage({type: 'reset', scale: defaultScale, direction: defaultDirection});
            addToHistory_ScalePage({ type: 'reset', scale: defaultScale, direction: defaultDirection });
        });
    }

    addToHistory_ScalePage({ type: 'init', scale: scaleSlider_ScalePage ? scaleSlider_ScalePage.value : 50, direction: 'horizontal' });
}

// Scripts for 8_heading.html
if (document.getElementById('formattingMenu') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Heading') {

    const previewText_HeadingPage = document.getElementById('preview-text');
    const mainBottomMenu_HeadingPage = document.getElementById('mainBottomMenu');
    const headingButton_HeadingPage = document.getElementById('headingButton');
    const formattingMenu_HeadingPage = document.getElementById('formattingMenu');
    const toggleFormattingBtn_HeadingPage = document.getElementById('toggleFormattingBtn');
    const toggleFormattingIcon_HeadingPage = document.getElementById('toggleFormattingIcon');
    const formattingToolsContainer_HeadingPage = document.getElementById('formattingToolsContainer');
    const textEditingControls_HeadingPage = document.getElementById('textEditingControls');
    const cancelEditingBtn_HeadingPage = document.getElementById('cancelEditingBtn');
    const saveEditingBtn_HeadingPage = document.getElementById('saveEditingBtn');
    const colorTool_HeadingPage = document.getElementById('color-tool');
    const boldTool_HeadingPage = document.getElementById('bold-tool');
    const italicTool_HeadingPage = document.getElementById('italic-tool');
    const fontTool_HeadingPage = document.getElementById('font-tool');
    const sizeTool_HeadingPage = document.getElementById('size-tool');
    const spacingTool_HeadingPage = document.getElementById('spacing-tool');
    const keyboardTool_HeadingPage = document.getElementById('keyboard-tool');
    const colorSection_HeadingPage = document.getElementById('color-section');
    const fontSection_HeadingPage = document.getElementById('font-section');
    const sizeSection_HeadingPage = document.getElementById('size-section');
    const spacingSection_HeadingPage = document.getElementById('spacing-section');
    const fontSizeSlider_HeadingPage = document.getElementById('fontSizeSlider');
    const fontSizeValue_HeadingPage = document.getElementById('fontSizeValue');
    const lineSpacingSlider_HeadingPage = document.getElementById('lineSpacingSlider');
    const lineSpacingValue_HeadingPage = document.getElementById('lineSpacingValue');
    const colorPalette_HeadingPage = document.getElementById('colorPalette');
    const customColorBtn_HeadingPage = document.getElementById('customColorBtn');
    const colorPickerPopup_HeadingPage = document.getElementById('colorPickerPopup');
    const colorPickerOverlay_HeadingPage = document.getElementById('colorPickerOverlay');
    const closeColorPicker_HeadingPage = colorPickerPopup_HeadingPage ? colorPickerPopup_HeadingPage.querySelector('#closeColorPicker') : null;
    const hexColorInput_HeadingPage = document.getElementById('hexColorInput');
    const colorPreview_HeadingPage = document.getElementById('colorPreview');
    const applyCustomColor_HeadingPage = document.getElementById('applyCustomColor');
    const undoBtn_HeadingPage = document.getElementById('undo-btn');
    const redoBtn_HeadingPage = document.getElementById('redo-btn');
    const saveBtn_HeadingPage = document.getElementById('save-btn');

    if (!previewText_HeadingPage || !formattingMenu_HeadingPage || !mainBottomMenu_HeadingPage) {
        console.error("Essential elements for Heading page script are missing.");
    } else {

        let textState_HeadingPage = {
            color: '#FFFFFF', bold: false, italic: false,
            font: "'Be Vietnam Pro', sans-serif", size: '24px', lineHeight: '1.5',
            history: [], historyIndex: -1, customColors: [],
            originalText: previewText_HeadingPage.innerHTML, // Changed from textContent
            isEditing: false
        };

        function saveToHistory_HeadingPage() {
            if (textState_HeadingPage.historyIndex < textState_HeadingPage.history.length - 1) {
                textState_HeadingPage.history = textState_HeadingPage.history.slice(0, textState_HeadingPage.historyIndex + 1);
            }
            textState_HeadingPage.history.push({
                text: previewText_HeadingPage.innerHTML,
                color: textState_HeadingPage.color, bold: textState_HeadingPage.bold, italic: textState_HeadingPage.italic,
                font: textState_HeadingPage.font, size: textState_HeadingPage.size, lineHeight: textState_HeadingPage.lineHeight,
            });
            textState_HeadingPage.historyIndex = textState_HeadingPage.history.length - 1;
            updateUndoRedoButtons_HeadingPage();
        }

        function updateUndoRedoButtons_HeadingPage() {
            if(undoBtn_HeadingPage) {
                undoBtn_HeadingPage.disabled = textState_HeadingPage.historyIndex <= 0;
                undoBtn_HeadingPage.style.opacity = undoBtn_HeadingPage.disabled ? '0.5' : '1';
            }
            if(redoBtn_HeadingPage) {
                redoBtn_HeadingPage.disabled = textState_HeadingPage.historyIndex >= textState_HeadingPage.history.length - 1;
                redoBtn_HeadingPage.style.opacity = redoBtn_HeadingPage.disabled ? '0.5' : '1';
            }
        }

        function applyHistoryState_HeadingPage(historyItem) {
            previewText_HeadingPage.innerHTML = historyItem.text;
            textState_HeadingPage.color = historyItem.color;
            textState_HeadingPage.bold = historyItem.bold;
            textState_HeadingPage.italic = historyItem.italic;
            textState_HeadingPage.font = historyItem.font;
            textState_HeadingPage.size = historyItem.size;
            textState_HeadingPage.lineHeight = historyItem.lineHeight;
            updatePreviewText_HeadingPage();
        }

        function undo_HeadingPage() {
            if (textState_HeadingPage.historyIndex > 0) {
                textState_HeadingPage.historyIndex--;
                applyHistoryState_HeadingPage(textState_HeadingPage.history[textState_HeadingPage.historyIndex]);
                updateUndoRedoButtons_HeadingPage();
            }
        }

        function redo_HeadingPage() {
            if (textState_HeadingPage.historyIndex < textState_HeadingPage.history.length - 1) {
                textState_HeadingPage.historyIndex++;
                applyHistoryState_HeadingPage(textState_HeadingPage.history[textState_HeadingPage.historyIndex]);
                updateUndoRedoButtons_HeadingPage();
            }
        }

        if(undoBtn_HeadingPage) undoBtn_HeadingPage.addEventListener('click', undo_HeadingPage);
        if(redoBtn_HeadingPage) redoBtn_HeadingPage.addEventListener('click', redo_HeadingPage);
        if(saveBtn_HeadingPage) saveBtn_HeadingPage.addEventListener('click', () => {
            console.log('Save action on Heading page');
            saveToHistory_HeadingPage(); // Save final state before "leaving"
        });

        saveToHistory_HeadingPage();

        function toggleFormattingMenu_HeadingPage() {
            const isMinimized = formattingMenu_HeadingPage.classList.toggle('minimized');
            if(toggleFormattingIcon_HeadingPage) toggleFormattingIcon_HeadingPage.textContent = isMinimized ? 'expand_more' : 'expand_less';

            if (formattingToolsContainer_HeadingPage) {
                formattingToolsContainer_HeadingPage.classList.toggle('hidden', isMinimized);
            }

            if (!isMinimized) {
                window.scrollTo({ top: 0, behavior: 'auto' });
                setTimeout(() => {
                    const previewCont = document.querySelector('.preview-container');
                    if(previewCont) previewCont.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }

        if(toggleFormattingBtn_HeadingPage) toggleFormattingBtn_HeadingPage.addEventListener('click', toggleFormattingMenu_HeadingPage);

        if(headingButton_HeadingPage && formattingMenu_HeadingPage && formattingToolsContainer_HeadingPage) {
             headingButton_HeadingPage.addEventListener('click', function() {
                formattingMenu_HeadingPage.style.display = 'block';
                formattingMenu_HeadingPage.classList.remove('minimized');
                if(toggleFormattingIcon_HeadingPage) toggleFormattingIcon_HeadingPage.textContent = 'expand_less';
                formattingToolsContainer_HeadingPage.classList.remove('hidden');

                window.scrollTo({ top: 0, behavior: 'auto' });
                setTimeout(() => {
                    const previewCont = document.querySelector('.preview-container');
                     if(previewCont) previewCont.scrollIntoView({ behavior: 'smooth', block: 'center'});
                }, 100);

                if(fontTool_HeadingPage) fontTool_HeadingPage.click();
            });
        }

        function updatePreviewText_HeadingPage() {
            if (!previewText_HeadingPage) return;
            previewText_HeadingPage.style.color = textState_HeadingPage.color;
            previewText_HeadingPage.style.fontFamily = textState_HeadingPage.font;
            previewText_HeadingPage.style.fontSize = textState_HeadingPage.size;
            previewText_HeadingPage.style.lineHeight = textState_HeadingPage.lineHeight;
            previewText_HeadingPage.style.fontWeight = textState_HeadingPage.bold ? 'bold' : 'normal';
            previewText_HeadingPage.style.fontStyle = textState_HeadingPage.italic ? 'italic' : 'normal';
        }

        function applyFormattingToSelection_HeadingPage(command, value = null) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand(command, false, value);
            document.execCommand('styleWithCSS', false, false);
            previewText_HeadingPage.focus();
            saveToHistory_HeadingPage();
        }

        function enableTextEditing_HeadingPage() {
            textState_HeadingPage.isEditing = true;
            textState_HeadingPage.originalText = previewText_HeadingPage.innerHTML;
            if(mainBottomMenu_HeadingPage) mainBottomMenu_HeadingPage.style.display = 'none';
            if(formattingMenu_HeadingPage) formattingMenu_HeadingPage.style.display = 'none';
            previewText_HeadingPage.contentEditable = true;
            previewText_HeadingPage.focus();
            if(textEditingControls_HeadingPage) textEditingControls_HeadingPage.classList.add('visible');
        }

        function disableTextEditing_HeadingPage(save) {
            textState_HeadingPage.isEditing = false;
            if (!save) {
                previewText_HeadingPage.innerHTML = textState_HeadingPage.originalText;
            } else {
                 saveToHistory_HeadingPage();
            }
            previewText_HeadingPage.contentEditable = false;
            if(mainBottomMenu_HeadingPage) mainBottomMenu_HeadingPage.style.display = 'block';
            if(formattingMenu_HeadingPage) formattingMenu_HeadingPage.style.display = 'block';
            if(textEditingControls_HeadingPage) textEditingControls_HeadingPage.classList.remove('visible');
        }

        if(keyboardTool_HeadingPage) keyboardTool_HeadingPage.addEventListener('click', enableTextEditing_HeadingPage);
        if(cancelEditingBtn_HeadingPage) cancelEditingBtn_HeadingPage.addEventListener('click', () => disableTextEditing_HeadingPage(false));
        if(saveEditingBtn_HeadingPage) saveEditingBtn_HeadingPage.addEventListener('click', () => disableTextEditing_HeadingPage(true));

        const toolButtons_HeadingPage = [colorTool_HeadingPage, boldTool_HeadingPage, italicTool_HeadingPage, fontTool_HeadingPage, sizeTool_HeadingPage, spacingTool_HeadingPage, keyboardTool_HeadingPage];
        const toolSections_HeadingPage = [colorSection_HeadingPage, null, null, fontSection_HeadingPage, sizeSection_HeadingPage, spacingSection_HeadingPage, null];

        toolButtons_HeadingPage.forEach((button, index) => {
            if (!button) return;
            button.addEventListener('click', () => {
                if (index === 1) {
                    textState_HeadingPage.bold = !textState_HeadingPage.bold;
                    applyFormattingToSelection_HeadingPage('bold');
                    boldTool_HeadingPage.classList.toggle('tool-active', textState_HeadingPage.bold);
                    boldTool_HeadingPage.classList.toggle('tool-inactive', !textState_HeadingPage.bold);
                    // updatePreviewText_HeadingPage(); // Not needed if execCommand updates style
                    return;
                }
                if (index === 2) {
                     textState_HeadingPage.italic = !textState_HeadingPage.italic;
                    applyFormattingToSelection_HeadingPage('italic');
                    italicTool_HeadingPage.classList.toggle('tool-active', textState_HeadingPage.italic);
                    italicTool_HeadingPage.classList.toggle('tool-inactive', !textState_HeadingPage.italic);
                    // updatePreviewText_HeadingPage();
                    return;
                }
                 if (index === 6 && keyboardTool_HeadingPage) { // Keyboard tool
                    enableTextEditing_HeadingPage();
                    return;
                }

                toolButtons_HeadingPage.forEach(btn => { if(btn) btn.classList.replace('tool-active', 'tool-inactive')});
                button.classList.replace('tool-inactive', 'tool-active');

                toolSections_HeadingPage.forEach(section => { if(section) section.classList.add('hidden'); });
                if (toolSections_HeadingPage[index]) {
                    toolSections_HeadingPage[index].classList.remove('hidden');
                }

                // Special handling for font section auto-scroll
                if (button === fontTool_HeadingPage && fontSection_HeadingPage && !fontSection_HeadingPage.classList.contains('hidden')) {
                    let currentIndex_fonts = 0;
                    const fontScrollItems = fontSection_HeadingPage.querySelectorAll('.font-item');
                    function autoScrollFonts_HeadingPage() {
                        if (fontScrollItems.length === 0 || !fontSection_HeadingPage || fontSection_HeadingPage.classList.contains('hidden')) return; // Stop if not visible
                        if (currentIndex_fonts < fontScrollItems.length) {
                            fontScrollItems[currentIndex_fonts].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            currentIndex_fonts++;
                            setTimeout(autoScrollFonts_HeadingPage, 2000);
                        } else {
                            currentIndex_fonts = 0;
                            setTimeout(autoScrollFonts_HeadingPage, 1000);
                        }
                    }
                    if(fontScrollItems.length > 0) autoScrollFonts_HeadingPage();
                }
            });
        });

        const colorButtons_HeadingPage = colorPalette_HeadingPage ? colorPalette_HeadingPage.querySelectorAll('.color-button') : [];
        colorButtons_HeadingPage.forEach(button => {
            if (button.id !== 'customColorBtn') {
                button.addEventListener('click', function() {
                    colorButtons_HeadingPage.forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    const color = getComputedStyle(this).backgroundColor;
                    textState_HeadingPage.color = color;
                    applyFormattingToSelection_HeadingPage('foreColor', color);
                    if(colorTool_HeadingPage) colorTool_HeadingPage.querySelector('.material-icons-outlined').style.color = color;
                });
            }
        });

        if(customColorBtn_HeadingPage) customColorBtn_HeadingPage.addEventListener('click', () => {
            if(colorPickerPopup_HeadingPage) colorPickerPopup_HeadingPage.style.display = 'block';
            if(colorPickerOverlay_HeadingPage) colorPickerOverlay_HeadingPage.style.display = 'block';
        });
        if(closeColorPicker_HeadingPage) closeColorPicker_HeadingPage.addEventListener('click', () => {
            if(colorPickerPopup_HeadingPage) colorPickerPopup_HeadingPage.style.display = 'none';
            if(colorPickerOverlay_HeadingPage) colorPickerOverlay_HeadingPage.style.display = 'none';
        });
        if(colorPickerOverlay_HeadingPage) colorPickerOverlay_HeadingPage.addEventListener('click', () => {
             if(colorPickerPopup_HeadingPage) colorPickerPopup_HeadingPage.style.display = 'none';
             if(colorPickerOverlay_HeadingPage) colorPickerOverlay_HeadingPage.style.display = 'none';
        });
        if(hexColorInput_HeadingPage && colorPreview_HeadingPage) hexColorInput_HeadingPage.addEventListener('input', function() {
            const color = this.value;
            if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) colorPreview_HeadingPage.style.backgroundColor = color; // Allow 3 or 6 hex
        });
        if(applyCustomColor_HeadingPage && hexColorInput_HeadingPage) applyCustomColor_HeadingPage.addEventListener('click', () => {
            const color = hexColorInput_HeadingPage.value;
            if (/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
                textState_HeadingPage.color = color;
                applyFormattingToSelection_HeadingPage('foreColor', color);
                if(colorTool_HeadingPage) colorTool_HeadingPage.querySelector('.material-icons-outlined').style.color = color;
                if(colorPickerPopup_HeadingPage) colorPickerPopup_HeadingPage.style.display = 'none';
                if(colorPickerOverlay_HeadingPage) colorPickerOverlay_HeadingPage.style.display = 'none';
            }
        });

        const fontItems_HeadingPage = fontSection_HeadingPage ? fontSection_HeadingPage.querySelectorAll('.font-item') : [];
        fontItems_HeadingPage.forEach(item => {
            item.addEventListener('click', function() {
                fontItems_HeadingPage.forEach(i => i.classList.remove('selected'));
                this.classList.add('selected');
                const font = this.getAttribute('data-font');
                textState_HeadingPage.font = font;
                applyFormattingToSelection_HeadingPage('fontName', font);
            });
        });

        if(fontSizeSlider_HeadingPage && fontSizeValue_HeadingPage) fontSizeSlider_HeadingPage.addEventListener('input', function() {
            const size = this.value;
            const percentage = Math.round((size / 24) * 100);
            fontSizeValue_HeadingPage.textContent = `${size}px (${percentage}%)`;
            textState_HeadingPage.size = `${size}px`;
            previewText_HeadingPage.style.fontSize = textState_HeadingPage.size;
            saveToHistory_HeadingPage();
        });

        if(lineSpacingSlider_HeadingPage && lineSpacingValue_HeadingPage) lineSpacingSlider_HeadingPage.addEventListener('input', function() {
            const spacing = this.value / 10;
            const percentage = Math.round(spacing * 100);
            lineSpacingValue_HeadingPage.textContent = `${spacing} (${percentage}%)`;
            textState_HeadingPage.lineHeight = `${spacing}`;
            previewText_HeadingPage.style.lineHeight = textState_HeadingPage.lineHeight;
            saveToHistory_HeadingPage();
        });

        updatePreviewText_HeadingPage();
        if(colorTool_HeadingPage && colorTool_HeadingPage.querySelector('.material-icons-outlined')) {
            colorTool_HeadingPage.querySelector('.material-icons-outlined').style.color = textState_HeadingPage.color;
        }
        if(boldTool_HeadingPage) {
            boldTool_HeadingPage.classList.toggle('tool-active', textState_HeadingPage.bold);
            boldTool_HeadingPage.classList.toggle('tool-inactive', !textState_HeadingPage.bold);
        }
        if(italicTool_HeadingPage) {
            italicTool_HeadingPage.classList.toggle('tool-active', textState_HeadingPage.italic);
            italicTool_HeadingPage.classList.toggle('tool-inactive', !textState_HeadingPage.italic);
        }
        const initialFontItem_HeadingPage = fontSection_HeadingPage ? fontSection_HeadingPage.querySelector(`.font-item[data-font="${textState_HeadingPage.font}"]`) : null;
        if (initialFontItem_HeadingPage) {
            fontItems_HeadingPage.forEach(i => i.classList.remove('selected'));
            initialFontItem_HeadingPage.classList.add('selected');
        }
        if(fontSizeSlider_HeadingPage && fontSizeValue_HeadingPage) {
            fontSizeSlider_HeadingPage.value = parseInt(textState_HeadingPage.size);
            fontSizeValue_HeadingPage.textContent = `${textState_HeadingPage.size} (${Math.round((parseInt(textState_HeadingPage.size) / 24) * 100)}%)`;
        }
        if(lineSpacingSlider_HeadingPage && lineSpacingValue_HeadingPage) {
            lineSpacingSlider_HeadingPage.value = parseFloat(textState_HeadingPage.lineHeight) * 10;
            lineSpacingValue_HeadingPage.textContent = `${textState_HeadingPage.lineHeight} (${Math.round(parseFloat(textState_HeadingPage.lineHeight) * 100)}%)`;
        }
    }
}

// Scripts for 7_blend.html
if (document.getElementById('blend-panel') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Blend') {

    const toggleBtn_BlendPage = document.getElementById('toggle-panel');
    const blendPanel_BlendPage = document.getElementById('blend-panel');
    const toggleIcon_BlendPage = document.getElementById('toggle-icon');

    if (toggleBtn_BlendPage && blendPanel_BlendPage && toggleIcon_BlendPage) {
        let isExpanded_BlendPage = true;
        toggleBtn_BlendPage.addEventListener('click', function() {
            isExpanded_BlendPage = !isExpanded_BlendPage;
            if (isExpanded_BlendPage) {
                blendPanel_BlendPage.classList.remove('minimized');
                toggleIcon_BlendPage.textContent = 'expand_less';
            } else {
                blendPanel_BlendPage.classList.add('minimized');
                toggleIcon_BlendPage.textContent = 'expand_more';
            }
        });
    }

    const tabs_BlendPage = document.querySelectorAll('#blend-panel .tab');
    const tabContents_BlendPage = document.querySelectorAll('#blend-panel .tab-content');

    tabs_BlendPage.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs_BlendPage.forEach(t => t.classList.remove('active'));
            tabContents_BlendPage.forEach(content => content.classList.add('hidden'));
            this.classList.add('active');
            const contentId = this.getAttribute('data-tab');
            const targetContent = document.getElementById(contentId);
            if(targetContent) {
                 targetContent.classList.remove('hidden');
            }
        });
    });

    const undoBtn_BlendPage = document.getElementById('undo-btn');
    const redoBtn_BlendPage = document.getElementById('redo-btn');
    const saveBtn_BlendPage = document.getElementById('save-btn');
    let history_BlendPage = [];
    let currentStep_BlendPage = -1;

    let currentOpacity_BlendPage = { position: 'bottom', value: 32 };
    let currentBlur_BlendPage = { position: 'top', value: 50 };
    let currentHeight_BlendPage = { mode: 'blend', value: 50 };

    const opacityTopBtn_BlendPage = document.getElementById('opacity-top-btn');
    const opacityBottomBtn_BlendPage = document.getElementById('opacity-bottom-btn');
    const opacitySlider_BlendPage = document.getElementById('opacity-slider');
    const opacityValue_BlendPage = document.getElementById('opacity-value');

    const blurTopBtn_BlendPage = document.getElementById('blur-top-btn');
    const blurBottomBtn_BlendPage = document.getElementById('blur-bottom-btn');
    const blurSlider_BlendPage = document.getElementById('blur-slider');
    const blurValue_BlendPage = document.getElementById('blur-value');

    const blendBtn_BlendPage = document.getElementById('blend-btn');
    const textBtn_BlendPage = document.getElementById('text-btn');
    const heightSlider_BlendPage = document.getElementById('height-slider');
    const heightValue_BlendPage = document.getElementById('height-value');
    const resetBtn_BlendPage = document.getElementById('reset-btn');


    function addToHistory_BlendPage(actionType) { // Pass only actionType, specific values read from current state
        if (currentStep_BlendPage < history_BlendPage.length - 1) {
            history_BlendPage = history_BlendPage.slice(0, currentStep_BlendPage + 1);
        }
        history_BlendPage.push({
            opacity: {...currentOpacity_BlendPage},
            blur: {...currentBlur_BlendPage},
            height: {...currentHeight_BlendPage},
            triggerAction: actionType
        });
        currentStep_BlendPage = history_BlendPage.length - 1;
        updateButtons_BlendPage();
    }

    function applyState_BlendPage(state) {
        currentOpacity_BlendPage = {...state.opacity};
        if(opacitySlider_BlendPage) opacitySlider_BlendPage.value = state.opacity.value;
        if(opacityValue_BlendPage) opacityValue_BlendPage.textContent = `Opacity: ${state.opacity.value}%`;
        if(opacityTopBtn_BlendPage && opacityBottomBtn_BlendPage){
            opacityTopBtn_BlendPage.classList.toggle('btn-blend-active', state.opacity.position === 'top');
            opacityTopBtn_BlendPage.classList.toggle('btn-blend-inactive', state.opacity.position !== 'top');
            opacityBottomBtn_BlendPage.classList.toggle('btn-blend-active', state.opacity.position === 'bottom');
            opacityBottomBtn_BlendPage.classList.toggle('btn-blend-inactive', state.opacity.position !== 'bottom');
        }

        currentBlur_BlendPage = {...state.blur};
        if(blurSlider_BlendPage) blurSlider_BlendPage.value = state.blur.value;
        if(blurValue_BlendPage) blurValue_BlendPage.textContent = `Blur: ${state.blur.value}%`;
        if(blurTopBtn_BlendPage && blurBottomBtn_BlendPage){
            blurTopBtn_BlendPage.classList.toggle('btn-blend-active', state.blur.position === 'top');
            blurTopBtn_BlendPage.classList.toggle('btn-blend-inactive', state.blur.position !== 'top');
            blurBottomBtn_BlendPage.classList.toggle('btn-blend-active', state.blur.position === 'bottom');
            blurBottomBtn_BlendPage.classList.toggle('btn-blend-inactive', state.blur.position !== 'bottom');
        }

        currentHeight_BlendPage = {...state.height};
        if(heightSlider_BlendPage) heightSlider_BlendPage.value = state.height.value;
        if(heightValue_BlendPage) heightValue_BlendPage.textContent = `Height: ${state.height.value}%`;
        if(blendBtn_BlendPage && textBtn_BlendPage) {
            blendBtn_BlendPage.classList.toggle('btn-blend-active', state.height.mode === 'blend');
            blendBtn_BlendPage.classList.toggle('btn-blend-inactive', state.height.mode !== 'blend');
            textBtn_BlendPage.classList.toggle('btn-blend-active', state.height.mode === 'text');
            textBtn_BlendPage.classList.toggle('btn-blend-inactive', state.height.mode !== 'text');
        }
        // TODO: Add logic to update preview based on these states
    }

    function undo_BlendPage() {
        if (currentStep_BlendPage > 0) {
            currentStep_BlendPage--;
            applyState_BlendPage(history_BlendPage[currentStep_BlendPage]);
            updateButtons_BlendPage();
        }
    }

    function redo_BlendPage() {
        if (currentStep_BlendPage < history_BlendPage.length - 1) {
            currentStep_BlendPage++;
            applyState_BlendPage(history_BlendPage[currentStep_BlendPage]);
            updateButtons_BlendPage();
        }
    }

    function updateButtons_BlendPage() {
         if(undoBtn_BlendPage) {
            undoBtn_BlendPage.disabled = currentStep_BlendPage <= 0;
            undoBtn_BlendPage.style.opacity = undoBtn_BlendPage.disabled ? '0.5' : '1';
        }
        if(redoBtn_BlendPage) {
            redoBtn_BlendPage.disabled = currentStep_BlendPage >= history_BlendPage.length - 1;
            redoBtn_BlendPage.style.opacity = redoBtn_BlendPage.disabled ? '0.5' : '1';
        }
    }

    if(undoBtn_BlendPage) undoBtn_BlendPage.addEventListener('click', undo_BlendPage);
    if(redoBtn_BlendPage) redoBtn_BlendPage.addEventListener('click', redo_BlendPage);
    if(saveBtn_BlendPage) saveBtn_BlendPage.addEventListener('click', function() { console.log('Saving current state on Blend Page'); });

    if(opacityTopBtn_BlendPage) opacityTopBtn_BlendPage.addEventListener('click', function() {
        currentOpacity_BlendPage.position = 'top';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('opacity-position-top');
    });
    if(opacityBottomBtn_BlendPage) opacityBottomBtn_BlendPage.addEventListener('click', function() {
        currentOpacity_BlendPage.position = 'bottom';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('opacity-position-bottom');
    });
    if(opacitySlider_BlendPage) {
        opacitySlider_BlendPage.addEventListener('input', function() {
            if(opacityValue_BlendPage) opacityValue_BlendPage.textContent = `Opacity: ${this.value}%`;
        });
        opacitySlider_BlendPage.addEventListener('change', function() {
            currentOpacity_BlendPage.value = this.value;
            addToHistory_BlendPage('opacity-value');
        });
    }

    if(blurTopBtn_BlendPage) blurTopBtn_BlendPage.addEventListener('click', function() {
        currentBlur_BlendPage.position = 'top';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('blur-position-top');
    });
    if(blurBottomBtn_BlendPage) blurBottomBtn_BlendPage.addEventListener('click', function() {
        currentBlur_BlendPage.position = 'bottom';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('blur-position-bottom');
    });
    if(blurSlider_BlendPage) {
        blurSlider_BlendPage.addEventListener('input', function() {
            if(blurValue_BlendPage) blurValue_BlendPage.textContent = `Blur: ${this.value}%`;
        });
        blurSlider_BlendPage.addEventListener('change', function() {
            currentBlur_BlendPage.value = this.value;
            addToHistory_BlendPage('blur-value');
        });
    }

    if(blendBtn_BlendPage) blendBtn_BlendPage.addEventListener('click', function() {
        currentHeight_BlendPage.mode = 'blend';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('height-mode-blend');
    });
    if(textBtn_BlendPage) textBtn_BlendPage.addEventListener('click', function() {
        currentHeight_BlendPage.mode = 'text';
        applyState_BlendPage({opacity: currentOpacity_BlendPage, blur: currentBlur_BlendPage, height: currentHeight_BlendPage});
        addToHistory_BlendPage('height-mode-text');
    });
    if(heightSlider_BlendPage) {
        heightSlider_BlendPage.addEventListener('input', function() {
            if(heightValue_BlendPage) heightValue_BlendPage.textContent = `Height: ${this.value}%`;
        });
        heightSlider_BlendPage.addEventListener('change', function() {
            currentHeight_BlendPage.value = this.value;
            addToHistory_BlendPage('height-value');
        });
    }

    if(resetBtn_BlendPage) {
        resetBtn_BlendPage.addEventListener('click', function() {
            const defaultState = {
                opacity: { position: 'bottom', value: 32 },
                blur: { position: 'top', value: 50 },
                height: { mode: 'blend', value: 50 }
            };
            applyState_BlendPage(defaultState); // This updates currentOpacity_BlendPage etc.
            addToHistory_BlendPage('reset');
        });
    }

    // Initial state application and history
    applyState_BlendPage({
        opacity: { position: 'bottom', value: 32 },
        blur: { position: 'top', value: 50 },
        height: { mode: 'blend', value: 50 }
    });
    addToHistory_BlendPage('init');
}

// Scripts for 9_publish.html
if (document.getElementById('scheduleBtn') && document.getElementById('postContent')) {

    const scheduleBtn_PublishPage = document.getElementById('scheduleBtn');
    const schedulePopup_PublishPage = document.getElementById('schedulePopup');
    const popupOverlay_PublishPage = document.getElementById('popupOverlay');
    const cancelBtn_PublishPage = document.getElementById('cancelBtn');
    const doneBtn_PublishPage = document.getElementById('doneBtn');
    const scheduleDate_PublishPage = document.getElementById('scheduleDate');
    const scheduleTime_PublishPage = document.getElementById('scheduleTime');
    const scheduleText_PublishPage = document.getElementById('scheduleText');
    const postContent_PublishPage = document.getElementById('postContent');
    const remainingCount_PublishPage = document.getElementById('remainingCount');

    const platformLimits_PublishPage = {
        'Twitter': 280, 'Facebook': 63206, 'Instagram': 2200,
        'LinkedIn': 3000, 'TikTok': 2200, 'Threads': 500, 'YouTube': 5000
    };
    let currentLimit_PublishPage = platformLimits_PublishPage['Twitter'];

    if (scheduleBtn_PublishPage && schedulePopup_PublishPage && popupOverlay_PublishPage && cancelBtn_PublishPage && doneBtn_PublishPage) {
        scheduleBtn_PublishPage.addEventListener('click', function() {
            schedulePopup_PublishPage.classList.add('show');
            popupOverlay_PublishPage.classList.add('show');
        });

        cancelBtn_PublishPage.addEventListener('click', function() {
            schedulePopup_PublishPage.classList.remove('show');
            popupOverlay_PublishPage.classList.remove('show');
        });

        doneBtn_PublishPage.addEventListener('click', function() {
            const date = scheduleDate_PublishPage ? scheduleDate_PublishPage.value : null;
            const time = scheduleTime_PublishPage ? scheduleTime_PublishPage.value : null;

            if (date && time && scheduleText_PublishPage) {
                const scheduleIconElement = scheduleBtn_PublishPage.querySelector('.material-icons');
                if (scheduleIconElement) scheduleIconElement.style.display = 'none';

                const dateObj = new Date(date + 'T' + time);
                const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

                scheduleText_PublishPage.textContent = formattedDate + ', ' + formattedTime;
                scheduleText_PublishPage.classList.remove('hidden');
                scheduleBtn_PublishPage.classList.add('px-4');
            }
            schedulePopup_PublishPage.classList.remove('show');
            popupOverlay_PublishPage.classList.remove('show');
        });

        popupOverlay_PublishPage.addEventListener('click', function() {
            schedulePopup_PublishPage.classList.remove('show');
            popupOverlay_PublishPage.classList.remove('show');
        });
    }

    if (postContent_PublishPage && remainingCount_PublishPage) {
        postContent_PublishPage.addEventListener('input', function() {
            const count = this.value.length;
            const remaining = currentLimit_PublishPage - count;
            remainingCount_PublishPage.textContent = remaining;

            remainingCount_PublishPage.classList.remove('counter-white', 'counter-red', 'counter-green');
            if (remaining === currentLimit_PublishPage && count === 0) remainingCount_PublishPage.classList.add('counter-white');
            else if (remaining < 0) remainingCount_PublishPage.classList.add('counter-red');
            else remainingCount_PublishPage.classList.add('counter-green');
        });
        postContent_PublishPage.dispatchEvent(new Event('input'));
    }

    const platformButtons_PublishPage = document.querySelectorAll('.grid > div[data-platform]');
    if (platformButtons_PublishPage.length > 0 && postContent_PublishPage && remainingCount_PublishPage) {
        platformButtons_PublishPage.forEach(button => {
            button.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                if (platform && platformLimits_PublishPage[platform]) {
                    currentLimit_PublishPage = platformLimits_PublishPage[platform];
                    postContent_PublishPage.dispatchEvent(new Event('input')); // Recalculate based on new limit

                    platformButtons_PublishPage.forEach(btn => btn.classList.remove('platform-selected'));
                    this.classList.add('platform-selected');
                }
            });
        });
        const defaultSelectedPlatform_PublishPage = document.querySelector('.grid > div[data-platform].platform-selected');
        if (defaultSelectedPlatform_PublishPage) {
             const platform = defaultSelectedPlatform_PublishPage.getAttribute('data-platform');
             if (platform && platformLimits_PublishPage[platform]) {
                 currentLimit_PublishPage = platformLimits_PublishPage[platform];
                 postContent_PublishPage.dispatchEvent(new Event('input'));
             }
        } else if (platformButtons_PublishPage.length > 0) { // If none selected by default, select Twitter (or first)
            const twitterButton = Array.from(platformButtons_PublishPage).find(btn => btn.dataset.platform === 'Twitter');
            if (twitterButton) {
                twitterButton.click(); // Simulate click to set it up
            } else {
                 platformButtons_PublishPage[0].click(); // Fallback to first
            }
        }
    }
}

// Scripts for 3_image_align.html
if (document.getElementById('align-bottom-sheet') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Align') {

    const alignPageNavItems = document.querySelectorAll('#align-section ~ .bottom-nav .nav-item'); // More specific selector
    const alignPageSections = document.querySelectorAll('.app-container > .section'); // Assuming sections are direct children of app-container

    alignPageNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            const targetSectionId = this.getAttribute('data-target');
            if (targetSectionId && document.getElementById(targetSectionId)) {
                e.preventDefault(); // Prevent default only if it's an in-page section toggle
                alignPageNavItems.forEach(navItem => navItem.classList.remove('active'));
                alignPageSections.forEach(section => section.classList.remove('active'));
                this.classList.add('active');
                document.getElementById(targetSectionId).classList.add('active');
            }
            // If not a data-target, let default link behavior occur
        });
    });

    const imageToggleBtn_AlignPage = document.getElementById('image-toggle-sheet');
    const imageBottomSheet_AlignPage = document.getElementById('image-bottom-sheet');
    const imageSheetIcon_AlignPage = document.getElementById('image-sheet-icon');

    if(imageToggleBtn_AlignPage && imageBottomSheet_AlignPage && imageSheetIcon_AlignPage) {
        let imageSheetExpanded_AlignPage = true;
        imageToggleBtn_AlignPage.addEventListener('click', function() {
            imageSheetExpanded_AlignPage = !imageSheetExpanded_AlignPage;
            if (imageSheetExpanded_AlignPage) {
                imageBottomSheet_AlignPage.style.transform = 'translateY(0)';
                imageSheetIcon_AlignPage.textContent = 'expand_less';
            } else {
                imageBottomSheet_AlignPage.style.transform = `translateY(calc(100% - ${imageBottomSheet_AlignPage.querySelector('.bottom-sheet-header').offsetHeight}px))`;
                imageSheetIcon_AlignPage.textContent = 'expand_more';
            }
        });
    }

    const alignToggleBtn_AlignPage = document.getElementById('align-toggle-sheet');
    const alignBottomSheet_AlignPage = document.getElementById('align-bottom-sheet');
    const alignSheetIcon_AlignPage = document.getElementById('align-sheet-icon');

    if(alignToggleBtn_AlignPage && alignBottomSheet_AlignPage && alignSheetIcon_AlignPage) {
        let alignSheetExpanded_AlignPage = true;
        alignToggleBtn_AlignPage.addEventListener('click', function() {
            alignSheetExpanded_AlignPage = !alignSheetExpanded_AlignPage;
            if (alignSheetExpanded_AlignPage) {
                alignBottomSheet_AlignPage.style.transform = 'translateY(0)';
                alignSheetIcon_AlignPage.textContent = 'expand_less';
            } else {
                alignBottomSheet_AlignPage.style.transform = `translateY(calc(100% - ${alignBottomSheet_AlignPage.querySelector('.bottom-sheet-header').offsetHeight}px))`;
                alignSheetIcon_AlignPage.textContent = 'expand_more';
            }
        });
    }

    const visibilityBtn_AlignPage = document.getElementById('visibility-toggle');
    const visibilityIcon_AlignPage = document.getElementById('visibility-icon');

    if (visibilityBtn_AlignPage && visibilityIcon_AlignPage) {
        let isVisible_AlignPage = false;
        visibilityBtn_AlignPage.addEventListener('click', function() {
            isVisible_AlignPage = !isVisible_AlignPage;
            visibilityIcon_AlignPage.textContent = isVisible_AlignPage ? 'visibility' : 'visibility_off';
        });
    }

    const imageNameInput_AlignPage = document.querySelector('#image-section .image-name-input');
    const previewContainers_AlignPage = document.querySelectorAll('.preview-container'); // Should target specific ones if needed
    const previewImages_AlignPage = document.querySelectorAll('.preview-image'); // Should target specific ones
    const bottomNav_AlignPage = document.querySelector('.bottom-nav');

    let isImageSelected_AlignPage = false;

    function selectImage_AlignPage() {
        isImageSelected_AlignPage = true;
        previewImages_AlignPage.forEach(image => image.classList.add('highlight-border'));
        if(imageNameInput_AlignPage) imageNameInput_AlignPage.focus();
    }

    function deselectImage_AlignPage() {
        isImageSelected_AlignPage = false;
        previewImages_AlignPage.forEach(image => image.classList.remove('highlight-border'));
    }

    if (imageNameInput_AlignPage) {
        imageNameInput_AlignPage.readOnly = true;
        imageNameInput_AlignPage.addEventListener('focus', function() {
            selectImage_AlignPage();
        });
        imageNameInput_AlignPage.addEventListener('blur', function() {
            this.readOnly = true;
            setTimeout(() => {
                const activeEl = document.activeElement;
                const isRelatedControl = (
                    activeEl === imageToggleBtn_AlignPage ||
                    activeEl === visibilityBtn_AlignPage ||
                    activeEl === alignToggleBtn_AlignPage ||
                    (activeEl && activeEl.closest('.image-controls')) ||
                    (bottomNav_AlignPage && bottomNav_AlignPage.contains(activeEl)) ||
                    (activeEl && Array.from(previewImages_AlignPage).includes(activeEl))
                );
                if (!isRelatedControl) deselectImage_AlignPage();
            }, 0);
        });
        imageNameInput_AlignPage.addEventListener('dblclick', function() {
            this.readOnly = false;
            this.focus();
            this.select();
        });
    }

    previewImages_AlignPage.forEach(image => {
        image.addEventListener('click', function(e) {
            e.preventDefault();
            selectImage_AlignPage();
        });
    });

    let isDragging_AlignPage = false;
    let startX_AlignPage, startY_AlignPage;
    let currentX_AlignPage = 0, currentY_AlignPage = 0;
    let minPanX_AlignPage = [0,0], maxPanX_AlignPage = [0,0];
    let minPanY_AlignPage = [0,0], maxPanY_AlignPage = [0,0];
    let activeDraggedImage_AlignPage = null;

    function getImageScaledDimensions_AlignPage(img, container) {
        if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
            return { scaledWidth: container.clientWidth, scaledHeight: container.clientHeight };
        }
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const containerAspect = container.clientWidth / container.clientHeight;
        let scaledWidth, scaledHeight;
        if (imgAspect > containerAspect) {
            scaledHeight = container.clientHeight;
            scaledWidth = scaledHeight * imgAspect;
        } else {
            scaledWidth = container.clientWidth;
            scaledHeight = scaledWidth / imgAspect;
        }
        return { scaledWidth, scaledHeight };
    }

    function updateAllPanLimits_AlignPage() {
        previewImages_AlignPage.forEach((previewImage, index) => {
            const previewContainer = previewImage.closest('.preview-container');
            if (!previewContainer) return;

            if (!previewImage.naturalWidth || !previewImage.naturalHeight || previewImage.naturalWidth === 0 || previewImage.naturalHeight === 0) {
                if (!previewImage._loadListenerAddedPanAlignPage) {
                    previewImage.addEventListener('load', updateAllPanLimits_AlignPage);
                    previewImage._loadListenerAddedPanAlignPage = true;
                }
                return;
            }
            if (previewImage._loadListenerAddedPanAlignPage) {
                previewImage.removeEventListener('load', updateAllPanLimits_AlignPage);
                previewImage._loadListenerAddedPanAlignPage = false;
            }

            const { scaledWidth, scaledHeight } = getImageScaledDimensions_AlignPage(previewImage, previewContainer);
            minPanX_AlignPage[index] = Math.min(0, previewContainer.clientWidth - scaledWidth);
            maxPanX_AlignPage[index] = 0;
            minPanY_AlignPage[index] = Math.min(0, previewContainer.clientHeight - scaledHeight);
            maxPanY_AlignPage[index] = 0;

            let imgCurrentX = 0, imgCurrentY = 0;
            const existingTransform = window.getComputedStyle(previewImage).transform;
            if (existingTransform && existingTransform !== 'none') {
                const matrix = existingTransform.match(/matrix.*\((.+)\)/);
                if (matrix && matrix[1]) {
                    const values = matrix[1].split(', ').map(Number);
                    imgCurrentX = values[4] || 0;
                    imgCurrentY = values[5] || 0;
                }
            }

            imgCurrentX = Math.max(minPanX_AlignPage[index], Math.min(maxPanX_AlignPage[index], imgCurrentX));
            imgCurrentY = Math.max(minPanY_AlignPage[index], Math.min(maxPanY_AlignPage[index], imgCurrentY));

            if (!isManualPositioning_AlignPage) { // Only reset to 0,0 if not in manual mode or apply alignment
                 // previewImage.style.transform = `translate(${imgCurrentX}px, ${imgCurrentY}px)`;
            } else {
                 previewImage.style.transform = `translate(calc(-50% + ${imgCurrentX}px), calc(-50% + ${imgCurrentY}px))`;
            }
        });
    }

    if (previewImages_AlignPage.length > 0) {
        previewImages_AlignPage.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) updateAllPanLimits_AlignPage();
            else {
                 img.addEventListener('load', updateAllPanLimits_AlignPage);
                 img._loadListenerAddedPanAlignPage = true;
            }
        });
        window.addEventListener('resize', updateAllPanLimits_AlignPage);
        window.addEventListener('orientationchange', updateAllPanLimits_AlignPage);
    }

    previewImages_AlignPage.forEach((previewImage) => {
        previewImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1 && isImageSelected_AlignPage) {
                e.preventDefault();
                activeDraggedImage_AlignPage = previewImage;
                isDragging_AlignPage = true;
                startX_AlignPage = e.touches[0].clientX;
                startY_AlignPage = e.touches[0].clientY;
                enableManualPositioning_AlignPage(previewImage);

                const transformMatrix = window.getComputedStyle(activeDraggedImage_AlignPage).transform;
                if (transformMatrix && transformMatrix !== 'none') {
                    const matrix = transformMatrix.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX_AlignPage = values[4] || 0;
                        currentY_AlignPage = values[5] || 0;
                    } else { currentX_AlignPage = 0; currentY_AlignPage = 0; }
                } else { currentX_AlignPage = 0; currentY_AlignPage = 0; }
            } else if (e.touches.length === 1) {
                e.preventDefault();
                selectImage_AlignPage();
            }
        }, { passive: false });
    });

    document.addEventListener('touchmove', (e) => {
        if (isDragging_AlignPage && activeDraggedImage_AlignPage && e.touches.length === 1 && isManualPositioning_AlignPage && isImageSelected_AlignPage) {
            e.preventDefault();
            const deltaX = e.touches[0].clientX - startX_AlignPage;
            const deltaY = e.touches[0].clientY - startY_AlignPage;

            let newX = currentX_AlignPage + deltaX;
            let newY = currentY_AlignPage + deltaY;

            let activeImageIndex = Array.from(previewImages_AlignPage).indexOf(activeDraggedImage_AlignPage);
            if(activeImageIndex === -1) activeImageIndex = 0;

            newX = Math.max(minPanX_AlignPage[activeImageIndex], Math.min(maxPanX_AlignPage[activeImageIndex], newX));
            newY = Math.max(minPanY_AlignPage[activeImageIndex], Math.min(maxPanY_AlignPage[activeImageIndex], newY));

            activeDraggedImage_AlignPage.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        if (isDragging_AlignPage) {
            if (activeDraggedImage_AlignPage) {
                 const finalTransform = window.getComputedStyle(activeDraggedImage_AlignPage).transform;
                if (finalTransform && finalTransform !== 'none') {
                    const matrix = finalTransform.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        // Extract translation values relative to the centered -50%, -50%
                        // This requires knowing the container size or parsing the calc() which is complex.
                        // Simpler: store the raw delta and apply it.
                        // For now, we'll just update currentX/Y with the full new translation values
                        // This might need refinement if base transform is not just translate(0,0)
                        currentX_AlignPage = values[4];
                        currentY_AlignPage = values[5];
                    }
                }
            }
            isDragging_AlignPage = false;
            activeDraggedImage_AlignPage = null;
        }
    });

    let isMouseDown_AlignPage = false;
    let mouseStartX_AlignPage, mouseStartY_AlignPage;
    // currentX_AlignPage, currentY_AlignPage are used for mouse drag too

    previewImages_AlignPage.forEach((previewImage) => {
        previewImage.addEventListener('mousedown', (e) => {
            if (isImageSelected_AlignPage) {
                e.preventDefault();
                activeDraggedImage_AlignPage = previewImage;
                isMouseDown_AlignPage = true;
                mouseStartX_AlignPage = e.clientX;
                mouseStartY_AlignPage = e.clientY;
                enableManualPositioning_AlignPage(previewImage);

                const transformMatrix = window.getComputedStyle(activeDraggedImage_AlignPage).transform;
                 if (transformMatrix && transformMatrix !== 'none') {
                    const matrix = transformMatrix.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX_AlignPage = values[4] || 0;
                        currentY_AlignPage = values[5] || 0;
                    } else { currentX_AlignPage = 0; currentY_AlignPage = 0;}
                } else { currentX_AlignPage = 0; currentY_AlignPage = 0;}
            }
        });
    });

    document.addEventListener('mousemove', (e) => {
        if (isMouseDown_AlignPage && activeDraggedImage_AlignPage && isManualPositioning_AlignPage && isImageSelected_AlignPage) {
            e.preventDefault();
            const deltaX = e.clientX - mouseStartX_AlignPage;
            const deltaY = e.clientY - mouseStartY_AlignPage;
            let newX = currentX_AlignPage + deltaX;
            let newY = currentY_AlignPage + deltaY;

            let activeImageIndex = Array.from(previewImages_AlignPage).indexOf(activeDraggedImage_AlignPage);
            if(activeImageIndex === -1) activeImageIndex = 0;

            newX = Math.max(minPanX_AlignPage[activeImageIndex], Math.min(maxPanX_AlignPage[activeImageIndex], newX));
            newY = Math.max(minPanY_AlignPage[activeImageIndex], Math.min(maxPanY_AlignPage[activeImageIndex], newY));
            activeDraggedImage_AlignPage.style.transform = `translate(calc(-50% + ${newX}px), calc(-50% + ${newY}px))`;
        }
    });

    document.addEventListener('mouseup', () => {
         if (isMouseDown_AlignPage) {
            if (activeDraggedImage_AlignPage) {
                const finalTransform = window.getComputedStyle(activeDraggedImage_AlignPage).transform;
                if (finalTransform && finalTransform !== 'none') {
                    const matrix = finalTransform.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX_AlignPage = values[4];
                        currentY_AlignPage = values[5];
                    }
                }
            }
            isMouseDown_AlignPage = false;
            activeDraggedImage_AlignPage = null;
        }
    });

    const alignTabs_AlignPage = document.querySelectorAll('#align-bottom-sheet .align-tab');
    const alignContents_AlignPage = document.querySelectorAll('#align-bottom-sheet .align-content');

    alignTabs_AlignPage.forEach(tab => {
        tab.addEventListener('click', function() {
            alignTabs_AlignPage.forEach(t => t.classList.remove('active'));
            alignContents_AlignPage.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('data-target');
            if(document.getElementById(target)) {
                document.getElementById(target).classList.add('active');
            }
        });
    });

    let currentHAlign_AlignPage = 'center';
    let currentVAlign_AlignPage = 'middle';
    let isManualPositioning_AlignPage = false;

    function applyAlignment_AlignPage() {
        isManualPositioning_AlignPage = false;
        previewImages_AlignPage.forEach(previewImage => {
            previewImage.style.width = '70%';
            previewImage.style.height = '70%';
            previewImage.style.position = 'absolute';

            let transformValue = '';
            switch(currentHAlign_AlignPage) {
                case 'left': previewImage.style.left = '0'; previewImage.style.right = 'auto'; transformValue = ''; break;
                case 'center': previewImage.style.left = '50%'; previewImage.style.right = 'auto'; transformValue = 'translateX(-50%)'; break;
                case 'right': previewImage.style.left = 'auto'; previewImage.style.right = '0'; transformValue = ''; break;
            }
            switch(currentVAlign_AlignPage) {
                case 'top': previewImage.style.top = '0'; previewImage.style.bottom = 'auto'; break;
                case 'middle': previewImage.style.top = '50%'; previewImage.style.bottom = 'auto'; transformValue += (transformValue ? ' ' : '') + 'translateY(-50%)'; break;
                case 'bottom': previewImage.style.top = 'auto'; previewImage.style.bottom = '0'; break;
            }
            previewImage.style.transform = transformValue.trim();
        });
        currentX_AlignPage = 0; currentY_AlignPage = 0;
    }

    function enableManualPositioning_AlignPage(targetImage) {
        if (!isManualPositioning_AlignPage) {
            isManualPositioning_AlignPage = true;
            hAlignBtns_AlignPage.forEach(b => b.classList.remove('active'));
            vAlignBtns_AlignPage.forEach(b => b.classList.remove('active'));

            const style = window.getComputedStyle(targetImage);
            const matrix = new DOMMatrixReadOnly(style.transform);
            currentX_AlignPage = matrix.m41;
            currentY_AlignPage = matrix.m42;
        }
    }

    const hAlignBtns_AlignPage = document.querySelectorAll('#align-bottom-sheet .h-align-btn');
    hAlignBtns_AlignPage.forEach(btn => {
        btn.addEventListener('click', function() {
            hAlignBtns_AlignPage.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentHAlign_AlignPage = this.getAttribute('data-align');
            applyAlignment_AlignPage();
        });
    });

    const vAlignBtns_AlignPage = document.querySelectorAll('#align-bottom-sheet .v-align-btn');
    vAlignBtns_AlignPage.forEach(btn => {
        btn.addEventListener('click', function() {
            vAlignBtns_AlignPage.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentVAlign_AlignPage = this.getAttribute('data-align');
            applyAlignment_AlignPage();
        });
    });

    const initialActiveSection_AlignPage = document.querySelector('.nav-item.active[data-target]');
    if (initialActiveSection_AlignPage) {
        const target = initialActiveSection_AlignPage.getAttribute('data-target');
        if (target && document.getElementById(target)) {
            document.getElementById(target).classList.add('active');
        }
    } else if (document.getElementById('align-section')) {
         document.getElementById('align-section').classList.add('active');
         const alignNavItem = document.querySelector('.nav-item[data-target="align-section"]');
         if(alignNavItem) alignNavItem.classList.add('active');
    }

    const initialHAlign_AlignPage = document.querySelector('#align-bottom-sheet .h-align-btn[data-align="center"]');
    const initialVAlign_AlignPage = document.querySelector('#align-bottom-sheet .v-align-btn[data-align="middle"]');
    if(initialHAlign_AlignPage) initialHAlign_AlignPage.classList.add('active');
    if(initialVAlign_AlignPage) initialVAlign_AlignPage.classList.add('active');
    applyAlignment_AlignPage();
}


// Scripts for 4_platform.html
if (document.querySelector('.platform-selector') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Platform') {

    const platformItems_PlatformPage = document.querySelectorAll('.platform-item');
    const previewContainer_PlatformPage = document.getElementById('preview-container');
    const platformIcons_PlatformPage = document.querySelectorAll('.platform-icon');
    const platformButtons_PlatformPage = document.querySelectorAll('.platform-icon-btn');

    function updatePreview_PlatformPage(platform, ratio, name) {
        if (!previewContainer_PlatformPage) return;
        previewContainer_PlatformPage.className = `w-full bg-[#2c3135] rounded-lg overflow-hidden border border-[#2c3135]`;

        let aspectRatioText = "";
        if (ratio === "1.91/1") aspectRatioText = "(1.91:1)";
        else if (ratio === "1/1") aspectRatioText = "(1:1)";
        else if (ratio === "16/9") aspectRatioText = "(16:9)";
        else if (ratio === "9/16") aspectRatioText = "(9:16)";

        previewContainer_PlatformPage.innerHTML = `
            <div class="w-full h-full bg-[#2c3135] flex items-center justify-center" style="aspect-ratio: ${ratio}">
                <span class="text-[#9cabba] text-sm">${name} Preview ${aspectRatioText}</span>
            </div>
        `;
    }

    const initialActivePlatform_PlatformPage = document.querySelector('.platform-item .platform-icon-btn.active');
    if (initialActivePlatform_PlatformPage) {
        const parentItem = initialActivePlatform_PlatformPage.closest('.platform-item');
        updatePreview_PlatformPage(parentItem.dataset.platform, parentItem.dataset.ratio, parentItem.dataset.name);
    } else if (platformItems_PlatformPage.length > 0) {
        const firstPlatform = platformItems_PlatformPage[0];
         firstPlatform.querySelector('.platform-icon-btn').classList.add('active');
         firstPlatform.querySelector('.platform-icon').classList.add('active'); // Assuming .platform-icon also needs 'active'
         const firstLabel = firstPlatform.querySelector('.text-xs');
         if(firstLabel) firstLabel.classList.replace('text-[#9cabba]', 'text-[#dce8f3]');
        updatePreview_PlatformPage(firstPlatform.dataset.platform, firstPlatform.dataset.ratio, firstPlatform.dataset.name);
    }


    platformItems_PlatformPage.forEach(item => {
        const button = item.querySelector('.platform-icon-btn');
        const iconS = item.querySelector('.platform-icon');
        const label = item.querySelector('.text-xs');
        const platform = item.dataset.platform;
        const ratio = item.dataset.ratio;
        const name = item.dataset.name;

        button.addEventListener('click', () => {
            platformButtons_PlatformPage.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            platformIcons_PlatformPage.forEach(iconEl => iconEl.classList.remove('active'));
            if(iconS) iconS.classList.add('active');

            document.querySelectorAll('.platform-item .text-xs').forEach(lbl => {
                lbl.classList.remove('text-[#dce8f3]'); // Remove accent color from all
                lbl.classList.add('text-[#9cabba]'); // Set to default secondary color
            });
            if(label) {
                label.classList.remove('text-[#9cabba]');
                label.classList.add('text-[#dce8f3]'); // Set active label to accent color
            }

            updatePreview_PlatformPage(platform, ratio, name);
        });
    });

    const toggleBtn_PlatformPage = document.getElementById('toggle-sheet');
    const bottomSheet_PlatformPage = document.querySelector('#platform-section .bottom-sheet'); // Be specific if multiple sheets
    const sheetIcon_PlatformPage = document.getElementById('sheet-icon');

    if (toggleBtn_PlatformPage && bottomSheet_PlatformPage && sheetIcon_PlatformPage) {
        let isExpanded_PlatformPage = true;
        toggleBtn_PlatformPage.addEventListener('click', function() {
            isExpanded_PlatformPage = !isExpanded_PlatformPage;
            bottomSheet_PlatformPage.classList.toggle('collapsed');
            sheetIcon_PlatformPage.textContent = isExpanded_PlatformPage ? 'expand_less' : 'expand_more';
        });
    }
}

// Script for 1_image-import.html
if (document.getElementById('searchButton') && document.getElementById('searchInput') && document.getElementById('imageResults')) {
    document.getElementById('searchButton').addEventListener('click', function() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput.value.trim() !== '') {
            document.getElementById('imageResults').classList.remove('hidden');
        }
    });

    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (this.value.trim() !== '') {
                document.getElementById('imageResults').classList.remove('hidden');
            }
        }
    });
}

// Script for 2_image.html (and potentially adaptable for 3_image_align.html with modifications)
// Ensure this runs only on 2_image.html or similar pages with these specific elements
// A more robust check might involve a body ID or a unique element specific to this page.
// For now, checking for 'toggle-sheet' and the active nav item.
if (document.getElementById('toggle-sheet') && document.querySelector('.nav-item.active .nav-label') && document.querySelector('.nav-item.active .nav-label').textContent === 'Image') {

    // Viewport height (ensure this is defined once globally if used by multiple pages)
    // function setViewportHeight() { ... } // Assumed global or defined elsewhere if needed by other pages too

    const imagePageToggleBtn = document.getElementById('toggle-sheet'); // Specific to image page's sheet
    const imagePageBottomSheet = document.getElementById('bottom-sheet'); // This ID is generic, ensure it's the correct one for this page
    const imagePageSheetIcon = document.getElementById('sheet-icon');

    if (imagePageToggleBtn && imagePageBottomSheet && imagePageSheetIcon) {
        let isExpanded = true; // Assuming it starts expanded
        imagePageToggleBtn.addEventListener('click', function() {
            isExpanded = !isExpanded;
            if (isExpanded) {
                imagePageBottomSheet.style.transform = 'translateY(0)';
                imagePageSheetIcon.textContent = 'expand_less';
            } else {
                // Adjust based on actual header height of the sheet
                imagePageBottomSheet.style.transform = `translateY(calc(100% - ${imagePageBottomSheet.querySelector('.bottom-sheet-header').offsetHeight}px))`;
                imagePageSheetIcon.textContent = 'expand_more';
            }
        });
    }

    const imagePageVisibilityBtn = document.getElementById('visibility-toggle');
    const imagePageVisibilityIcon = document.getElementById('visibility-icon');

    if (imagePageVisibilityBtn && imagePageVisibilityIcon) {
        let isVisible = false; // Default to off, assuming icon starts as 'visibility_off'
        // Could read initial state from class or data attribute if needed
        imagePageVisibilityBtn.addEventListener('click', function() {
            isVisible = !isVisible;
            imagePageVisibilityIcon.textContent = isVisible ? 'visibility' : 'visibility_off';
            // Add logic here to actually hide/show the image layer if required
        });
    }

    const imageNameInput = document.querySelector('.image-name-input');
    const previewContainer = document.querySelector('.preview-container');
    const previewImage = document.querySelector('.preview-image');
    const bottomNav = document.querySelector('.bottom-nav'); // Used for blur logic

    if (imageNameInput && previewContainer && previewImage && bottomNav) {
        imageNameInput.readOnly = true;

        imageNameInput.addEventListener('focus', function() {
            previewContainer.classList.add('highlight-border');
        });

        imageNameInput.addEventListener('blur', function() {
            this.readOnly = true; // Always set to readonly on blur
            // Use a timeout to allow the focus to shift before checking activeElement
            setTimeout(() => {
                const activeEl = document.activeElement;
                // Check if the new active element is part of the controls that should keep the highlight
                const isRelatedControl = (
                    activeEl === imagePageToggleBtn ||
                    activeEl === imagePageVisibilityBtn ||
                    (activeEl && activeEl.closest('.image-controls')) || // Any button within image-controls
                    (bottomNav && bottomNav.contains(activeEl)) // Any part of the main bottom navigation
                );

                if (!isRelatedControl) {
                    previewContainer.classList.remove('highlight-border');
                }
            }, 0);
        });

        imageNameInput.addEventListener('dblclick', function() {
            this.readOnly = false;
            this.focus();
            this.select();
        });

        // Image Panning Logic
        let isDragging = false;
        let startX, startY;
        let currentX = 0, currentY = 0; // Store the current translation of the image
        let minPanX = 0, maxPanX = 0;
        let minPanY = 0, maxPanY = 0;

        function getImageScaledDimensions(img, container) {
            if (!img.naturalWidth || !img.naturalHeight || img.naturalWidth === 0 || img.naturalHeight === 0) {
                // Fallback or wait for image to load
                return { scaledWidth: container.clientWidth, scaledHeight: container.clientHeight };
            }
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const containerAspect = container.clientWidth / container.clientHeight;
            let scaledWidth, scaledHeight;

            if (imgAspect > containerAspect) { // Image is wider than container (letterboxed if fit, pillarboxed if cover and too tall)
                scaledHeight = container.clientHeight;
                scaledWidth = scaledHeight * imgAspect;
            } else { // Image is taller or same aspect as container
                scaledWidth = container.clientWidth;
                scaledHeight = scaledWidth / imgAspect;
            }
            return { scaledWidth, scaledHeight };
        }

        function updatePanLimits() {
            if (!previewImage.naturalWidth || !previewImage.naturalHeight || previewImage.naturalWidth === 0 || previewImage.naturalHeight === 0) {
                if (!previewImage._loadListenerAddedPan) { // Use a unique flag
                    previewImage.addEventListener('load', updatePanLimits);
                    previewImage._loadListenerAddedPan = true;
                }
                return;
            }
            if (previewImage._loadListenerAddedPan) {
                previewImage.removeEventListener('load', updatePanLimits);
                previewImage._loadListenerAddedPan = false;
            }

            const { scaledWidth, scaledHeight } = getImageScaledDimensions(previewImage, previewContainer);

            // Image can only be panned if it's larger than the container
            minPanX = Math.min(0, previewContainer.clientWidth - scaledWidth);
            maxPanX = 0; // Image's left edge cannot go past container's left edge

            minPanY = Math.min(0, previewContainer.clientHeight - scaledHeight);
            maxPanY = 0; // Image's top edge cannot go past container's top edge

            // Clamp current position to new limits
            currentX = Math.max(minPanX, Math.min(maxPanX, currentX));
            currentY = Math.max(minPanY, Math.min(maxPanY, currentY));
            previewImage.style.transform = `translate(${currentX}px, ${currentY}px)`;
        }

        // Call updatePanLimits after image is loaded or if already loaded
        if (previewImage.complete && previewImage.naturalHeight !== 0) {
            updatePanLimits();
        } else {
            previewImage.addEventListener('load', updatePanLimits);
            previewImage._loadListenerAddedPan = true; // Set flag
        }
        window.addEventListener('resize', updatePanLimits);
        window.addEventListener('orientationchange', updatePanLimits);


        previewImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) { // Single touch for panning
                e.preventDefault(); // Prevent page scroll
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                // Get current translation from style (it's already set by updatePanLimits or previous drags)
                const existingTransform = window.getComputedStyle(previewImage).transform;
                if (existingTransform && existingTransform !== 'none') {
                    const matrix = existingTransform.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX = values[4]; // translateX
                        currentY = values[5]; // translateY
                    } else { currentX = 0; currentY = 0;}
                } else { currentX = 0; currentY = 0; }
            }
        }, { passive: false });

        previewImage.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                e.preventDefault();
                const deltaX = e.touches[0].clientX - startX;
                const deltaY = e.touches[0].clientY - startY;

                let newX = currentX + deltaX;
                let newY = currentY + deltaY;

                // Clamp to calculated limits
                newX = Math.max(minPanX, Math.min(maxPanX, newX));
                newY = Math.max(minPanY, Math.min(maxPanY, newY));

                previewImage.style.transform = `translate(${newX}px, ${newY}px)`;
            }
        }, { passive: false });

        previewImage.addEventListener('touchend', (e) => {
            if (isDragging) {
                // Update currentX and currentY based on the final position after drag
                const finalTransform = window.getComputedStyle(previewImage).transform;
                 if (finalTransform && finalTransform !== 'none') {
                    const matrix = finalTransform.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX = values[4];
                        currentY = values[5];
                    }
                }
                isDragging = false;
            }
        });

        // Mouse events for desktop
        let isMouseDown = false;
        // mouseCurrentX, mouseCurrentY already defined if needed from touch section, or redefine if separate logic
        previewImage.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isMouseDown = true;
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
            const existingTransform = window.getComputedStyle(previewImage).transform;
            if (existingTransform && existingTransform !== 'none') {
                const matrix = existingTransform.match(/matrix.*\((.+)\)/);
                if (matrix && matrix[1]) {
                    const values = matrix[1].split(', ').map(Number);
                    currentX = values[4];
                    currentY = values[5];
                } else { currentX = 0; currentY = 0;}
            } else { currentX = 0; currentY = 0; }
        });

        document.addEventListener('mousemove', (e) => { // Listen on document for mouseup outside image
            if (isMouseDown) {
                e.preventDefault();
                const deltaX = e.clientX - mouseStartX;
                const deltaY = e.clientY - mouseStartY;
                let newX = currentX + deltaX;
                let newY = currentY + deltaY;

                newX = Math.max(minPanX, Math.min(maxPanX, newX));
                newY = Math.max(minPanY, Math.min(maxPanY, newY));
                previewImage.style.transform = `translate(${newX}px, ${newY}px)`;
            }
        });

        document.addEventListener('mouseup', (e) => {
            if (isMouseDown) {
                const finalTransform = window.getComputedStyle(previewImage).transform;
                 if (finalTransform && finalTransform !== 'none') {
                    const matrix = finalTransform.match(/matrix.*\((.+)\)/);
                    if (matrix && matrix[1]) {
                        const values = matrix[1].split(', ').map(Number);
                        currentX = values[4];
                        currentY = values[5];
                    }
                }
                isMouseDown = false;
            }
        });
    }
}
