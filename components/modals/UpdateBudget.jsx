import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Modal from 'react-native-modal';

const UpdateBudget = ({isModalVisible, totalBudget, setModalVisible, updateBudget}) => {
  const [ budget, onChangeBudget ] = useState(0);

  const toggleModal = () => {
    setModalVisible(false);
  };

  const updateBudgetHandler = () => {
    updateBudget(budget);
  }

  useEffect(() => {
    onChangeBudget(totalBudget);
  }, [])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={styles.modalWrapper}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Update Budget</Text>
            </View>
            
            <View style={{gap: 16}}>
              <View>
                <Text style={[styles.textBold]}>Total Budget</Text>
                <TextInput
                  placeholder='Php. 00'
                  keyboardType="numeric"
                  value={String(budget)}
                  onChangeText={onChangeBudget}
                />
              </View>
            </View>
          </View>

          <View style={[styles.flexRow, styles.buttonWrapper]}>
            <Pressable style={[styles.buttonStyle, styles.buttonHollow]} onPress={() => toggleModal()}>
              <Text style={[styles.textCenter, styles.textBold]}>Cancel</Text>
            </Pressable>

            <Pressable style={[styles.buttonStyle]} onPress={() => updateBudgetHandler()}>
              <Text style={[styles.textCenter, styles.textWhite, styles.textBold]}>Save</Text>
            </Pressable>
          </View>
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
  flexRow: {
    flexDirection: 'row',
  },
  buttonWrapper: {
    justifyContent: 'space-between',
    gap: 16,
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
    padding: 12,
    flex: 1,
    borderRadius: 8,
    marginTop: 16
  },
  buttonHollow: {
    borderWidth: 1,
    borderColor: '#11588B',
    backgroundColor: 'transparent',
  }
})

export default UpdateBudget