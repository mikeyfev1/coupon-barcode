/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = requiredFields
const purchaseRequirement = require('./purchaseRequirement')
const utility = require('./utility.js')

function requiredFields(s) {
  
  this.dump = function() {
    utility.spew("*** Required fields")
    utility.spew("                 Raw barcode: " + this.barcode.substr(0, this.length))
    utility.spew("      Application Identifier: " + this.appId.value)
    utility.spew("          GS1 Company Prefix: " + "(" + this.companyPrefix.length + ") " + this.companyPrefix.value)
    utility.spew("                  Offer Code: " + this.offerCode.value)
    utility.spew("                  Save Value: " + "(" + this.saveValue.length + ") " + this.saveValue.value)
    this.primaryPurchaseRequirements.dump()
  }
  
  this.barcode = s
  this.length = 0
  this.appId = new utility.fixedField(s, 4)
  if(this.appId.value != "8110") { throw "requiredFields: Invalid Application identifier '" + this.appId.value }
  let s1 = s.substr(this.appId.length)
  this.length += this.appId.next
  
  this.companyPrefix = new utility.variableField(s1, 6)
  s1 = s1.substr(this.companyPrefix.next)
  this.length += this.companyPrefix.next
  
  this.offerCode = new utility.fixedField(s1, 6)
  s1 = s1.substr(this.offerCode.length)
  this.length += this.offerCode.next
  
  this.saveValue = new utility.variableField(s1, 0)
  s1 = s1.substr(this.saveValue.next)
  this.length += this.saveValue.next
  
  this.primaryPurchaseRequirements = new purchaseRequirement(s1, "Primary")
  this.length += this.primaryPurchaseRequirements.next
}
