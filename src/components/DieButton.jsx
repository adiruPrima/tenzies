/* eslint-disable react/prop-types */
function DieButton({ onClick, style, icon, isDisabled }) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-2xl cursor-pointer"
      style={style}
      disabled={isDisabled}
    >
      {icon}
    </button>
  );
}

export default DieButton;
