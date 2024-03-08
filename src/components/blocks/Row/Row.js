import Input from '../../atoms/Input';

const Row = ({ data, index, handleChange, handleSumbit }) => {
  const { title, content } = data;

  return (
    <div class="flex justify-center items-center space-x-2 ">
      <Input className="w-1/4 m-0" name="title" value={title} index={index} onChange={handleChange} />
      <Input className="w-3/4" name="content" value={content} index={index} onChange={handleChange} />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Row;
