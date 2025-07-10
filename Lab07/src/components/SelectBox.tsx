type Props = {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
};

export const SelectBox = ({ label, options, value, onChange }: Props) => (
  <label className="flex flex-col gap-2 mb-8 text-lg">
    <span className="font-medium">{label}</span>

    <select
      className="w-60 border border-gray-400 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </label>
);
