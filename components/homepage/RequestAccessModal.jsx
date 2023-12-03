import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TextInput, ScrollView, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import { COLORS } from '../../constants/theme';
import { getRequestAccess, grantAccess as grant } from '../../api/budget';
import DropDownPicker from 'react-native-dropdown-picker';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';
import Button from '../common/Button';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';
import { useTheme } from '../../context/theme';

const RequestAccessModal = ({isModalVisible, setModalVisible}) => {
  const [ userList, setUserList ] = useState([]);
  const [ isEdit, setIsEdit ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  // Drop Down States
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const toggleModal = () => {
    setModalVisible(false);
    setIsEdit(false);
  };

  const { user } = useAuth();
  const { activeBudget, budgetList } = useBudget();
  const { theme } = useTheme();

  async function handleGetUsers () {
    const data = await getRequestAccess(JSON.parse(user).email);
    setUserList(data.response);
  }

  const handleDropDownValues = () => {
    setItems(budgetList.map(budget => {
      return {
        label: budget.budgetName.split('~')[0],
        value: budget.budgetName
      }
    }));
  }

  async function grantAccess(userEmail, deny = false) {
    if (isLoading) return;
    if (!value && !deny) return;

    setIsLoading(true);
    const data = await grant(JSON.parse(user).email, userEmail, value, deny);
    
    setIsLoading(false);
    if (data.statusCode === 200) {
      let msg = deny ? 'User declined!' : 'User added successfully!';
      Alert.alert('Success', msg, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
      handleGetUsers();
    } else {
      Alert.alert('Warning', data.message, [
        {
          text: 'Okay',
          style: 'cancel'
        }
      ])
    }
  }

  useEffect(() => {
    if (user) {
      handleGetUsers();
      handleDropDownValues();
    }
  }, [user, activeBudget, isModalVisible]);

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={[styles.modalWrapper, theme === 'dark' && styles.darkMode]}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader, theme === 'dark' && styles.textWhite]}>Request Access</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>
            {userList && userList.length > 0 ?
            <View>
              <View style={{
                    flexWrap: 'wrap',
                    gap: 16,
                    borderBottomColor: theme === 'light' ? COLORS['black-500'] : COLORS['white-700'],
                    borderBottomWidth: 4,
                    paddingVertical: 16,
                  }}>
                <Text style={[styles.textBold, theme === 'dark' && styles.textWhite]}>Choose what budget to give access to:</Text>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                />
                {userList.map((user, idx) =>
                <View key={idx} style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                  {/* <Image source={`https:${user.Images.split(":")[1]}`} style={{width: 65, height: 65, borderRadius: 50, justifyContent: 'center'}}/> */}
                  <Text style={[{maxWidth: '50%'}, theme === 'dark' && styles.textWhite]}>{user.userEmail}</Text>
                  <View style={{flexDirection: 'row', gap: 8, marginLeft: 'auto'}}>
                    <AntDesign name="pluscircle" size={24} color={value ? COLORS['green-500'] : theme === 'light' ? COLORS['grey-500'] : COLORS['grey-200']} onPress={() => grantAccess(user.userEmail)}/>
                    <AntDesign name="minuscircle" size={24} color={COLORS['red-500']}  onPress={() => grantAccess(user.userEmail, true)}/>
                  </View>
                </View>)}
              </View>
            </View>
            :
            <Text style={[styles.textBold, styles. textCenter, {marginVertical: 8}, theme === 'dark' && styles.textWhite]}>No user asking for requests.</Text>
            }   
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
    overflow: 'visible'
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
    color: '#ffffff',
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default RequestAccessModal