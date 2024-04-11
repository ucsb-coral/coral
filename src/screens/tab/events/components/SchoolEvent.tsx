import {Image, Text} from 'react-native';
import {View} from 'react-native';

export type Props = SchoolEvent;

export default function SchoolEvent({title, description, photo}: Props) {
  return (
    <View style={{}}>
      <Text
        style={{
          fontWeight: '700',
        }}>
        {title}
      </Text>
      <Text>{description}</Text>
      <Image source={{uri: photo}} />
    </View>
  );
}
