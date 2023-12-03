import React from 'react';
import { View, Text, StyleSheet, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

import { useBudget } from '../../context/budget';
import { useTheme } from '../../context/theme';
import Button from '../common/Button';

const BudgetList = ({isModalVisible, setModalVisible}) => {
  const { theme } = useTheme();
 
  const toggleModal = () => {
    setModalVisible(false);
  };

  const updateActiveHandler = (value) => {
    updateActive(value);
    toggleModal();
  }

  const { budgetList, updateActive } = useBudget();

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkMode]}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader, theme === 'dark' && styles.textWhite]}>Budget List</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 16,
                  borderBottomColor: theme === 'light' ? COLORS['black-500'] : COLORS['white-700'],
                  borderBottomWidth: 4,
                  paddingVertical: 16,
                }}>  

                {budgetList && budgetList.map(budget => 
                  <Pressable key={budget.budgetName} onPress={() => updateActiveHandler(budget)}>
                    <Text style={[styles.pill, styles.textWhite, styles.textBold]}>{budget.budgetName?.split('~')[0]}</Text>
                  </Pressable>
                  )}
            </View>

            <Button label={"Create New Budget"} action={() => router.push("/(onboarding)/onboarding")} />
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
  darkMode: {
    backgroundColor: COLORS['dblue-550'],
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

export default BudgetList