import TextArea from '../elements/text-area';

const LabeledTextArea = ({labelClassname,className, label, id, value, onChange, placeholder, required, rows }) => (
    <div className="form-group mb-4">
        <label className={labelClassname} htmlFor={id}>{label}</label>
        <TextArea
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            rows={rows}
            className={className}
        />
    </div>
);

export default LabeledTextArea;
