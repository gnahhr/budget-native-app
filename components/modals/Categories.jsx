import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Category from './Category';
import Modal from 'react-native-modal'
import { Icon } from '@rneui/themed';
import AddCategory from './AddCategory';
import Button from '../common/Button';

const Categories = ({categoryList, isModalVisible, setModalVisible, onChangeToggle}) => {
  const [ categoryState, setCategoryState ] = useState(categoryList);
  const [ isAddVisible, setAddVisible ] = useState(false);

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
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color='#21abe5'
              onPress={toggleModal} />

            <View style={styles.categoriesWrapper}>
              <Text style={[styles.modalText, styles.modalHeader]}>EDIT CATEGORIES</Text>
              <Text style={[styles.modalText, styles.modalSubText]}>Select the categories that suitable to your expenses.</Text>
              <View style={[styles.categoriesWrapper, {flexDirection: 'row', flexWrap: 'wrap'}]}>
                {categoryState.map((category) => <Category key={category.name} category={category} categoryState={categoryState} updateCategory={setCategoryState} />)}
              </View>
              <Button label="Add Category" action={() => toggleAdd()} />
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
  }
})

export default Categories