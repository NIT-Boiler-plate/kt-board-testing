const Input = ({ className, name, index, value, onChange, readOnly }) => {
  return (
    <div className={`${className}`}>
      <div className="relative mt-0 rounded-md shadow-sm">
        <input
          class="block w-full rounded-md border-0 py-1 px-3 text-gray-900 text-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
          name={name ? name : 'noname'}
          value={value}
          type="text"
          onChange={e => {
            onChange(e, index);
          }}
          // readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Input;
