import { Link } from 'react-router-dom';
import ArrowDownCircle from '../../../assets/svg/Arrow-down-circle';
import MapPin from '../../../assets/svg/Map-pin';
import Input from '../../atoms/Input';

const Row = ({ data, index, handleChange, handleSumbit }) => {
  const { title, content } = data;

  const selectSvg = title => {
    if (title === '점검위치') {
      return (
        <Link to="/map">
          <MapPin className="hover:animate-bounce" />
        </Link>
      );
    }

    return <ArrowDownCircle />;
  };

  return (
    <div class="flex justify-center items-center space-x-2 ">
      <Input className="w-1/4 m-0" name="title" value={title} index={index} onChange={handleChange} readOnly={true} />
      <Input
        className="w-3/4"
        name="content"
        value={content}
        index={index}
        onChange={handleChange}
        readOnly={title === '점검위치' || title === '점검일' ? true : false}
      />
      <div className="cursor-pointer">{selectSvg(title)}</div>
    </div>
  );
};

export default Row;

//https://tailwindui.com/components/application-ui/elements/dropdowns로 구현할 예정
