/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = retailerCompanyPrefix

const utility = require('./utility.js')

function retailerCompanyPrefix(s, title) {
  
  this.dump = function() {
    utility.spew("* (" + this.fieldType + ") " + this.title + ": (" + this.prefix.length + ") " + this.prefix.value)
  }

  this.fieldType = s.substr(0, 1)
  this.title = title
  let s1 = s.substr(1)
  this.length = 1
    
  this.prefix = new utility.variableField(s1, 6)
  this.length += this.prefix.next
  this.next = this.length
}