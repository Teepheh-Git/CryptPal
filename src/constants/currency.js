import React from "react";
import { icons } from "../constants/";


export const usd = {
  name: "dollar",
  symbol: "$",
  ticker: "USD",
  image: icons.usdImage,
};
export const ngn = {
  name: "naira",
  symbol: "₦",
  ticker: "NGN",
  image: icons.ngnImage,

};
export const eur = {
  name: "euro",
  symbol: "€",
  ticker: "EUR",
  image: icons.eurImage,

};
export const jpy = {
  name: "yen",
  symbol: "¥",
  ticker: "JPY",
  image: icons.yenImage,

};


export const selectedCurrency = usd;

const appCurrency = {
  usd,
  ngn,
  eur,
  jpy,

};


export default appCurrency;
