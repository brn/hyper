# Class Subscriber
Subscriber component for Rx.Observable.This component provide an ability that subscribe rxjs stream props by auto detection of children components.### Extends* Component<any, any>### Implements* ComponentLifecycle<any, any>
	## Index### Constructors* [constructor](_component_subscriber_.subscriber.html#constructor)### Properties* [bindings](_component_subscriber_.subscriber.html#bindings)* [context](_component_subscriber_.subscriber.html#context)* [mutableTree](_component_subscriber_.subscriber.html#mutabletree)* [observableList](_component_subscriber_.subscriber.html#observablelist)* [props](_component_subscriber_.subscriber.html#props)* [refs](_component_subscriber_.subscriber.html#refs)* [state](_component_subscriber_.subscriber.html#state)* [subscription](_component_subscriber_.subscriber.html#subscription)### Methods* [cloneChildren](_component_subscriber_.subscriber.html#clonechildren)* [componentWillMount](_component_subscriber_.subscriber.html#componentwillmount)* [componentWillReceiveProps](_component_subscriber_.subscriber.html#componentwillreceiveprops)* [componentWillUnmount](_component_subscriber_.subscriber.html#componentwillunmount)* [createMutableElement](_component_subscriber_.subscriber.html#createmutableelement)* [disposeAll](_component_subscriber_.subscriber.html#disposeall)* [forceUpdate](_component_subscriber_.subscriber.html#forceupdate)* [isSubscriber](_component_subscriber_.subscriber.html#issubscriber)* [render](_component_subscriber_.subscriber.html#render)* [setState](_component_subscriber_.subscriber.html#setstate)* [subscribeAll](_component_subscriber_.subscriber.html#subscribeall)* [updateChildren](_component_subscriber_.subscriber.html#updatechildren)* [updateElement](_component_subscriber_.subscriber.html#updateelement)## Constructors### new Subscriber(p: any, c: any): [Subscriber](_component_subscriber_.subscriber.html)  * Overwrites Component.__constructor* Defined in [component/subscriber.tsx:116](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L116)#### Parameters| Name | Type | Description || ---- | ---- | ---- || p | any|  || c | any|  |#### Returns: [Subscriber](_component_subscriber_.subscriber.html)## Properties### Private bindings: [ObservableBinding](_component_subscriber_.observablebinding.html)[]
	All Embeded Observable informations.* Defined in [component/subscriber.tsx:106](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L106)### context:
	* Inherited from Component.context* Defined in [typings/globals/react/index.d.ts:172](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L172)### Private mutableTree: any
	Cloned mutable children tree.* Defined in [component/subscriber.tsx:116](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L116)### Private observableList: Array<any>
		Observable list that is pushed observable embeded in virtual dom trees.* Defined in [component/subscriber.tsx:111](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L111)### props: P & { children?: ReactElement<any> | string | number | {} | (ReactElement<any> | string | number ...
				* Inherited from Component.props* Defined in [typings/globals/react/index.d.ts:170](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L170)### refs: [key: string]: ReactInstance
				* Inherited from Component.refs* Defined in [typings/globals/react/index.d.ts:173](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L173)### state: any
				* Inherited from Component.state* Defined in [typings/globals/react/index.d.ts:171](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L171)### Private subscription: Subscription
				All subscriptions that are subscribed observable embeded in virtual dom trees.* Defined in [component/subscriber.tsx:101](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L101)## Methods### Private cloneChildren(el: React.ReactElement, parent: React.ReactElement, index: number): ReactElement<any>Clone all children trees that has mutable props, mutable children, recursively from root.  * Defined in [component/subscriber.tsx:237](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L237)#### Parameters| Name | Type | Description || ---- | ---- | ---- || el | React.ReactElement| Root React.ReactElement. || parent | React.ReactElement|  || index | number|  |#### Returns: ReactElement<any>### componentWillMount(): voidSubscribe all observable that embeded in vdom trees.  * Defined in [component/subscriber.tsx:140](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L140)#### Returns: void### componentWillReceiveProps(nextProps: any): voidReset all subscriptions and re subscribe all observables.  * Defined in [component/subscriber.tsx:149](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L149)#### Parameters| Name | Type | Description || ---- | ---- | ---- || nextProps | any|  |#### Returns: void### componentWillUnmount(): voidReset all subscriptions.  * Defined in [component/subscriber.tsx:176](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L176)#### Returns: void### Private createMutableElement(el: React.ReactElement): React.ReactElementCreate mutable ReactElement trees.  * Defined in [component/subscriber.tsx:221](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L221)#### Parameters| Name | Type | Description || ---- | ---- | ---- || el | React.ReactElement| A source ReactElement. |#### Returns: React.ReactElementMutable ReactElement like json.
						### Private disposeAll(): voidDispose all subscriptions and clear bindings.  * Defined in [component/subscriber.tsx:184](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L184)#### Returns: void### forceUpdate(callBack?: ()=> any): void  * Inherited from Component.forceUpdate* Defined in [typings/globals/react/index.d.ts:162](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L162)#### Parameters| Name | Type | Description || ---- | ---- | ---- || callBack? | ()=> any|  |#### Returns: void### Private isSubscriber(child: React.ReactElement): booleanCheck whether child is Subscriber or not.  * Defined in [component/subscriber.tsx:291](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L291)#### Parameters| Name | Type | Description || ---- | ---- | ---- || child | React.ReactElement| Child to check. |#### Returns: booleanReturn true is passed element type is Subscriber constructor or has SUBSCRIBER_MARK.
						### render(): anyRendering new vdom trees thatprops are replaced by result value of observable.  * Overwrites Component.render* Defined in [component/subscriber.tsx:132](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L132)#### Returns: any### setState(f: (prevState: any, props: any)=> any, callback?: ()=> any): voidsetState(state: any, callback?: ()=> any): void  * Inherited from Component.setState* Defined in [typings/globals/react/index.d.ts:160](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L160)#### Parameters| Name | Type | Description || ---- | ---- | ---- || f | (prevState: any, props: any)=> any|  || callback? | ()=> any|  |#### Returns: void  * Inherited from Component.setState* Defined in [typings/globals/react/index.d.ts:161](https://github.com/brn/react-mvi/blob/master/modules/core/src/typings/globals/react/index.d.ts#L161)#### Parameters| Name | Type | Description || ---- | ---- | ---- || state | any|  || callback? | ()=> any|  |#### Returns: void### Private subscribeAll(): voidSubscribe changes of observables.If observable was updated, children components are updated and rerendered.  * Defined in [component/subscriber.tsx:160](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L160)#### Returns: void### Private updateChildren(el: React.ReactElement, value: any, index: number): voidUpdate children elements.  * Defined in [component/subscriber.tsx:195](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L195)#### Parameters| Name | Type | Description || ---- | ---- | ---- || el | React.ReactElement| A parent ReactElement. || value | any|  || index | number|  |#### Returns: void### Private updateElement(parent: any, el: any, index: any): voidUpdate ReactElement to force update state of React Element Tree.  * Defined in [component/subscriber.tsx:277](https://github.com/brn/react-mvi/blob/master/modules/core/src/component/subscriber.tsx#L277)#### Parameters| Name | Type | Description || ---- | ---- | ---- || parent | any| Parent ReactElement of current updated ReactElement. || el | any| Updated ReactElement. || index | any|  |#### Returns: void
						Generated using [TypeDoc](http://typedoc.io)