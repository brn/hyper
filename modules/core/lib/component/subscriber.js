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
System.register(['react', 'lodash', 'rxjs/Rx'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var React, _, Rx_1;
    var Subscriber;
    return {
        setters:[
            function (React_1) {
                React = React_1;
            },
            function (_1) {
                _ = _1;
            },
            function (Rx_1_1) {
                Rx_1 = Rx_1_1;
            }],
        execute: function() {
            /**
             * Subscriber component for Rx.Observable.
             * This component provide an ability that subscribe rxjs stream props by auto detection of children components.
             */
            Subscriber = (function (_super) {
                __extends(Subscriber, _super);
                function Subscriber(p, c) {
                    _super.call(this, p, c);
                    /**
                     * Observable list that is pushed observable embeded in virtual dom trees.
                     */
                    this.observableList = [];
                    // State has virtual dom tree that are covered by this component.
                    this.state = {
                        vdom: null
                    };
                }
                /**
                 * Rendering new vdom trees that
                 * props are replaced by result value of observable.
                 */
                Subscriber.prototype.render = function () {
                    return this.state.vdom;
                };
                /**
                 * Subscribe all observable that embeded in vdom trees.
                 */
                Subscriber.prototype.componentWillMount = function () {
                    this.findObservable(this.props.children);
                    this.subscribe();
                };
                /**
                 * Reset all subscriptions and re subscribe all observables.
                 */
                Subscriber.prototype.componentWillReceiveProps = function (nextProps) {
                    this.subscription && this.subscription.unsubscribe();
                    this.observableList = [];
                    this.findObservable(nextProps.children);
                    this.subscribe();
                };
                /**
                 * Find observables which are embded in props or text.
                 */
                Subscriber.prototype.findObservable = function (oldChildren) {
                    var _this = this;
                    if (oldChildren === void 0) { oldChildren = []; }
                    var children = !_.isArray(oldChildren) ? [oldChildren] : oldChildren;
                    _.forEach(children, function (child, index) {
                        if (child.type === Subscriber) {
                            return;
                        }
                        if (child.props) {
                            var props = [];
                            _.forIn(_.omit(child.props, 'children'), function (v, k) {
                                if (v instanceof Rx_1.Observable) {
                                    _this.observableList.push(v);
                                }
                            });
                            if (child.props.children) {
                                _this.findObservable(child.props.children);
                            }
                        }
                        else if (child instanceof Rx_1.Observable) {
                            _this.observableList.push(child);
                        }
                    });
                };
                /**
                 * Subscribe changes of observables.
                 * If observable was updated, children components are updated and rerendered.
                 */
                Subscriber.prototype.subscribe = function () {
                    var _this = this;
                    if (this.observableList.length) {
                        this.subscription = Rx_1.Observable.combineLatest.apply(Rx_1.Observable, this.observableList).subscribe(function (values) {
                            var vdom = _this.createNewChildren(React.createElement("div", null, _this.props.children), values || []);
                            _this.renderVdom(vdom);
                        });
                    }
                    else {
                        this.renderVdom(this.props.children);
                    }
                };
                /**
                 * Rendering children virtual dom tree.
                 * @param vdom New children vdom tree.
                 */
                Subscriber.prototype.renderVdom = function (vdom) {
                    this.setState({ vdom: vdom });
                };
                /**
                 * Create clone of children recursively.
                 * @param el Child element to clone.
                 * @param observableValues Result value of observables.
                 */
                Subscriber.prototype.createNewChildren = function (el, observableValues) {
                    var _this = this;
                    var target = el.props ? (_.isArray(el.props.children) ? el.props.children : el.props.children ? [el.props.children] : []) : [];
                    var children = _.map(target, function (child, i) {
                        if (child instanceof Rx_1.Observable) {
                            return _this.findObservableFromList(child, observableValues);
                        }
                        else if (React.isValidElement(child) && !_this.isObserverified(child)) {
                            return _this.createNewChildren(child, observableValues);
                        }
                        return child;
                    });
                    var props = _.mapValues(_.omit(el.props, 'children'), function (v, k) {
                        if (v instanceof Rx_1.Observable) {
                            return _this.findObservableFromList(v, observableValues);
                        }
                        return v;
                    });
                    return React.cloneElement.apply(React, [el, props].concat(children));
                };
                /**
                 * Find a value of observable from observable list.
                 * @param observable Target observable.
                 * @param obsrvableValues Result value list of observable.
                 */
                Subscriber.prototype.findObservableFromList = function (observable, observableValues) {
                    var index = this.observableList.indexOf(observable);
                    if (index > -1) {
                        return observableValues[index];
                    }
                    return null;
                };
                /**
                 * Reset all subscriptions.
                 */
                Subscriber.prototype.componentWillUnmount = function () {
                    this.subscription && this.subscription.unsubscribe();
                };
                /**
                 * Check whether child is Subscriber or not.
                 * @param child Child to check.
                 */
                Subscriber.prototype.isObserverified = function (child) {
                    return child.type && child.type === Subscriber;
                };
                return Subscriber;
            }(React.Component));
            exports_1("Subscriber", Subscriber);
        }
    }
});
