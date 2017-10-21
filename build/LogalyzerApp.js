/* src/LogalyzerApp.html generated by Svelte v1.41.0 */
var LogalyzerApp = (function(QueryEditor, Nymph, LogEntry) { "use strict";
	QueryEditor = (QueryEditor && QueryEditor.__esModule) ? QueryEditor["default"] : QueryEditor;
	Nymph = (Nymph && Nymph.__esModule) ? Nymph["default"] : Nymph;
	LogEntry = (LogEntry && LogEntry.__esModule) ? LogEntry["default"] : LogEntry;

	const chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

const aggregateFunctions = {
  totalListenersOverTime: {
    name: "Total Listeners Over Time",
    func: function (entries) {
  		const timeFormat = 'YYYY-MM-DD HH:mm:ss';

  		function newDateString(timestamp) {
  			return moment(""+timestamp, "X").format(timeFormat);
  		}

      let earliest, latest, deltas = {}, data = [];

      // Go through and save every time someone logs on and off and the
      // earliest/latest delta.
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const timeOn = Math.floor(entry.get("time"));
        const timeOff = Math.floor(entry.get("timeEnd"));

        if (timeOn < earliest || earliest === undefined) {
          earliest = timeOn;
        }
        if (timeOff > latest || latest === undefined) {
          latest = timeOff;
        }
        if (deltas[timeOn]) {
          deltas[timeOn]++;
        } else {
          deltas[timeOn] = 1;
        }
        if (deltas[timeOff]) {
          deltas[timeOff]--;
        } else {
          deltas[timeOff] = -1;
        }
      }

      // Now comes the hard part. Going through every second from earliest to
      // latest and calculating number of listeners.
      let currentListeners = 0;
      for (let i = earliest; i <= latest; i++) {
        if (deltas[i]) {
          currentListeners += deltas[i];

          data.push({
            x: newDateString(i),
            y: currentListeners
          });
        }
      }

      return data;
    }
  },

  refererByDomain: {
    name: "Referer By Domain",
    func: function (entries) {
      const referers = {
        "Direct Request": 0,
        "Unknown": 0
      };
      const refererDomainRegex = /^\w+:\/\/(?:www\.)?([A-Za-z-.]+)/g;
      const data = [];

      // Go through and parse out the domain of the referer.
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        const referer = entry.get("referer");

        if (!referer || referer === "-") {
          referers["Direct Request"]++;
        } else {
          const match = refererDomainRegex.exec(referer);
          if (match !== null && match.length > 1) {
            if (referers[match[1]]) {
              referers[match[1]]++;
            } else {
              referers[match[1]] = 1;
            }
          } else {
            referers["Unknown"]++;
          }
        }
      }

      // Convert every entry to an array.
      for (let k in referers) {
        data.push({
          x: k,
          y: referers[k]
        });
      }

      data.sort((a, b) => b.y - a.y);

      return data;
    }
  }
};

const chartFunctions = {
  timeSeries: {
    name: "Time Series",
    func: function (label, data, canvas) {
  		const timeFormat = 'YYYY-MM-DD HH:mm:ss';

  		const color = Chart.helpers.color;
  		const config = {
  			type: 'line',
  			data: {
  				labels: [],
  				datasets: [{
  					label: label,
  					backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
  					borderColor: chartColors.green,
  					fill: false,
  					data: data,
  				}]
  			},
  			options: {
          title:{
              text: "Chart.js Time Scale"
          },
  				scales: {
  					xAxes: [{
  						type: "time",
  						time: {
  							format: timeFormat,
  							// round: 'day'
  							tooltipFormat: 'll HH:mm'
  						},
  						scaleLabel: {
  							display: true,
  							labelString: 'Date'
  						}
  					}, ],
  					yAxes: [{
  						scaleLabel: {
  							display: true,
  							labelString: 'Value'
  						}
  					}]
  				},
  			}
  		};

			const ctx = canvas.getContext("2d");
			return {context: ctx, chart: new Chart(ctx, config)};
    }
  },

  horizontalBar: {
    name: "horizontalBar",
    func: function (label, data, canvas) {
  		const color = Chart.helpers.color;
  		const config = {
        type: 'horizontalBar',
        data: {
  				labels: data.map((v) => v.x),
          datasets: [{
            label: label,
            backgroundColor: color(chartColors.blue).alpha(0.5).rgbString(),
            borderColor: chartColors.red,
            borderWidth: 1,
            data: data.map((v) => v.y)
          }]
        },
        options: {
          // Elements options apply to all of the options unless overridden in a dataset
          // In this case, we are setting the border of each horizontal bar to be 2px wide
          elements: {
            rectangle: {
              borderWidth: 2,
            }
          },
          responsive: true,
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: label
          }
        }
      };

			const ctx = canvas.getContext("2d");
			return {context: ctx, chart: new Chart(ctx, config)};
    }
  }
};

