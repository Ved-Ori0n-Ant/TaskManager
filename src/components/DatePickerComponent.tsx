import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import React, {Touch, useState} from 'react';
import {StyleProp, Text, TouchableOpacity, View, ViewStyle} from 'react-native';

type DatePickerComponentProps = {
  style?: StyleProp<ViewStyle>;
  setdate: React.Dispatch<React.SetStateAction<Date>>;
  selectedDate?: Date;
};

const DatePickerComponent = (props: DatePickerComponentProps) => {
  const [date, setDate] = useState(
    props.selectedDate ? props.selectedDate : new Date(),
  );

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    props.setdate(currentDate);
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: 'date',
    });
  };

  return(
    <View>
      <TouchableOpacity onPress={showDatepicker}>
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DatePickerComponent;