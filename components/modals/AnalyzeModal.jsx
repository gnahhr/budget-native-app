import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import Modal from 'react-native-modal';
import { analyzeData } from '../../api/insights';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const AnalyzeModal = ({isModalVisible, setModalVisible}) => {
  const [ overspentItems, setOverspentItems ] = useState(null);
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  const toggleModal = () => {
    setModalVisible(false);
  };


  async function handleGetUsers () {
    const data = await analyzeData(JSON.parse(user).email, activeBudget.budgetName);
    if (data.statusCode === 200) {
      const keys = Object.keys(data.response);

      let overBudget = [];
      keys.forEach((key) => {
        if (data.response[key].isOverBudget) {
          overBudget.push({name: key, ...data.response[key]})
        }
      });

      setOverspentItems(overBudget);
    } else {
      isModalVisible && Alert.alert("Error!", data.message);
    }
  }


  useEffect(() => {
    if (user) {
      handleGetUsers();
    }
  }, [user, activeBudget]);

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
              <Text style={[styles.textHeader, styles.textCenter, styles.textBold]}>You're doing great!</Text>}
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