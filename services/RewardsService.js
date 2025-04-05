const REWARDS = [
    {
        id: 100,
        name: '$10 McDonalds Gift Card',
        price: 1,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    },
    {
        id: 101,
        name: '$15 McDonalds Gift Card',
        price: 10000,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    },
    {
        id: 102,
        name: '$20 McDonalds Gift Card',
        price: 100000,
        image: require('../assets/rewards/md.jpg'),
        description: 'Temp'
    }
];
export function getRewards(id) {
    if (id === undefined) {
        return REWARDS;
    }
    return REWARDS.find((reward) => reward.id === id);
}