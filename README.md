
# Kloudius Maps

This is a React Native CLI application developed as part of a technical assignment. The app integrates the Google Maps and Places APIs to provide seamless place searching, map rendering with directions, and local search history management.

## 📽️ Demo

Watch the demo here:  
[![Kloudius Maps Demo](https://img.youtube.com/vi/jaquBLNGuNo/0.jpg)](https://youtube.com/shorts/jaquBLNGuNo?feature=share)

## 🔧 Features

- 🔍 Google Places Autocomplete for searching locations
- 🗺️ Display selected location on Google Map with directions
- 📜 Maintain local history of searched places using AsyncStorage
- 📍 Show current location on map
- 🧭 Navigate to places from history
- 🎯 Clean and user-friendly UI
- ⚛️ Built with Redux and Redux Thunk

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/BilalHashmi94/Kloudius-map.git
cd kloudius-maps
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Add the .env File

Create a `.env` file in the root directory and add your Google Maps API Key:

```env
GOOGLE_MAPS_API_KEY=YOUR_API_KEY
```

### 4. Add the API Key

- **Android**:  
  In `android/app/src/main/AndroidManifest.xml`:
  ```xml
  <meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR_API_KEY" />
  ```

  Also in `android/app/src/main/res/values/google_maps_api.xml`:
  ```xml
  <resources>
      <string name="google_maps_api_key">YOUR_GOOGLE_MAPS_API_KEY</string>
  </resources>
  ```

- **iOS**:  
  In `ios/[YourProjectName]/AppDelegate.m`:
  ```objc
  [GMSServices provideAPIKey:@"YOUR_API_KEY"];
  ```

### 5. Run the App

#### For Android:
```bash
yarn android
```

#### For iOS:
```bash
cd ios && pod install && cd ..
yarn ios
```

## 👨‍💻 Author

**M Bilal Hashmi**  
📧 muhammedbilalhashmi94@gmail.com

---

> This project was built as part of a React Native technical assignment to demonstrate use of Google Maps, Places API, local storage, and map directions in a clean, modular app.
