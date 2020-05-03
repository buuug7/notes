/*the module pattern example*/
var myNamespace = (function() {
  var myPrivateVar, myPrivateMethod;
  myPrivateVar = 0;
  myPrivateMethod = function() {
    console.log(myPrivateVar);
  };
  return {
    myPublicVar: "foo",
    myPublicMethod: function() {
      myPrivateVar++;
      myPrivateMethod();
    }
  };
})();

myNamespace.myPublicVar; // foo
myNamespace.myPrivateMethod(); // 1
