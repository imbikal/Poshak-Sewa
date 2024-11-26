//import KhaltiCheckout from "khalti-checkout-web";
import myKey from "../Khalti/khaltikey"
let config = {
  publicKey: myKey.publicTestKey,
  productIdentity: "1007",
  productName: "mart",
  productUrl: "http://localhost:3000/",

  // one can set the order of payment options and also the payment options based on the order and items in the array
  paymentPreference: [
    "MOBILE_BANKING",
    "KHALTI",
    "EBANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default config;