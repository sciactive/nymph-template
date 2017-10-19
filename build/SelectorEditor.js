/* src/SelectorEditor.html generated by Svelte v1.41.0 */
var SelectorEditor = (function(ValueEditor) { "use strict";
	ValueEditor = (ValueEditor && ValueEditor.__esModule) ? ValueEditor["default"] : ValueEditor;

	function remainingClauses(selector, supportedClauses) {
		return Object.keys(supportedClauses).filter((i) => !selector.hasOwnProperty(i));
	}

	function clausesKeysTypes(selector, supportedClauses) {
		return Object.keys(selector).filter((i) => i !== "type").map((key) => ({key, type: supportedClauses[key]}));
	}

	function data() {
  return {
    __newClause: "",
    supportedClauses: {
      "guid": {
        type: "int",
        vector: false,
      },
      "!guid": {
        type: "int",
        vector: false,
      },
      "tag": {
        type: "string",
        vector: false,
      },
      "!tag": {
        type: "string",
        vector: false,
      },
      "isset": {
        type: "string",
        vector: false,
      },
      "!isset": {
        type: "string",
        vector: false,
      },
      "data": {
        type: null,
        vector: true,
      },
      "!data": {
        type: null,
        vector: true,
      },
      "strict": {
        type: null,
        vector: true,
      },
      "!strict": {
        type: null,
        vector: true,
      },
      "array": {
        type: null,
        vector: true,
      },
      "!array": {
        type: null,
        vector: true,
      },
      "match": {
        type: "string",
        vector: true,
      },
      "!match": {
        type: "string",
        vector: true,
      },
      "pmatch": {
        type: "string",
        vector: true,
      },
      "!pmatch": {
        type: "string",
        vector: true,
      },
      "ipmatch": {
        type: "string",
        vector: true,
      },
      "!ipmatch": {
        type: "string",
        vector: true,
      },
      "like": {
        type: "string",
        vector: true,
      },
      "!like": {
        type: "string",
        vector: true,
      },
      "ilike": {
        type: "string",
        vector: true,
      },
      "!ilike": {
        type: "string",
        vector: true,
      },
      "gt": {
        type: "float",
        vector: true,
      },
      "!gt": {
        type: "float",
        vector: true,
      },
      "gte": {
        type: "float",
        vector: true,
      },
      "!gte": {
        type: "float",
        vector: true,
      },
      "lt": {
        type: "float",
        vector: true,
      },
      "!lt": {
        type: "float",
        vector: true,
      },
      "lte": {
        type: "float",
        vector: true,
      },
      "!lte": {
        type: "float",
        vector: true,
      },
      "ref": {
        type: "int",
        vector: true,
      },
      "!ref": {
        type: "int",
        vector: true,
      }
    },
    selector: {type: '&'}
  }
};

	var methods = {
  addClause () {
    const selector = this.get("selector");
    const newClause = this.get("__newClause");
    const supportedClauses = this.get("supportedClauses");

    if (newClause === "") {
      return;
    }

    if (!(newClause in selector)) {
      selector[newClause] = this.getDefaultValue(supportedClauses[newClause]);
    }

    this.set({
      selector,
      __newClause: ""
    });
  },

  removeClause (clause) {
    const selector = this.get("selector");
    delete selector[clause];
    this.set({selector});
  },

  addClauseEntry (clause) {
    const selector = this.get("selector");
    const supportedClauses = this.get("supportedClauses");

    if (clause in selector) {
      selector[clause].push(this.getDefaultValue(supportedClauses[clause])[0]);
    }

    this.set({
      selector
    });
  },

  removeClauseEntry (clause, index) {
    const selector = this.get("selector");

    if (clause in selector) {
      selector[clause].splice(index, 1);
    }

    this.set({
      selector
    });
  },

  getDefaultValue (typeObj) {
    switch (typeObj.type) {
      case "int":
        return typeObj.vector ? [["", 1]] : [1];
      case "float":
        return typeObj.vector ? [["", 0.1]] : [0.1];
      case "boolean":
        return typeObj.vector ? [["", true]] : [true];
      case "string":
      default:
        return typeObj.vector ? [["", ""]] : [""];
    }
  }
};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-2333839390", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-2333839390-style';
		style.textContent = "[svelte-2333839390].selector,[svelte-2333839390] .selector{padding-left:2em;display:flex;flex-direction:column}[svelte-2333839390].selector .clause,[svelte-2333839390] .selector .clause,[svelte-2333839390].selector .clause .clause-entry,[svelte-2333839390] .selector .clause .clause-entry{padding:.5em 2em;display:flex;flex-direction:row}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div, text, div_1, div_2, text_2, div_3, select, option, option_1, option_2, option_3, select_updating = false, text_8, div_4, button, text_12, text_13;

		var if_block = (state.remainingClauses.length) && create_if_block(state, component);

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			var state = component.get();
			state.selector.type = selectedOption && selectedOption.__value;
			component.set({ selector: state.selector });
			select_updating = false;
		}

		function click_handler(event) {
			component.fire('remove');
		}

		var clausesKeysTypes_1 = state.clausesKeysTypes;

		var each_blocks = [];

		for (var i = 0; i < clausesKeysTypes_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(state, clausesKeysTypes_1, clausesKeysTypes_1[i], i, component);
		}

		return {
			c: function create() {
				div = createElement("div");
				if (if_block) if_block.c();
				text = createText("\n  {\n  ");
				div_1 = createElement("div");
				div_2 = createElement("div");
				div_2.textContent = "type:";
				text_2 = createText("\n    ");
				div_3 = createElement("div");
				select = createElement("select");
				option = createElement("option");
				option.textContent = "& (All values in the selector must be true.)";
				option_1 = createElement("option");
				option_1.textContent = "| (At least one value in the selector must be true.)";
				option_2 = createElement("option");
				option_2.textContent = "!& (All values in the selector must be false.)";
				option_3 = createElement("option");
				option_3.textContent = "!| (At least one value in the selector must be false.)";
				text_8 = createText("\n    ");
				div_4 = createElement("div");
				button = createElement("button");
				button.textContent = "Remove Entire Selector";
				text_12 = createText("\n  ");

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				text_13 = createText("\n  }");
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(div);
				div.className = "selector";
				div_1.className = "clause";
				div_2.className = "name";
				div_3.className = "value";
				option.__value = "&";
				option.value = option.__value;
				option_1.__value = "|";
				option_1.value = option_1.__value;
				option_2.__value = "!&";
				option_2.value = option_2.__value;
				option_3.__value = "!|";
				option_3.value = option_3.__value;

				if (!('selector' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);
				div_4.className = "remove";
				addListener(button, "click", click_handler);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				if (if_block) if_block.m(div, null);
				appendNode(text, div);
				appendNode(div_1, div);
				appendNode(div_2, div_1);
				appendNode(text_2, div_1);
				appendNode(div_3, div_1);
				appendNode(select, div_3);
				appendNode(option, select);
				appendNode(option_1, select);
				appendNode(option_2, select);
				appendNode(option_3, select);

				var value = state.selector.type;
				for (var i = 0; i < select.options.length; i += 1) {
					var option_4 = select.options[i];

					if (option_4.__value === value) {
						option_4.selected = true;
						break;
					}
				}

				appendNode(text_8, div_1);
				appendNode(div_4, div_1);
				appendNode(button, div_4);
				appendNode(text_12, div);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(div, null);
				}

				appendNode(text_13, div);
			},

			p: function update(changed, state) {
				if (state.remainingClauses.length) {
					if (if_block) {
						if_block.p(changed, state);
					} else {
						if_block = create_if_block(state, component);
						if_block.c();
						if_block.m(div, text);
					}
				} else if (if_block) {
					if_block.u();
					if_block.d();
					if_block = null;
				}

				if (!select_updating) {
					var value = state.selector.type;
					for (var i = 0; i < select.options.length; i += 1) {
						var option_4 = select.options[i];

						if (option_4.__value === value) {
							option_4.selected = true;
							break;
						}
					}
				}

				var clausesKeysTypes_1 = state.clausesKeysTypes;

				if (changed.clausesKeysTypes || changed.selector) {
					for (var i = 0; i < clausesKeysTypes_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clausesKeysTypes_1[i], i);
						} else {
							each_blocks[i] = create_each_block_1(state, clausesKeysTypes_1, clausesKeysTypes_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(div, text_13);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = clausesKeysTypes_1.length;
				}
			},

			u: function unmount() {
				detachNode(div);
				if (if_block) if_block.u();

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				if (if_block) if_block.d();
				removeListener(select, "change", select_change_handler);
				removeListener(button, "click", click_handler);

				destroyEach(each_blocks);
			}
		};
	}

	// (9:8) {{#each remainingClauses as clause}}
	function create_each_block(state, remainingClauses_1, clause, clause_index, component) {
		var option, option_value_value, text_value = clause, text;

		return {
			c: function create() {
				option = createElement("option");
				text = createText(text_value);
				this.h();
			},

			h: function hydrate() {
				option.__value = option_value_value = clause;
				option.value = option.__value;
			},

			m: function mount(target, anchor) {
				insertNode(option, target, anchor);
				appendNode(text, option);
			},

			p: function update(changed, state, remainingClauses_1, clause, clause_index) {
				if ((changed.remainingClauses) && option_value_value !== (option_value_value = clause)) {
					option.__value = option_value_value;
				}

				option.value = option.__value;
				if ((changed.remainingClauses) && text_value !== (text_value = clause)) {
					text.data = text_value;
				}
			},

			u: function unmount() {
				detachNode(option);
			},

			d: noop
		};
	}

	// (2:2) {{#if remainingClauses.length}}
	function create_if_block(state, component) {
		var div, text, select, option, select_updating = false;

		var remainingClauses_1 = state.remainingClauses;

		var each_blocks = [];

		for (var i = 0; i < remainingClauses_1.length; i += 1) {
			each_blocks[i] = create_each_block(state, remainingClauses_1, remainingClauses_1[i], i, component);
		}

		function select_change_handler() {
			select_updating = true;
			var selectedOption = select.querySelector(':checked') || select.options[0];
			component.set({ __newClause: selectedOption && selectedOption.__value });
			select_updating = false;
		}

		function change_handler(event) {
			component.addClause();
		}

		return {
			c: function create() {
				div = createElement("div");
				text = createText("Add Clause:\n      ");
				select = createElement("select");
				option = createElement("option");
				option.textContent = "- Select a Clause -";

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}
				this.h();
			},

			h: function hydrate() {
				option.selected = true;
				option.__value = '';
				option.value = option.__value;

				if (!('__newClause' in state)) component._root._beforecreate.push(select_change_handler);

				addListener(select, "change", select_change_handler);
				addListener(select, "change", change_handler);
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(select, div);
				appendNode(option, select);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(select, null);
				}

				var value = state.__newClause;
				for (var i = 0; i < select.options.length; i += 1) {
					var option_1 = select.options[i];

					if (option_1.__value === value) {
						option_1.selected = true;
						break;
					}
				}
			},

			p: function update(changed, state) {
				var remainingClauses_1 = state.remainingClauses;

				if (changed.remainingClauses) {
					for (var i = 0; i < remainingClauses_1.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, remainingClauses_1, remainingClauses_1[i], i);
						} else {
							each_blocks[i] = create_each_block(state, remainingClauses_1, remainingClauses_1[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = remainingClauses_1.length;
				}

				if (!select_updating) {
					var value = state.__newClause;
					for (var i = 0; i < select.options.length; i += 1) {
						var option_1 = select.options[i];

						if (option_1.__value === value) {
							option_1.selected = true;
							break;
						}
					}
				}
			},

			u: function unmount() {
				detachNode(div);

				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}
			},

			d: function destroy() {
				destroyEach(each_blocks);

				removeListener(select, "change", select_change_handler);
				removeListener(select, "change", change_handler);
			}
		};
	}

	// (42:2) {{#each clausesKeysTypes as clause}}
	function create_each_block_1(state, clausesKeysTypes_1, clause_1, clause_index, component) {
		var div, div_1, text_value = clause_1.key, text, text_1, text_2, div_2, div_3, button, text_5, text_6, text_7, div_4, button_1;

		var current_block_type = select_block_type(state, clausesKeysTypes_1, clause_1, clause_index);
		var if_block = current_block_type(state, clausesKeysTypes_1, clause_1, clause_index, component);

		return {
			c: function create() {
				div = createElement("div");
				div_1 = createElement("div");
				text = createText(text_value);
				text_1 = createText(":");
				text_2 = createText("\n      ");
				div_2 = createElement("div");
				div_3 = createElement("div");
				button = createElement("button");
				button.textContent = "Add Entry";
				text_5 = createText("\n        [\n        ");
				if_block.c();
				text_6 = createText("\n        ]");
				text_7 = createText("\n      ");
				div_4 = createElement("div");
				button_1 = createElement("button");
				button_1.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				div.className = "clause";
				div_1.className = "name";
				div_2.className = "value";
				addListener(button, "click", click_handler);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index
				};

				div_4.className = "remove";
				addListener(button_1, "click", click_handler_3);

				button_1._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index
				};
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(div_1, div);
				appendNode(text, div_1);
				appendNode(text_1, div_1);
				appendNode(text_2, div);
				appendNode(div_2, div);
				appendNode(div_3, div_2);
				appendNode(button, div_3);
				appendNode(text_5, div_2);
				if_block.m(div_2, null);
				appendNode(text_6, div_2);
				appendNode(text_7, div);
				appendNode(div_4, div);
				appendNode(button_1, div_4);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause_1, clause_index) {
				if ((changed.clausesKeysTypes) && text_value !== (text_value = clause_1.key)) {
					text.data = text_value;
				}

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;

				if (current_block_type === (current_block_type = select_block_type(state, clausesKeysTypes_1, clause_1, clause_index)) && if_block) {
					if_block.p(changed, state, clausesKeysTypes_1, clause_1, clause_index);
				} else {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, clausesKeysTypes_1, clause_1, clause_index, component);
					if_block.c();
					if_block.m(div_2, text_6);
				}

				button_1._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button_1._svelte.clause_index = clause_index;
			},

			u: function unmount() {
				detachNode(div);
				if_block.u();
			},

			d: function destroy() {
				removeListener(button, "click", click_handler);
				if_block.d();
				removeListener(button_1, "click", click_handler_3);
			}
		};
	}

	// (53:10) {{#each selector[clause.key] as clauseEntry, index}}
	function create_each_block_2(state, clausesKeysTypes_1, clause_1, clause_index, each_value, clauseEntry, index, component) {
		var div, text, input, input_updating = false, text_1, valueeditor_updating = {}, text_2, button;

		function input_input_handler() {
			input_updating = true;
			var list = input._svelte.each_value;
			var index = input._svelte.index;
			var state = component.get();
			list[index][0] = input.value;

			component.set({selector: state.selector, clausesKeysTypes: state.clausesKeysTypes });
			input_updating = false;
		}

		var valueeditor_initial_data = {
			valueTypeCurrent: clause_1.type.type,
			strictType: clause_1.type.type !== null
		};
		if (index in each_value) {
			valueeditor_initial_data.value = clauseEntry[1];
			valueeditor_updating.value = true;
		}
		var valueeditor = new ValueEditor({
			_root: component._root,
			data: valueeditor_initial_data,
			_bind: function(changed, childState) {
				var state = component.get(), newState = {};
				if (!valueeditor_updating.value && changed.value) {
					var list = valueeditor_context.each_value;
					var index = valueeditor_context.index;
					list[index][1] = childState.value;

					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(), childState = valueeditor.get(), newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				var list = valueeditor_context.each_value;
				var index = valueeditor_context.index;
				list[index][1] = childState.value;

				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		var valueeditor_context = {
			each_value: each_value,
			index: index
		};

		return {
			c: function create() {
				div = createElement("div");
				text = createText("[");
				input = createElement("input");
				text_1 = createText(", ");
				valueeditor._fragment.c();
				text_2 = createText("]\n              ");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				div.className = "clause-entry";
				input.type = "text";
				input.placeholder = "property name";
				addListener(input, "input", input_input_handler);

				input._svelte = {
					each_value: each_value,
					index: index
				};

				addListener(button, "click", click_handler_1);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index,
					each_value: each_value,
					index: index
				};
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(text, div);
				appendNode(input, div);

				input.value = clauseEntry[0];

				appendNode(text_1, div);
				valueeditor._mount(div, null);
				appendNode(text_2, div);
				appendNode(button, div);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause_1, clause_index, each_value, clauseEntry, index) {
				if (!input_updating) {
					input.value = clauseEntry[0];
				}

				input._svelte.each_value = each_value;
				input._svelte.index = index;

				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeCurrent = clause_1.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.strictType = clause_1.type.type !== null;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = clauseEntry[1];
					valueeditor_updating.value = true;
				}
				valueeditor._set( valueeditor_changes );
				valueeditor_updating = {};

				valueeditor_context.each_value = each_value;
				valueeditor_context.index = index;

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;
				button._svelte.each_value = each_value;
				button._svelte.index = index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				removeListener(input, "input", input_input_handler);
				valueeditor.destroy(false);
				removeListener(button, "click", click_handler_1);
			}
		};
	}

	// (60:10) {{#each selector[clause.key] as clauseEntry, index}}
	function create_each_block_3(state, clausesKeysTypes_1, clause_1, clause_index, each_value, clauseEntry_1, index, component) {
		var div, valueeditor_updating = {}, text, button;

		var valueeditor_initial_data = {
			valueTypeCurrent: clause_1.type.type,
			strictType: clause_1.type.type !== null
		};
		if (index in each_value) {
			valueeditor_initial_data.value = clauseEntry_1;
			valueeditor_updating.value = true;
		}
		var valueeditor = new ValueEditor({
			_root: component._root,
			data: valueeditor_initial_data,
			_bind: function(changed, childState) {
				var state = component.get(), newState = {};
				if (!valueeditor_updating.value && changed.value) {
					var list = valueeditor_context.each_value;
					var index = valueeditor_context.index;
					list[index] = childState.value;

					newState.selector = state.selector;
					newState.clausesKeysTypes = state.clausesKeysTypes;
				}
				valueeditor_updating = assign({}, changed);
				component._set(newState);
				valueeditor_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(), childState = valueeditor.get(), newState = {};
			if (!childState) return;
			if (!valueeditor_updating.value) {
				var list = valueeditor_context.each_value;
				var index = valueeditor_context.index;
				list[index] = childState.value;

				newState.selector = state.selector;
				newState.clausesKeysTypes = state.clausesKeysTypes;
			}
			valueeditor_updating = { value: true };
			component._set(newState);
			valueeditor_updating = {};
		});

		var valueeditor_context = {
			each_value: each_value,
			index: index
		};

		return {
			c: function create() {
				div = createElement("div");
				valueeditor._fragment.c();
				text = createText("\n              ");
				button = createElement("button");
				button.textContent = "Remove";
				this.h();
			},

			h: function hydrate() {
				div.className = "clause-entry";
				addListener(button, "click", click_handler_2);

				button._svelte = {
					component: component,
					clausesKeysTypes_1: clausesKeysTypes_1,
					clause_index: clause_index,
					each_value: each_value,
					index: index
				};
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				valueeditor._mount(div, null);
				appendNode(text, div);
				appendNode(button, div);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause_1, clause_index, each_value, clauseEntry_1, index) {
				var valueeditor_changes = {};
				if (changed.clausesKeysTypes) valueeditor_changes.valueTypeCurrent = clause_1.type.type;
				if (changed.clausesKeysTypes) valueeditor_changes.strictType = clause_1.type.type !== null;
				if (!valueeditor_updating.value && changed.selector || changed.clausesKeysTypes) {
					valueeditor_changes.value = clauseEntry_1;
					valueeditor_updating.value = true;
				}
				valueeditor._set( valueeditor_changes );
				valueeditor_updating = {};

				valueeditor_context.each_value = each_value;
				valueeditor_context.index = index;

				button._svelte.clausesKeysTypes_1 = clausesKeysTypes_1;
				button._svelte.clause_index = clause_index;
				button._svelte.each_value = each_value;
				button._svelte.index = index;
			},

			u: function unmount() {
				detachNode(div);
			},

			d: function destroy() {
				valueeditor.destroy(false);
				removeListener(button, "click", click_handler_2);
			}
		};
	}

	// (52:8) {{#if clause.type.vector}}
	function create_if_block_1(state, clausesKeysTypes_1, clause_1, clause_index, component) {
		var each_anchor;

		var each_value = state.selector[clause_1.key];

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_2(state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i, component);
		}

		return {
			c: function create() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m: function mount(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insertNode(each_anchor, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause_1, clause_index) {
				var each_value = state.selector[clause_1.key];

				if (changed.selector || changed.clausesKeysTypes) {
					for (var i = 0; i < each_value.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i);
						} else {
							each_blocks[i] = create_each_block_2(state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = each_value.length;
				}
			},

			u: function unmount() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				detachNode(each_anchor);
			},

			d: function destroy() {
				destroyEach(each_blocks);
			}
		};
	}

	// (59:8) {{else}}
	function create_if_block_2(state, clausesKeysTypes_1, clause_1, clause_index, component) {
		var each_anchor;

		var each_value = state.selector[clause_1.key];

		var each_blocks = [];

		for (var i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block_3(state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i, component);
		}

		return {
			c: function create() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_anchor = createComment();
			},

			m: function mount(target, anchor) {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].m(target, anchor);
				}

				insertNode(each_anchor, target, anchor);
			},

			p: function update(changed, state, clausesKeysTypes_1, clause_1, clause_index) {
				var each_value = state.selector[clause_1.key];

				if (changed.selector || changed.clausesKeysTypes) {
					for (var i = 0; i < each_value.length; i += 1) {
						if (each_blocks[i]) {
							each_blocks[i].p(changed, state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i);
						} else {
							each_blocks[i] = create_each_block_3(state, clausesKeysTypes_1, clause_1, clause_index, each_value, each_value[i], i, component);
							each_blocks[i].c();
							each_blocks[i].m(each_anchor.parentNode, each_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].u();
						each_blocks[i].d();
					}
					each_blocks.length = each_value.length;
				}
			},

			u: function unmount() {
				for (var i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].u();
				}

				detachNode(each_anchor);
			},

			d: function destroy() {
				destroyEach(each_blocks);
			}
		};
	}

	function click_handler(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1, clause_index = this._svelte.clause_index, clause_1 = clausesKeysTypes_1[clause_index];
		component.addClauseEntry(clause_1.key);
	}

	function click_handler_1(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1, clause_index = this._svelte.clause_index, clause_1 = clausesKeysTypes_1[clause_index];
		var each_value = this._svelte.each_value, index = this._svelte.index, clauseEntry = each_value[index];
		component.removeClauseEntry(clause_1.key, index);
	}

	function click_handler_2(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1, clause_index = this._svelte.clause_index, clause_1 = clausesKeysTypes_1[clause_index];
		var each_value = this._svelte.each_value, index = this._svelte.index, clauseEntry_1 = each_value[index];
		component.removeClauseEntry(clause_1.key, index);
	}

	function select_block_type(state, clausesKeysTypes_1, clause_1, clause_index) {
		if (clause_1.type.vector) return create_if_block_1;
		return create_if_block_2;
	}

	function click_handler_3(event) {
		var component = this._svelte.component;
		var clausesKeysTypes_1 = this._svelte.clausesKeysTypes_1, clause_index = this._svelte.clause_index, clause_1 = clausesKeysTypes_1[clause_index];
		component.removeClause(clause_1.key);
	}

	function SelectorEditor(options) {
		init(this, options);
		this._state = assign(data(), options.data);
		this._recompute({ selector: 1, supportedClauses: 1 }, this._state);

		if (!document.getElementById("svelte-2333839390-style")) add_css();

		if (!options._root) {
			this._oncreate = [];
			this._beforecreate = [];
			this._aftercreate = [];
		}

		this._fragment = create_main_fragment(this._state, this);

		if (options.target) {
			this._fragment.c();
			this._fragment.m(options.target, options.anchor || null);

			this._lock = true;
			callAll(this._beforecreate);
			callAll(this._oncreate);
			callAll(this._aftercreate);
			this._lock = false;
		}
	}

	assign(SelectorEditor.prototype, methods, {
	 	destroy: destroy,
	 	get: get,
	 	fire: fire,
	 	observe: observe,
	 	on: on,
	 	set: set,
	 	teardown: destroy,
	 	_set: _set,
	 	_mount: _mount,
	 	_unmount: _unmount
	 });

	SelectorEditor.prototype._recompute = function _recompute(changed, state) {
		if (changed.selector || changed.supportedClauses) {
			if (differs(state.remainingClauses, (state.remainingClauses = remainingClauses(state.selector, state.supportedClauses)))) changed.remainingClauses = true;
			if (differs(state.clausesKeysTypes, (state.clausesKeysTypes = clausesKeysTypes(state.selector, state.supportedClauses)))) changed.clausesKeysTypes = true;
		}
	}

	function setAttribute(node, attribute, value) {
		node.setAttribute(attribute, value);
	}

	function createElement(name) {
		return document.createElement(name);
	}

	function appendNode(node, target) {
		target.appendChild(node);
	}

	function createText(data) {
		return document.createTextNode(data);
	}

	function addListener(node, event, handler) {
		node.addEventListener(event, handler, false);
	}

	function insertNode(node, target, anchor) {
		target.insertBefore(node, anchor);
	}

	function detachNode(node) {
		node.parentNode.removeChild(node);
	}

	function removeListener(node, event, handler) {
		node.removeEventListener(event, handler, false);
	}

	function destroyEach(iterations) {
		for (var i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d();
		}
	}

	function noop() {}

	function assign(target) {
		var k,
			source,
			i = 1,
			len = arguments.length;
		for (; i < len; i++) {
			source = arguments[i];
			for (k in source) target[k] = source[k];
		}

		return target;
	}

	function createComment() {
		return document.createComment('');
	}

	function init(component, options) {
		component.options = options;

		component._observers = { pre: blankObject(), post: blankObject() };
		component._handlers = blankObject();
		component._root = options._root || component;
		component._yield = options._yield;
		component._bind = options._bind;
	}

	function callAll(fns) {
		while (fns && fns.length) fns.pop()();
	}

	function destroy(detach) {
		this.destroy = noop;
		this.fire('destroy');
		this.set = this.get = noop;

		if (detach !== false) this._fragment.u();
		this._fragment.d();
		this._fragment = this._state = null;
	}

	function get(key) {
		return key ? this._state[key] : this._state;
	}

	function fire(eventName, data) {
		var handlers =
			eventName in this._handlers && this._handlers[eventName].slice();
		if (!handlers) return;

		for (var i = 0; i < handlers.length; i += 1) {
			handlers[i].call(this, data);
		}
	}

	function observe(key, callback, options) {
		var group = options && options.defer
			? this._observers.post
			: this._observers.pre;

		(group[key] || (group[key] = [])).push(callback);

		if (!options || options.init !== false) {
			callback.__calling = true;
			callback.call(this, this._state[key]);
			callback.__calling = false;
		}

		return {
			cancel: function() {
				var index = group[key].indexOf(callback);
				if (~index) group[key].splice(index, 1);
			}
		};
	}

	function on(eventName, handler) {
		if (eventName === 'teardown') return this.on('destroy', handler);

		var handlers = this._handlers[eventName] || (this._handlers[eventName] = []);
		handlers.push(handler);

		return {
			cancel: function() {
				var index = handlers.indexOf(handler);
				if (~index) handlers.splice(index, 1);
			}
		};
	}

	function set(newState) {
		this._set(assign({}, newState));
		if (this._root._lock) return;
		this._root._lock = true;
		callAll(this._root._beforecreate);
		callAll(this._root._oncreate);
		callAll(this._root._aftercreate);
		this._root._lock = false;
	}

	function _set(newState) {
		var oldState = this._state,
			changed = {},
			dirty = false;

		for (var key in newState) {
			if (differs(newState[key], oldState[key])) changed[key] = dirty = true;
		}
		if (!dirty) return;

		this._state = assign({}, oldState, newState);
		this._recompute(changed, this._state);
		if (this._bind) this._bind(changed, this._state);
		dispatchObservers(this, this._observers.pre, changed, this._state, oldState);
		this._fragment.p(changed, this._state);
		dispatchObservers(this, this._observers.post, changed, this._state, oldState);
	}

	function _mount(target, anchor) {
		this._fragment.m(target, anchor);
	}

	function _unmount() {
		this._fragment.u();
	}

	function differs(a, b) {
		return a !== b || ((a && typeof a === 'object') || typeof a === 'function');
	}

	function blankObject() {
		return Object.create(null);
	}

	function dispatchObservers(component, group, changed, newState, oldState) {
		for (var key in group) {
			if (!changed[key]) continue;

			var newValue = newState[key];
			var oldValue = oldState[key];

			var callbacks = group[key];
			if (!callbacks) continue;

			for (var i = 0; i < callbacks.length; i += 1) {
				var callback = callbacks[i];
				if (callback.__calling) continue;

				callback.__calling = true;
				callback.call(component, newValue, oldValue);
				callback.__calling = false;
			}
		}
	}
	return SelectorEditor;
}(ValueEditor));