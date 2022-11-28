import Input from '../Input/Input';
import './FormGroup.scss';

interface FormGroupProps {
    name: string;
    title?: string;
    type: string;
    placeholder?: string;
    id: string;
    handleChange(attrs: any): void;
    value?: string;
}


const FormGroup: React.FC<FormGroupProps> = (props) => {
    return (
        <div className='form-group'>
            <label htmlFor={props.name}>{props.title}</label>
            <Input {...props} />
        </div>
    )
}

export default FormGroup;