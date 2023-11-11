import React from 'react'
import { Text, View, Pressable, StyleSheet } from 'react-native'

const Category = ({category, categoryState, updateCategory}) => {
  let checked = [styles.checkbox];
  if (category.toggled) checked.push(styles.checkboxActive);

  return (
    <Pressable key={category.name} style={[styles.wrapper, styles.categoryStyle]} onPress={() => {
        const newData = categoryState.map(x => {
          if (x.name === category.name) {
            return {
              ...x,
              toggled: !x.toggled
            }
          } else {
            return x;
          }
        })
        updateCategory(newData);
        }}>
      <View style={checked}></View>
      <Text style={styles.categoryText}>{category.name}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriesWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  categoryStyle: {
    backgroundColor: '#5cafc9',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 8,
    margin: 4,
  },
  categoryText: {
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#ffffff'
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 3,
  },
  checkboxActive: {
    backgroundColor: '#FFFFFF',
  }
})

export default Category