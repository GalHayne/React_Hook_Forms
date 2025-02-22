import { useFormState } from 'react-hook-form';

const FormLoader = (props) => {
    const {control} = props;
    const {isLoading} = useFormState({control})
  return (
    <div className= {isLoading ? 'loader': ''}></div>
  )
}

export default FormLoader
