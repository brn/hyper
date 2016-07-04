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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { io, Disposable, IOResponse, SubjectStore, isDefined } from '@react-mvi/core';
/**
 * History size.
 */
var MAX_HISTORY_LENGTH = 10;
/**
 * Event publisher.
 */
var EventDispatcher = (function () {
    function EventDispatcher() {
        /**
         * Subject store.
         */
        this.store = new SubjectStore();
        /**
         * Event history.
         */
        this.history = [];
        this.res = new IOResponse(this.store);
    }
    EventDispatcher.prototype.subscribe = function (props) {
        return new Disposable();
    };
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
        return function (args) { return _this.fire(key, isDefined(v) ? v : args); };
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
    EventDispatcher = __decorate([
        io, 
        __metadata('design:paramtypes', [])
    ], EventDispatcher);
    return EventDispatcher;
}());
EventDispatcher = EventDispatcher;