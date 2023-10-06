import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';

const AddExpenses = ({categoryList, isModalVisible, setModalVisible, onAddExpense}) => {
  const [ categoryState, setCategoryState ] = useState(categoryList);

  // Drop Down States
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const toggleModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    setCategoryState(categoryList);
  }, [categoryList])

  useEffect(() => {
    if (categoryState) {
      setItems(categoryState.map(category => {
        return {
          label: category.name,
          value: category.name
        }
      }));
    }
  }, [categoryState])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Add Expenses</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Expense Category</Text>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  style={{}}
                />
              </View>
              <View>
                <Text style={[styles.textBold]}>Note</Text>
                <TextInput placeholder='Enter Note Expenses'/>
              </View>
              <View>
                <Text style={[styles.textBold]}>Amount</Text>
                <TextInput placeholder='Php. 00' keyboardType="numeric" />
              </View>
            </View>
          </View>

          <View style={{backgroundColor: '#eff5f9', text: 'center'}}>
            <Text style={[styles.textBold, styles.textCenter]}>Transcation date and time:</Text>
            <Text style={[styles.textCenter]}>June 03, 2023 01:09 AM</Text>
          </View>

          <Pressable style={[styles.buttonStyle]}>
            <Text style={[styles.textCenter, styles.textWhite]}>Add Expense</Text>
          </Pressable>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: '#ffffff',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: -20,
    overflow: 'scroll'
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
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
  },
  buttonStyle: {
    backgroundColor: '#11588B',
    padding: 4,
    borderRadius: 16,
    marginTop: 16
  }
})

export default AddExpenses