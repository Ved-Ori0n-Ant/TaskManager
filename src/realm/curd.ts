import 'react-native-get-random-values';
import realm, {ToDo} from './realm';

const CurdService = () => {
  const {useRealm} = realm;
  const realmDb = useRealm();

  const create = (
    user_id: string,
    title: string,
    description: string,
    startDate: Date,
    dueDate: Date,
    status: boolean = false,
  ) => {
    realmDb.write(() => {
      realmDb.create(
        'ToDo',
        ToDo.generator(user_id, title, description, startDate, dueDate, status),
      );
    });
  };

  const read = (user_id: any) => {
    const temp = realmDb.objects(ToDo);
    return temp.filtered('user_id == $0', new Realm.BSON.ObjectID(user_id));
  };

  const deleteToDo = (id: any) => {
    realmDb.write(() => {
      const temp = realmDb.objectForPrimaryKey('ToDo', id);
      realmDb.delete(temp);
    });
  };

  const updateToDo = (
    id: any,
    title?: string,
    description?: string,
    startDate?: Date,
    dueDate?: Date,
    status?: boolean,
  ) => {
    realmDb.write(() => {
      const temp: ToDo = realmDb.objectForPrimaryKey('ToDo', id);
      title ? (temp.title = title) : null;
      description ? (temp.description = description) : null;
      startDate ? (temp.startdate = startDate) : null;
      dueDate ? (temp.dueDate = dueDate) : null;
      status ? (temp.status = status) : null;
    });
  };

  const toggleStatus = (id: any) => {
    realmDb.write(() => {
      const temp: ToDo = realmDb.objectForPrimaryKey('ToDo', id);
      const tempStatus = temp.status;
      temp.status = !tempStatus;
      temp.updatedDate = new Date();
    });
  };

  return {create, deleteToDo, read, updateToDo, toggleStatus};
};

export default CurdService;