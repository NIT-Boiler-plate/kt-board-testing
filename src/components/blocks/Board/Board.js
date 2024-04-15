import { BOARD_BUTTON_LIST } from '../../../constants/board';
import Row from '../Row/';

const Board = ({ userData, setUserData, latestBoardType, boardData, handleFormChange, handleClick }) => {
  return (
    <div class="space-y-1 text-base leading-5 text-gray-600">
      {boardData.map((boardItem, index) => (
        <Row {...{ userData }} {...{ setUserData }} {...{ boardItem }} {...{ index }} {...{ handleFormChange }} />
      ))}
      <ul class="space-y-2"></ul>
      <div className="flex justify-between">
        {BOARD_BUTTON_LIST.map((button, index) => (
          <button
            onClick={() => {
              handleClick(button.type);
            }}
            type="button"
            className="py-1 px-8 me-2 mb-2 text-sm font-medium text-gray-900 text-sm focus:outline-none bg-white rounded-lg border border-gray-200 "
          >
            <span className={`${latestBoardType === button.type ? 'text-sky-500 font-semibold' : ''}`}>
              {button.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Board;
