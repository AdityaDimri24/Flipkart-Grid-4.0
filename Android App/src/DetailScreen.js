import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fetchData} from './api';
import {height, width} from '../App';

const getImages = async item => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  const style = item?.product?.productLabels[0].value;
  const category = item?.product?.productLabels[1].value?.replace(' ', '+');
  const score = item?.score;

  const data = await fetch(
    `https://us-central1-odml-codelabs.cloudfunctions.net/productSearch/${item?.image}?key=`,
    requestOptions,
  )
    .then(response => response.json())
    .catch(error => console.log('error', error));

  return {
    link: `https://www.flipkart.com/search?q=${style}+${category}&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'`,
    image: data?.uri?.replace('gs://', 'https://storage.googleapis.com/'),
    label: {style, category},
    score: score,
  };
};

function DetailsScreen({navigation, route}) {
  const [data, setdata] = useState(null);

  const getData = async () => {
    const temp = await fetchData(route?.params?.response);

    let results = temp?.responses[0]?.productSearchResults?.results?.map(item =>
      getImages(item),
    );
    results = await Promise.all(results);

    setdata(results);
  };

  useEffect(() => {
    if (!route?.params?.response) {
      navigation.goBack();
    } else {
      getData();
    }
  }, []);

  if (!data)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
        }}>
        <ActivityIndicator size={64} color="white" />
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        style={{marginTop: 32}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                width: width * 0.9,
                height: height * 0.2,
                marginTop: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: '30%',
                  height: '90%',
                  borderRadius: 8,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'white',
                }}
                source={{uri: item?.image}}
              />
              <View style={{width: '66%', marginTop: -32}}>
                <Text
                  onPress={() => Linking.openURL(item.link)}
                  numberOfLines={2}
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: 'lightblue',
                  }}>
                  {item.link}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.9,
                    marginTop: 6,
                  }}>
                  Score : {item?.score}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.8,
                    marginTop: 2,
                  }}>
                  Style : {item?.label?.style}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: 'white',
                    opacity: 0.8,
                    marginTop: 2,
                  }}>
                  Category : {item?.label?.category}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default DetailsScreen;

// const newData =
//    temp?.responses[0]?.productSearchResults?.results?.map(
//     async (item, index) => {
//       const image = await getImages(item?.image);

//   return {
//     link: `https://www.flipkart.com/search?q=${
//       style - category
//     }&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off'`,
//     image: image?.uri?.replace(
//       'gs://',
//       'https://storage.googleapis.com/',
//     ),
//   };
//     },
//   );
