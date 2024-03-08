import React, { useEffect } from 'react';
import Modal from '../../blocks/Modal/Modal';

function Map() {
  const { naver } = window;
  console.log('유저페이지', naver);

  useEffect(() => {
    console.log('맵 뜨우기');

    // var map = new naver.maps.Map('map', {
    //   center: new naver.maps.LatLng(37.3595316, 127.1052133),
    //   zoom: 15,
    //   mapTypeControl: true,
    // });
  }, []);

  return (
    <div>
      <Modal />
      {/* <div id="map" style={{ width: '1024px', height: '1024px' }}></div> */}
    </div>
  );
}

export default Map;
