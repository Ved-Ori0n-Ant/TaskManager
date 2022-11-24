import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // margin: 1,
    padding: 5,
    // marginBottom: 10,
    // backgroundColor: 'powderblue',
  },
  headerComponentForUnselected: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // margin: 1,
    padding: 5,
    // backgroundColor: '#ebe4ff',
    height: 60
  },
  component: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems: 'stretch'
    flexDirection: 'row',
    marginVertical: 8
  },
  toDoList: {
    borderWidth: 2,
    marginTop: 5,
    padding: 5,
    backgroundColor: '#ebe4ff',
    borderRadius: 13,
  },
  buttonContaier: {
    flex: 1,
    marginVertical: 4,
  },
  button: {
    alignSelf: 'center',
    color: 'white',
    // borderWidth: 1,
  },
  bold: {
    fontWeight: 'bold',
    color: 'blue',
    margin: 3
  },
  done: {
    fontWeight: '800',
    color: 'green',
    marginTop: 17,
    fontSize: 18,
  },
  pending: {
    fontWeight: '800',
    color: 'red',
    marginTop: 17,
    fontSize: 18
  },
  date: {
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    backgroundColor: 'white',
    margin: 9
  },
  textTitle: {
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    fontSize: 18
  },
  modelButton: {
    backgroundColor: '#3d73dd',
    // marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    marginTop: 160,
    marginHorizontal: 15,
    backgroundColor: '#ffe5a4',
    padding: 16,
    height: '70%',
    justifyContent: 'space-around'
  },
  selectedToDo: {
    flexDirection: 'row-reverse',
  },
});

export default styles;