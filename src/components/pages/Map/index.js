import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { boardState, geoState } from '../../../store/stateAtoms';

import Map from './Map';
import { isValidatedDistance } from '../../../util/position';

const Index = () => {
  const navigate = useNavigate();

  const seoulLat = 37.480731; // KT구로국사
  const seoulLon = 126.9033394; // KT구로국사
  const seoulStationLat = 37.470874386368905; // 진영면옥
  const seoulStationLon = 126.90283155712135; // 진영면옥

  const { kakao } = window;
  const [boardData, setBoardData] = useRecoilState(boardState);
  console.log('boardData', boardData);

  const [geoData, setGeoData] = useRecoilState(geoState);
  const [currentGeoData, setCurrentGeoData] = useState({ latitude: '', longitude: '' });

  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const geocoderRef = useRef(null);

  useEffect(() => {
    const { latitude, longitude } = geoData;

    if (!latitude && !longitude) {
      panTo();
      console.log('응애나panto', currentGeoData);
    }

    let mapContainer = document.getElementById('map'); // 지도를 표시할 div
    let mapOption = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };

    // 지도를 생성합니다
    let map = new kakao.maps.Map(mapContainer, mapOption);
    let geocoder = new kakao.maps.services.Geocoder();
    let marker = new kakao.maps.Marker();
    let infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    mapRef.current = map;
    markerRef.current = marker;
    geocoderRef.current = geocoder;

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          let roadAddr = !!result[0].road_address ? result[0].road_address.address_name : '';
          let nomalAddr = result[0].address.address_name;

          let content = `<div class="w-full text-sm m-2" style="background-color"><span> ${
            roadAddr ? roadAddr : nomalAddr
          }</span></div>`;

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);

          console.log('mouseEvent 좌표', mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat());
          setGeoData({ latitude: mouseEvent.latLng.getLat(), longitude: mouseEvent.latLng.getLng() });
          setBoardData(
            boardData.map(data => {
              console.log(data);
              if (data.title === '점검위치') {
                return { ...data, content: roadAddr ? roadAddr : nomalAddr };
              }
              return data;
            }),
          );
        }
      });
    });

    kakao.maps.event.addListener(marker, 'click', function () {
      console.log('currentGeoData geoData', currentGeoData, geoData);
      // if (
      //   !isValidatedDistance(
      //     currentGeoData.latitude,
      //     currentGeoData.longitude,
      //     geoData.latitude,
      //     geoData.longitude,
      //     300,
      //   )
      // ) {
      //   alert('300m 이내에서 선택해주세요.');
      //   return;
      // }

      if (window.confirm('지금 선택한 위치로 지정 하시겠습니까?')) {
        navigate('/home');
      } else {
        alert('취소');
      }
    });

    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    return () => {};
  }, []);

  const panTo = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(function (position) {
        let latitude = position.coords.latitude; // 위도
        let longitude = position.coords.longitude; // 경도

        console.log('현재좌표', latitude, longitude);
        const moveLatLon = new kakao.maps.LatLng(latitude, longitude);
        setCurrentGeoData({ latitude: latitude, longitude: longitude });
        setGeoData({ latitude: latitude, longitude: longitude });
        mapRef.current.panTo(moveLatLon); // Access the map object using ref and call panTo method
      });
    }
  };

  return <Map {...{ mapRef }} />;
};

export default Index;
