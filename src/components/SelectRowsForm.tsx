import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef, useState, type FormEvent } from "react";
interface props {
  getSelectedRows: (input: number) => void;
}
const SelectRowsForm = ({ getSelectedRows }: props) => {
  const op = useRef<null | OverlayPanel>(null);
  const [value, setValue] = useState<number | null>();
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (value) getSelectedRows(value);
  }
  return (
    <>
      <button
        type="button"
        onClick={(e) => op.current?.toggle(e)}
        className="flex cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          width={22}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <OverlayPanel ref={op}>
        <form
          className="flex flex-col gap-4 items-end curp"
          onSubmit={(e) => onSubmit(e)}
        >
          <InputNumber
            value={value}
            onValueChange={(e) => setValue(e.value)}
            min={0}
            max={100}
            placeholder="Select rows"
          />
          <div>
            <Button label="Submit" />
          </div>
        </form>
      </OverlayPanel>
    </>
  );
};

export default SelectRowsForm;
