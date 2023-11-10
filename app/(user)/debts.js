import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router';
import { getPaymentHistory, getLendList } from '../../api/debt';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView } from 'react-native';

// Components
import CustomIcon from '../../components/common/CustomIcon';
import ListItem from '../../components/debts/ListItem';
import BorrowMoney from '../../components/debts/BorrowMoney';
import PayDebt from '../../components/debts/PayDebt';
import Checkbox from '../../components/common/Checkbox';

// Images
import LogoS from '../../assets/logos/logo-s.png';

// Context
import { useAuth } from '../../context/auth';

const Debts = () => {
  const [ activeTab, setActiveTab ] = useState("Debt");
  const [ listState, setListState ] = useState([]);
  const [ filteredList, setFilteredList ] = useState([]);
  const [ isFiltered, setIsFiltered ] = useState(false); 
  const [ totalBalance, setTotalBalance ] = useState(0);
  const [ nameList, setNameList ] = useState([]);
  const { user } = useAuth();
  const tabs = ["Debt", "Lend"];

  // Modals
  const [ borrowModalVisible, setBorrowModalVisible ] = useState(false);
  const [ payDebtModalVisible, setPayDebtModalVisible ] = useState(false);

  const buttonActions = {
    "Debt": {
      leftBtnLabel: "Borrow Money",
      rightBtnLabel: "Pay Debt",
    },
    "Lend": {
      leftBtnLabel: "Lend Money",
      rightBtnLabel: "Receive Payment",
    },
  }

  const toggleFiltered = () => {
    setIsFiltered(!isFiltered);
  }

  const leftBtnHandler = () => {
    setBorrowModalVisible(true)
  }

  const rightBtnHandler = () => {
    setPayDebtModalVisible(true)
  }

  async function fetchList() {
    const email = JSON.parse(user).email;
    
    const data = await getLendList(email, activeTab.toLowerCase());
    const response = data.response;

    const totalBalance = response.reduce((prev, cur, arr) => prev + cur.balance, 0)

    setNameList(response.filter(item => item.balance > 0).map(item => item.name));
    setTotalBalance(totalBalance);
    setFilteredList(response);
    setListState(response);
  }

  useEffect(() => {
    if (isFiltered) {
      setFilteredList(listState.filter(item => item.balance === 0));
    } else {
      setFilteredList(listState);
    }
  }, [isFiltered])

  useEffect(() => {
    fetchList();
  }, [activeTab, borrowModalVisible, payDebtModalVisible])

  return (
    <SafeAreaView>
      <Tabs.Screen 
        options={{
          headerStyle: { backgroundColor: "white" },
          headerShadowVisible: false,
          headerLeft: () => (
            <CustomIcon imageUrl={LogoS} />
          ),
          headerTitle: "",
        }}
      />

      <View style={[styles.container, styles.flexRow, styles.tabGroupStyle]}>
          {tabs.map((tab) => {
            let passStyle = [styles.normalText, styles.boldText]
            if (activeTab === tab) {
              passStyle.push(styles.activeTab)
              passStyle.push(styles.whiteText)
            } else {
              passStyle.push(styles.inactiveTab)
              passStyle.push(styles.grayText)
            }
            return (
            <Pressable key={tab} onPress={() => {setActiveTab(tab); setFilteredList([]); setTotalBalance(0)}}>
              <Text style={passStyle}>{tab}</Text>
            </Pressable>)
          }
          )}
      </View>
      
      <View style={[styles.container, styles.border, {backgroundColor: '#ffffff'}]}>
        <Text style={[styles.textCenter, styles.boldText, styles.normalText]}>BALANCE</Text>
        <Text style={[styles.textCenter, styles.boldText, styles.bigFont]}>Php. {totalBalance}.00</Text>
      </View>
      <View style={[styles.container, styles.border, styles.flexGrow, {backgroundColor: '#ffffff', maxHeight: '65%'}]}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.boldText, styles.normalText, {marginTop: 8, marginLeft: 8}]}>List</Text>
          <View style={{flexDirection: 'row', alignSelf: 'center', marginLeft: 'auto', gap: 8, marginTop: 8, marginRight: 8}}>
            <Checkbox checked={isFiltered} handleOnPress={() => toggleFiltered()} />
            <Text>Fully Paid</Text>
          </View>
        </View>
        <ScrollView style={[styles.container]}>
          {filteredList.length > 0 ?
            filteredList.map(item => <ListItem key={item.name} name={item.name} balance={item.balance} history={item.payments} dueDate={item.dueDate} type={activeTab}/>)
            :
            <Text style={[styles.boldText, styles.textCenter]}>Add person to track your debts/lends</Text>
          }
        </ScrollView>

      </View>

      <View style={[styles.bottomButtonWrapper, styles.container]}>
        <Pressable style={styles.evenButtons} onPress={() => leftBtnHandler()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>{buttonActions[activeTab].leftBtnLabel}</Text>
        </Pressable>
        <Pressable style={styles.evenButtons} onPress={() => rightBtnHandler()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>{buttonActions[activeTab].rightBtnLabel}</Text>
        </Pressable>
      </View>
      
      <PayDebt nameList={nameList} isModalVisible={payDebtModalVisible} setModalVisible={setPayDebtModalVisible} type={activeTab}/>
      <BorrowMoney isModalVisible={borrowModalVisible} setModalVisible={setBorrowModalVisible} type={activeTab}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grayText: {
    color: '#5f5f5f',
  },
  activeTab: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'black',
    backgroundColor: 'black',
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
  },
  inactiveTab: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'grey',
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: 'center',
  },
  whiteText: {
    color: '#ffffff',
  },
  normalText: {
    fontSize: 19,
    fontWeight: '500',
  },
  tabGroupStyle: {
    gap: 8,
    marginVertical: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  bigFont: {
    fontSize: 30,
  },
  boldText: {
    fontWeight: '700',
  },
  italics: {
    fontStyle: 'italic',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    padding: 4,
    margin: 8,
  },
  flexGrow: {
    flexGrow: 1,
  },
  border: {
    borderRadius: 6,
    borderColor: 'black',
    borderWidth: 1,
  },
  scrollHeight: {
    height: '36%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  moneyWrapper: {
    gap: 4,
    marginTop: 'auto',
    marginHorizontal: 8,
  },
  budgetWrapper: {
    backgroundColor: '#d6ebe8',
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
  },
  bottomButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 24,
  },
  evenButtons: {
    flex: 1,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    textAlign: 'center',
    backgroundColor: '#11588b',
    borderRadius: 4,
  }
});

export default Debts