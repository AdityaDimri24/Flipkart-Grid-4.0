import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {height, width} from '../App';
import {regEx_valid_URL} from '../regex';
import * as ImagePicker from 'react-native-image-picker';
import {requestCameraPermission} from './api';

const imagesList = [
  'https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1550639525-c97d455acf70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8ZHJlc3N8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1612722432474-b971cdcea546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGRyZXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60',
];
const includeExtra = true;

function HomeScreen({navigation}) {
  const [url, seturl] = useState('');

  const checkurl = () => {
    if (url.length <= 1) return;

    const checkedURL = RegExp(regEx_valid_URL).exec(url);

    if (checkedURL != null) {
      const tempUrl = url;
      seturl('');
      navigation.navigate('Fetch', {link: tempUrl});
    }
  };

  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      // ImagePicker.launchCamera(options, setResponse);
      requestCameraPermission();
      ImagePicker.launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          if (response?.assets[0]?.base64) {
            navigation.navigate('Details', {
              response: response?.assets[0].base64,
            });
          }
        }
      });
    } else {
      // ImagePicker.launchImageLibrary(options, setResponse);
      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
          alert(response.customButton);
        } else {
          if (response?.assets[0]?.base64) {
            navigation.navigate('Details', {
              response: response?.assets[0].base64,
            });
          }
        }
      });
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 42,
      }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: '500',
          textAlign: 'center',
          color: 'white',
        }}>
        Trend Search
      </Text>
      <View
        style={{
          flexDirection: 'row',
          width: width - 48,
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: 8,
          marginTop: 16,
        }}>
        <Image
          source={require('../assets/search.png')}
          style={{width: 28, height: 28, marginLeft: 8}}
        />
        <TextInput
          style={{
            width: '80%',
            fontSize: 18,
            fontWeight: '500',

            color: 'grey',
          }}
          value={url}
          onChangeText={e => seturl(e)}
          keyboardType="web-search"
          onSubmitEditing={checkurl}
          placeholderTextColor="grey"
          placeholder="Enter Image url"
        />
      </View>

      <View style={{height: height * 0.6}}>
        <FlatList
          data={imagesList}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{}}
          style={{marginTop: 24}}
          scrollEventThrottle={16}
          pagingEnabled
          horizontal
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Fetch', {link: item})}
                style={{
                  width: width,
                  alignItems: 'center',
                }}>
                <Image
                  source={{uri: item}}
                  style={{
                    height: height * 0.54,
                    width: width * 0.8,
                    resizeMode: 'cover',
                    borderRadius: 16,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onButtonPress(actions[0].type, actions[0].options)}>
          <Image
            source={require('../assets/camera.png')}
            style={{
              width: 72,
              height: 72,
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onButtonPress(actions[1].type, actions[1].options)}>
          <Image
            source={require('../assets/gallery.png')}
            style={{
              width: 72,
              height: 72,
              resizeMode: 'cover',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeScreen;

const actions = [
  {
    title: 'Take Image',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: true,
      includeExtra,
    },
  },
  {
    title: 'Take Video',
    type: 'capture',
    options: {
      saveToPhotos: true,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: 'Select Video',
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'video',
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
