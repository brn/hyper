# Class ObservableBinding
Information about embedded observables and ReactElement.
## Index### Constructors* [constructor](_component_subscriber_.observablebinding.html#constructor)### Properties* [_observable](_component_subscriber_.observablebinding.html#_observable)* [updater](_component_subscriber_.observablebinding.html#updater)### Methods* [observable](_component_subscriber_.observablebinding.html#observable)* [update](_component_subscriber_.observablebinding.html#update)## Constructors### new ObservableBinding(updater: (value: any)=> void, _observable: Observable<any>): [ObservableBinding](_component_subscriber_.observablebinding.html)  * Defined in [component/subscriber.tsx:68](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L68)#### Parameters| Name | Type | Description || ---- | ---- | ---- || updater | (value: any)=> void|  || _observable | Observable<any>|  |#### Returns: [ObservableBinding](_component_subscriber_.observablebinding.html)## Properties### Private _observable: Observable<any>
		* Defined in [component/subscriber.tsx:69](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L69)### Private updater: (value: any)=> void
		* Defined in [component/subscriber.tsx:69](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L69)## Methods### observable(): Observable<[BindingObservableType](../interfaces/_component_subscriber_.bindingobservabletype.html)>Return Observable that flow BindingObservableType.  * Defined in [component/subscriber.tsx:75](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L75)#### Returns: Observable<[BindingObservableType](../interfaces/_component_subscriber_.bindingobservabletype.html)>### update(value: any): voidUpdate target element props or child.  * Defined in [component/subscriber.tsx:81](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L81)#### Parameters| Name | Type | Description || ---- | ---- | ---- || value | any|  |#### Returns: void
		Generated using [TypeDoc](http://typedoc.io)