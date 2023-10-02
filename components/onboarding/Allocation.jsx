import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'
import { Icon } from '@rneui/themed';


const Allocation = ({category, allocated, icon}) => {
  return (
    <View style={styles.main}>
      <Icon
          name='wifi'
          type='font-awesome'
          color='#ffffff'
          style={styles.iconStyle}
          />
      <View>
        <Text style={[styles.topText, styles.whiteText]}>{category}</Text>
        <Text style={[styles.bottomText, styles.whiteText]}>Php. {allocated}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    width: "70%",
    alignSelf: 'center',
    backgroundColor: '#5cafc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
  iconStyle: {
    padding: 3,
    marginRight: 6,
  },
  whiteText: {
    color: "#ffffff",
  },
  topText: {
    fontSize: 16,
    fontWeight: 700,
    borderBottomColor: "#ffffff",
    borderBottomWidth: 1,
  },
  bottomText: {
    fontSize: 11,
  }
});

export default Allocation