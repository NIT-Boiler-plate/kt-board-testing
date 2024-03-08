import Geocode from 'react-geocode';
import imageCompression from 'browser-image-compression';
//file(사진) 등록 시 event
const onFileChange = async event => {
  const {
    target: { files },
  } = event;
  const theFile = files[0]; //파일 읽는 상수 선언
  console.log('originalFile instanceof Blob', theFile instanceof Blob); // true
  console.log(`originalFile size ${theFile.size / 1024 / 1024} MB`);

  const reader = new FileReader(); //web에 불러오는 상수 선언

  //resize 함수 작성
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(theFile, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    reader.onloadend = finishedEvent => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(compressedFile);
    meta.current = compressedFile;
  } catch (error) {
    console.log(error);
  }

  //메타데이터 추출
  if (theFile && theFile.name) {
    console.log(theFile);
    EXIF.getData(theFile, function () {
      let exifData = EXIF.pretty(this);
      let gpsLa = EXIF.getTag(this, 'GPSLatitude');
      let gpsLaRef = EXIF.getTag(this, 'GPSLatitudeRef');
      let gpsLong = EXIF.getTag(this, 'GPSLongitude');
      let gpsLongRef = EXIF.getTag(this, 'GPSLongitudeRef');

      let la = [];
      let long = [];

      //위경도 api 연동 변수
      let a = '';
      let b = '';

      if (gpsLa) {
        //exifdata 존재 시 gps 계산 수행
        console.log(exifData);
        console.log(gpsLa);
        console.log(gpsLong);
        for (let i = 0; i < gpsLa.length; i++) {
          la[i] = gpsLa[i].numerator / gpsLa[i].denominator;
        }
        for (let i = 0; i < gpsLong.length; i++) {
          long[i] = gpsLong[i].numerator / gpsLong[i].denominator;
        }

        //값 확인 콘솔
        console.log(la, long, gpsLaRef, gpsLongRef);

        //사진 시각 정보 설정
        const dateFirst = EXIF.getTag(this, 'DateTime').split(' ')[0].replaceAll(':', '-');
        const dateLast = EXIF.getTag(this, 'DateTime').split(' ')[1].substring(-1, 5);
        setDate(dateFirst + ' ' + dateLast);

        //ref 조건 별 위경도 계산
        if (gpsLaRef == 'N') {
          a = parseInt(la[0]) + (60 * parseInt(la[1]) + parseFloat(la[2])) / 3600;
        } else {
          a = -1 * parseInt(la[0]) + (-60 * parseInt(la[1]) + -1 * parseFloat(la[2])) / 3600;
        }
        setGPSLa(a);

        if (gpsLongRef == 'E') {
          b = parseInt(long[0]) + (60 * parseInt(long[1]) + parseFloat(long[2])) / 3600;
        } else {
          b = -1 * parseInt(long[0]) + (-60 * parseInt(long[1]) + -1 * parseFloat(long[2])) / 3600;
        }
        setGPSLong(b);
        setIsImgMeta(true);
        setFileData(a, b);

        if (isNaN(a) || isNaN(b)) {
          alert(
            '[오류] 사진의 위치정보가 존재하지 않습니다.\n\n ㅇ 위치기반 재촬영 방법 \n Android : 1. 설정>위치>사용 활성화 \n 2. 카메라>좌측 톱니바퀴 아이콘>위치 태그 활성화 \n iOS : 1. 설정>카메라>포맷>높은 호환성 체크 \n 2. 카메라 앱에서 사진 촬영 후, 사진 보관함에서 사진 선택해 추가',
          );
          onClearAttachment();
        }
      } else {
        console.log(date);
        alert(
          '[오류] 사진의 위치정보가 존재하지 않습니다.\n\n ㅇ 위치기반 재촬영 방법 \n Android : 1. 설정>위치>사용 활성화 \n 2. 카메라>좌측 톱니바퀴 아이콘>위치 태그 활성화 \n iOS : 1. 설정>카메라>포맷>높은 호환성 체크 \n 2. 카메라 앱에서 사진 촬영 후, 사진 보관함에서 사진 선택해 추가',
        );
        onClearAttachment();
        // window.location.reload();
      }
      //위경도 기반 주소변환 실행
    });
  }
};

//주소변환함수
const setFileData = (a, b) => {
  console.log(GPSla, GPSlong);
  Geocode.fromLatLng(String(a), String(b)).then(
    response => {
      //대한민국 제외 주소 DB 저장
      setAddress(response.results[0].formatted_address.substr(5));
      let city, state, country;
      // let add = response.results[0].formatted_address;
      // let result = add.substr(5);
      // console.log(result);
      for (const element of response.results[0].address_components) {
        for (let j = 0; j < element.types.length; j++) {
          switch (element.types[j]) {
            case 'locality':
              city = element.long_name;
              break;
            case 'administrative_area_level_1':
              state = element.long_name;
              break;
            case 'country':
              country = element.long_name;
              break;
          }
        }
        console.log(element);
      }

      //배열에 공백 단위로 주소 나눠넣기
      setArr(response.results[0].formatted_address.split(' '));
      console.log(city, state, country);
    },
    error => {
      console.error(error);
    },
  );
};
