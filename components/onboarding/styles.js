import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  budgetMargin: {
    marginTop: 32,
  },
  containItem: {
    width: '80%',
  },
  center: {
    alignSelf: 'center',
  },
  textItalic: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 14
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 29,
  },
  textMediumBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textWhite: {
    color: '#ffffff',
  },  
  buttonWrapper: {
    gap: 15
  },
  bigButton: {
    fontSize: 48,
    color: '#ffffff',
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: '#5cafc9',
    borderRadius: 5
  },
  smallButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
    backgroundColor: `#11588b`,
  }, 
  smallButtonHollow: {
    backgroundColor: 'transparent',
    color: '#000000',
    fontWeight: 700,
    borderColor: '#5cafc9',
    borderWidth: 1,
  },
  smallButtonHollowInactive: {
    backgroundColor: 'transparent',
    color: '#a5a5a5',
    fontWeight: 700,
    borderColor: '#a5a5a5',
    borderWidth: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  whiteText: {
    color: '#ffffff'
  },
  blueDrawer: {
    backgroundColor: "#1579b2",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
  },
  blueDrawerExpanded: {
    height: '35%',
    padding: 20,
    width: 500,
    alignSelf: 'center',
    justifySelf: 'flex-end',
  },
  blueDrawerExpandedAllocation: {
    height: '75%',
  },
  input: {
    marginTop: 20,
    width: '70%',
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
    color: '#ffffff',
    backgroundColor: '#5cafc9'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  navWrapper: {
    flexDirection: 'row',
    marginTop: 100,
    justifySelf: 'flex-end',
    width: 325,
    justifyContent: 'space-between',
  },
  categoryWrapper: {
    width: "70%",
    alignSelf: 'center',
    backgroundColor: '#5cafc9',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    margin: 4
  },
})

export default styles;