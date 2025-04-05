const REWARDS = [
    {
        id: 100,
        name: '$10 McDonalds Gift Card',
        price: 10000,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    },
    {
        id: 101,
        name: '$20 McDonalds Gift Card',
        price: 20000,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    },
    {
        id: 102,
        name: '$50 McDonalds Gift Card',
        price: 100000,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    },
    {
        id: 103,
        name: '$10 Burger King Gift Card',
        price: 10000,
        image: require('../assets/rewards/bk.jpg'),
        description: 'Temp'
    },
    {
        id: 104,
        name: '$10 Taco Bell Gift Card',
        price: 10000,
        image: require('../assets/rewards/tb.jpeg'),
        description: 'Temp'
    },
    {
        id: 105,
        name: '$20 Taco Bell Gift Card',
        price: 20000,
        image: require('../assets/rewards/tb.jpeg'),
        description: 'Temp'
    },
    {
        id: 106,
        name: '$50 Taco Bell Gift Card',
        price: 50000,
        image: require('../assets/rewards/tb.jpeg'),
        description: 'Temp'
    },
    {
        id: 107,
        name: '$10 Little Caesar\'s Gift Card',
        price: 10000,
        image: require('../assets/rewards/lc.png'),
        description: 'Temp'
    },
    {
        id: 108,
        name: '$20 Little Caesar\'s Gift Card',
        price: 20000,
        image: require('../assets/rewards/lc.png'),
        description: 'Temp'
    },
    {
        id: 109,
        name: '$50 Little Caesar\'s Gift Card',
        price: 50000,
        image: require('../assets/rewards/lc.png'),
        description: 'Temp'
    },
    {
        id: 110,
        name: '$50 Cheesecake Factory Gift Card',
        price: 50000,
        image: require('../assets/rewards/cf.jpg'),
        description: 'Temp'
    },
    {
        id: 111,
        name: 'Chum',
        price: 25000,
        image: require('../assets/rewards/chum.png'),
        description: 'Temp'
    },
    {
        id: 112,
        name: 'La-Z-Boy Recliner',
        price: 2500000,
        image: require('../assets/rewards/lb.jpg'),
        description: 'Temp'
    }


];
export function getRewards(id) {
    if (id === undefined) {
        return REWARDS;
    }
    return REWARDS.find((reward) => reward.id === id);
}