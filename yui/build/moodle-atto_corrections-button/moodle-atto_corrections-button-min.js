YUI.add("moodle-atto_corrections-button",function(u,t){var r="atto_corrections",h={FORM:"atto_formcorrections",SPAN:"atto_corrections",CORRSPAN:"atto_corrections_correction",CORRTEXT:"atto_corrections_comment",BASECLASS:"atto_corrections_",SELECT:"atto_corrections_select",TEXTAREA:"atto_corrections_textarea",FULLTEXT:"atto_corrections_fulltext"},_={SPAN:"."+h.SPAN,SELECT:"."+h.SELECT,TEXTAREA:"."+h.TEXTAREA},e='<form class="atto_form {{CSS.FORM}}"><label for="{{elementid}}_atto_corrections_corrtype">{{get_string "corrtype" component}}</label><select id="{{elementid}}_atto_corrections_corrtype" class="{{CSS.SELECT}}">{{#each corrtypes}}<option value="{{{abbr}}}">{{{descr}}}</option>{{/each}}</select><label for="{{elementid}}_atto_corrections_corrtext">{{get_string "corrtext" component}}</label><textarea class="fullwidth {{CSS.TEXTAREA}}" type="text" id="{{elementid}}_atto_corrections_corrtext"></textarea><div class="mdl-align"><br/><button class="submit" type="submit">{{get_string "addcomment" component}}</button></div></form>',n='<div class="{{CSS.FULLTEXT}}">{{fulltext}}</div>';u.namespace("M.atto_corrections").Button=u.Base.create("button",u.M.editor_atto.EditorPlugin,[],{_currentSelection:null,_content:null,_isoncorr:null,initializer:function(){if(!this.get("disabled")){var e=[],o=0;u.Array.each(this.get("corrtypes"),function(t){e.push({text:t.descr,callbackArgs:new Array(o,t.descr)}),o++}),this.addToolbarMenu({icon:"icon1",iconComponent:r,globalItemConfig:{callback:this._addCorrection},items:e,buttonName:"corrections1",title:"addmark"}),this.addButton({icon:"icon2",iconComponent:r,callback:this._removeCorrection,tags:_.SPAN,buttonName:"corrections2",title:"removemark"}),this.addButton({icon:"icon3",iconComponent:r,callback:this._displayFulltext,buttonName:"corrections3",title:"displayfulltext"}),this.get("host").on("pluginsloaded",function(){this.get("host").on("atto:selectionchanged",this._updateButtonsStates,this)},this),this._updateButtonsStates()}},_addCorrection:function(t,e){if(u.one(".atto_form."+h.FORM)&&u.one(".atto_form."+h.FORM).remove(),this._currentSelection=this.get("host").getSelection(),!1!==this._currentSelection&&!this._currentSelection.collapsed){var o=this.get("host").getSelectionParentNode();o&&this._displayDialogue(e,o)}},_removeCorrection:function(t){t.preventDefault();var e=this.get("host").getSelectionParentNode().parentNode;"span"===e.nodeName.toLowerCase()&&-1!==e.className.indexOf(h.SPAN)&&(u.Node(e).one("."+h.CORRSPAN).remove(),e.parentNode.replaceChild(document.createTextNode(e.innerHTML),e))},_displayFulltext:function(){var t=this.getDialogue({headerContent:M.util.get_string("fulltexttitle",r),focusAfterHide:!0,width:600}),e=u.Handlebars.compile(n),o=u.Node.create(e({component:r,CSS:h,fulltext:new u.Handlebars.SafeString(this.get("host").editor.getHTML())}));t.set("bodyContent",o).show()},_displayDialogue:function(t,e){var o=!1,n=!1;this._isoncorr&&(o=e.parentNode.className.replace(h.SPAN+" "+h.BASECLASS,"").replace(" ",""),n=u.Node(e.parentNode).one(".atto_corrections_comment").getDOMNode().innerHTML),this.getDialogue({headerContent:M.util.get_string("dialogtitle",r),focusAfterHide:!0,focusOnShowSelector:_.TEXTAREA}).set("bodyContent",this._getDialogueContent()).show(),this._isoncorr?(u.one(".atto_form."+h.FORM+" select").set("selectedIndex",this.get("corrtypekeys").indexOf(o)),u.one(".atto_form."+h.FORM+" textarea").set("value",n)):u.one(".atto_form."+h.FORM+" select").set("selectedIndex",t[0])},_getDialogueContent:function(){var t=u.Handlebars.compile(e);return this._content=u.Node.create(t({component:r,elementid:this.get("host").get("elementid"),CSS:h,corrtypes:this.get("corrtypes")})),this._content.one(".submit").on("click",this._setCorrection,this),this._content},_setCorrection:function(t){var e,o,n,r,i,s,a,c,l,d;t.preventDefault(),this.getDialogue({focusAfterHide:this._currentSelection}).hide(),o=(e=t.currentTarget.ancestor(".atto_form")).one(_.SELECT).get("value"),n=e.one(_.TEXTAREA).get("value"),r=this.get("host"),""!==o&&(r.setSelection(this._currentSelection),this._isoncorr?((i=u.Node(r.getSelectionParentNode().parentNode)).one("."+h.CORRTEXT).getDOMNode().innerHTML=n,s=h.SPAN+" "+h.BASECLASS+o,i.one("."+h.CORRTEXT).getDOMNode().parentNode.parentNode.className=s,i.one("sup").getDOMNode().innerHTML=o):(a="ts"+(new Date).getTime(),r.toggleInlineSelectionClass([h.SPAN]),r.toggleInlineSelectionClass([h.BASECLASS+o]),r.toggleInlineSelectionClass([a]),c=u.Node.create('<span class="'+h.CORRSPAN+'"/>'),l=u.Node.create('<span class="'+h.CORRTEXT+'">'+n+"</span>"),d=u.Node.create('<sup title="'+n+'">'+o+"</sup>"),u.one("."+a).appendChild(c),u.one("."+a).removeClass(a),c.appendChild(d.getDOMNode()),c.appendChild(l.getDOMNode())),this.markUpdated())},_updateButtonsStates:function(){var t,e=this.get("host").getSelectionParentNode().parentNode,o=window.rangy.getSelection();if(!o.rangeCount)return this.disableButtons("corrections1"),void this.disableButtons("corrections2");t=o.getRangeAt(0),this._isoncorr="span"===e.nodeName.toLowerCase()&&-1!==e.className.indexOf(h.SPAN),this._isoncorr?this.enableButtons("corrections2"):this.disableButtons("corrections2"),t.collapsed&&!this._isoncorr||!t.collapsed&&this._isoncorr?this.disableButtons("corrections1"):this.enableButtons("corrections1")}},{ATTRS:{disabled:{value:!1},corrtypes:{value:{}},corrtypekeys:{value:{}}}})},"@VERSION@",{requires:["moodle-editor_atto-plugin"]});