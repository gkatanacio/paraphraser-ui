interface Props {
  label: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export const Dropdown = ({
  label,
  options,
  selectedOption,
  onSelectOption,
}: Props) => {
  return (
    <>
      <strong>{label + `:`}</strong>&nbsp;
      <div className="btn-group dropend">
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedOption}
        </button>
        <ul className="dropdown-menu">
          {options.map((option) => {
            return (
              <li key={option}>
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={() => onSelectOption(option)}
                >
                  {option}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
