/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = qualifyingPurchase2

const purchaseRequirement = require('./purchaseRequirement.js')
const utility = require('./utility.js')

function qualifyingPurchase2(s, title) {
  
  this.dump = function() {
    utility.spew("* (" + this.fieldType + ") " + this.title)
    utility.spew("    Additional Purchase Rules: (" + this.additionalPurchaseRules.code + ") " + this.additionalPurchaseRules.value)
    this.purchaseRequirement.dump()
    utility.spew("               Company Prefix: (" + this.companyPrefix.length + ") " + this.companyPrefix.value)
  }

  function APR(s) {
    this.code = s.substr(0, 1)
    this.length = 1
    this.next = 1
    switch(this.code) {
      case '0':
        this.value = "Primary or 2nd or 3rd item"
        break
      case '1':
        this.value = "Primary or second and 3rd items"
        break
      case '2':
        this.value = "Primary and 2nd or 3rd items"
        break
      case '3':
        this.value = "2nd or 3rd Family/Company Prefix"
        break
      default:
        this.value = "Invalid code"
    }
  }
  
  this.fieldType = s.substr(0, 1)
  this.title = title
  let s1 = s.substr(1)
  this.length = 1
  
  this.additionalPurchaseRules = new APR(s1)
  s1 = s1.substr(this.additionalPurchaseRules.next)
  this.length += this.additionalPurchaseRules.next
  
  this.purchaseRequirement = new purchaseRequirement(s1, "2nd Purchase")
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