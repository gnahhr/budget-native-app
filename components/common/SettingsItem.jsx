import React, { useState } from 'react'
import { View, Text, Switch, StyleSheet } from 'react-native'
import { COLORS } from '../../constants/theme';
import { useTheme } from '../../context/theme';

const SettingsItem = ({ setting, text, subText, value, onToggleAction}) => {
  const [isEnabled, setIsEnabled] = useState(value);
  const { theme } = useTheme();
  const onToggleHandler = () => {
    setIsEnabled(previousState => !previousState)
    onToggleAction(setting, !isEnabled);
  }

  return (
    <View style={[styles.settingsWrapper, styles.shadowProp, theme === 'dark' && styles.borderwhite]}>
      <View style={[styles.stretch]}>
        <Text style={[styles.fontLg, theme === 'dark' && styles.textWhite]}>{text}</Text>
        <Text style={[styles.fontMd, theme === 'dark' && styles.textWhite]}>{subText}</Text>
      </View>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggleHandler}
        value={isEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  settingsWrapper: {
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    width: '80%',
    borderRadius: 4,
    padding: 8,
    borderWidth: 2,
  },
  shadowProp: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  borderwhite: {
    borderColor: COLORS['white-700']
  },
  textWhite: {
    color: COLORS['white-700']
  },
  stretch: {
    flex: 1
  },
  fontLg: {
    fontSize: 20,
  },
  fontMd: {
    fontSize: 10,
  }
})

export default SettingsItem