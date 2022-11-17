import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  headerComponent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 1,
    padding: 5,
    marginBottom: 10,
  },
  toDoList: {
    borderWidth: 1,
    marginTop: 5,
    padding: 5,
  },
  component: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  buttonContaier: {
    flex: 1,
    marginVertical: 4,
  },
  button: {
    alignSelf: 'center',
    color: 'white',
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
    backgroundColor: '#efefef',
  },
  selectedToDo: {
    flexDirection: 'row-reverse',
  },
});

export default styles;