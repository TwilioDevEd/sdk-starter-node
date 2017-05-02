const ADJECTIVES = [
    'Abrasive', 'Brash', 'Callous', 'Daft', 'Eccentric', 'Fiesty', 'Golden',
    'Holy', 'Ignominious', 'Joltin', 'Killer', 'Luscious', 'Mushy', 'Nasty',
    'OldSchool', 'Pompous', 'Quiet', 'Rowdy', 'Sneaky', 'Tawdry',
    'Unique', 'Vivacious', 'Wicked', 'Xenophobic', 'Yawning', 'Zesty',
];

const FIRST_NAMES = [
    'Anna', 'Bobby', 'Cameron', 'Danny', 'Emmett', 'Frida', 'Gracie', 'Hannah',
    'Isaac', 'Jenova', 'Kendra', 'Lando', 'Mufasa', 'Nate', 'Owen', 'Penny',
    'Quincy', 'Roddy', 'Samantha', 'Tammy', 'Ulysses', 'Victoria', 'Wendy',
    'Xander', 'Yolanda', 'Zelda',
];

const LAST_NAMES = [
    'Anchorage', 'Berlin', 'Cucamonga', 'Davenport', 'Essex', 'Fresno',
    'Gunsight', 'Hanover', 'Indianapolis', 'Jamestown', 'Kane', 'Liberty',
    'Minneapolis', 'Nevis', 'Oakland', 'Portland', 'Quantico', 'Raleigh',
    'SaintPaul', 'Tulsa', 'Utica', 'Vail', 'Warsaw', 'XiaoJin', 'Yale',
    'Zimmerman',
];

const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = () => rand(ADJECTIVES) + rand(FIRST_NAMES) + rand(LAST_NAMES);
