import React from 'react';
import {View, Button} from 'react-native';
import CurdService from '../realm/curd';

const NameRealm = () => {
  const temp = CurdService();
  const {create, read} = temp;
  return (
    <View>
      <Button
        title="Create"
        onPress={() => {
          create('1', 'dd', 'dada', new Date(), new Date());
          console.log(read());
          console.log('Create');
        }}
      />
      <Button
        title="Read"
        onPress={() => {
          console.log(read());
          console.log('Read');
        }}
      />
      <Button
        title="Delete"
        onPress={() => {
          // deleteToDo();
          // console.log(read());
          console.log('Delete');
        }}
      />
    </View>
  );
};

export default NameRealm;