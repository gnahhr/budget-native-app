import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Button} from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { getIconsList, getIcon } from '../../constants/icons';

const AddCategory = ({isModalVisible, setModalVisible, createCategory}) => {
  const [ categoryName, setCategoryName ] = useState("");
  const [ iconList, setIconList ] = useState(getIconsList());
  const [ activeIcon, setActiveIcon ] = useState(getIcon("money"));
  const [ iconId, setIconId ] = useState("money");

  const toggleModal = () => {
    setModalVisible(false);
  };

  const createCategoryHandler = () => {
    if (categoryName === "") return;

    createCategory({
      name: categoryName,
      iconId: iconId,
      allocation: Number(0),
      expenses: [],
      toggled: true
    })

    setCategoryName("");
    setModalVisible(false);
  }

  const iconOnPressHandler = (iconId) => {
    setActiveIcon(getIcon(iconId));
    setIconId(iconId);
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
            <View style={{flexDirection: 'row', marginVertical: 8, paddingVertical: 5, gap: 8, borderBottomColor: COLORS['blue-900'], borderBottomWidth: 2}}>
              <View style={[styles.pill]}>
                {activeIcon}
              </View>
              <TextInput style={{flex: 1}}placeholder='Enter Category Name' value={categoryName} onChangeText={setCategoryName}/>
              <Pressable style={{alignItems: 'center', justifyContent: 'center'}}onPress={() => createCategoryHandler()}>
                <Text style={[styles.saveBtn, {backgroundColor: COLORS['blue-800']}]}>Save</Text>
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
              {iconList && iconList.map((icon, idx) =>
                  <Pressable key={idx} onPress={() => iconOnPressHandler(icon)}>
                    <View style={[styles.unselectedPill]}>{getIcon(icon)}</View>
                  </Pressable>
                )}
            </View>
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
  unselectedPill: {
    backgroundColor: COLORS['blue-100'],
    padding: 8,
    borderRadius: 8
  },
  saveBtn: {
    color: COLORS['white-500'],
    backgroundColor: COLORS['blue-900'],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
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