import { forwardRef, ForwardedRef } from "react";
import { FieldError } from "react-hook-form";
import { SelectOptionsType } from "../types";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: FieldError | undefined;
  options: SelectOptionsType[];
};

export const Select = forwardRef(
  (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { className = "", label, options, error, ...other } = props;
    
    return (
      <div className ={ label ? "form-floating" : ""}>
        <select className={`form-select ${className}`} ref={ref} {...other}>
          {options?.map((option) => (
            <option key={typeof option === "string" ? option : option?.value} value={typeof option === "string" ? option : option?.value}>
              {typeof option === "string" ? option : option?.text}
            </option>
          ))}
        </select>
        {label && <label>{label}</label>}
        {error && <div className="error-feedback">{error?.message}</div>}
      </div>
    );
  }
);
