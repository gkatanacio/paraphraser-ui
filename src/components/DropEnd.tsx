import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";

interface Props {
  label: string;
  onSelectOption: (option: string) => void;
  options: string[];
  selectedOption: string;
}

export const DropEnd = ({
  label,
  onSelectOption,
  options,
  selectedOption,
}: Props) => {
  return (
    <>
      <strong>{label + ":"}</strong>&nbsp;
      <DropdownButton
        as={ButtonGroup}
        drop="end"
        size="sm"
        title={selectedOption}
        variant="primary"
      >
        {options.map((option) => {
          return (
            <Dropdown.Item href="#" onClick={() => onSelectOption(option)}>
              {option}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </>
  );
};
