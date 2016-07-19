# Basics

## Create service.

react-mvi has service layer that create props of React Component.  
Usually service function or class is called by react-mvi by auto at time when you call __run__ function.  
But react-mvi how do distinguish service and other modules?

Examples

```typescript
import {
  service
} from '@react-mvi';

const s = service((io, injector) => {});
```

You only need attention to that line.

```typescript
const s = service((io, injector) => {});
```

We create service module from __service__ function.  
This __service__ function create function that was marked as service layer.  
So DI Container could distinguish service and other layer.

How is class?

Examples

```typescript
import {
  service
} from '@react-mvi';

@service
class Service {
  public initialize(io, injector) {
    return ...
  }
}
```

Only you need is use __service__ function as ES6 decorator.  
So this class marked as service layer.


## Service arugments.

Service layer accept two arguments.  
One is Map of IOResponse.
Second is Injector.

### What is IOResponse?

IOResponse is class that was created by IO modules.  
Usually IO modules was input that is accept external value or triggered by external event.  
Where the output of IO?  
IOResponse is that, this class represent the result of io and result value was flowed to  
Observable created by IOResponse.  

### How do I create Observable from IOResponse?

Simply, call __for__ method.  
All IOResponse has for method that create Observbale from string key.

Examples

```typescript
import {
  service,
  IOResponse
} from '@react-mvi';

const s = service(({event}: {[key: string]: IOResponse}, injector) => {
  const es = event.for('foo::bar').mapTo(1);
});
```

`event.for('foo::bar')` is what we want to do is.  
Observable created from __for__ method has string key which represent event name,  
And this string key associate both __input__ and __output__.

### What is Injector

Injector is DI Container factory.  
Injector is able to create instance from dependency tree that called as Module, passed at initializing.

Examples

```typescript
const s = service((io, injector) => {
  repository = injector.get('repository');
})
```

That example shows instantiation of Repository class from string key,  
that repository instance has resolved sub-dependencies.

Wanna know more?  
See [DI Container](./di_container.md)