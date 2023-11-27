import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'

const Button = ({label, action, isLoading = false, active=true}) => {
  
  return (
    <>
      {
        isLoading ?
        <Text style={styles.buttonStyle}>
          Loading...
        </Text>
      :
        <Pressable onPress={() => active ? action() : console.log("")}>
          <Text style={[styles.buttonStyle, active ? "" : styles.inactiveStyle]}>{label}</Text>
        </Pressable>
      }
    </>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    color: COLORS['white-700'],
    backgroundColor: COLORS['blue-500'],
    zIndex: 1,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 24,
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
    textAlign: 'center',
  },
  inactiveStyle: {
    backgroundColor: COLORS['grey-500'],
  }
})

export default Button