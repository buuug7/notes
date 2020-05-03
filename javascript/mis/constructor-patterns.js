/*constructor patterns examples*/

/*basic constructor pattern*/
function Person(name) {
  this.name = name;
}

var person1 = new Person('buuug7');
console.log(person1.name); // buuug7

/*constructor pattern with prototype*/
function Person(name) {
  this.name = name;
}

Person.prototype.toString = function() {
  return this.name;
};

var person2 = new Person('buuug8', 23);
console.log(person2.toString()); // buuug8 23

// 使用构造模式+IMME
// 使用构造器模式模拟类
var User = (function() {
  function User(name) {
    this.name = name;
  }

  User.prototype.hello = function() {
    console.log('I am ' + this.name);
  };

  User.log = function() {
    console.log('Log something ...');
  };

  return User;
})();

var user = new User('buuug7');
user.hello();
User.log();
