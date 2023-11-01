import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'

const Button = ({label, action, isLoading = false}) => {
  return (
    <>
      {
        isLoading ?
        <Text style={styles.buttonStyle}>
          Loading...
        </Text>
      :
        <Pressable onPress={action}>
          <Text style={styles.buttonStyle}>{label}</Text>
        </Pressable>
      }
    </>
  )
}

const styles = StyleSheet.create({
    buttonStyle: {
    color: COLORS['white-700'],
    backgroundColor: COLORS['blue-500'],

    fontWeight: 'bold',
    padding: 8,
    fontSize: 24,
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
    textAlign: 'center',
  }
})

export default Button