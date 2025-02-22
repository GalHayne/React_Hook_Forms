import { useFormState } from 'react-hook-form';

const FormLoader = (props) => {
    const {control} = props;
    const {isLoading} = useFormState({control})
    console.log("🚀 ~ FormLoader ~ isLoading:", isLoading)
  return (
    <div className= {isLoading ? 'loader': ''}></div>
  )
}

export default FormLoader
