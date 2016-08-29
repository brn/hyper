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
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
export declare const IO_MARK: symbol;
/**
 * Decorator for io module.
 */
export declare function io<T extends Function>(target: T): void;
/**
 * Represent IO response.
 */
export declare class IOResponse {
    private subjectStore;
    constructor(subjectStore: SubjectStore);
    /**
     * Get a subject by specify key.
     * @param key Subject name.
     * @returns Registered Subject.
     */
    for<T>(key: string): Observable<T>;
}
/**
 * Hold Subject cache.
 */
export declare class SubjectStore {
    private subjectMap;
    constructor(subjectMap?: {
        [key: string]: Subject<any>;
    });
    hasWithoutGlobal(key: string): boolean;
    /**
     * Check whether Subject was defined with specific key or not.
     * @param key Subject name.
     * @return True if Subject was defined.
     */
    has(key: string): Subject<any> | boolean;
    getWithoutGlobal(key: string): Subject<any>;
    /**
     * Get Subject by specific key.
     * @param key Subject name.
     * @returns Registered Subject.
     */
    get(key: string): Subject<any>[];
    /**
     * Append new Subject.
     * @param key Subject name.
     * @returns Registered Subject.
     */
    add<T>(key: string): Subject<T>;
}
/**
 * Interface for IO processor.
 */
export interface IO {
    response: IOResponse;
    /**
     * Wait observable.
     * @param request Disposable.
     */
    subscribe(props: {
        [key: string]: any;
    }): Subscription;
    /**
     * Publish specified key io event.
     * @param key Event name.
     * @param args Event args.
     */
    push(key: string, args?: any): void;
    /**
     * Get callback function that publish specified key event.
     * @param key Event name.
     * @param v Event args that override event args.
     * @returns Function that publish event.
     */
    callback(key: string, value?: any): (args?: any) => void;
}
export declare abstract class Outlet implements IO {
    protected store: SubjectStore;
    private ioResponse;
    constructor();
    abstract subscribe(props: {
        [key: string]: any;
    }): Subscription;
    readonly response: IOResponse;
    abstract push(key: string, args?: any): any;
    abstract callback(key: string, value?: any): any;
}
export interface BasicIOTypes {
    http: IO;
    event: IO;
    storage: IO;
}
