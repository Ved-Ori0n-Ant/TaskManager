import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import 'react-native-get-random-values';
import CurdService from '../../realm/curd';
import realm from '../../realm/realm';
import {Back, Correct, Delete, Edit, Plus} from '../../assets/svg';
import styles from './ToDo.Styles';
import DatePickerComponent from '../../components/DatePickerComponent';
import CircularProgress from 'react-native-circular-progress-indicator';

const HOME = require('../../assets/png/home.png');
const [progress, setProgress] = useState<any>(0);

const Todo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const realmDb = realm.useRealm();
  const curd = CurdService();
  const {read, create, deleteToDo, updateToDo, toggleStatus} = curd;
  const {user_id}: any = route.params;
  const [todos, setTodos] = useState<any>();
  const [isAnySelected, setIsAnySelected] = useState(false);
  let tempSelectedId: any[] = [];
  const [selectedId, setSelectedId] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setdueDate] = useState(new Date());
  const [addModelVisible, setAddModelVisible] = useState(false);
  const [editModelVisible, setEditModelVisible] = useState(false);
  const [id, setId] = useState<any>();

  useEffect(() => {
    
    setTodos(read(user_id));
    try {
      realmDb.addListener('change', () => {
        setTodos(read(user_id));
      });
    } 
    catch (error) {
      console.log(error);
    }

    return () => {
      realmDb.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (selectedId.length > 0) {
      setIsAnySelected(true);
    }
    else {
      setIsAnySelected(false);
    }
  }, [selectedId.length, JSON.stringify(selectedId)]);

  const [dimension, setDimension] = useState(25);

  return (
    <View style={{backgroundColor: '#5f33e1', flex: 1, borderWidth: 1}}>
      {/*Header component*/}
      {isAnySelected ? (
        <View style={styles.headerComponent}>
          {selectedId.length === todos.length ? (
            <TouchableOpacity
              onPress={() => {
                setSelectedId([]);
              }}>
              <Text>Deselect All</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setSelectedId([]);
                todos.map((item: any) => {
                  tempSelectedId.push(item._id);
                });
                setSelectedId(tempSelectedId);
              }}>
              <Text>Select All</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              selectedId.map(item => {
                deleteToDo(item);
              });
              setSelectedId([]);
            }}>
            <Delete height={25} width={25} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.headerComponentForUnselected}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 0.8,
              marginTop: 12,
              alignItems: 'center',
              borderWidth: 1,
              padding: 4,
              borderRadius: 23,
              backgroundColor: '#ffe5a4',
            }}>
            <Pressable
              onHoverOut={() => {
                setDimension(dimension + 4);
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Back height={dimension} width={dimension} />
            </Pressable>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Todo's List</Text>
            <TouchableOpacity
              onPress={() => {
                setAddModelVisible(true);
              }}
              style={{borderWidth: 1, padding: 2, borderRadius: 22}}>
              <Plus height={25} width={25} />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/*TODO details*/}
      <Modal
        visible={addModelVisible || editModelVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => {
          setAddModelVisible(false);
          setEditModelVisible(false);
        }}>
        <View>
          <View style={styles.modalContainer}>
            <View>
              <Text style={styles.text}>Title : </Text>
              <TextInput
                value={title}
                onChangeText={value => {
                  setTitle(value);
                }}
                style={styles.textInput}
              />
            </View>
            <View>
              <Text style={styles.text}>Description : </Text>
              <TextInput
                value={description}
                multiline={true}
                onChangeText={value => {
                  setDescription(value);
                }}
                style={styles.textInput}
              />
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <View>
                  <Text style={styles.text}>Start Date : </Text>
                  <View style={{margin: 9}}>
                    <DatePickerComponent
                      setdate={setStartDate}
                      selectedDate={startDate}
                    />
                  </View>
                </View>
                <View>
                  <Text style={styles.text}>Due Date : </Text>
                  <View style={{margin: 9}}>
                    <DatePickerComponent
                      setdate={setdueDate}
                      selectedDate={dueDate}
                    />
                  </View>
                </View>
              </View>
              <View>
                <Text style={styles.text}>Progress in %age</Text>
                <TextInput 
                  value ={progress.toString()}
                  multiline={true}
                  onChangeText={(value) => {
                    setProgress(value);
                  }}
                  style={styles.textInput}
                />
              </View>
            </View>
            {addModelVisible ? (
              <TouchableOpacity
                onPress={() => {
                  create(
                    user_id,
                    title,
                    description,
                    startDate,
                    dueDate,
                    false,
                  );
                  setTitle('');
                  setDescription('');
                  setStartDate(new Date());
                  setdueDate(new Date());
                  setAddModelVisible(false);
                }}
                style={styles.modelButton}>
                <Text style={styles.button}> Add ToDo </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  updateToDo(id, title, description, startDate, dueDate);
                  setTitle('');
                  setDescription('');
                  setStartDate(new Date());
                  setdueDate(new Date());
                  setEditModelVisible(false);
                }}
                style={styles.modelButton}>
                <Text style={styles.button}> Update ToDo </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          marginVertical: 7,
          padding: 5,
          width: 60,
          borderRightWidth: 1,
          // borderLeftWidth: 1,
          borderRadius: 4,
          backgroundColor: '#a0a0a0c0',
        }}>
        <Image source={HOME} />
      </TouchableOpacity>
      <FlatList
        data={todos}
        renderItem={item => {
          let alreadySelected = false;
          return (
            <View style={{padding: 7}}>
              <TouchableOpacity
                onLongPress={() => {
                  if (selectedId.length === 0) {
                    if (!alreadySelected) {
                      setSelectedId([...selectedId, item.item._id]);
                    }
                    selectedId.map(selected => {
                      if (
                        selected.toHexString() === item.item._id.toHexString()
                      ) {
                        alreadySelected = true;
                      }
                    });
                  }
                }}
                onPress={() => {
                  if (selectedId.length > 0) {
                    selectedId.map(selected => {
                      if (
                        selected.toHexString() === item.item._id.toHexString()
                      ) {
                        alreadySelected = true;
                      }
                    });
                    if (!alreadySelected) {
                      setSelectedId([...selectedId, item.item._id]);
                    } else {
                      let tempArray: any[] = [];
                      selectedId.map(selected => {
                        if (
                          selected.toHexString() !== item.item._id.toHexString()
                        ) {
                          tempArray.push(selected);
                        }
                      });
                      setSelectedId(tempArray);
                    }
                  } else {
                    toggleStatus(item.item._id);
                  }
                }}
                style={[
                  styles.toDoList,
                  addModelVisible || editModelVisible ? {opacity: 0.2} : null,
                  selectedId.map(selectedIds => {
                    if (
                      selectedIds.toHexString() === item.item._id.toHexString()
                    ) {
                      return {borderColor: '#3d73dd'};
                    }
                  }),
                ]}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    padding: 7,
                    backgroundColor: '#ebe4ff',
                  }}>
                  <View>
                    <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                      {item.item.title}
                    </Text>
                  </View>
                  <Text style={styles.bold}>Description</Text>
                  <View style={{padding: 7}}>
                    <Text>{item.item.description}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                      <View style={styles.date}>
                        <Text style={styles.bold}>Start Date : </Text>
                        <Text>{item.item.startDate.toLocaleDateString()}</Text>
                      </View>
                      <View style={styles.date}>
                        <Text style={styles.bold}>Due Date : </Text>
                        <Text>{item.item.dueDate.toLocaleDateString()}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                      <View style={styles.date}>
                        <Text style={styles.bold}>Created Date : </Text>
                        <Text>
                          {item.item.createdDate.toLocaleDateString()}
                        </Text>
                      </View>
                      <View style={styles.date}>
                        <Text style={styles.bold}>Updated Date : </Text>
                        <Text>
                          {item.item.updatedDate.toLocaleDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View>
                    <CircularProgress
                      radius={90}
                      value={progress}
                      // textColor = {'#222'}
                      // fontSize={20}
                      valueSuffix={'%'}
                      inActiveStrokeColor={'#2ecc71'}
                      inActiveStrokeOpacity={0.2}
                      inActiveStrokeWidth={6}
                      duration={4000}
                    />
                  </View>
                  <View style={styles.component}>
                    {/* <View style = {{flexDirection: 'column', justifyContent: 'center'}}> */}
                    <TouchableOpacity
                      onPress={() => {
                        setId(item.item._id);
                        setTitle(item.item.title);
                        setDescription(item.item.description);
                        setStartDate(item.item.startDate);
                        setdueDate(item.item.dueDate);
                        setEditModelVisible(true);
                      }}
                      style={styles.buttonContaier}>
                      <View style={styles.button}>
                        <Edit height={35} width={35} />
                      </View>
                    </TouchableOpacity>
                    {/* <Text>Edit Task</Text>
                    </View> */}
                    {/* <View> */}
                    {item.item.status ? (
                      <Text style={styles.done}>Done</Text>
                    ) : (
                      <Text style={styles.pending}>Pending</Text>
                    )}
                    {/* </View> */}
                    <TouchableOpacity
                      onPress={() => {
                        deleteToDo(item.item._id);
                      }}
                      style={styles.buttonContaier}>
                      <View style={styles.button}>
                        <Delete height={35} width={35} />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                {selectedId.map(selectedIds => {
                  if (
                    item.item._id.toHexString() === selectedIds.toHexString()
                  ) {
                    return (
                      <View key={`${selectedIds}`} style={styles.selectedToDo}>
                        <Correct height={20} width={20} />
                      </View>
                    );
                  }
                })}
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Todo;