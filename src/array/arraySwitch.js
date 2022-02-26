
// Array para el switch, se usa en index.js para mostrar switch
const arraySwitch = [
  {
    id: 1,
    name: 'websites',
    label: 'Websites',
    // checked: 'stateswitch.websites',
    checked: Boolean('stateswitch.websites'),
    color: 'primary',
  },
  {
    id: 2,
    name: 'iOS',
    label: 'iOS Apps',
    checked: Boolean('stateswitch.iOS'),
    // checked: 'stateswitch.iOS',
    color: 'secondary',
  },
  {
    id: 3,
    name: 'android',
    label: 'Android Apps',
    // checked: 'stateswitch.android',
    checked: Boolean('stateswitch.android'),
    color: 'primary',
  },
  {
    id: 4,
    name: 'customsoftware',
    label: 'Custom Software',
    // checked: 'stateswitch.customsoftware',
    checked: Boolean('stateswitch.customsoftware'),
    color: 'secondary',
  },
];

export default arraySwitch;