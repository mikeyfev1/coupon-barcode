/*
This code is covered by MIT License

Copyright (c) 2018 Michael Frederick
*/
module.exports = { spew, spewD, spewE, getLength, variableField, fixedField }

function spew(s) { console.log(s); }
function spewD(s) { spew("DEBUG: " + s) }
function spewE(s) { spew("ERROR: " + s) }

function getLength(c, bias) {
  let n = parseInt(c, 10)
  if(isNaN(n)) { throw "getLength: Length character '" + c.toString() + "' is not a number" }
  if(isNaN(bias)) { throw "getLength: Offset '" + bias.toString() + "' is not a number" }
  switch(bias) {
    case 0:
      if(n < 1 || n > 5) {
        throw "getLength: For +0 fields, the length character '" + c.toString() + "' value must be [1-5]"
      }
      break
  }
  return (n + bias)
}

function variableField(s, bias) {
  this.lengthChar = s.substr(0,1)
  this.length = getLength(this.lengthChar, bias)
  this.value = s.substr(1, this.length)
  this.next = this.length + 1
}

function fixedField(s, length) {
  this.length = length
  this.value = s.substr(0, length)
  this.next = length
}