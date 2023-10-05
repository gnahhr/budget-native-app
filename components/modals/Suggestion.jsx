import React, { useState } from 'react'
import { Pressable, Image, Text, StyleSheet } from 'react-native'

const Suggestion = ({name, description, chart}) => {
  const [ isToggled, setIsToggled ] = useState(false);

  return (
    <Pressable style={styles.main} onPress={() => setIsToggled(!isToggled)}>
      <Text style={[styles.titleStyle, styles.textCenter]}>{name}</Text>
      {isToggled ? <Text style={[styles.bodyStyle, styles.textCenter]}>{description}</Text> : <Image source={chart} style={styles.imageStyle}/>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  main: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    width: 160,
    margin: 5,
  },
  titleStyle: {
    fontWeight: '700',
  },
  bodyStyle: {
    fontSize: 9,
  },
  textCenter: {
    textAlign: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 140,
    height: 140
  }
})

export default Suggestion