export const InputField = ({
  type,
  value,
  onChange,
  placeholder,
  required,
}) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export const BaseFormPage = ({ children }) => {
  return (
    <div className="flex h-screen items-center">
      <div className="m-auto gap-6 grid">{children}</div>
    </div>
  );
};
