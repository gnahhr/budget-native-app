import { StyleSheet } from "react-native"

export default styles = StyleSheet.create({
  main: {
    backgroundColor: '#0f5074',
    flex: 1,
  },
  mainWrapper: {
    backgroundColor: "white",
    justifyContent: 'center',
    alignSelf: 'center',
    width: "120%",
    paddingBottom: 25,
    borderBottomLeftRadius: 225,
    borderBottomRightRadius: 225,
    marginBottom: 24,
  },
  flexRow: {
    flexDirection: 'row',
  },
  logo: {
    alignSelf: "center",
    width: 200,
    objectFit: 'contain',
  },
  header: {
    fontSize: 32,
  },
  textWhite: {
    color: '#ffffff'
  },
  textRed: {
    color: '#c01f28',
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 8,
  },
  textHighlight: {
    color: '#59BDF4',
  },
  textInputStyle: {
    backgroundColor: '#ffffff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  textCenter: {
    textAlign: 'center',
  },
  textBold: {
    fontWeight: '700',
  },
  container: {
    width: '90%',
    gap: 8,
    alignSelf: 'center',
    marginVertical: 8,
  },
  buttonStyle: {
    color: '#1579b2',
    fontWeight: 'bold',
    borderRadius: 5,
    marginTop: 16,
    paddingHorizontal: "20px",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 3,
  },
  checkboxActive: {
    backgroundColor: '#FFFFFF',
  }
})