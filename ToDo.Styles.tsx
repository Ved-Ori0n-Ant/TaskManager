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
  toDoList: {
    borderWidth: 2,
    marginTop: 5,
    padding: 5,
    backgroundColor: 'white'
  },
  component: {
    flexDirection: 'row',
    // marginVertical: 5,
    // marginHorizontal: 5
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
  },
  done: {
    fontWeight: '800',
    color: 'green',
  },
  pending: {
    fontWeight: '800',
    color: 'red',
  },
  date: {
    flexDirection: 'row',
    flex: 1,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    fontWeight: '700',
    alignSelf: 'center',
  },
  modelButton: {
    backgroundColor: '#3d73dd',
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
  },
  modalContainer: {
    marginTop: '50%',
    marginHorizontal: 5,
    backgroundColor: 'powderblue',
  },
  selectedToDo: {
    flexDirection: 'row-reverse',
  },
});

export default styles;