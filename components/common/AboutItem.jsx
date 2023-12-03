import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';

const AboutItem = ({ label, value}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.settingsWrapper, styles.shadowProp, theme === 'dark' && styles.whiteBorder]}>
      <Text style={[styles.fontBold, styles.stretch, styles.fontLg, theme === 'dark' && styles.whiteText]}>{label}</Text>
      <Text style={[styles.grayText, styles.fontLg, theme === 'dark' && styles.whiteText]}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  settingsWrapper: {
    flexDirection: 'row',
    alignItems: 'center', 
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: 2,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  grayText: {
    color: COLORS['grey-500'],
  },
  whiteText: {
    color: COLORS['white-700'],
  },
  whiteBorder: {
    borderColor: COLORS['white-700'],
  },
  fontBold: {
    fontWeight: '700',
  },
  stretch: {
    flex: 1
  },
  fontLg: {
    fontSize: 16,
  },
  fontMd: {
    fontSize: 10,
  }
})

export default AboutItem