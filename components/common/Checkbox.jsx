import React, { useState, useEffect } from 'react'
import { Pressable } from 'react-native';
import styles from '../../app/(auth)/authStyles';
const Checkbox = ({checked, handleOnPress}) => {
  const [ state, setState ] = useState(styles.checkbox);


  useEffect(() => {
    if (checked) {
      setState([styles.checkbox, styles.checkboxActive])
    } else {
      setState(styles.checkbox);
    }
  }, [checked])

  return (
    <Pressable style={state} onPress={handleOnPress}></Pressable>
  )
}

export default Checkbox