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
var React = require('react');
var Rx_1 = require('rxjs/Rx');
var injector_1 = require('../di/injector');
var io_1 = require('../io/io');
var lodash_1 = require('../shims/lodash');
/**
 * React contextTypes.
 */
exports.ContextReactTypes = {
    createProps: React.PropTypes.func,
    clean: React.PropTypes.func,
    connect: React.PropTypes.func,
    injector: React.PropTypes.object,
    io: React.PropTypes.object
};
/**
 * Check param is immutablejs object or not.
 */
var isImmutable = function (v) { return v['isIterable'] && v['isIterable'](); };
/**
 * Call connect method of the ConnectableObservable for all properties of props.
 */
var connect = function (v, k) {
    if (!v) {
        return;
    }
    if (v instanceof Rx_1.ConnectableObservable) {
        return v.connect && v.connect();
    }
    if (isImmutable(v)) {
        return v;
    }
    if (Object.getPrototypeOf(v) !== Object.prototype) {
        return;
    }
    lodash_1._.forIn(v, function (v, k) {
        if (!v) {
            return;
        }
        if (v instanceof Rx_1.ConnectableObservable && v.connect) {
            v.connect();
        }
        else if (isImmutable(v)) {
            return v;
        }
        else if (lodash_1._.isArray(v)) {
            v.forEach(connect);
        }
        else if (lodash_1._.isObject(v)) {
            if (Object.getPrototypeOf(v) !== Object.prototype) {
                return;
            }
            lodash_1._.forIn(v, connect);
        }
    });
};
/**
 * @class
 */
var Context = (function (_super) {
    __extends(Context, _super);
    function Context(props, c) {
        _super.call(this, props, c);
        var self = this;
        var injector = new injector_1.Injector(props.modules);
        var ioModules = {};
        io_1.getIOModules().map(function (k) { return ioModules[k] = injector.get(k); });
        var services = injector.get(/Service$/);
        this.contextObject = {
            createProps: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var ioResposens = lodash_1._.mapValues(ioModules, function (v) { return v ? v.response : null; });
                return services.reduce(function (props, service) {
                    var result;
                    if (typeof service.initialize !== 'function') {
                        result = service.apply(void 0, [ioResposens, injector].concat(args));
                    }
                    else {
                        result = service.initialize();
                    }
                    if ('http' in result && ioModules['http']) {
                        lodash_1._.forIn(result['http'], function (v) { return ioModules['http'].wait(v); });
                    }
                    return lodash_1._.assign(props, result);
                }, {});
            },
            clean: function () {
                lodash_1._.forIn(ioModules, function (io) { return io.end(); });
            },
            connect: connect,
            injector: injector,
            io: ioModules
        };
    }
    Context.prototype.render = function () {
        return this.props.children;
    };
    Context.prototype.getChildContext = function () {
        return this.contextObject;
    };
    Object.defineProperty(Context, "childContextTypes", {
        get: function () {
            return exports.ContextReactTypes;
        },
        enumerable: true,
        configurable: true
    });
    return Context;
}(React.Component));
exports.Context = Context;
/**
 * Decorator to set specified type as context type.
 */
function context(target) {
    target['contextTypes'] = exports.ContextReactTypes;
}
exports.context = context;
function setContext(component) {
    component['contextTypes'] = exports.ContextReactTypes;
}
exports.setContext = setContext;