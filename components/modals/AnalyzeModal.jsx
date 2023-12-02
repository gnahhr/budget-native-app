import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Modal from 'react-native-modal';
import { analyzeData } from '../../api/insights';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const AnalyzeModal = ({isModalVisible, setModalVisible}) => {
  const [ overspentItems, setOverspentItems ] = useState([]);
  const [ msgArrayKeys, setMsgArrayKeys ] = useState([]);
  const { user } = useAuth();
  const { activeBudget } = useBudget();
  const [ errMsg, setErrMsg ] = useState([]);

  const toggleModal = () => {
    setModalVisible(false);
  };

  const messages = {
    isNoSavings: "It appears that you have no budget for savings, try putting aside money for emergencies and long-term benefits.",
    isNeedsOverBudget: "You are exceeding your allotted budget for needs; try allocating more budget for your needs in order to meet and cater your needs without ruining your financial plan.",
    isWantsOverBudget: "If you're spending more money than you have, try spending it wisely and putting it in savings.",
    isOverBudgetThisMonth: "You have exceeded your budget for this month!"
  }

  async function handleGetUsers () {
    const data = await analyzeData(JSON.parse(user).email, activeBudget.budgetName);
    let msgKeys = [];

    if (data.statusCode === 200) {
      const keys = Object.keys(data.response);
      let overBudget = [];
      keys.forEach((key) => {
        if (data.response[key].isOverBudget) {
          overBudget.push({name: key, ...data.response[key]})
        }

        if (data.response[key] === true) {
          msgKeys.push(key);
        }
      });
    
      setMsgArrayKeys(msgKeys);
      setErrMsg(null);
      setOverspentItems(overBudget);
    } else {
      setErrMsg(data.message);
    }
  }


  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user, activeBudget, isModalVisible]);

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={styles.modalWrapper}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Analyze</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>

            <View style={{marginTop: 8, gap: 8}}>
              {overspentItems && overspentItems.length > 0 ?
                <>
                  <ScrollView contentContainerStyle={{gap: 8}}>
                    <Text style={[styles.textBold, {fontSize: 24}]}>Overspent</Text>

                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={[styles.textCenter, styles.textBold, {flex: 1}]}>Name</Text>
                      <Text style={[styles.textCenter, styles.textBold, {flex: 1}]}>Allocation</Text>
                      <Text style={[styles.textCenter, styles.textBold, {flex: 1}]}>Predicted Expenses</Text>
                    </View>

                    {overspentItems.map(item => 
                      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[styles.textCenter, {flex: 1}]}>{item.name}</Text>
                        <Text style={[styles.textCenter, {flex: 1}]}>{item.allocation}</Text>
                        <Text style={[styles.textCenter, {flex: 1}]}>{item.predictions}</Text>
                      </View>  
                    )}
                  </ScrollView>
                  <Text style={[styles.textMd, styles.textCenter, styles.textBold]}>Your spending habit with <Text style={[styles.textBold, styles.textRed]}>{overspentItems.map(item => item.name).join(', ')}</Text> is unusual and would exceed the following month if not changed.</Text>
                </>
              :
              <>
              {errMsg && <Text style={[styles.textMd, styles.textCenter, styles.textBold]}>{errMsg}</Text>}
              {!errMsg && overspentItems.length === 0 && msgArrayKeys.length === 0 && <Text style={[styles.textHeader, styles.textCenter, styles.textBold]}>You're doing great!</Text>}
              </>
              }
            </View>
            <View style={{marginTop: 8, gap: 8}}>
              {msgArrayKeys && msgArrayKeys.length > 0 && 
                msgArrayKeys.map(key => <Text style={[styles.textMd, styles.textCenter, styles.textBold]}>{messages[key]}</Text>)
              }
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
    borderRadius: 8,
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
  textMd: {
    fontSize: 20,
  },
  textWhite: {
    color: COLORS['white-500'],
  },
  textRed: {
    color: COLORS['red-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default AnalyzeModal