import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Modal from 'react-native-modal';
import { useBudget } from '../../context/budget';
import { useAuth } from '../../context/auth';
import { useTheme } from '../../context/theme';
import { COLORS } from '../../constants/theme';

const UpdateBudget = ({isModalVisible, totalBudget, setModalVisible, updateBudget}) => {
  const { activeBudget } = useBudget();
  const { theme } = useTheme();
  const { user } = useAuth();
  
  const [ budget, onChangeBudget ] = useState(0);
  const [ budgetName, setBudgetName ] = useState("");
  const [ budgetEmail, setBudgetEmail ] = useState("");
  const [ isOwner, setIsOwner ] = useState(null); 


  const toggleModal = () => {
    setModalVisible(false);
  };

  const updateBudgetHandler = () => {
    const newBudget = isOwner ? Number(budget) : Number(totalBudget) + Number(budget);
    if (Number(budget) > 0 && budgetName !== ""){
      updateBudget(Number(newBudget), `${budgetName}~${budgetEmail}`);
    }
  }

  useEffect(() => {
    if(user && budgetEmail && isModalVisible){
      setIsOwner(JSON.parse(user).email === budgetEmail);
    }
  }, [user, isModalVisible, budgetEmail])

  useEffect(() => {
    if (totalBudget){
      onChangeBudget(isOwner ? totalBudget : 0);
    }
  }, [totalBudget, isOwner])
  
  useEffect(() => {
    if (activeBudget) {
      const splitName = activeBudget.budgetName?.split('~');
      setBudgetName(splitName[0]);
      setBudgetEmail(splitName[1]);
    }
  }, [activeBudget])

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown">
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkMode]}>
          <View>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader, theme === 'dark' && styles.textWhite]}>{isOwner && isOwner ? "Update Budget" : "Give Money"}</Text>
            </View>
            
            <View style={{gap: 16}}>
              {isOwner && isOwner ? 
              <>
                <View>
                  <Text style={[styles.textBold, theme === 'dark' && styles.textWhite]}>Budget Name</Text>
                  <TextInput
                    value={budgetName}
                    onChangeText={setBudgetName}
                    backgroundColor={theme === 'dark' && COLORS['grey-500']}
                    color={theme === 'dark' && COLORS['white-700']}
                    placeholderTextColor={theme === 'dark' && COLORS['grey-300']}
                  />
                </View>
                <View>
                  <Text style={[styles.textBold, theme === 'dark' && styles.textWhite]}>Total Budget - (Please include your side hustle.)</Text>
                  <TextInput
                    placeholder='Php. 00'
                    keyboardType="numeric"
                    value={String(budget)}
                    onChangeText={onChangeBudget}
                    backgroundColor={theme === 'dark' && COLORS['grey-500']}
                    color={theme === 'dark' && COLORS['white-700']}
                    placeholderTextColor={theme === 'dark' && COLORS['grey-300']}
                  />
                </View>
              </>
              :
              <View>
                <View>
                  <Text style={[styles.textBold, theme === 'dark' && styles.textWhite]}>Amount</Text>
                  <TextInput
                    placeholder='Php. 00'
                    keyboardType="numeric"
                    onChangeText={onChangeBudget}
                    backgroundColor={theme === 'dark' && COLORS['grey-500']}
                    color={theme === 'dark' && COLORS['white-700']}
                    placeholderTextColor={theme === 'dark' && COLORS['grey-300']}
                  />
              </View>
              </View>
              }

            </View>
          </View>

          <View style={[styles.flexRow, styles.buttonWrapper]}>
            <Pressable style={[styles.buttonStyle, styles.buttonHollow]} onPress={() => toggleModal()}>
              <Text style={[styles.textCenter, styles.textBold, theme === 'dark' && styles.textWhite]}>Cancel</Text>
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
    backgroundColor: COLORS['white-700'],
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    padding: 20,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: -20,
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
  textBold: {
    fontWeight: '700',
  },
  textHeader: {
    fontSize: 25,
  },
  textWhite: {
    color: COLORS['white-700'],
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