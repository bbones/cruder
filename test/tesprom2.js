'use strict'

class A {
  constructor() {

  }

  b () {
    console.log('a');
  }

  c () {
    this.b()
    console.log('b');
  }
}

var a = new A();

a.b()
a.c()
