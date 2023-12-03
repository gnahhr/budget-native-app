import React from 'react'
import { Text, View, Image, StyleSheet, Pressable } from 'react-native'
import { useTheme } from '../../context/theme';
import { COLORS } from '../../constants/theme';

const BookItem = ({exert, bookImage, bookName, onPress}) => {
  const { theme } = useTheme();

  return (
    <Pressable style={styles.bookWrapper} onPress={() => onPress(bookName)}>
      <View style={{width: '80%'}}>
        <Text style={[styles.exertStyle, theme === 'dark' && {color: COLORS['white-700']}]}>"{exert}"</Text>
      </View>
      <Image source={bookImage} style={styles.imageStyle}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  bookWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#cadde4',
    padding: 8,
    borderRadius: 8,
  },
  exertStyle: {
    fontSize: 24,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  imageStyle: {
    alignSelf: 'center',
    resizeMode: 'contain',
    borderRadius: 6,
    width: "20%",
    height: 120
  }
})

export default BookItem