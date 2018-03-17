# coupon-barcode
Parse a North American coupon barcode

When you scan a barcode from a coupon you get an up to 70 character numeric string. This string has a great deal of information encoded in it; the value of the coupon, the number of qualifying items you must purchase in order to use the coupon, whether or not the value of the coupon should me allowed to be multiplied and many more things.

This project is a Javascript project which parses the barcode string and interprets it according to the GS1 Databar format (https://www.databar-barcode.info/).

This project would be helpful if you need to process large numbers of coupons.
