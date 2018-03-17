/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = miscElements
const utility = require('./utility.js')

function miscElements(s) {
  
  this.dump = function() {
    utility.spew("* " + this.title)
    utility.spew("  (" + this.saveValue.code + ") " + this.saveValue.value)
    utility.spew("  (" + this.appliesToWhichItem.code + ") " + this.appliesToWhichItem.value)
    utility.spew("  (" + this.storeCoupon.code + ") " + this.storeCoupon.value)
    utility.spew("  (" + this.dontMultiplyFlag.code + ") " + this.dontMultiplyFlag.value)
  }
  
  function SVC(code) {
    this.code = code
    switch(this.code) {
      case '0':
        this.value = "Cents off purchase item"
        break
      case '1':
        this.value = "Purchase item is free (up to Save Value)"
        break
      case '2':
        this.value = "Number of purchase items free"
        break
      default:
        this.value = "Invalid code"
    }
  }
  
  function ATWIC(code) {
    this.code = code
    switch(code) {
      case '0':
        this.value = "Primary qualifying item"
        break
      case '1':
        this.value = "2nd qualifying item"
        break
      case '2':
        pthis.value = "3rd qualifying item"
        break
      default:
        this.value = "Invalid code"
    }
  }
  
  function SCC(code) {
    this.code = code
    switch(n) {
      case '0':
        this.value = "Not a store coupon"
        break
      case '1':
        this.value = "Applies to only 1 qualifying item"
        break
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
        this.value = "Applies to " + n + " qualifying items"
        break
      case '9':
        this.value = "Applies to all qualifying items"
        break
      default:
        this.value = "Invalid code"
    }
  }
  
  function DMF(code) {
    this.code = code
    if(code == '0') {
      this.value = "Allow Multiply"
    } else {
      this.value = "Don't allow multiply"
    }
  }
  
  this.title = "Miscellaneous Elements"
  let p = 0
  this.fieldType = s.substr(p++, 1)
  
  let n = s.substr(p++, 1);
  this.saveValue = new SVC(n)
  
  n = s.substr(p++, 1)
  this.appliesToWhichItem = new ATWIC(n)
  
  n = s.substr(p++, 1)
  this.storeCoupon = new SCC(n)

  n = s.substr(p++, 1)
  this.dontMultiplyFlag = new DMF(n)

  this.length = 4
  this.next = 5
}
