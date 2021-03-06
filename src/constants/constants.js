import { BaseToast, ErrorToast } from "react-native-toast-message";
import { COLORS } from "./theme";
import React from "react";

const slides = [
  {
    id: 1,
    title: "Track your Cryptocurrency in Realtime",
    image: require("../assets/images/chart_onboard.png"),
  },
  {
    id: 2,
    title: "Check price overview, coin details and available exchange",
    image: require("../assets/images/search_onboard.png"),


  }, {
    id: 3,
    title: "Stay up to date with latest Cryptocurrency news",
    image: require("../assets/images/folder_onboard.png"),


  },
];

let categoryList = [
  { label: "Smart Contract", value: "smart-contract-platform" },
  { label: "DeFi", value: "decentralized-finance-defi" },
  { label: "Exchange Based", value: "exchange-based-tokens" },
  { label: "Gaming", value: "gaming" },
  { label: "NFTs", value: "non-fungible-tokens-nft" },
  { label: "Meme Tokens", value: "meme-token" },
  { label: "Arbitrum", value: "arbitrum-ecosystem" },
  { label: "CEX", value: "centralized-exchange-token-cex" },
  { label: "Stable Coins", value: "stablecoins" },
  { label: "Governance", value: "governance" },
  { label: "Analytics", value: "analytics" },
  { label: "Oracle", value: "oracle" },
  { label: "Sports", value: "sports" },
  { label: "Master Nodes", value: "masternodes" },
  { label: "MetaVerse", value: "metaverse" },
  { label: "Perpetuals", value: "perpetuals" },
  { label: "Music", value: "music" },
  { label: "Insurance", value: "insurance" },
  { label: "Gambling", value: "gambling" },
  { label: "Tourism", value: "tourism" },
  { label: "Synths", value: "synths" },
  { label: "Options", value: "options" },
  { label: "Seigniorage", value: "seigniorage" },
];


let currencyList = [
  { label: "USD", value: "dollar", tabStatus: "USD" },
  { label: "NGN", value: "naira", tabStatus: "NGN" },
  { label: "EUR", value: "euro", tabStatus: "EUR" },
  { label: "JPY", value: "yen", tabStatus: "JPY" },

];


let launchList = [
  { label: "Home", value: "Home", launchStatus: "Home" },
  { label: "Favorite", value: "Favorite", launchStatus: "Favorite" },
  { label: "News", value: "News", launchStatus: "News" },

];


const listTab = [
  {
    key: "1",
    tabStatus: "Popular",
  },
  {
    key: "2",
    tabStatus: "Volume ???",
  },
  { key: "3", tabStatus: "Volume ???", },
  {
    key: "4",
    tabStatus: "A - Z",
  }, {
    key: "5",
    tabStatus: "Z - A",
  },
];


const newsListTab = [
  {
    key: "1",
    tabStatus: "Popular",
  },
  {
    key: "2",
    tabStatus: "Latest",
  }, {
    key: "3",
    tabStatus: "Solana",
  },
  {
    key: "4",
    tabStatus: "NFT",
  }, {
    key: "5",
    tabStatus: "Ethereum",
  },
];
const topMoversListTab = [
  {
    key: "1",
    tabStatus: "1H",
  },
  {
    key: "2",
    tabStatus: "24H",
  },
  {
    key: "3",
    tabStatus: "7D",
  }, {
    key: "4",
    tabStatus: "2W",
  }, {
    key: "5",
    tabStatus: "1M",
  }, {
    key: "6",
    tabStatus: "6M",
  }, {
    key: "7",
    tabStatus: "1Y",
  },
];


const currencyToggle = [
  {
    key: "1",
    status: "usd",
  },
  {
    key: "2",
    status: "ngn",
  },
  {
    key: "3",
    status: "eur",
  },
  {
    key: "4",
    status: "jpy",
  },

];


const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: COLORS.primary }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 20,
        fontFamily: "PublicaSansRound-Rg",
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "PublicaSansRound-Rg",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
};


let constants = {
  slides,
  categoryList,
  listTab,
  newsListTab,
  topMoversListTab,
  currencyToggle,
  currencyList,
  launchList,
  toastConfig
};

export default constants;