function query(options, selectors) {
		return [options, ...selectors];
	}

	function data() {
  return {
    __supportedClasses: [LogEntry],
    __showQueryEditor: false,
    __loading: false,
    __currentChart: null,
    options: {
      'class': LogEntry.class
    },
    selectors: [
      {
        'type': '|',
        'strict': [
          ['resource', '/stream'],
          ['resource', '/stream2']
        ]
      },
      {
        "type": "&",
        "gte": [
          ["timeEnd", 1504677600]
        ],
        "lte": [
          ["timeStart", 1504688400]
        ]
      }
    ]
  }
};

	var methods = {
  runQuery () {
    const __currentChart = this.get("__currentChart");
    if (__currentChart) {
      __currentChart.chart.destroy();
      __currentChart.context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
    }

    this.set({__loading: true});
    const query = this.get('query');
    Nymph.getEntities(...query).then((entries) => {
      // Run the aggregator:
      const data = aggregateFunctions.refererByDomain.func(entries);

      // Create the chart:
      this.set({
        __currentChart: chartFunctions.horizontalBar.func(aggregateFunctions.refererByDomain.name, data, this.refs.canvas),
        __loading: false
      });
    }, (err) => {
      alert("Error: "+err);
    });
  },

  toggleQueryEditor () {
    this.set({__showQueryEditor: !this.get("__showQueryEditor")});
  }
};

	function encapsulateStyles(node) {
		setAttribute(node, "svelte-2289200441", "");
	}

	function add_css() {
		var style = createElement("style");
		style.id = 'svelte-2289200441-style';
		style.textContent = "[svelte-2289200441].hidden,[svelte-2289200441] .hidden{display:none}[svelte-2289200441].loader,[svelte-2289200441] .loader,[svelte-2289200441].loader:after,[svelte-2289200441] .loader:after{border-radius:50%;width:3em;height:3em}[svelte-2289200441].loader,[svelte-2289200441] .loader{margin:60px auto;font-size:10px;position:relative;text-indent:-9999em;border-top:1.1em solid rgba(0,0,0, 0.2);border-right:1.1em solid rgba(0,0,0, 0.2);border-bottom:1.1em solid rgba(0,0,0, 0.2);border-left:1.1em solid #000000;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:load8 1.1s infinite linear;animation:svelte-2289200441-load8 1.1s infinite linear}@-webkit-keyframes load8 {[svelte-2289200441]0%,[svelte-2289200441] 0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}[svelte-2289200441]100%,[svelte-2289200441] 100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes svelte-2289200441-load8{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}";
		appendNode(style, document.head);
	}

	function create_main_fragment(state, component) {
		var div, button, text_1, button_1, text_2, text_3, div_1, div_1_class_value, queryeditor_updating = {}, text_5, hr, text_6, h1, text_8, div_2, div_3, div_3_class_value, text_9, canvas;

		function click_handler(event) {
			component.runQuery();
		}

		function click_handler_1(event) {
			component.toggleQueryEditor();
		}

		var current_block_type = select_block_type(state);
		var if_block = current_block_type(state, component);

		var queryeditor_initial_data = {};
		if ('options' in state) {
			queryeditor_initial_data.options = state.options ;
			queryeditor_updating.options = true;
		}
		if ('selectors' in state) {
			queryeditor_initial_data.selectors = state.selectors ;
			queryeditor_updating.selectors = true;
		}
		if ('__supportedClasses' in state) {
			queryeditor_initial_data.supportedClasses = state.__supportedClasses;
			queryeditor_updating.supportedClasses = true;
		}
		var queryeditor = new QueryEditor({
			_root: component._root,
			data: queryeditor_initial_data,
			_bind: function(changed, childState) {
				var state = component.get(), newState = {};
				if (!queryeditor_updating.options && changed.options) {
					newState.options = childState.options;
				}

				if (!queryeditor_updating.selectors && changed.selectors) {
					newState.selectors = childState.selectors;
				}

				if (!queryeditor_updating.supportedClasses && changed.supportedClasses) {
					newState.__supportedClasses = childState.supportedClasses;
				}
				queryeditor_updating = assign({}, changed);
				component._set(newState);
				queryeditor_updating = {};
			}
		});

		component._root._beforecreate.push(function () {
			var state = component.get(), childState = queryeditor.get(), newState = {};
			if (!childState) return;
			if (!queryeditor_updating.options) {
				newState.options = childState.options;
			}

			if (!queryeditor_updating.selectors) {
				newState.selectors = childState.selectors;
			}

			if (!queryeditor_updating.supportedClasses) {
				newState.__supportedClasses = childState.supportedClasses;
			}
			queryeditor_updating = { options: true, selectors: true, supportedClasses: true };
			component._set(newState);
			queryeditor_updating = {};
		});

		var queryeditor_context = {
			state: state
		};

		return {
			c: function create() {
				div = createElement("div");
				button = createElement("button");
				button.textContent = "Run Query";
				text_1 = createText("\n  ");
				button_1 = createElement("button");
				if_block.c();
				text_2 = createText(" Query Editor");
				text_3 = createText("\n  ");
				div_1 = createElement("div");
				queryeditor._fragment.c();
				text_5 = createText("\n  ");
				hr = createElement("hr");
				text_6 = createText("\n\n  ");
				h1 = createElement("h1");
				h1.textContent = "Logalyzer Results";
				text_8 = createText("\n\t");
				div_2 = createElement("div");
				div_3 = createElement("div");
				text_9 = createText("\n\t\t");
				canvas = createElement("canvas");
				this.h();
			},

			h: function hydrate() {
				encapsulateStyles(div);
				addListener(button, "click", click_handler);
				addListener(button_1, "click", click_handler_1);
				div_1.className = div_1_class_value = state.__showQueryEditor ? '' : 'hidden';
				div_3.className = div_3_class_value = "loader " + (state.__loading ? '' : 'hidden');
			},

			m: function mount(target, anchor) {
				insertNode(div, target, anchor);
				appendNode(button, div);
				appendNode(text_1, div);
				appendNode(button_1, div);
				if_block.m(button_1, null);
				appendNode(text_2, button_1);
				appendNode(text_3, div);
				appendNode(div_1, div);
				queryeditor._mount(div_1, null);
				appendNode(text_5, div);
				appendNode(hr, div);
				appendNode(text_6, div);
				appendNode(h1, div);
				appendNode(text_8, div);
				appendNode(div_2, div);
				appendNode(div_3, div_2);
				appendNode(text_9, div_2);
				appendNode(canvas, div_2);
				component.refs.canvas = canvas;
			},

			p: function update(changed, state) {
				if (current_block_type !== (current_block_type = select_block_type(state))) {
					if_block.u();
					if_block.d();
					if_block = current_block_type(state, component);
					if_block.c();
					if_block.m(button_1, text_2);
				}

				if ((changed.__showQueryEditor) && div_1_class_value !== (div_1_class_value = state.__showQueryEditor ? '' : 'hidden')) {
					div_1.className = div_1_class_value;
				}

				var queryeditor_changes = {};
				if (!queryeditor_updating.options && changed.options) {
					queryeditor_changes.options = state.options ;
					queryeditor_updating.options = true;
				}
				if (!queryeditor_updating.selectors && changed.selectors) {
					queryeditor_changes.selectors = state.selectors ;
					queryeditor_updating.selectors = true;
				}
				if (!queryeditor_updating.supportedClasses && changed.__supportedClasses) {
					queryeditor_changes.supportedClasses = state.__supportedClasses;
					queryeditor_updating.supportedClasses = true;
				}
				queryeditor._set( queryeditor_changes );
				queryeditor_updating = {};

				queryeditor_context.state = state;

				if ((changed.__loading) && div_3_class_value !== (div_3_class_value = "loader " + (state.__loading ? '' : 'hidden'))) {
					div_3.className = div_3_class_value;
				}
			},

			u: function unmount() {
				detachNode(div);
				if_block.u();
			},

			d: function destroy() {
				removeListener(button, "click", click_handler);
				removeListener(button_1, "click", click_handler_1);
				if_block.d();
				queryeditor.destroy(false);
				if (component.refs.canvas === canvas) component.refs.canvas = null;
			}
		};
	}

	// (4:4) {{#if __showQueryEditor}}
	function create_if_block(state, component) {
		var text;

		return {
			c: function create() {
				text = createText("Hide");
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
			},

			u: function unmount() {
				detachNode(text);
			},

			d: noop
		};
	}

	// (4:33) {{else}}
	function create_if_block_1(state, component) {
		var text;

		return {
			c: function create() {
				text = createText("Show");
			},

			m: function mount(target, anchor) {
				insertNode(text, target, anchor);
			},

			u: function unmount() {
				detachNode(text);
			},

			d: noop
		};
	}

	function select_block_type(state) {
		if (state.__showQueryEditor) return create_if_block;
		return create_if_block_1;
	}

	function LogalyzerApp(options) {
		init(this, options);
		this.refs = {};
		this._state = assign(data(), options.data);
		this._recompute({ options: 1, selectors: 1 }, this._state);

		if (!document.getElementById("svelte-2289200441-style")) add_css();

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

	assign(LogalyzerApp.prototype, methods, {
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

	LogalyzerApp.prototype._recompute = function _recompute(changed, state) {
		if (changed.options || changed.selectors) {
			if (differs(state.query, (state.query = query(state.options, state.selectors)))) changed.query = true;
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

	function noop() {}

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
	return LogalyzerApp;
}(QueryEditor, Nymph, LogEntry));