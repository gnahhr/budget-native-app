import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Modal from 'react-native-modal'
import { Icon } from '@rneui/themed';

import { suggestionList } from '../../constants/suggestionList';

import Suggestion from './Suggestion';

const Suggestions = ({isModalVisible, setModalVisible, onChangeToggle}) => {
  const [ choice, setChoice ] = useState("");

  const toggleModal = () => {
    setModalVisible(false);
  };

  const label = [
    {
      label: "needs",
      color: '#4098bf',
    },
    {
      label: "wants",
      color: '#8bbccb',
    },
    {
      label: "savings",
      color: '#1578b2',
    }
  ]

  const changeChoiceHandler = (choice, state, data) => {
    if (state) {
      setChoice("");
      onChangeToggle(0, 0, 0);
    } else {
      setChoice(choice)
      onChangeToggle(data.needs, data.want, data.saving);
    }
  }

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInLeft"
      animationOut="slideOutLeft">
        <View style={styles.modalWrapper}>
          <View style={[styles.modalContent]}>
            <View style={[styles.colWrapper]}>
              {suggestionList.map((suggestion) => {
                let checked = [styles.checkbox];
                const state = suggestion.name === choice;
                if (state) checked.push(styles.checkboxActive);

                return (
                  <View key={suggestion.name} style={styles.wrapper}>
                    <Pressable style={checked} onPress={() => changeChoiceHandler(suggestion.name, state, suggestion)}></Pressable>
                    <Suggestion name={`${suggestion.name} Budget`} description={suggestion.description} chart={suggestion.chart}/>
                  </View>
                )
                }
              )}
              <View style={{flexDirection: 'row', backgroundColor: '#ffffff', alignSelf: 'center', gap: 4, padding: 8, borderRadius: 8, maxWidth: '70%', flexWrap: 'wrap'}}>
                {label.map((item) => 
                <View key={item.label} style={[styles.wrapper, {gap: 2}]}>
                    <View style={{width: 20, height: 20, backgroundColor: item.color, borderRadius: 100}}></View>
                    <Text>{item.label}</Text>
                </View>)}
              </View>
            </View>
            
            <View>
              <Text style={[styles.modalText, styles.modalHeader]}>BUDGET RATIO</Text>
            </View>
            
            <Icon
              name='chevron-left'
              type='font-awesome'
              color='#21abe5'
              onPress={toggleModal} />
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
  colWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
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
  },
  modalWrapper: {
    backgroundColor: '#1579b2',
    height: 600,
    width: 600,
    position:'absolute',
    right: 0,
    borderRadius: 400,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'scroll'
  },
  modalContent: {
    maxWidth: 330,
    marginRight: 35,
    flexDirection: 'row',
    right: 0,
    position: 'absolute',
    alignItems: 'center'
  },
  modalText: {
    maxWidth: 150,
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

export default Suggestions