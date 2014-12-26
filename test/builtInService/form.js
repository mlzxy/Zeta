var Zeta=require('../../'),
    request=require('supertest'),
    demo=Zeta.module('demo',[]),
    should=require('chai').should(),
    formidable=require('formidable');
    demo.load();
//we use node-formidable as our form service
//so there is only one simple test
describe('$form',function(){
    it('should get the same form as node-formidable',function(){
        var myForm=demo.factory('$form')();
        var form=new formidable.IncomingForm();
        myForm.should.eql(form);
    });
});
