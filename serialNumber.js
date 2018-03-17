/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = serialNumber

const utility = require('./utility.js')

function serialNumber(s, title) {
  
  this.dump = function() {
    utility.spew("* (" + this.fieldType + ") " + this.title + ": (" + this.number.length + ") " + this.number.value)
  }

  this.fieldType = s.substr(0, 1)
  this.title = title
  let s1 = s.substr(1)
  this.length = 1
    
  this.number = new utility.variableField(s1, 6)
  this.length += this.number.next
  this.next = this.length
}