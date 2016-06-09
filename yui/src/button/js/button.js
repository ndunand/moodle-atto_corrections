// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor integration version file.
 *
 * @package    atto_corrections
 * @copyright  2014 Université de Lausanne
 * @author     Nicolas Dunand <nicolas.dunand@unil.ch>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * @module moodle-atto_corrections-button
 */

/**
 * Atto corrections tool.
 *
 * @namespace M.atto_corrections
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

var COMPONENTNAME = 'atto_corrections',
    CSS = {
        FORM : 'atto_formcorrections',
        SPAN : 'atto_corrections',
        CORRSPAN : 'atto_corrections_correction',
        CORRTEXT : 'atto_corrections_comment',
        BASECLASS : 'atto_corrections_',
        SELECT : 'atto_corrections_select',
        TEXTAREA : 'atto_corrections_textarea',
        FULLTEXT : 'atto_corrections_fulltext'
    },
    SELECTORS = {
        SPAN: '.' + CSS.SPAN,
        SELECT: '.' + CSS.SELECT,
        TEXTAREA: '.' + CSS.TEXTAREA
    },
    TEMPLATES = {
        DIALOGUE : '' +
            '<form class="atto_form {{CSS.FORM}}">' +
                '<label for="{{elementid}}_atto_corrections_corrtype">{{get_string "corrtype" component}}</label>' +
                '<select id="{{elementid}}_atto_corrections_corrtype" class="{{CSS.SELECT}}">' +
                    '{{#each corrtypes}}' +
                    '<option value="{{{abbr}}}">{{{descr}}}</option>' +
                    '{{/each}}' +
                '</select>' +
                '<label for="{{elementid}}_atto_corrections_corrtext">{{get_string "corrtext" component}}</label>' +
                '<textarea class="fullwidth {{CSS.TEXTAREA}}" type="text" id="{{elementid}}_atto_corrections_corrtext">' +
                '</textarea>' +
                '<div class="mdl-align">' +
                    '<br/>' +
                    '<button class="submit" type="submit">{{get_string "addcomment" component}}</button>' +
                '</div>' +
            '</form>',
        FULLTEXT : '' +
            '<div class="{{CSS.FULLTEXT}}">{{fulltext}}</div>'
    };

Y.namespace('M.atto_corrections').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {

    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * A reference to the dialogue content.
     *
     * @property _content
     * @type Node
     * @private
     */
    _content: null,

    /**
     * A reference to the isoncorr property.
     *
     * @property _isoncorr
     * @type bool
     * @private
     */
    _isoncorr: null,

    initializer: function() {





tttt = this; // TODO : remove





        // add correction mark
        var items = [],
            itemid = 0;
        Y.Array.each(this.get('corrtypes'), function(corrtype) {
            items.push({
                text: corrtype.descr,
                callbackArgs: new Array(itemid, corrtype.descr)
            });
            itemid++;
        });
        this.addToolbarMenu({
            icon: M.util.image_url('icon1', COMPONENTNAME),
            globalItemConfig: {
                callback: this._addCorrection
            },
            items: items,
            buttonName: 'corrections1',
            title: 'addmark'
        });

        // remove correction mark
        this.addButton({
            icon: M.util.image_url('icon2', COMPONENTNAME),
            callback: this._removeCorrection,
            tags: SELECTORS.SPAN,
            buttonName: 'corrections2',
            title: 'removemark'
        });

        // display full text with marks
        this.addButton({
            icon: M.util.image_url('icon3', COMPONENTNAME),
            callback: this._displayFulltext,
            buttonName: 'corrections3',
            title: 'displayfulltext'
        });

        // Enable the event listener once everything has loaded.
        this.get('host').on('pluginsloaded', function() {
            this.get('host').on('atto:selectionchanged', this._updateButtonsStates, this);
        }, this);

        this._updateButtonsStates();

    },

    /**
     * Add a correction on the current selection
     *
     * @method _addCorrection
     * @param {EventFacade} e
     * @private
     */
    _addCorrection: function(e, args) {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false || this._currentSelection.collapsed) {
            return;
        }
        var selectednode = this.get('host').getSelectionParentNode();
        // Note this is a document fragment and YUI doesn't like them.
        if (!selectednode) {
            return;
        }
        this._displayDialogue(args, selectednode);
