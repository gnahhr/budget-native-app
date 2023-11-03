import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import Button from '../common/Button';

const AddCategory = ({isModalVisible, setModalVisible, createCategory}) => {
  const [ categoryName, setCategoryName ] = useState("");

  const toggleModal = () => {
    setModalVisible(false);
  };

  const createCategoryHandler = () => {
    if (categoryName === "") return;

    createCategory({
      name: categoryName,
      iconId: "money",
      allocation: 0,
      expenses: 0,
      toggled: true
    })

    setCategoryName("");
    setModalVisible(false);
  }

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={{zIndex: 9999}}>
        <View style={styles.modalWrapper}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Create new category</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>
            <TextInput placeholder='Enter Category Name' value={categoryName} onChangeText={setCategoryName}/>
            <Button label={"Create New Budget"} action={() => createCategoryHandler()} />
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: COLORS['white-500'],
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'scroll'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  pill: {
    backgroundColor: COLORS['blue-500'],
    padding: 8,
    borderRadius: 8
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: COLORS['white-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default AddCategory