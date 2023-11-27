import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView} from 'react-native';
import MONTHS from '../../constants/months';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { formatDate } from '../../utils/dateFunctions';
import { compareExpenses } from '../../api/insights';
import DatePicker from './DatePicker';
import Button from '../common/Button';

import { useAuth } from '../../context/auth';
import { useBudget } from '../../context/budget';

const CompareBudgetsModal = ({isModalVisible, setModalVisible}) => {
  const [ startDate, setStartDate ] = useState(new Date());
  const [ endDate, setEndDate ] = useState(new Date());
  const [ isPickerVisible, setIsPickerVisible ] = useState(false);
  const [ isStartDate, setIsStartDate ] = useState(false);
  const [ budgets, setBudgets ] = useState([]);
  const [ isComparing, setIsComparing ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const { user } = useAuth();
  const { activeBudget } = useBudget();

  // Table States
  const [ tableColHeader, setTableColHeader ] = useState([]);
  const [ tableRowHeader, setTableRowHeader ] = useState([]);
  const [ tableData, setTableData ] = useState([]);

  const toggleModal = () => {
    setIsComparing(false);
    setModalVisible(false);
  };

  const toggleStartDatePicker = () => {
    setIsStartDate(true);
    setIsPickerVisible(true);
  }

  const toggleEndDatePicker = () => {
    setIsStartDate(false);
    setIsPickerVisible(true);
  }

  async function toggleComparison() {
    if (endDate <= startDate) {
      Alert.alert("Warning!", "Start date could not be greater than end date!");
      return;
    }

    setIsLoading(true);
    const data = await compareExpenses(JSON.parse(user).email, activeBudget.budgetName, startDate, endDate);
    setIsLoading(false);
    formatData(data.response);
    setBudgets(data.response);
    setIsComparing(true);
  }

  const formatData = (data) => {
    const header = data.map(item => `${MONTHS[item.month-1]} ${item.year}`)
    let rows = [];

    data.forEach(item => {
      rows = [...rows, ...Object.keys(item.expenses)];  
    })

    const uniqueRows = new Set(rows);
    let formattedRowData = [];

    uniqueRows.forEach(item => {
      let rowData = [];

      data.forEach(day => {
        if (day.expenses[item]) {
          rowData.push(day.expenses[item])
        } else {
          rowData.push(0)
        }
      })

      formattedRowData.push(rowData);
    })

    setTableColHeader(header);
    setTableRowHeader([...uniqueRows]);
    setTableData(formattedRowData);
  };

  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="fadeIn"
      animationOut="fadeOut">
        <View style={styles.modalWrapper}>
            <View style={[styles.modalHeader]}>
              <Text style={[styles.textBold, styles.textHeader]}>Compare Budgets</Text>
              <AntDesign name="close" size={24} color="#3A85AF" onPress={toggleModal}/>
            </View>
            {isComparing ?
            <ScrollView horizontal={true} style={{marginVertical: 12}}>
              {/* Header */}
              <View style={{borderWidth: 1, padding: 8}}>
                <View style={[{flexDirection: 'row', borderBottomWidth: 2}]}>
                  <Text style={{width: 70, textAlign: 'center'}}></Text>
                  {tableColHeader.map(item => <Text style={{width: 70, textAlign: 'center', borderRightWidth: 1, borderLeftWidth: 1, padding: 4}}>{item}</Text>)}
                </View>
                {/* Rows */}
                {tableRowHeader.map((item, idx) =>
                  <View style={[{flexDirection: 'row'}]}> 
                      <Text style={{width: 70, borderBottomWidth: 1}}>{item}</Text>
                      {tableData[idx].map(item => <Text style={{width: 70, textAlign: 'center', borderLeftWidth: 1, borderRightWidth: 1, borderBottomWidth: 1}}>{item}</Text>)}
                  </View>
                )}
              </View>
            </ScrollView>
            : 
            <>
              <View style={[styles.modalHeader]}>
                <View>
                  <Pressable onPress={() => toggleStartDatePicker()}>
                    <Text style={[styles.dateButton, styles.textWhite, styles.textBold]}>Pick start date</Text>
                  </Pressable>
                  <Text style={[styles.textBold, styles.textCenter]}>{formatDate(startDate)}</Text>
                </View>

                <View>
                  <Pressable onPress={() => toggleEndDatePicker()}>
                    <Text style={[styles.dateButton, styles.textWhite, styles.textBold]}>Pick end date</Text>
                  </Pressable>
                  <Text style={[styles.textBold, styles.textCenter]}>{formatDate(endDate)}</Text>
                </View>
              </View>

              <Button label={"Compare budgets"} action={() => toggleComparison()} isLoading={isLoading} />
            </>
            }
            <DatePicker isModalVisible={isPickerVisible} setModalVisible={setIsPickerVisible} setDay={isStartDate ? setStartDate : setEndDate} />
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
  dateButton: {
    textAlign: 'center',
    backgroundColor: COLORS['blue-400'],
    borderRadius: 8,
    padding: 4, 
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
    color: COLORS['white-500'],
  },
  textRed: {
    color: COLORS['red-500'],
  },
  textCenter: {
    textAlign: 'center',
  },
  
})

export default CompareBudgetsModal;