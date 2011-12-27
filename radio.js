/** 
 * Author: Scott Murphy twitter: @hellocreation, github: uxder
 * radio.js - The Chainable, Dependency Free Publish/Subscribe for Javascript
 */

(function(global) {
	"use strict";

	radio._ = {
		version: '0.0.1',
		channelName: "",
		channels: [],
		/**
		 * Broadcast (publish)
		 * Based on the current channelname set by the user, iterate through all listeners and send messages
		 * Messages are the arguments of the message can send unlimited parameters
		 * @return [this] this returns self for chaining
		 * @example
		 * 	  basic usage 
		 *        radio('channel1').broadcast('my message'); //will immediately run myFunction
		 *    send an unlimited number of parameters
		 * 		  radio('channel2').broadcast(param1, param2, param3 ... ); 		  
		 */
		broadcast: function() {
			var i, c = this.channels[this.channelName],
				l = c.length,
				listener, callback, context;
			//iterate through this channel and run each listener
			for (i = 0; i < l; i++) {
				//save the current listener into local var for performance
				listener = c[i];

				//if listener was an array, set the callback and context.
				if ((typeof(listener) === 'object') && (listener.length)) {
					callback = listener[0];
					//if user sent it without a context, set the context to the function
					context = (listener[1]) ? listener[1] : window;
				}

				//run the listener
				callback.apply(context, arguments);
			}
			return this;
		},

		/**
		 * Create the channel if it doesn't exist and set the current channel/event name
		 * @param[string] name the name of the channel
		 * @return[this] returns self for chaining
		 * @example
		 * 		radio('channel1');
		 */
		channel: function(name) {
			var c = this.channels;
			//create a new channel if it doesn't exists
			if (! (c[name])) c[name] = [];
			this.channelName = name;
			return this;
		},

		/**
		 * Add Listener to channel (subscribe)
		 * Take the arguments and add it to the this.channels array.
		 * @param[callback|array] arguments list of callbacks or arrays[callback, context] separated by commas
		 * @return [this] this returns self for chaining
		 * @example
		 *		//basic usage		
		 *      var callback = function() {};
		 *		radio('channel1').add(callback); //will run callback on 
		 *
		 *		radio('channel1').add(callback, callback2, callback3 ...); //you can add an endless amount of callbacks
		 * 	    
		 *		//adding callbacks with context
		 *  	radio('channel1').add([callback, context],[callback1, context], callback3);
		 */
		add: function() {
			var a = arguments,
				c = this.channels[this.channelName],
				i, l = a.length, p, ai = [];

			//run through each arguments and add it to the channel
			for (i = 0; i < l; i++) {
				ai = a[i];
				//add accepts either an array (fucntion, context) or just the function.
				//if the user send just a function, wrap the fucntion in an array [function]
				p = (typeof(ai) === "function") ? [ai] : ai;
				if ((typeof(p) === 'object') && (p.length)) c.push(p);
			}
			return this;
		},

		/**
		 * Remove Listener from channel (subscribe)
		 * Take the arguments and add it to the this.channels array.
		 * @param[function] callback list of callbacks to be removed separated by commas
		 * @return [this] this returns self for chaining
		 * @example
		 *		//basic usage		
		 *		radio('channel1').remove(callback); //will remove callback from channel1
		 *		radio('channel1').remove(callback, callback2, callback3 ...); //you can remove as many callbacks as you want
		 * 	    
		 *		//callbacks with context
		 *  	radio('channel1').add([callback, context]).remove(callback); //just remove the callback
		 */
		remove: function() {
			var a = arguments,
				i, j, 
				c = this.channels[this.channelName],
				l = a.length,
				cl = c.length,
				offset = 0,
				jo;
			//loop through each argument 
			for (i = l; i--;) {
				//reset variables that change as the channel array items are removed
				offset = 0;
				cl = c.length;
				//loop through the channel
				for (j = 0; j < cl; j++) {
					jo = j - offset;
					//if there is a match with the argument and the channel function remove it from the channel array
					if (c[jo][0] === a[i]) {
						//remove this item from the channel array
						c.splice(jo, 1); 
						offset++;
					}

				}
			}
			return this;
		}
	};

	/**
	 * Main Wrapper for radio._ and create a function radio to accept the channelName
	 */
	function radio(channelName) {
		radio._.channel(channelName);
		return radio._;
	}

	//add radio to window object
	(global.radio) ? global.radio : global.radio = radio;
})(window);
