import { Alert } from 'react-native';

export const showFeatureComingSoon = () => {
  Alert.alert(
    'Page Coming Soon',
    'Check back later',
    [
      { 
        text: 'Got It', 
        style: 'default' 
      },
      {
        text: 'Notify Me',
        onPress: () => console.log('Notification requested'),
        style: 'cancel'
      }
    ]
  );
};