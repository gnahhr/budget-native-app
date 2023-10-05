import React from 'react'
import { Pressable } from 'react-native';

const Checkbox = ({handleOnPress}) => {
  return (
    <Pressable style={checked} onPress={handleOnPress}></Pressable>
  )
}

export default Checkbox