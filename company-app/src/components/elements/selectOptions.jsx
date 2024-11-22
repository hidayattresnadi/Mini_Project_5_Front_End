const SelectOption = ({ value, children, disabled }) => (
    <option value={value} disabled={disabled}>{children}</option>
);

export default SelectOption;
