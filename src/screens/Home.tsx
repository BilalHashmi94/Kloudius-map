import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Colors, Images, Metrix, NavigationService} from '../config';
import {fonts, GoogleMapAPIKey} from '../config/Constants';
import {Button, Header, TextField} from '../components';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ShopComponent from '../components/ShopComponent';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useDispatch, useSelector} from 'react-redux';
import {SearchAction} from '../redux/Actions';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';

interface ShopItem {
  id: string;
  name: string;
  address: string;
  time: string;
  distance: string;
}

const dummyShops: ShopItem[] = [
  {
    id: '1',
    name: 'Q Car Garage',
    address: '861 Saxton St. Burlington, MA 01803',
    time: '30 Mins',
    distance: '10 Km away',
  },
  {
    id: '2',
    name: 'Auto Fix Garage',
    address: '500 Elm St. Newton, MA 02458',
    time: '20 Mins',
    distance: '7 Km away',
  },
];

const Home = () => {
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const searchHistory = useSelector(state => state.SearchReducer.searches);
  const [buttonSelect, setButtonSelect] = useState<'list' | 'map'>('map');
  const [showShopDialog, setShowShopDialog] = useState<boolean>(false);
  const [selectedShop, setSelectedShop] = useState<ShopItem | null>(null);
  const [markers, setMarkers] = useState({});
  const [currentLocation, setCurrentLocation] = useState({});
  const [directions, setDirections] = useState(false);

  const openDialog = (shop: ShopItem) => {
    setSelectedShop(shop);
    setShowShopDialog(true);
  };

  console.log('mar', markers);
  console.log('searchHistory', searchHistory);

  const handlePlaceSelect = details => {
    const lat = details.geometry.location.lat;
    const lng = details.geometry.location.lng;
    const safeDelta = delta => Math.max(0.001, delta);

    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: safeDelta(0.019),
        longitudeDelta: safeDelta(0.019),
      },
      1000,
    );
  };

  useEffect(() => {
    if (buttonSelect === 'map' && markers?.lat) {
      openDialog(markers);
    } else {
      setDirections(false);
    }
  }, [markers, buttonSelect]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  async function getCurrentLocation() {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        console.log('position', position.coords); // latitude & longitude
        setCurrentLocation(position.coords);
      },
      error => {
        console.log('error', error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }

  async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
      const auth = await Geolocation.requestAuthorization('whenInUse');
      return auth === 'granted';
    }

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.loadingContainer}>
        {buttonSelect === 'map' ? (
          <View style={styles.searchContainer}>
            <GooglePlacesAutocomplete
              placeholder={'Type location'}
              fetchDetails
              onPress={(data, details = null) => {
                if (details) {
                  let data = {
                    name: details?.name,
                    address: details?.formatted_address,
                    lat: details?.geometry?.location?.lat,
                    lng: details?.geometry?.location?.lng,
                    latitude: details?.geometry?.location?.lat,
                    longitude: details?.geometry?.location?.lng,
                    types: details?.types,
                    vicinity: details?.vicinity,
                    photo: details?.photos?.length
                      ? details?.photos[0]?.photo_reference
                      : '',
                  };
                  setMarkers({...data});
                  openDialog(data);
                  handlePlaceSelect(details);
                  dispatch(
                    SearchAction.SearchHistory([...searchHistory, data]),
                  );

                  // You can now set a marker using these coordinates
                }
              }}
              query={{
                key: GoogleMapAPIKey,
                language: 'en',
              }}
              styles={{
                textInput: {
                  borderWidth: 1,
                  borderColor: Colors.darkGray,
                  marginTop: Metrix.VerticalSize(5),
                },
              }}
              debounce={300}
              minLength={2}
              enablePoweredByContainer={true}
              predefinedPlaces={[]}
              textInputProps={{}}
            />
          </View>
        ) : null}

        <View style={styles.row}>
          <Button
            buttonText="Search On Map"
            onPress={() => {
              setShowShopDialog(false);
              setButtonSelect('map');
            }}
            btnStyle={{
              ...styles.button,
              backgroundColor:
                buttonSelect === 'map' ? Colors.redDark : Colors.background,
              borderColor: Colors.grayText,
              borderWidth: buttonSelect === 'map' ? 0 : 1,
            }}
            textStyle={{
              color: buttonSelect === 'map' ? Colors.white : Colors.textColor,
              fontSize: Metrix.customFontSize(12),
            }}
          />
          <Button
            buttonText="Search History"
            onPress={() => {
              setShowShopDialog(false);
              setButtonSelect('list');
            }}
            btnStyle={{
              ...styles.button,
              backgroundColor:
                buttonSelect === 'list' ? Colors.redDark : Colors.background,
              borderColor: Colors.grayText,
              borderWidth: buttonSelect === 'list' ? 0 : 1,
            }}
            textStyle={{
              color: buttonSelect === 'list' ? Colors.white : Colors.textColor,
              fontSize: Metrix.customFontSize(12),
            }}
          />
        </View>

        {buttonSelect === 'list' ? (
          <View style={{marginHorizontal: 20, marginTop: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 10,
              }}>
              <View></View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(SearchAction.ClearSearchHistory());
                  setMarkers({});
                }}>
                <Text
                  style={{
                    color: Colors.redDark,
                    textDecorationLine: 'underline',
                    fontFamily: fonts.Bold,
                  }}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchHistory}
              keyExtractor={item => item.id}
              ListEmptyComponent={() => (
                <View style={styles.emptyContainer}>
                  <Text style={styles.titleNoDataFount}>No Data Found</Text>
                </View>
              )}
              ListFooterComponent={() => <View style={{height: 20}} />}
              renderItem={({item, index}) => (
                <ShopComponent
                  item={item}
                  index={index}
                  viewOnMap={data => {
                    setMarkers(data);
                    setButtonSelect('map');
                  }}
                />
              )}
            />
          </View>
        ) : (
          <View style={{flex: 1, marginTop: Metrix.VerticalSize(30)}}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_GOOGLE}
              style={{flex: 1}}
              initialRegion={{
                latitude: markers?.lat
                  ? markers?.lat
                  : currentLocation.latitude,
                longitude: markers?.lng
                  ? markers?.lng
                  : currentLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {markers ? (
                <Marker
                  coordinate={{
                    latitude: markers?.lat,
                    longitude: markers?.lng,
                  }}>
                  <TouchableOpacity onPress={() => openDialog(markers)}>
                    <FontAwesome
                      name={'map-marker'}
                      color={Colors.green}
                      size={40}
                    />
                  </TouchableOpacity>
                </Marker>
              ) : null}
              <Marker
                coordinate={{
                  latitude: currentLocation?.latitude,
                  longitude: currentLocation?.longitude,
                }}>
                <TouchableOpacity onPress={() => openDialog(markers)}>
                  <FontAwesome
                    name={'map-pin'}
                    color={Colors.redDark}
                    size={30}
                  />
                </TouchableOpacity>
              </Marker>
              {directions ? (
                <MapViewDirections
                  origin={currentLocation}
                  destination={markers}
                  apikey={GoogleMapAPIKey}
                  strokeWidth={4}
                  strokeColor={Colors.redDark}
                  optimizeWaypoints={true}
                  onReady={result => {
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min`);
                  }}
                  onError={errorMessage => {
                    console.log('GMaps Directions error: ', errorMessage);
                  }}
                />
              ) : null}
            </MapView>
          </View>
        )}
      </View>

      {showShopDialog && selectedShop && (
        <View style={styles.dialogContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={styles.dialogTitle}>{selectedShop.name}</Text>
            <TouchableOpacity onPress={() => setShowShopDialog(false)}>
              <FontAwesome name={'close'} color={Colors.black} size={20} />
            </TouchableOpacity>
          </View>
          <View style={styles.dialogRow}>
            <View style={{width: '50%'}}>
              <Text style={styles.dialogAddress}>
                Address: {selectedShop.address}
              </Text>
              <Text style={{...styles.dialogAddress, marginTop: 10}}>
                Type: {selectedShop?.types[0]}
              </Text>
            </View>
            {selectedShop?.photo ? (
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedShop?.photo}&key=yourapikey`,
                }}
                style={{
                  width: 100,
                  height: 100,
                  resizeMode: 'cover',
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: Colors.redDark,
                }}
              />
            ) : (
              <Entypo name={'location'} color={Colors.redDark} size={50} />
            )}
          </View>
          {!directions ? (
            <Button
              buttonText="Get Directions"
              btnStyle={{backgroundColor: Colors.redDark}}
              onPress={() => {
                setDirections(true);
              }}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
  },
  searchContainer: {
    marginHorizontal: Metrix.HorizontalSize(20),
    flexDirection: 'row',
  },
  eyeIconStyle: {
    position: 'absolute',
    zIndex: 100,
    top: 14,
    padding: 10,
    left: 0,
  },
  row: {
    marginTop: Metrix.VerticalSize(23),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Metrix.HorizontalSize(20),
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  titleNoDataFount: {
    fontSize: Metrix.customFontSize(14),
    fontFamily: fonts.Bold,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  emptyContainer: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: Metrix.HorizontalSize(23),
    borderTopRightRadius: Metrix.HorizontalSize(23),
    backgroundColor: Colors.white,
    paddingVertical: Metrix.HorizontalSize(30),
    paddingHorizontal: Metrix.HorizontalSize(30),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15.5,
    elevation: 5,
  },
  dialogTitle: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Bold,
    color: Colors.redDark,
    textAlign: 'left',
    marginBottom: Metrix.VerticalSize(10),
  },
  dialogRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrix.VerticalSize(20),
    alignItems: 'center',
    width: '100%',
  },
  dialogAddress: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.textColor,
    textAlign: 'left',
    // width: '20%',
  },
  dialogDetail: {
    fontSize: Metrix.customFontSize(12),
    fontFamily: fonts.Regular,
    color: Colors.textColor,
    textAlign: 'right',
  },
});
