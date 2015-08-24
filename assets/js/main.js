(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var Reflux = require('reflux');

// Each action is like an event channel for one specific event. Actions are called by components.
// The store is listening to all actions, and the components in turn are listening to the store.
// Thus the flow is: User interaction -> component calls action -> store reacts and triggers -> components update

var TodoActions = Reflux.createActions([
    "toggleItem",     // called by button in TodoItem
    "toggleAllItems", // called by button in TodoMain (even though you'd think TodoHeader)
    "addItem",        // called by hitting enter in field in TodoHeader
    "removeItem",     // called by button in TodoItem
    "clearCompleted", // called by button in TodoFooter
    "editItem"        // called by finishing edit in TodoItem
]);

module.exports = TodoActions;

},{"reflux":"reflux"}],2:[function(require,module,exports){
'use strict';

var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var RouteHandler = ReactRouter.RouteHandler;

var TodoListStore = require('../stores/store.js');

var TodoHeader = require('./todoHeader.jsx');
var TodoFooter = require('./todoFooter.jsx');

// Renders the full application
// activeRouteHandler will always be TodoMain, but with different 'showing' prop (all/completed/active)
var TodoApp = React.createClass({displayName: "TodoApp",
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [Reflux.connect(TodoListStore,"list")],

    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement(TodoHeader, null), 
                React.createElement(RouteHandler, {list: this.state.list}), 
                React.createElement(TodoFooter, {list: this.state.list})
            )
        );
    }
});

module.exports = TodoApp;

},{"../stores/store.js":8,"./todoFooter.jsx":3,"./todoHeader.jsx":4,"react":"react","react-router":"react-router","reflux":"reflux"}],3:[function(require,module,exports){
/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react/addons');
var ReactRouter = require('react-router');

var TodoActions = require('../actions/actions.js');

// Renders the bottom item count, navigation bar and clearallcompleted button
// Used in TodoApp
var TodoFooter = React.createClass({displayName: "TodoFooter",
    propTypes: {
        list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    },
    render: function() {
        var nbrcompleted = _.filter(this.props.list, "isComplete").length,
            nbrtotal = this.props.list.length,
            nbrincomplete = nbrtotal-nbrcompleted,
            clearButtonClass = React.addons.classSet({hidden: nbrcompleted < 1}),
            footerClass = React.addons.classSet({hidden: !nbrtotal }),
            completedLabel = "Clear completed (" + nbrcompleted + ")",
            itemsLeftLabel = nbrincomplete === 1 ? " item left" : " items left";
        return (
            React.createElement("footer", {id: "footer", className: footerClass}, 
                React.createElement("span", {id: "todo-count"}, React.createElement("strong", null, nbrincomplete), itemsLeftLabel), 
                React.createElement("ul", {id: "filters"}, 
                    React.createElement("li", null, 
                        React.createElement(ReactRouter.Link, {activeClassName: "selected", to: "All"}, "All")
                    ), 
                    React.createElement("li", null, 
                        React.createElement(ReactRouter.Link, {activeClassName: "selected", to: "Active"}, "Active")
                    ), 
                    React.createElement("li", null, 
                        React.createElement(ReactRouter.Link, {activeClassName: "selected", to: "Completed"}, "Completed")
                    )
                ), 
                React.createElement("button", {id: "clear-completed", className: clearButtonClass, onClick: TodoActions.clearCompleted}, completedLabel)
            )
        );
    }
});

module.exports = TodoFooter;

},{"../actions/actions.js":1,"react-router":"react-router","react/addons":"react/addons","underscore":"underscore"}],4:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react');
var ReactRouter = require('react-router');

var TodoActions = require('../actions/actions.js');


// Renders the headline and the form for creating new todos.
// Used in TodoApp
// Observe that the toogleall button is NOT rendered here, but in TodoMain (it is then moved up to the header with CSS)
var TodoHeader = React.createClass({displayName: "TodoHeader",
    handleValueChange: function(evt) {
        var text = evt.target.value;
        if (evt.which === 13 && text) { // hit enter, create new item if field isn't empty
            TodoActions.addItem(text);
            evt.target.value = '';
        } else if (evt.which === 27) { // hit escape, clear without creating
            evt.target.value = '';
        }
    },
    render: function() {
        return (
            React.createElement("header", {id: "header"}, 
                React.createElement("h1", null, "todos"), 
                React.createElement("input", {id: "new-todo", placeholder: "What needs to be done?", autoFocus: true, onKeyUp: this.handleValueChange})
            )
        );
    }
});

