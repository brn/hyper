// -*- mode: typescript -*-
/**
 * The MIT License (MIT)
 * Copyright (c) Taketoshi Aono
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * @fileoverview
 * @author Taketoshi Aono
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var react_dom_1 = require('react-dom');
var context_1 = require('./component/context');
function runner(_a) {
    var component = _a.component, modules = _a.modules;
    var Renderer = (function (_super) {
        __extends(Renderer, _super);
        function Renderer(p, c) {
            _super.call(this, p, c);
            this.model = c.createProps(p);
        }
        Renderer.prototype.render = function () {
            var C = component;
            return React.createElement(C, __assign({}, this.model));
        };
        Renderer.prototype.componentDidMount = function () {
            this.context.connect(this.model);
        };
        Renderer.contextTypes = context_1.ContextReactTypes;
        return Renderer;
    }(React.Component));
    return (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            _super.apply(this, arguments);
        }
        class_1.prototype.render = function () {
            return (React.createElement(context_1.Context, {modules: modules}, 
                React.createElement(Renderer, __assign({}, this.props))
            ));
        };
        class_1.displayName = 'MVIRoot';
        return class_1;
    }(React.Component));
}
exports.runner = runner;
function run(opt, el) {
    var Root = runner(opt);
    react_dom_1.render(React.createElement(Root, null), el);
}
exports.run = run;
