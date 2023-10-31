import { FontAwesome, FontAwesome5, MaterialCommunityIcons, Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons';

const color = '#ffffff';
const size = 26;

const ICONS = {
  'money': <FontAwesome name="money" size={size} color={color} />,
  'piggy-bank': <FontAwesome5 name="piggy-bank" size={size} color={color} />,
  'food-apple': <MaterialCommunityIcons name="food-apple" size={size} color={color} />,
  'cup-water': <MaterialCommunityIcons name="cup-water" size={size} color={color} />,
  'battery': <Entypo name="battery" size={size} color={color} />,
  'emoji-transportation': <MaterialIcons name="emoji-transportation" size={size} color={color} />,
  'local-grocery-store': <MaterialIcons name="local-grocery-store" size={size} color={color} />,
  'local-hospital': <MaterialIcons name="local-hospital" size={size} color={color} />,
  'school': <Ionicons name="school" size={size} color={color} />,
  'phone': <Entypo name="phone" size={size} color={color} />,
  'wifi': <FontAwesome5 name="wifi" size={size} color={color} />,
  'shopping-bag': <Entypo name="shopping-bag" size={size} color={color} />,
  'balloon': <MaterialCommunityIcons name="balloon" size={size} color={color} />,
  'food-fork-drink': <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />,
}

export const getIcon = (iconId) => {
  if (!ICONS[iconId]) return <MaterialCommunityIcons name="food-fork-drink" size={size} color={color} />;

  return ICONS[iconId];
};