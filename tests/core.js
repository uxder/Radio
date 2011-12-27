/*
 * 	Core Tests
 */
describe("Radio Core Test", function() {
  beforeEach(function() {
			f = function(){};
			f2 = function() {};
			f3 = function() {};
			test = {
				self : function() {
					return this;
				}
			}
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

			});

	  });
	
	
 	describe("radio.add method", function() {
					it("should register a single listener to a channel", function() {
						 radio('channel1').add(f);
						 expect(radio._.channels.channel1.length).toBe(1);
					});
					it("should add multiple listeners to a channel", function() {
						 radio('channel1').add(f,f,f);
						 expect(radio._.channels.channel1.length).toBe(3);
					});
					it("it should suppport context", function() {
							 radio('channel1').add(f,f,f);
							 expect(radio._.channels.channel1.length).toBe(3);
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
					it("should be chainable", function() {
							 radio('channel1').add(f, f2, f3).remove(f2);
							 expect(radio._.channels.channel1.length).toBe(2);
					});
	  });

  	describe("radio.broadcast method", function() {
					it("should call each listener only once", function() {
					
					});
					it("should not fail even if the channel has never been created", function() {
					
					});
	  });
	

	
	afterEach(function() {
		//clear out the channels.
		radio._.channels = [];
	});
});



	
 

