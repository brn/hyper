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
System.register(['@react-mvi/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var MAX_HISTORY_LENGTH, EventDispatcher;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            /**
             * History size.
             */
            MAX_HISTORY_LENGTH = 10;
            /**
             * Event publisher.
             */
            EventDispatcher = (function () {
                function EventDispatcher() {
                    /**
                     * Subject store.
                     */
                    this.store = new core_1.SubjectStore();
                    /**
                     * Event history.
                     */
                    this.history = [];
                    this.res = new core_1.IOResponse(this.store);
                }
                /**
                 * Publish event.
                 * @override
                 * @param key Event name. If 'RETRY' passed, past published event will be republishing.
                 * @param args Event args. If a first argument was 'RETRY', specify history index.
                 * If empty, last event will be publishing.
                 */
                EventDispatcher.prototype.fire = function (key, args) {
                    if (key === 'RETRY') {
                        var target = this.history[args || this.history.length - 1];
                        if (target) {
                            target();
                        }
                        return;
                    }
                    if (!this.store.has(key)) {
                        return;
                    }
                    var subjects = this.store.get(key);
                    var fire = function () { return subjects.forEach(function (subject) { return subject.next(args); }); };
                    this.history.push(fire);
                    if (this.history.length > MAX_HISTORY_LENGTH) {
                        this.history.shift();
                    }
                    fire();
                };
                /**
                 * Fire event after specific time.
                 * @override
                 * @param time Time to delay.
                 * @param key Event name.
                 * @param args Event args.
                 */
                EventDispatcher.prototype.throttle = function (time, key, args) {
                    var _this = this;
                    setTimeout(function () {
                        _this.fire(key, args);
                    }, time);
                };
                /**
                 * Return callback function that will publish event.
                 * @override
                 * @param key Event name.
                 * @param v Event args. Override publish args.
                 */
                EventDispatcher.prototype.asCallback = function (key, v) {
                    var _this = this;
                    return function (args) { return _this.fire(key, core_1.isDefined(v) ? v : args); };
                };
                /**
                 * Same as asCallback.
                 * @override
                 * @param key Event name.
                 * @param v Event args.
                 */
                EventDispatcher.prototype.asc = function (key, v) {
                    return this.asCallback(key, v);
                };
                /**
                 * Dispose all subscriptions.
                 * @override
                 */
                EventDispatcher.prototype.end = function () {
                    this.store.end();
                };
                Object.defineProperty(EventDispatcher.prototype, "response", {
                    /**
                     * Return response of events.
                     * @override
                     */
                    get: function () {
                        return this.res;
                    },
                    enumerable: true,
                    configurable: true
                });
                return EventDispatcher;
            }());
            exports_1("EventDispatcher", EventDispatcher);
        }
    }
});
