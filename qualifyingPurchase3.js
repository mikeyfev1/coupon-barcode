/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = qualifyingPurchase3

const purchaseRequirement = require('./purchaseRequirement.js')
const utility = require('./utility.js')

function qualifyingPurchase3(s, title) {
  
  this.dump = function() {
    utility.spew("* (" + this.fieldType + ") " + this.title)
    this.purchaseRequirement.dump()
    utility.spew("               Company Prefix: (" + this.companyPrefix.length + ") " + this.companyPrefix.value)
  }

  this.fieldType = s.substr(0, 1)
  this.title = title
  let s1 = s.substr(1)
  this.length = 1
  
  this.purchaseRequirement = new purchaseRequirement(s1, "3rd Purchase")
  s1 = s1.substr(this.purchaseRequirement.next)
  this.length += this.purchaseRequirement.next
  
  this.companyPrefix = new utility.variableField(s1, 6)
  if(this.companyPrefix.lengthChar == "9") {
    this.companyPrefix.length = 0
    this.companyPrefix.value = "n/a"
    this.companyPrefix.next = 1
  }
  this.length += this.companyPrefix.next
  this.next = this.length
}