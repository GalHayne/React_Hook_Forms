import { Control, useFormState } from "react-hook-form";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control? : Control<any, any>
};

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    className = "btn-primary",
    value,
    control = undefined,
    ...other
  } = props;


  let isSubmitting = undefined;
  if (control) ({isSubmitting} = useFormState({control}))
  

  return (
    <>
      <button
        type="submit"
        className={`btn ${className}`}
        disabled={isSubmitting === undefined ? false : isSubmitting}
        {...other}
      >
        {isSubmitting === undefined || isSubmitting === false ? (
          value
        ) : (
          <>
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
            <span role="status" className="ms-1">
              {value}
            </span>
          </>
        )}
      </button>
    </>
  );
};