module.exports = TodoHeader;

},{"../actions/actions.js":1,"react":"react","react-router":"react-router"}],5:[function(require,module,exports){
/** @jsx React.DOM */
var React = require('react/addons');
var ReactRouter = require('react-router');

var TodoActions = require('../actions/actions.js');


// Renders a single Todo item in the list
// Used in TodoList
var TodoItem = React.createClass({displayName: "TodoItem",
    propTypes: {
        label: React.PropTypes.string.isRequired,
        isComplete: React.PropTypes.bool.isRequired,
        id: React.PropTypes.number
    },
    mixins: [React.addons.LinkedStateMixin], // exposes this.linkState used in render
    getInitialState: function() {
        return {};
    },
    handleToggle: function(evt) {
        TodoActions.toggleItem(this.props.id);
    },
    handleEditStart: function(evt) {
        evt.preventDefault();
        // because of linkState call in render, field will get value from this.state.editValue
        this.setState({
            isEditing: true,
            editValue: this.props.label
        }, function() {
            this.refs.editInput.getDOMNode().focus();
        });
    },
    handleValueChange: function(evt) {
        var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
        // we pressed enter, if text isn't empty we blur the field which will cause a save
        if (evt.which === 13 && text) {
            this.refs.editInput.getDOMNode().blur();
        }
        // pressed escape. set editing to false before blurring so we won't save
        else if (evt.which === 27) {
            this.setState({ isEditing: false },function(){
                this.refs.editInput.getDOMNode().blur();
            });
        }
    },
    handleBlur: function() {
        var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
        // unless we're not editing (escape was pressed) or text is empty, save!
        if (this.state.isEditing && text) {
            TodoActions.editItem(this.props.id, text);
        }
        // whatever the outcome, if we left the field we're not editing anymore
        this.setState({isEditing:false});
    },
    handleDestroy: function() {
        TodoActions.removeItem(this.props.id);
    },
    render: function() {
        var classes = React.addons.classSet({
            'completed': this.props.isComplete,
            'editing': this.state.isEditing
        });
        return (
            React.createElement("li", {className: classes}, 
                React.createElement("div", {className: "view"}, 
                    React.createElement("input", {className: "toggle", type: "checkbox", checked: !!this.props.isComplete, onChange: this.handleToggle}), 
                    React.createElement("label", {onDoubleClick: this.handleEditStart}, this.props.label), 
                    React.createElement("button", {className: "destroy", onClick: this.handleDestroy})
                ), 
                React.createElement("input", {ref: "editInput", className: "edit", valueLink: this.linkState('editValue'), onKeyUp: this.handleValueChange, onBlur: this.handleBlur})
            )
        );
    }
});

module.exports = TodoItem;

},{"../actions/actions.js":1,"react-router":"react-router","react/addons":"react/addons"}],6:[function(require,module,exports){
/** @jsx React.DOM */
var _ = require('underscore');
var React = require('react/addons');
var ReactRouter = require('react-router');

var TodoActions = require('../actions/actions.js');
var TodoStore = require('../stores/store.js');

var TodoItem = require('./todoItem.jsx');


// Renders the todo list as well as the toggle all button
// Used in TodoApp
var makeTodoMain = function(showing) {
    return React.createClass({
        propTypes: {
            list: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        },
        toggleAll: function(evt) {
            TodoActions.toggleAllItems(evt.target.checked);
        },
        render: function() {
            var filteredList;
            switch(showing){
                case 'all':
                    filteredList = this.props.list;
                    break;
                case 'completed':
                    filteredList = _.filter(this.props.list,function(item){ return item.isComplete; });
                    break;
                case 'active':
                    filteredList = _.filter(this.props.list,function(item){ return !item.isComplete; });
            }
            var classes = React.addons.classSet({
                "hidden": this.props.list.length < 1
            });
            return (
                React.createElement("section", {id: "main", className: classes}, 
                    React.createElement("input", {id: "toggle-all", type: "checkbox", onChange: this.toggleAll}), 
                    React.createElement("label", {htmlFor: "toggle-all"}, "Mark all as complete"), 
                    React.createElement("ul", {id: "todo-list"}, 
                         filteredList.map(function(item){return React.createElement(TodoItem, {label: item.label, isComplete: item.isComplete, id: item.id, key: item.id}); }) 
                    )
                )
            );
        }
    });
}

module.exports = makeTodoMain;

},{"../actions/actions.js":1,"../stores/store.js":8,"./todoItem.jsx":5,"react-router":"react-router","react/addons":"react/addons","underscore":"underscore"}],7:[function(require,module,exports){
var React = require('react');
var Reflux = require('reflux');
var ReactRouter = require('react-router');
var TodoMain = require('./components/todoMain.jsx');
var TodoApp = require('./components/todoApp.jsx');

var routes = (
        React.createElement(ReactRouter.Route, {handler: TodoApp}, 
            React.createElement(ReactRouter.Route, {name: "All", path: "/", handler: TodoMain("all")}), 
            React.createElement(ReactRouter.Route, {name: "Completed", path: "/completed", handler: TodoMain("completed")}), 
            React.createElement(ReactRouter.Route, {name: "Active", path: "/active", handler: TodoMain("active")})
        )
);


ReactRouter.run(routes, function (Handler) {
      React.render(React.createElement(Handler, null), document.getElementById('todoapp'));
});

},{"./components/todoApp.jsx":2,"./components/todoMain.jsx":6,"react":"react","react-router":"react-router","reflux":"reflux"}],8:[function(require,module,exports){
'use strict';
var _ = require('underscore');
var React = require('react');
var Reflux = require('reflux');
var TodoActions = require('../actions/actions.js');

// some variables and helpers for our fake database stuff
var todoCounter = 0,
    localStorageKey = "todos";

function getItemById(list,itemId){
    return _.find(list, function(item) {
        return item.id === itemId;
    });
}

var TodoListStore = Reflux.createStore({
    // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
    listenables: [TodoActions],
    onEditItem: function(itemId, newLabel) {
        var foundItem = getItemById(this.list,itemId);
        if (!foundItem) {
            return;
        }
        foundItem.label = newLabel;
        this.updateList(this.list);
    },
    onAddItem: function(label) {
        this.updateList([{
            id: todoCounter++,
            created: new Date(),
            isComplete: false,
            label: label
        }].concat(this.list));
    },
    onRemoveItem: function(itemId) {
        this.updateList(_.filter(this.list,function(item){
            return item.id!==itemId;
        }));
    },
    onToggleItem: function(itemId) {
        var foundItem = getItemById(this.list,itemId);
        if (foundItem) {
            foundItem.isComplete = !foundItem.isComplete;
            this.updateList(this.list);
        }
    },
    onToggleAllItems: function(checked) {
        this.updateList(_.map(this.list, function(item) {
            item.isComplete = checked;
            return item;
        }));
    },
    onClearCompleted: function() {
        this.updateList(_.filter(this.list, function(item) {
            return !item.isComplete;
        }));
    },
    // called whenever we change a list. normally this would mean a database API call
    updateList: function(list){
        localStorage.setItem(localStorageKey, JSON.stringify(list));
        // if we used a real database, we would likely do the below in a callback
        this.list = list;
        this.trigger(list); // sends the updated list to all listening components (TodoApp)
    },
    // this will be called by all listening components as they register their listeners
    getInitialState: function() {
        var loadedList = localStorage.getItem(localStorageKey);
        if (!loadedList) {
            // If no list is in localstorage, start out with a default one
            this.list = [{
                id: todoCounter++,
                created: new Date(),
                isComplete: false,
                label: 'Rule the web'
            }];
        } else {
            this.list = _.map(JSON.parse(loadedList), function(item) {
                // just resetting the id property for each todo item
                item.id = todoCounter++;
                return item;
            });
        }
        return this.list;
    }
});

module.exports = TodoListStore;

},{"../actions/actions.js":1,"react":"react","reflux":"reflux","underscore":"underscore"}]},{},[7]);

//# sourceMappingURL=main.js.map