import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

const color = '#ffffff';
const size = 26;

export default ICONS = {
  'Emergency Fund': <FontAwesome name="money" size={size} color={color} />,
  'Retirement': <FontAwesome5 name="piggy-bank" size={size} color={color} />,
  'Foods': <MaterialCommunityIcons name="food-apple" size={size} color={color} />,
  'Water': <MaterialCommunityIcons name="cup-water" size={size} color={color} />,
  'Electricity': <Entypo name="battery" size={size} color={color} />,
  'Transportation': <MaterialIcons name="emoji-transportation" size={size} color={color} />,
  'Groceries': <MaterialIcons name="local-grocery-store" size={size} color={color} />,
  'Health': <MaterialIcons name="local-hospital" size={size} color={color} />,
  'Educational': <Ionicons name="school" size={size} color={color} />,
  'Mobile Load': <Entypo name="phone" size={size} color={color} />,
  'Internet': <FontAwesome5 name="wifi" size={size} color={color} />,
  'Online Shopping': <Entypo name="shopping-bag" size={size} color={color} />,
  'Party': <MaterialCommunityIcons name="balloon" size={size} color={color} />,
  'Snack/Treats': <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />,
}