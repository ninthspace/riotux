
<p align="center">
  <a href="http://luisvinicius167.github.io/riotux/"><img src ="https://files.slack.com/files-pri/T02QC0DMD-F0WPW57TJ/riotux_logo.png?pub_secret=d695cfd8bd" alt="riotux event controller inspired in Flux Pattern." width="300" style="max-width:100%;"/></a>
</p>

## Intro 
Simple Event Controller for Riot.js, inspired in Flux Pattern. **riotux** provides more organization for data store in your application. Stores can talk with other Stores and Views, that can talk to Stores too. The Dispatcher provides that your Views can talk with other Views.

### Examples:
<a href="http://luisvinicius167.github.io/riot-riotux-blog">Blog example with Riot.js and riotux</a><br>
<a href="https://medium.com/@luisvinicius/riotux-event-controller-inspired-in-flux-8deaea738305#.ehsjexxl1"> A brief introduction about riotux</a>

### Install
Requires Riot 2.0+

* Npm: ``` npm install riotux ```
* Bower: ``` bower install riotux ```

### Stores: 
The Stores are a riot.observable(). Stores can talk with other Stores and Views. The event will applied for the Store that you passing in argument like 'storeName'. If you have two methods with the same name, don't worry, the method that will be call is the method to the store that have the same name that you passed in arguments.

Stores Data-Flow example:
```javascript
// Your Car Store
function CarStore ( ) {
  riot.observable(this);
  
  // listen to 'start' event
  this.on('start', function ( person ) {
    console.log(person + ' started the Car.')
    // Emmit the method for view that listen to
    this.trigger('carMoving', person);
  });
};

var carStore = new CarStore();
riotux.addStore('carStore', carStore);
```

```javascript
// Your Person Store
function PersonStore ( ) {
  riot.observable(this);
 
  // listen to 'startCar' event
  this.on('startCar', function ( person ) {
    riotux.trigger('carStore', 'start', person);
  });
};

var personStore = new PersonStore();
riotux.addStore('personStore', personStore);
```

```javascript
/**----------------------------------- 
  * Data-Flow: View -> personStore -> carStore -> View.
  *-----------------------------------
  * When the View is mounted, trigger the event 'startCar' to 
  * personStore, passing 'You' like argument.
  * The personStore trigger the event to carStore passing the argument too.
  * carStore recieves and trigger for the Views that listen to event.
  */

// In your component .tag
this.on('mount', function ( ) {
  riotux.trigger('personStore', 'startCar', 'You');
});

// listen the method from carStore
riotux.on('carStore', 'carMoving', function (person) {
  console.log(person + ' started the Car.');
});

// > output: You started the Car.
```

### Dispatcher
The Dispatcher connects your Views with other Views. If you need to listen a method present in other View, inside your View, you need register this using the method ```riotux.listen```, that will register your method inside the Dispatcher. You can use the method```riotux.emmit```, passing the event name for the method that you want, to trigger to other View that listen the method.

Dispatcher Data-Flow example in View:

```html
<!-- In your .tag view -->

<script>
    var self = this; 
    self.status = false;
    
    self.on('mount', function(){
      riotux.emmit('eventName', 'Argument');  
    });
</script>
```

```html
<!-- In your other .tag view -->

<script>
    var self = this; 
    self.status = false;
    
    riotux.listen('eventName', function ( arg ) {
      console.log(arg);
    });

</script>
// > output: Argument.
```

### API
All Stores should be created and registered before the Riot app is mounted to works fine.

Add an Store:
 * ```riotux.addStore(storeName, Store)```
 
**Stores**:
 
 * ```riotux.on(storeName, event, callback)```: listen the event for the Store that pass like storeName.
 
 * ```riotux.trigger(storeName, event [, args])```: trigger the event for the Store that pass like storeName. 
 
 * ```riotux.one(storeName, event, callback)```: listen the event, just one time, for the Store that pass like storeName.
 
 * ```riotux.off(storeName, event [, callback])```: Cancel the event for the Store that pass like storeName.


**Dispatcher**:
 
 * ```riotux.listen(event, callback)```: listen an event 
 
 * ```riotux.emmit(event [, args])```: trigger an event. 
 
 * ```riotux.listenOne(event, callback)```: listen an event, just one time. 
 
 * ```riotux.cancel(event [, callback])```: remove an event. 

**Helper methods**:
 
 * ```riotux.getDispatcherEvents( eventAPI )```: return the events initialized in Dispatcher at the momen, eventAPI can be: ```listen```, ```listenOne```, ```emmit``` and ```cancel```.

### License
MIT License.
