const slides = [
    {
        id: 1,
        title: 'Track your Cryptocurrency in Realtime',
        image: require('../assets/images/chart_onboard.png'),
    },
    {
        id: 2,
        title: 'Check price overview, coin details and available exchange',
        image: require('../assets/images/search_onboard.png'),


    }, {
        id: 3,
        title: 'Stay up to date with latest Cryptocurrency news',
        image: require('../assets/images/folder_onboard.png'),


    },
];

let categoryList = [
    { label: 'Smart Contract', value: 'smart-contract-platform' },
    { label: 'DeFi', value: 'decentralized-finance-defi' },
    { label: 'Exchange Based', value: 'exchange-based-tokens' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'NFTs', value: 'non-fungible-tokens-nft' },
    { label: 'Meme Tokens', value: 'meme-token' },
    { label: 'Arbitrum', value: 'arbitrum-ecosystem' },
    { label: 'CEX', value: 'centralized-exchange-token-cex' },
    { label: 'Stable Coins', value: 'stablecoins' },
    { label: 'Governance', value: 'governance' },
    { label: 'Analytics', value: 'analytics' },
    { label: 'Oracle', value: 'oracle' },
    { label: 'Sports', value: 'sports' },
    { label: 'Master Nodes', value: 'masternodes' },
    { label: 'MetaVerse', value: 'metaverse' },
    { label: 'Perpetuals', value: 'perpetuals' },
    { label: 'Music', value: 'music' },
    { label: 'Insurance', value: 'insurance' },
    { label: 'Gambling', value: 'gambling' },
    { label: 'Tourism', value: 'tourism' },
    { label: 'Synths', value: 'synths' },
    { label: 'Options', value: 'options' },
    { label: 'Seigniorage', value: 'seigniorage' },
]



const listTab = [
    {
        key: '1',
        status: 'Popular'
    },
    {
        key: '2',
        status: 'Volume'
    },
    {
        key: '3',
        status: 'Name'
    },
]
const constants = {
    slides,
    categoryList,
    listTab
};

export default constants;