import { FlatList, StyleSheet } from 'react-native';
import ColorListItem from './ColorListItem';

type ColorListProps = {
  data: string[];
};

const ColorList = ({ data }: ColorListProps) => {
  return (
    <FlatList
      data={data}
      bounces={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <ColorListItem color={item} />}
      horizontal
      contentContainerStyle={styles.listInternal}
      style={styles.listExternal}
    />
  );
};

const styles = StyleSheet.create({
  listExternal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  listInternal: {
    flexGrow: 1,
    borderTopWidth: 1,
  },
});

export default ColorList;
