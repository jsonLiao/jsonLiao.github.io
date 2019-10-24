/**
 * ES5
 */
function Person(name, age, gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
}
Person.prototype.incrementAge = function() {
    return this.age += 1;
};

function chlidren(name, age, gender, occupation, hobby) {
    Person.call(this, name, age, gender);
    this.occupation = occupation;
    this.hobby = hobby;
}
chlidren.prototype = Object.create(Person.prototype);
chlidren.prototype.constructor = chlidren;
chlidren.prototype.incrementAge = function() {
    var num = Person.prototype.incrementAge.call(this);
    num += 20;
    return num;
};

var user1 = new chlidren("wang", 20, "aaaa", "bbbb", "cccc");
user1.incrementAge();
console.log(user1.age)


/**
 * ES6
 */
class Person {
    constructor(name, age, gender) {
        this.name = name;
        this.age = age;
        this.gerder = gender;
    }
    incrementAge() {
        this.age += 1;
    }
}
class chlidren extends Person {
    constructor(name, age, gender, occupation, hobby) {
        super(name, age, gender);
        this.occupation = occupation;
        this.hobby = hobby;
    }
    incrementAge() {
        super.incrementAge()
    }
}

var user2 = new chlidren("wang", 20, "aaaa", "bbbb", "cccc");
user2.incrementAge();
console.log(user2.age)

