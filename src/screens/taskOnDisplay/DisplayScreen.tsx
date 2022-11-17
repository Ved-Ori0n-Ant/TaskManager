import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import 'react-native-get-random-values';
import CurdService from '../../realm/curd';
import realm from '../../realm/realm';
import {Back, Correct, Delete, Edit, Plus} from '../../assets/svg';
import styles from './ToDo.Styles';
import DatePickerComponent from '../../components/DatePickerComponent';

const Todo = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const realmDb = realm.useRealm();
  const curd = CurdService();
  const {read, create, deleteToDo, updateToDo, toggleStatus} = curd;
  const {user_id} = route.params;
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
    } catch (error) {
      console.log(error);
    }

    return () => {
      realmDb.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (selectedId.length > 0) {
      setIsAnySelected(true);
    } else {
      setIsAnySelected(false);
    }
  }, [selectedId.length, JSON.stringify(selectedId)]);

  return (
    <View>
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
        <View style={styles.headerComponent}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Back height={25} width={25} />
          </TouchableOpacity>
          <Text>ToDo List</Text>
          <TouchableOpacity
            onPress={() => {
              setAddModelVisible(true);
            }}>
            <Plus height={25} width={25} />
          </TouchableOpacity>
        </View>
      )}
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
            <View style={styles.component}>
              <Text style={styles.text}>Title : </Text>
              <TextInput
                value={title}
                onChangeText={value => {
                  setTitle(value);
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.component}>
              <Text style={styles.text}>Description : </Text>
              <TextInput
                value={description}
                onChangeText={value => {
                  setDescription(value);
                }}
                style={styles.textInput}
              />
            </View>
            <View style={styles.component}>
              <Text style={styles.text}>Start Date : </Text>
              <View style={{flex: 1}}>
                <DatePickerComponent
                  setdate={setStartDate}
                  selectedDate={startDate}
                />
              </View>
            </View>
            <View style={styles.component}>
              <Text style={styles.text}>Due Date : </Text>
              <View style={{flex: 1}}>
                <DatePickerComponent
                  setdate={setdueDate}
                  selectedDate={dueDate}
                />
              </View>
            </View>
            {addModelVisible ? (
              <TouchableOpacity
                onPress={() => {
                  create(user_id, title, description, startDate, dueDate);
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
      <FlatList
        data={todos}
        renderItem={item => {
          let alreadySelected = false;
          return (
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
              <Text style={styles.bold}>{item.item.title}</Text>
              <Text style={styles.bold}>{item.item.description}</Text>
              <View style={styles.component}>
                <View style={styles.date}>
                  <Text style={styles.bold}>Start Date : </Text>
                  <Text>{item.item.startDate.toLocaleDateString()}</Text>
                </View>
                <View style={styles.date}>
                  <Text style={styles.bold}>Due Date : </Text>
                  <Text>{item.item.dueDate.toLocaleDateString()}</Text>
                </View>
              </View>
              {item.item.status ? (
                <Text style={styles.done}>Done</Text>
              ) : (
                <Text style={styles.pending}>Pending</Text>
              )}
              <View style={styles.component}>
                <View style={styles.date}>
                  <Text style={styles.bold}>Created Date : </Text>
                  <Text>{item.item.createdDate.toLocaleDateString()}</Text>
                </View>
                <View style={styles.date}>
                  <Text style={styles.bold}>Updated Date : </Text>
                  <Text>{item.item.updatedDate.toLocaleDateString()}</Text>
                </View>
              </View>
              <View style={styles.component}>
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
                    <Edit height={20} width={20} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteToDo(item.item._id);
                  }}
                  style={styles.buttonContaier}>
                  <View style={styles.button}>
                    <Delete height={20} width={20} />
                  </View>
                </TouchableOpacity>
              </View>
              {selectedId.map(selectedIds => {
                if (item.item._id.toHexString() === selectedIds.toHexString()) {
                  return (
                    <View key={`${selectedIds}`} style={styles.selectedToDo}>
                      <Correct height={20} width={20} />
                    </View>
                  );
                }
              })}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Todo;