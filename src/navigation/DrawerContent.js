import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, Text, TouchableRipple} from 'react-native-paper';
import usePreference from '../hooks/usePreferences';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [active, setaActive] = useState('home');
  const {theme, toggleTheme} = usePreference();

  const onChangeScreen = (screen) => {
    navigation.navigate(screen);
    setaActive(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={active === 'home'}
          onPress={() => onChangeScreen('home')}
        />
        <Drawer.Item
          label="Películas Populares"
          active={active === 'popular'}
          onPress={() => onChangeScreen('popular')}
        />
        <Drawer.Item
          label="Nuevas Películas"
          active={active === 'news'}
          onPress={() => onChangeScreen('news')}
        />
      </Drawer.Section>
      <Drawer.Section title="Opciones">
        <TouchableRipple>
          <View style={styles.preference}>
            <Text>Tema Oscuro</Text>
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
          </View>
        </TouchableRipple>
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
