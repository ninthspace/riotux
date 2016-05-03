riot.tag2('one', '<h1>Counter: { counter }</h1>', '', '', function(opts) {
    var self = this;
    riotux.subscribe(self, 'counter');
    
    self.on('mount', function() {
      console.log('Calling the action for change the #counter state in the ', this.root, ' tag.');
      setTimeout(function(){
        riotux.action('counter', 'change_count', 2);
      }, 3000);
    });

    self.on('update', function ( ) {
      self.counter = riotux.getter('counter');
    });
});

riot.tag2('two', '<h1>Tag two Counter: { counter }</h1>', '', '', function(opts) {
    var self = this;
    riotux.subscribe(self, 'counter');

    self.on('update', function ( ) {
      self.counter = riotux.getter('counter');
    });
});