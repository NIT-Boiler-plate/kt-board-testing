import { Link } from 'react-router-dom';
import ArrowDownCircle from '../../../assets/svg/Arrow-down-circle';
import MapPin from '../../../assets/svg/Map-pin';
import Input from '../../atoms/Input';
import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { dbService } from '../../../firebase';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/stateAtoms';

const Row = ({ boardItem, index, handleFormChange }) => {
  const [userData, setUserData] = useRecoilState(userState);
  const [isOpend, setIsOpend] = useState(false);
  const { latestBoardType, name, uid } = userData;
  const { title, content } = boardItem;

  const readOnlyList = ['점검위치', '점검장소', '주소', '점검일', '장소', '날짜'];

  async function querySnapShot() {
    const ref = collection(dbService, 'post-collection');

    const q = query(ref, where('madeBy', '==', name), where('boardType', '==', latestBoardType));
    const querySnapshot = await getDocs(q);
    const _userData = querySnapshot.docs.map(doc => ({
      ...doc.data(), //합쳐서 보여줌
    }));

    return _userData;
  }

  const array = querySnapShot();
  console.log('array', array);

  const selectSvg = title => {
    if (title === '점검장소' || title === '주소') {
      return (
        <Link to="/map">
          <MapPin className="hover:animate-bounce" />
        </Link>
      );
    }

    return (
      <div
        onClick={() => {
          setIsOpend(!isOpend);
        }}
      >
        <ArrowDownCircle />
      </div>
    );
  };

  return (
    <div class="flex justify-center items-center space-x-2 ">
      <Input className="w-1/4 m-0 text-center" name="title" value={title} index={index} readOnly={true} />
      <Input
        className="w-3/4"
        name="content"
        value={content}
        index={index}
        onChange={handleFormChange}
        readOnly={readOnlyList.includes(title) ? true : false}
      />

      <>
        <div className="relative cursor-pointer">
          {selectSvg(title)}
          {isOpend && (
            <div
              class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                <div className="text-gray-700 block px-4 py-2 text-sm">{}</div>
              </div>
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default Row;

//https://tailwindui.com/components/application-ui/elements/dropdowns
