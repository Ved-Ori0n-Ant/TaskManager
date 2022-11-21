import 'react-native-get-random-values';
import {createRealmContext, Realm} from '@realm/react';

export class User extends Realm.Object {
  user_id!: Realm.BSON.ObjectId;
  userName!: string;
  lastLogin!: Date;

  static generate(name: string) {
    return {
      user_id: new Realm.BSON.ObjectID(),
      userName: name.toLowerCase(),
      lastLogin: new Date(),
    };
  }

  static schema = {
    name: 'User',
    primaryKey: 'user_id',
    properties: {
      user_id: 'objectId',
      userName: 'string',
      lastLogin: 'date',
    },
  };
}

export class ToDo extends Realm.Object {
  _id!: Realm.BSON.ObjectId;
  user_id!: Realm.Results<User['user_id']>;
  title!: string;
  description!: string;
  startdate!: Date;
  dueDate!: Date;
  status!: boolean;
  createdDate!: Date;
  updatedDate!: Date;

  static generate(
    user_id: string,
    title: string,
    description: string,
    startDate: Date,
    dueDate: Date,
    status: boolean = false,
  ) {
    return {
      _id: new Realm.BSON.ObjectID(),
      user_id: new Realm.BSON.ObjectID(user_id),
      title,
      description,
      startDate,
      dueDate,
      status,
      createdDate: new Date(),
      updatedDate: new Date(),
    };
  }

  static schema = {
    name: 'ToDo',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      user_id: {
        type: 'objectId',
        // objectType: 'User',
        property: 'User[user_id]',
      },
      title: 'string',
      description: 'string',
      startDate: 'date',
      dueDate: 'date',
      status: {type: 'bool', default: false},
      createdDate: 'date',
      updatedDate: 'date',
    },
  };
}

const config = {
  schema: [ToDo, User],
  schemaVersion: 2,
};

export default createRealmContext(config);