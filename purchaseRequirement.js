/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = purchaseRequirement
const utility = require('./utility.js')

function purchaseRequirement(s, title) {
  
  this.dump = function() {
    utility.spew("         Purchase Requirement: " + "(" + this.requirement.length + ") " + this.requirement.value)
    utility.spew("                Purchase Code: " + "(" + this.code.code + ") " + this.code.value)
    utility.spew("         Purchase Family Code: " + this.familyCode.value)
  }
  
  function PRC(c) {
    this.length = 1
    this.code = c
    this.next = 1
    switch(this.code) {
      case '0':
        this.value = "Number of units"
        break
      case '1':
        this.value = "Value of qualifying items"
        break
      case '2':
        this.value = "Value of total transaction"
        break
      case '3':
        this.value = "Number of pounds"
        break
      case '4':
        this.value = "Number of kilograms"
        break
      default:
        this.value = "Invalid code"
    }
  }
 
  this.title = title
  this.length = 0
  this.requirement = new utility.variableField(s, 0)
  let s1 = s.substr(this.requirement.next)
  this.length += this.requirement.next
  
  this.code = new PRC(s1.substr(0, 1))
  s1 = s1.substr(this.code.length)
  this.length += this.code.next
  
  this.familyCode = new utility.fixedField(s1, 3)
  this.length += this.familyCode.next
  this.next = this.length
}