//        console.log(args);
    },

    /**
     * Remove a correction around the cursor
     *
     * @method _removeCorrection
     * @param {EventFacade} e
     * @private
     */
    _removeCorrection: function(e) {
        e.preventDefault();
        // get the selection grandparent (because the parent is only the text node)
        var el = this.get('host').getSelectionParentNode().parentNode;
        if (el.nodeName.toLowerCase() === 'span' && el.className.indexOf(CSS.SPAN) !== -1) {
            Y.Node(el).one('.' + CSS.CORRSPAN).remove();
            el.parentNode.replaceChild(document.createTextNode(el.innerHTML), el);
        }
    },

    /**
     * Display the full text with corrections
     *
     * @method _displayFulltext
     * @private
     */
    _displayFulltext: function() {
        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('fulltexttitle', COMPONENTNAME),
            focusAfterHide: true,
            width: 600
        });

        var template = Y.Handlebars.compile(TEMPLATES.FULLTEXT);

        var content = Y.Node.create(template({
            component: COMPONENTNAME,
            CSS: CSS,
            fulltext : new Y.Handlebars.SafeString(this.get('host').editor.getHTML())
        }));

        dialogue.set('bodyContent', content)
                .show();
    },

    /**
     * Display the corrections dialog
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function(args, selectednode) {

nnnn = selectednode;
        var ctype = false,
            ctext = false;

        if (this._isoncorr) {
            ctype = selectednode.parentNode.className.replace(CSS.SPAN + ' ' + CSS.BASECLASS, '').replace(' ', '');
            ctext = Y.Node(selectednode.parentNode).one('.atto_corrections_comment').getDOMNode().innerHTML;
        }

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('dialogtitle', COMPONENTNAME),
            focusAfterHide: true,
            focusOnShowSelector: SELECTORS.TEXTAREA // TODO : doesn't work!!!
        });

        // Set the dialogue content, and then show the dialogue.
        dialogue.set('bodyContent', this._getDialogueContent())
                .show();
        if (!this._isoncorr) {
           Y.one('.atto_form.' + CSS.FORM + ' select').set('selectedIndex', args[0]); // TODO correct DOM selector!
        }
        else {
           Y.one('.atto_form.' + CSS.FORM + ' select').set('selectedIndex', this.get('corrtypekeys').indexOf(ctype));
           Y.one('.atto_form.' + CSS.FORM + ' textarea').set('value', ctext);
        }
    },

    /**
     * Return the dialogue content for the tool, attaching any required
     * events.
     *
     * @method _getDialogueContent
     * @return {Node} The content to place in the dialogue.
     * @private
     */
    _getDialogueContent: function() {
        var template = Y.Handlebars.compile(TEMPLATES.DIALOGUE);

        this._content = Y.Node.create(template({
            component: COMPONENTNAME,
            elementid: this.get('host').get('elementid'),
            CSS: CSS,
            corrtypes: this.get('corrtypes')
        }));

        this._content.one('.submit').on('click', this._setCorrection, this);

        return this._content;
    },

    /**
     * Add or update a correction.
     *
     * @method setCorrection
     * @param {EventFacade} e
     * @private
     */
    _setCorrection: function(e) {
        e.preventDefault();
        this.getDialogue({
            focusAfterHide: this._currentSelection
        }).hide();

//        this._removeCorrection();

        var form = e.currentTarget.ancestor('.atto_form'),
            ctype = form.one(SELECTORS.SELECT).get('value'),
            ctext = form.one(SELECTORS.TEXTAREA).get('value'),
            host = this.get('host');
ffff = form;
        if (ctype !== '') {
            // restore original selection, in order to be able to work on it
//            return;
            host.setSelection(this._currentSelection);
            if (this._isoncorr) {
                // replace existing correction mark:
                //  - get the orignal node
                var ynode = Y.Node(host.getSelectionParentNode().parentNode);
                //  - insert the new comment
                ynode.one('.' + CSS.CORRTEXT).getDOMNode().innerHTML = ctext;
                //  - add correct class
                var newclass = CSS.SPAN + ' ' + CSS.BASECLASS + ctype;
                ynode.one('.' + CSS.CORRTEXT).getDOMNode().parentNode.parentNode.className = newclass;
                //  - add the correct <sup> mark
                ynode.one('sup').getDOMNode().innerHTML = ctype;
            }
            else {
                // new correction mark
                var uniqueclass = 'ts' + new Date().getTime();
                host.toggleInlineSelectionClass([CSS.SPAN]);
                host.toggleInlineSelectionClass([CSS.BASECLASS + ctype]);
                host.toggleInlineSelectionClass([uniqueclass]);
                var node0 = Y.Node.create('<span class="' + CSS.CORRSPAN + '"/>'),
                    node1 = Y.Node.create('<span class="' + CSS.CORRTEXT + '">' + ctext + '</span>'),
                    node2 = Y.Node.create('<sup title="' + ctext + '">' + ctype + '</sup>');
                Y.one('.' + uniqueclass).appendChild(node0);
                Y.one('.' + uniqueclass).removeClass(uniqueclass);
                node0.appendChild(node2.getDOMNode());
                node0.appendChild(node1.getDOMNode());
            }
            this.markUpdated();
        }
    },

    /**
     * Update the states of the buttons.
     *
     * @method _updateButtonsStates
     * @private
     */
    _updateButtonsStates: function() {
        var el = this.get('host').getSelectionParentNode().parentNode,
            sel = rangy.getSelection();

        if (!sel.rangeCount) {
            this.disableButtons('corrections1');
            this.disableButtons('corrections2');
            return;
        }

        var cs = sel.getRangeAt(0);

        this._isoncorr = el.nodeName.toLowerCase() === 'span' && el.className.indexOf(CSS.SPAN) !== -1;

        if (this._isoncorr) {
            this.enableButtons('corrections2');
        }
        else {
            this.disableButtons('corrections2');
        }
        if ((cs.collapsed && !this._isoncorr) || (!cs.collapsed && this._isoncorr)) {
            this.disableButtons('corrections1');
        }
        else {
            this.enableButtons('corrections1');
        }
    }


}, {
    ATTRS: {
        /**
         * The list of correction types to display.
         *
         * @attribute corrtypes
         * @type array
         * @default {}
         */
        corrtypes: {
            value: {}
        },

        /**
         * The list of correction types abbreviations to display.
         *
         * @attribute corrtypekeys
         * @type array
         * @default {}
         */
        corrtypekeys: {
            value: {}
        }
    }
});


