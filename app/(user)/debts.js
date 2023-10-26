import React, { useState, useEffect } from 'react'
import { Tabs } from 'expo-router';
import { getPaymentHistory, getLendList } from '../../api/debt';
import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView } from 'react-native';

// Components
import CustomIcon from '../../components/common/CustomIcon';
import ListItem from '../../components/debts/ListItem';
import BorrowMoney from '../../components/debts/BorrowMoney';
import PayDebt from '../../components/debts/PayDebt';

// Images
import LogoS from '../../assets/logos/logo-s.png';

// Context
import { useAuth } from '../../context/auth';

const Debts = () => {
  const [ activeTab, setActiveTab ] = useState("Debt");
  const [ listState, setListState ] = useState([]);
  const [ totalBalance, setTotalBalance ] = useState(0);
  const [ nameList, setNameList ] = useState([]);
  const { user } = useAuth();
  const tabs = ["Debt", "Lend"];

  // Modals
  const [ borrowModalVisible, setBorrowModalVisible ] = useState(false);
  const [ payDebtModalVisible, setPayDebtModalVisible ] = useState(false);

  const buttonActions = {
    "Debt": {
      leftBtn: () => setBorrowModalVisible(true),
      rightBtn: () => setPayDebtModalVisible(true),
      leftBtnLabel: "Borrow Money",
      rightBtnLabel: "Pay Debt",
    },
    "Lend": {
      leftBtn: () => fetchList(),
      rightBtn: () => console.log("Right Lend"),
      leftBtnLabel: "Lend Money",
      rightBtnLabel: "Receive Payment",
    },
  }

  async function fetchList() {
    const email = JSON.parse(user).email;
    
    const data = await getLendList(email, activeTab.toLowerCase());
    const response = data.response;

    const totalBalance = response.reduce((prev, cur, arr) => prev + cur.balance, 0)

    setNameList(response.filter(item => item.balance > 0).map(item => item.name));
    setTotalBalance(totalBalance);
    setListState(response);
  }

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
              passStyle.push(styles.inactiveTab)
            } else {
              passStyle.push(styles.grayText)
            }
            return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)}>
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
        <Text style={[styles.boldText, styles.normalText, {marginTop: 8, marginLeft: 8}]}>List</Text>

        <ScrollView style={[styles.container]}>
          {listState.map(item => <ListItem name={item.name} balance={item.balance} type={activeTab}/>)}
        </ScrollView>

      </View>

      <View style={[styles.bottomButtonWrapper, styles.container]}>
        <Pressable style={styles.evenButtons} onPress={() => buttonActions[activeTab].leftBtn()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>{buttonActions[activeTab].leftBtnLabel}</Text>
        </Pressable>
        <Pressable style={styles.evenButtons} onPress={() => buttonActions[activeTab].rightBtn()}>
          <Text style={[styles.boldText, styles.italics, styles.button, styles.whiteText]}>{buttonActions[activeTab].rightBtnLabel}</Text>
        </Pressable>
      </View>
      
      <PayDebt nameList={nameList} isModalVisible={payDebtModalVisible} setModalVisible={setPayDebtModalVisible} />
      <BorrowMoney isModalVisible={borrowModalVisible} setModalVisible={setBorrowModalVisible}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  grayText: {
    color: '#5f5f5f',
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