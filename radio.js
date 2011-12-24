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
		 * Publish
		 */
		broadcast: function() {
			var		i,
				    cn = this.channelName,
					c = this.channels;
			for (i in c[cn]) {
				if(typeof(c[cn][i]) == "function") {
					 c[cn][i].apply(c[cn][i], [arguments].splice(i,1));
				} else if(c[cn][i][1]) {
					c[cn][i][0].apply(c[cn][i][1], [arguments].splice(i,1));
				} else {
					c[cn][i][0].apply(c[cn][i][0], [arguments].splice(i,1));
				}
			}
			return this;
		},
		
		/**
		 * Set the current channel name
		 */
		channel: function(name) {
			this.channelName = name;
			return this;
		},
		
		/**
		 * Add Listener to channel
		 * @param[callback|array] callback list of callbacks separated by commas
		 * @return [this] this returns self for chaining
		 * @example
		 *		//basic usage		
		 *		radio('channel1').add(callback); //will run callback on 
		 *		radio('channel1').add(callback, callback2, callback3 ...); //add an endless amount of callbacks
		 * 	    
		 *		//adding callbacks with context
		 *  	radio('channel1').add([callback, context],[callback1, context], callback3);
 		 */
		add: function() {
				var a = arguments,
					s = this.channels,
					i, 
					sn = this.channelName,
					l= a.length;
				//if new channel register it
				if (!s[sn]) s[sn] = [];
				//run through the arguments 
				for(i=0; i<l;i++) {
					//add listener
					s[sn].push(a[i]);
				}
				return this;
		},
		
		/**
		 * Remove Listeners from Stations
		 */
		remove: function() {
			var a = arguments,
				i, 
				l= a.length;
			//run through the arguments 
			for(i=0; i<l;i++) {
				this._removeOne(a[i]);
			}
			return this;
		},
	
		/**
		 * Remove one listener from channel
		 */
		_removeOne: function(func) {
			var s = this.channels,
				sn = this.channelName,
				i, 
				l= s[sn].length;
			
			for(i=0; i<l;i++) {
				if(s[sn][i] === func) s[sn].splice(i,1);
			}
		},
		/**
		 * return Array of all channels and listeners
		 */
		all: function(){
			return this.channels;
		}
	};
	
	/**
	 * Wrapper for radio._
	 */
	function radio(channelName) {
		radio._.channel(channelName);
		return radio._;
	}
	
	//add radio to window object
	(global.radio) ? global.radio : global.radio = radio;
})(window);
