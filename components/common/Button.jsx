import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme'
import { useTheme } from '../../context/theme'

const Button = ({label, action, isLoading = false, active=true}) => {
  const { theme } = useTheme();

  return (
    <>
      {
        isLoading ?
        <Text style={styles.buttonStyle}>
          Loading...
        </Text>
      :
        <Pressable onPress={() => active ? action() : console.log("")}>
          <Text style={[theme === 'light' ? styles.lightMode : styles.darkMode, styles.buttonStyle, active ? "" : theme === 'dark' ? styles.darkInactiveStyle : styles.inactiveStyle]}>{label}</Text>
        </Pressable>
      }
    </>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    zIndex: 1,
    fontWeight: 'bold',
    padding: 8,
    fontSize: 20,
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
    textAlign: 'center',
  },
  lightMode: {
    color: COLORS['white-700'],
    backgroundColor: COLORS['blue-500'],
  },
  darkMode: {
    color: COLORS['black-500'],
    backgroundColor: COLORS['white-700'],
  },
  inactiveStyle: {
    backgroundColor: COLORS['grey-500'],
  },
  darkInactiveStyle: {
    color: COLORS['black-500'],
    backgroundColor: COLORS['grey-200'],
  }
})

export default Button