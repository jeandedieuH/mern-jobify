/* eslint-disable react/prop-types */
const FormRowSelect = ({
  list,
  name,
  labelText,
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor="jobStatus" className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        className="form-select"
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {list.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item.toLocaleUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
