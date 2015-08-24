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
var TodoApp = React.createClass({
    // this will cause setState({list:updatedlist}) whenever the store does trigger(updatedlist)
    mixins: [Reflux.connect(TodoListStore,"list")],

    render: function() {
        return (
            <div>
                <TodoHeader />
                <RouteHandler list={this.state.list} />
                <TodoFooter list={this.state.list} />
            </div>
        );
    }
});

module.exports = TodoApp;