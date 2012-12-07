// 
//  viewport.js
//  ApiServer
//  
//  Created by Garbrand van der Molen on 2012-05-22.
//  Copyright 2012 Informaat IPE BV. All rights reserved.
// 

// # Viewport
// Create a viewport, that can either be resized manually or set to simulate a device such as a tablet. 
// This allows us to evaluate a design as it would render on a device.
// 
// ## Basic usage:
// 	var viewport = new Viewport();
// 	viewport.init();
// 	viewport.simulate('iphone3');


function Viewport() {
	// # Cached selectors
	var $viewport = 	$('#viewport');
	var $canvas = 		$('#canvas');
	var $handle = 		$('.handle');
	
	
	// # Model
	var model = {
		  current: 'none'
		, devices: {
			  'iphone3': { width: 320,  height: 480, flip: true }
			, 'iphone4': { width: 640,  height: 960, flip: true }
			, 'tablet':  { width: 1024, height: 768, flip: true }
			, 'desktop': { width: 1366, height: 768, flip: false}
		}
		
		, flipDevice: function(device) {
			var dev = model.devices[device];
			var flip = [];

			flip.push(dev.width);
			flip.push(dev.height);
			
			dev.width = flip[1];
			dev.height = flip[0];
			dev.flip = !dev.flip;
			
			return controller.simulate(device);
		}
	};
	
	
	// # View
	var view = {
		template: {
			option: function(device, selected) {
				return '<option' + device == selected ? ' selected=true' : '' + '>' + device + '</option>';
			},
			select: function() {
				return '<select></select>';
			}
		}
	};
	
	
	// # Controller
	var controller = {
		resize: function(event, ui) {
			$canvas.resizable({
				handles: 'e, w'
				, resize: function(event, ui) {
					var $this = $(this);
					var width = $this.width();
					
					controller.setWidth(width);
				}
			});
		}
		, init: function() {
			// Hook up the events
			controller.resize();
		}
		
		, setWidth: function(width) {
			var margin = Math.round( width/2 ) * -1;
			
			return $canvas.css({
				  width: width
				, "margin-left": margin + 'px'
				, left: '50%'
			});	
		}
		
		, setHeight: function(height) {
			return $canvas.css({
				height: height + 'px'
			});
		}
		
		, simulate: function(device) {
			// Takes a `device` as a string, applies the associated size in `model.devices`
			controller.setWidth(model.devices[device].width);
			controller.setHeight(model.devices[device].height);
			return model.current = device;
		}
	};
	
	
	// # API
	var api = {
		init: controller.init
		, simulate: controller.simulate
		, flip: model.flipDevice
	};
	
	return api;
};