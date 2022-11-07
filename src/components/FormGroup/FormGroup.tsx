import Input from '../Input/Input';
import './FormGroup.scss';

const FormGroup = (props) => {
    return (
        <div className='form-group'>
            <label htmlFor={props.name}>{props.title}</label>
            <Input {...props} />
        </div>
    )
}

export default FormGroup;