import Label from '../elements/label';
import SelectOption from '../elements/selectOptions';

const SelectField = ({ label, options, id, value, onChange, className, valueKey, labelKey, optionTitle }) => (
    <div className="mb-3">
        <Label htmlFor={id} className="form-label">{label}</Label>
        <select id={id} className={className} value={value} onChange={onChange}>
            <SelectOption value="" disabled={true}>{optionTitle}</SelectOption>
            {options.map((option, index) => (
                <SelectOption key={index} value={option[valueKey]}>{labelKey.map((key) => option[key]).filter(Boolean).join(" ")}</SelectOption>
            ))}
        </select>
    </div>
);

export default SelectField;
