const Dropdown = ({ itemList, isOpend, setIsOpend, handleSelect }) => {
  return (
    <div id="drop-down" className="relative ">
      {isOpend && (
        <div
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            {itemList?.map(item => (
              <div
                onClick={() => {
                  setIsOpend(false);
                  handleSelect(item.type);
                }}
                className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
