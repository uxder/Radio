/*
 * 	Test Object
 */
var	test = {
		selfTest : function() {
			return this;
		},
		add: function() {
			1+1;
		}
	}

/*
 * 	Core Tests
 */
describe("Radio Core Test", function() {
  beforeEach(function() {
			f = function(){};
			f2 = function() {};
			f3 = function() {};
  });
 	 describe("When radio is loaded", function() {
		    it("should be global and accessible", function() {
			  	expect(radio).toBeDefined();
		    });
	
			it("should return a version number", function() {
				 expect(radio._.version).toBeDefined();
			});
	  });
	
	 describe("radio() method", function() {
		    it("should set the channel name", function() {
				radio('channel1');
			  	expect(radio._.channelName).toBe('channel1');
		    });
			it("requires a string", function() {
				radio('channel1');
			  	expect(radio._.channelName).toBe('channel1');
		    });
	  });

	 describe("radio.channel method", function() {
		 	it("should set the channel name", function() {
				radio('test').channel('channel1');
			  	expect(radio._.channelName).toBe('channel1');
		    });
		    it("should make multiple channels chainable", function() {
				radio('channel1').add(f,f).channel('channel2').add(f);
			  	expect(radio._.channelName).toBe('channel2');
				expect(radio._.channels.channel1.length).toBe(2);
				expect(radio._.channels.channel2.length).toBe(1);
		    });
			it("should create a new channel if it doesn't exists", function() {
				expect(radio._.channels['test']).not.toBeDefined();
				radio('test');
				expect(radio._.channels['test']).toBeDefined();
			});

	  });
	
	
 	describe("radio.add method", function() {
					it("should register a single listener to a channel", function() {
						 var test = radio('channel1').add(f);
						 expect(radio._.channels.channel1.length).toBe(1);
					});
					it("should add multiple listeners to a channel", function() {
						 radio('channel1').add(f,f,f);
						 expect(radio._.channels.channel1.length).toBe(3);
					});
					it("it should suppport adding listerners with setting the context of 'this'", function() {
							 radio('channel1').add([test.selfTest, test]);
							 expect(radio._.channels.channel1.length).toBe(1);
					});
					it("it should a combination of adding functions and anonymous functions", function() {
								 radio('channel1').add(f,[test.selfTest, test], f2);
								 expect(radio._.channels.channel1.length).toBe(3);
					});
					it("it should not allow a non-function or array to be added", function() {
									 radio('channel1').add("string", f);
									 expect(radio._.channels.channel1.length).toBe(1);
									 radio('channel1').add(2, f);
									 expect(radio._.channels.channel1.length).toBe(2);
					});
					it("should be chainable", function() {
						 radio('channel1').add(f).add(f2);
						 expect(radio._.channels.channel1.length).toBe(2);
					});
	  });

  	describe("radio.remove method", function() {
					it("should remove a listener from a channel", function() {
						 radio('channel1').add(f);
						 expect(radio._.channels.channel1.length).toBe(1);
						 radio('channel1').remove(f);
						 expect(radio._.channels.channel1.length).toBe(0);
					});
					it("should remove multiple listeners from a channel", function() {
						 radio('channel1').add(f,f2,f3);
						 expect(radio._.channels.channel1.length).toBe(3);
						 radio('channel1').remove(f);
						 expect(radio._.channels.channel1.length).toBe(2);
					});
					it("should remove duplicate listeners from a channel", function() {
							 radio('channel1').add(f,f,f);
							 expect(radio._.channels.channel1.length).toBe(3);
							 radio('channel1').remove(f);
							 expect(radio._.channels.channel1.length).toBe(0);
					});
					it("should remove listeners add with context from channel", function() {
						 radio('channel1').add([test.selfTest, test], f);
						 expect(radio._.channels.channel1.length).toBe(2);
						 radio('channel1').remove(test.selfTest);
						 expect(radio._.channels.channel1.length).toBe(1);
					});
					it("should be chainable", function() {
							 radio('channel1').add(f, f2, f3).remove(f2);
							 expect(radio._.channels.channel1.length).toBe(2);
					});
	  });

  	describe("radio.broadcast method", function() {
					it("should call each listener only once", function() {
						spyOn(test, 'add');
						spyOn(test, 'selfTest');
						radio('channel1').add([test.selfTest, test], [test.add, test]);
						expect(radio._.channels.channel1.length).toBe(2);
						radio('channel1').broadcast('test');
						expect(test.selfTest).toHaveBeenCalled();
						expect(test.add).toHaveBeenCalled();	
					});
	  });
	

	
	afterEach(function() {
		//clear out the channels.
		radio._.channels = [];
	});
});




 

