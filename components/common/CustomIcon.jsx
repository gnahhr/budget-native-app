import React from 'react'
import { Image } from 'react-native';

const CustomIcon = ({imageUrl, size = 25}) => {
  return (
    <Image source={imageUrl} style={{width: size, height: size, margin: 10}}/>
  )
}

export default CustomIcon