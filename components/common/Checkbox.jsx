import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native';
import styles from '../../app/(auth)/authStyles';
import { useTheme } from '../../context/theme';
import { COLORS } from '../../constants/theme';
const Checkbox = ({checked, handleOnPress}) => {
  const [ state, setState ] = useState(styles.checkbox);
  const { theme } = useTheme();

  useEffect(() => {
    if (checked) {
      setState([styles.checkbox, styles.checkboxActive, theme === 'dark' && {borderColor: COLORS['white-700'], backgroundColor: COLORS['white-500']}])
    } else {
      setState([styles.checkbox, theme === 'dark' && {borderColor: COLORS['white-700']}]);
    }
  }, [checked])

  return (
    <Pressable style={state} onPress={handleOnPress}></Pressable>
  )
}

export default Checkbox