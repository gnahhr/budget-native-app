import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

const color = '#ffffff';
const size = 26;

const savingsCategories = [
  {
    name: 'Emergency Fund',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <FontAwesome name="money" size={size} color={color} />
  },
  {
    name: 'Retirement',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <FontAwesome5 name="piggy-bank" size={size} color={color} />
  },
]

const needsCategories = [
  {
    name: 'Foods',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialCommunityIcons name="food-apple" size={size} color={color} />
  },
  {
    name: 'Water',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialCommunityIcons name="cup-water" size={size} color={color} />
  },
  {
    name: 'Electricity',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <Entypo name="battery" size={size} color={color} />
  },
  {
    name: 'Transportation',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="emoji-transportation" size={size} color={color} />
  },
  {
    name: 'Groceries',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="local-grocery-store" size={size} color={color} />
  },
  {
    name: 'Health',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="local-hospital" size={size} color={color} />
  },
  {
    name: 'Educational',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <Ionicons name="school" size={size} color={color} />
  },
  {
    name: 'Mobile Load',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <Entypo name="phone" size={size} color={color} />
  },
  {
    name: 'Internet',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <FontAwesome5 name="wifi" size={size} color={color} />
  }
]

const wantCategories = [
  {
    name: 'Online Shopping',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <Entypo name="shopping-bag" size={size} color={color} />
  },
  {
    name: 'Party',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialCommunityIcons name="balloon" size={size} color={color} />
  },
  {
    name: 'Snack/Treats',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />
  },
  {
    name: 'Transportation',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="emoji-transportation" size={size} color={color} />
  },
  {
    name: 'Groceries',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="local-grocery-store" size={size} color={color} />
  },
  {
    name: 'Health',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <MaterialIcons name="local-hospital" size={size} color={color} />
  },
  {
    name: 'Educational',
    allocation: 0,
    expenses: 0,
    toggled: false,
    icon: <Ionicons name="school" size={size} color={color} />
  },
];

export {
  savingsCategories,
  needsCategories,
  wantCategories,
}