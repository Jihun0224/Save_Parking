# **거기 멈춰**

 **거기 멈춰**은 사용자가 주·정차한 위치의 정보를 알려준다. 여기서 정보란 현 위치가 시에서 지정한 주·정차 금지구역인지, 불법 주정차 단속을 어떤 방법으로 어느 시간대에 주로 하는지에 대한 정보이다. 또한, 사용자와 가까운 위치에 있는 주차장의 위치, 요금, 운영시간 등의 정보를 제공하는 안드로이드 앱이다.   
 
 &nbsp;&nbsp;&nbsp;
![image](https://user-images.githubusercontent.com/59672592/116570687-6c50bc00-a945-11eb-9396-cdd7dd0c7434.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![image](https://user-images.githubusercontent.com/59672592/116570517-4a573980-a945-11eb-90c3-6a282bbb91f0.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![image](https://user-images.githubusercontent.com/59672592/116571064-b89bfc00-a945-11eb-9d65-449f2f53d68c.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

## 주요기능  
+ 장소 검색
+ 주차장 정보 제공
+ 주·정차단속 구역 주차시 알람 기능
+ 불법 주·정차단속 정보 제공

## 개발 환경
+ OS: Android, Window OS
+ Framework: React Native
+ IDE: Visual Studio Code  
+ DB: Firebase Realtime Database
+ DEVICE: Android Emulator  
    >CPU/ABI: Google Play Intel Atom (x86)   
    Target: google_apis_playstore [Google Play] (API level 29)   
    Skin: pixel_3a   
    SD Card: 512M
## 사용 API
+ 카카오 장소 API  
+ 네이버맵 API
## Install
**1. 초기 설정**
 ```
 #소스 코드 내려받기 
 git clone https://github.com/Jihun0224/Save_Parking.git  
 #소스 코드 디렉토리에 엑세스
 cd Save_Parking
 #node_modules 설치
 npm install
 ```
**2. API KEY 설정**  
**2-1.[Kakao Developers](https://developers.kakao.com)에서 카카오 맵 API를 발급 받기**
```JavaScript
#./src/Search.js
...
const API_KEY = "YOUR_KEY";
...
```
YOUR_KEY에 본인 키값 입력  

**2-2.[네이버 클라우드 플랫폼](https://www.ncloud.com/product/applicationService/maps)에서 네이버 맵 API를 발급 받기**

```JavaScript
#./android/app/src/main/AndroidManifest.xml
...
    <application>
        ...
        <meta-data android:name="com.naver.maps.map.CLIENT_ID"
        android:value="YOUR_KEY" />
    </application>
 ...
```
YOUR_KEY에 본인 키값 입력  

**3. DB 설정(본인의 DB를 사용하고 싶을 경우)**  
거기 멈춰는 [firebase](https://firebase.google.com/) realtime database 사용([참고](https://velog.io/@jinsunee/react-native-firebase-%EC%84%A4%EC%A0%95))  
```JavaScript
#데이터 조회
import database from '@react-native-firebase/database';
...
    database()
    .ref(`YOUR_TABLE_NAME`)
    .on('value', (snapshot) => {
          console.log(snapshot);
        });
 ...
```
**4.실행**  
```
react-native run-android
```
## 사용 데이터
전국주차장정보표준데이터: https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15012896  
부산광역시_불법주정차단속 데이터: https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15034087

