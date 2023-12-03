import { COLORS } from '../../constants/theme';
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
    width: '65%',
  },
  containAllocation: {
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
  textHighlight: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignSelf: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  textMediumBold: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  textWhite: {
    color: COLORS['white-700'],
  },  
  buttonWrapper: {
    gap: 15
  },
  bigButton: {
    fontSize: 48,
    color: COLORS['white-700'],
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: '#5cafc9',
    borderRadius: 5
  },
  darkModeBtn: {
    backgroundColor: COLORS['blue-100']
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
    color: COLORS['white-700'],
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
    color: COLORS['white-700'],
    backgroundColor: '#5cafc9',
  },
  darkWrapper: {
    backgroundColor: COLORS['dblue-450']
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 25,
  },
  navWrapper: {
    flexDirection: 'row',
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
  darkMode: {
    backgroundColor: COLORS['dblue-500']
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '130%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999
  }
})

export default styles;