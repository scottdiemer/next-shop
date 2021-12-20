function Input({ type, required, value, onChange }) {
  return (
    <input
      type={type}
      required={required}
      value={value}
      onChange={onChange}
      className="px-3 py-1 border rounded w-80"
    />
  );
}

export default Input;
