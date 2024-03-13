import {View} from 'react-native';
import {Card, Subheading, Title, IconButton} from 'react-native-paper';

export type Props = Meal & {
  commonName: string;
  isFavorited: boolean;
  toggleFavorited: () => void;
};

export default function MealCard({
  id,
  name,
  station,
  common,
  commonName,
  isFavorited,
  toggleFavorited,
}: Props) {
  return (
    <Card
      style={{
        marginBottom: 10,
        width: '94%',
        left: '3%',
      }}>
      <Card.Content
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <></>
        <IconButton
          icon={isFavorited ? 'heart' : 'heart-outline'}
          size={20}
          onPress={toggleFavorited}
        />
        <View style={{flex: 1, overflow: 'hidden'}}>
          <Title ellipsizeMode="tail">{name}</Title>
          <Subheading ellipsizeMode="tail">{`${station} · ${commonName}`}</Subheading>
        </View>
      </Card.Content>
    </Card>
  );
}
