import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Subjects from './subjects'
import Syllabus from './syllabus';

const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Subjects" component={Subjects} />
      <Tab.Screen name="Syllabus" component={Syllabus} />
    </Tab.Navigator>
  );
}