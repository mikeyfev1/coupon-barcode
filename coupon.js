/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/

module.exports = coupon

const miscElements = require('./miscElements.js')
const requiredFields = require('./requiredFields.js')
const utility = require('./utility.js')
const qualifyingPurchase2 = require('./qualifyingPurchase2.js')
const qualifyingPurchase3 = require('./qualifyingPurchase3.js')
const serialNumber = require('./serialNumber.js')
const retailerCompanyPrefix = require('./retailerCompanyPrefix.js')


function couponDate(s, title) {
  
  this.dump = function() {
    let options = {weekday: "long", year: "numeric", month: "short", day: "numeric"}
    utility.spew("* (" + this.fieldType + ") " + this.title+ ": " + this.value.toLocaleDateString("en-us", options))
  }
  
  this.title = title
  this.fieldType = s.substr(0, 1)
  yy = s.substr(1, 2)
  mm = s.substr(3, 2)
  dd = s.substr(5, 2)
  this.value = new Date(mm + '/' + dd + '/' + '20' + yy)
  this.length = 6
  this.next = 7
}

function coupon(s) {
  
  this.dump = function() {
    
    utility.spew("*** Optional fields")
    if(typeof(this.qualifyingPurchase2) != "undefined") {
      this.qualifyingPurchase2.dump()
    }
    if(typeof(this.qualifyingPurchase3) != "undefined") {
      this.qualifyingPurchase3.dump()
    }
    if(typeof(this.expiryDate) != "undefined") {
      this.expiryDate.dump()
    }
    if(typeof(this.startDate) != "undefined") {
      this.startDate.dump()
    }
    if(typeof(this.serialNumber) != "undefined") {
      this.serialNumber.dump()
    }
    if(typeof(this.retailerCompanyPrefix) != "undefined") {
      this.retailerCompanyPrefix.dump()
    }
    if(typeof(this.miscellaneousElements) != "undefined") {
      this.miscellaneousElements.dump()
    }
  }
  
  this.requiredFields = new requiredFields(s)
  this.requiredFields.dump()

  let s1 = s.substr(this.requiredFields.length)
  while(s1.length > 0) {
    switch(s1.substr(0, 1)) {
      case '1':
        utility.spewD("optional fields type 1: " + s1)
        this.qualifyingPurchase2 = new qualifyingPurchase2(s1, "2nd Qualifying Purchase")
        s1 = s1.substr(this.qualifyingPurchase2.next)
        break
      case '2':
        utility.spewD("optional fields type 2: " + s1)
        this.qualifyingPurchase3 = new qualifyingPurchase3(s1, "3rd Qualifying Purchase")
        s1 = s1.substr(this.qualifyingPurchase3.next)
        break
      case '3':
        utility.spewD("optional fields type 3: " + s1)
        this.expiryDate = new couponDate(s1, "Expiry date")
        s1 = s1.substr(this.expiryDate.next)
        break
      case '4':
        utility.spewD("optional fields type 4: " + s1)
        this.startDate = new couponDate(s1, "Start date")
        s1 = s1.substr(this.startDate.next)
        break
      case '5':
        utility.spewD("optional fields type 5: " + s1)
        this.serialNumber = new serialNumber(s1, "Serial Number")
        s1 = s1.substr(this.serialNumber.next)
        break
      case '6':
        utility.spewD("optional fields type 6: " + s1)
        this.retailerCompanyPrefix = new retailerCompanyPrefix(s1, "Retailer Company Prefix/GLN")
        s1 = s1.substr(this.retailerCompanyPrefix.next)
        break
      case '9':
        utility.spewD("optional fields type 9: " + s1)
        this.miscellaneousElements = new miscElements(s1, "Miscellaneous Elements")
        s1 = s1.substr(this.miscellaneousElements.next)
        break
      default:
        utility.spewE("Unparsed barcode string: '" + s1 + "'")
        return
    }
  }
}


var fileInput = require('fs').readFileSync('data.txt').toString().split(/\r?\n/)
for(let i = 0; i < fileInput.length; i++) {
  utility.spew("\n\n******************************** BARCODE #" + (i + 1).toString() + " *******************************")
  let barcode = fileInput[i].substr(19)
  barcode = barcode.substr(0, barcode.length - 1)
  utility.spew("\n***** Original bar code: " + barcode)
  try {
    let c = new coupon(barcode)
    c.dump()
  }
  catch (e) { }
}
