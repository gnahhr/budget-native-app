import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Category from './Category';
import Modal from 'react-native-modal'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import Button from '../common/Button';

import AddCategory from './AddCategory';
import { useTheme } from '../../context/theme';

const Categories = ({categoryList, isModalVisible, setModalVisible, onChangeToggle}) => {
  const [ categoryState, setCategoryState ] = useState(categoryList);
  const [ isAddVisible, setAddVisible ] = useState(false);
  const { theme } = useTheme();

  const toggleModal = () => {
    setModalVisible(false);
  };

  const toggleAdd = () => {
    setAddVisible(true);
  }

  const createCategoryHandler = (newCategory) => {
    setCategoryState([
      ...categoryState,
      newCategory
    ])
  }

  useEffect(() => {
    setCategoryState(categoryList);
  }, [categoryList])

  useEffect(() => {
    onChangeToggle(categoryState)
  }, [categoryState])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{zIndex: 90}}>
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkWrapper]}>
          <View style={styles.modalContent}>
            {/* <FontAwesome name="chevron-right" size={40} color="#21abe5" onPress={toggleModal} /> */}

            <View style={styles.categoriesWrapper}>
              <Text style={[styles.modalText, styles.modalHeader]}>EDIT CATEGORIES</Text>
              <Text style={[styles.modalText, styles.modalSubText]}>Select the categories that suitable to your expenses.</Text>
              <View style={[styles.categoriesWrapper, {flexDirection: 'row', flexWrap: 'wrap'}]}>
                {categoryState.map((category) => <Category key={category.name} category={category} categoryState={categoryState} updateCategory={setCategoryState} />)}
              </View>
              <Pressable style={[styles.buttonWrapper, {justifyContent: 'center'}]} onPress={() => toggleAdd()} >
                <Ionicons name="add-circle" size={24} color={COLORS['white-700']} />
                <Text style={[{color: COLORS['white-700'], fontWeight: 700}]}>Create Category</Text>
              </Pressable>
              <Pressable onPress={() => toggleModal()}>
                <Text style={[styles.buttonWrapper, {color: COLORS['white-700'], fontWeight: 700, textAlign: 'center'}]}>Next</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <AddCategory isModalVisible={isAddVisible} setModalVisible={setAddVisible} createCategory={createCategoryHandler}/>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    gap: 4,
    minWidth: '45%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS['white-700'],
    borderRadius: 4,
    marginTop: 8,
  },
  modalWrapper: {
    backgroundColor: '#1579b2',
    height: 600,
    width: 600,
    position:'absolute',
    borderRadius: 400,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  modalContent: {
    maxWidth: 330,
    marginLeft: 30,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalText: {
    maxWidth: 200,
    textAlign: 'center',
    color: '#ffffff'
  },
  modalHeader: {
    fontSize: 26,
    fontWeight: '700',
  },
  modalSubText: {
    fontStyle: 'italic',
  },
  categoriesWrapper: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  darkWrapper: {
    backgroundColor: COLORS['dblue-450']
  },
})

export default Categories