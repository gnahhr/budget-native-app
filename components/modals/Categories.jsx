import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Category from './Category';
import Modal from 'react-native-modal'
import { Icon } from '@rneui/themed';

const Categories = ({categoryList, isModalVisible, setModalVisible, onChangeToggle}) => {
  const [ categoryState, setCategoryState ] = useState(categoryList);

  const toggleModal = () => {
    setModalVisible(false);
  };

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
      animationOut="slideOutRight">
        <View style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <Icon
              name='chevron-right'
              type='font-awesome'
              color='#21abe5'
              onPress={toggleModal} />
            <View>
              <Text style={[styles.modalText, styles.modalHeader]}>EDIT CATEGORIES</Text>
              <Text style={[styles.modalText, styles.modalSubText]}>Select the categories that suitable to your expenses.</Text>
            </View>

            <View style={styles.categoriesWrapper}>
              {categoryState.map((category) => <Category key={category.name} category={category} categoryState={categoryState} updateCategory={setCategoryState} />)}
            </View>
          </View>
        </View>
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
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})

export default Categories