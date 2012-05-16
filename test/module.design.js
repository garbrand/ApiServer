var Design = require('../modules/design');

describe('The Design Module', function() {
	it('should exist', function() {
		expect(Design).to.be.ok;
	});
	
	it('should expose its routes as its only api', function() {
		var api = ['dialogs'];
		
		for(var i=0; i < Design.length; i+=1) {
			expect(Design).to.have.property(api[i]);
		}
	});
});