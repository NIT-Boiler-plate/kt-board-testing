function Map({ mapRef, panTo }) {
  return (
    <div className="relative h-screen">
      <div id="map" className=" overflow-hidden" style={{ width: '1024px', height: '100%' }}>
        {mapRef.current ? <></> : <h1>로딩중!!!</h1>}
        {/* <button
          onClick={panTo}
          className="absolute p-1 mb-2 bottom-2 right-2 w-24 rounded-xl bg-sky-600 text-white z-20"
        >
          현재위치
        </button> */}
      </div>
    </div>
  );
}

export default Map;
