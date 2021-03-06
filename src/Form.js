import {Formik, Form, Field, ErrorMessage, useField} from "formik";
import * as Yup from 'yup';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
        return (
            <>
                    <label htmlFor={props.name}>{label}</label>
                    <input {...props} {...field}/>
                    {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
            </>
            )
};

const MyCheckBox = ({children, ...props}) => {
        const [field, meta] = useField({...props, type: "checkbox"});
        return (
            <>
                    <label className="checkbox">
                            <input type="checkbox" {...props} {...field}/>
                            {children}
                    </label>
                    {meta.touched && meta.error ? (
                        <div className="error">{meta.error}</div>
                    ) : null}
            </>
        )
};

const CustomForm = () => {

    return (
        <Formik
            initialValues={{
                    name: '',
                    email: '',
                    amount: 0,
                    currency: '',
                    text: '',
                    terms: false
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                    .min(2, 'Name is too short, min 2 symbols')
                    .required('Name is required'),
                    email: Yup.string()
                    .email('Invalid email address')
                    .required('Email is required'),
                    amount: Yup.number()
                    .min(5, 'Not less than 5')
                    .required('Required field'),
                    currency: Yup.string().required('Choose currency'),
                    text: Yup.string().min(10, 'Min 10 symbols'),
                    terms: Yup.boolean()
                    .required('Do you agree with terms?')
                    .oneOf([true], 'Do you agree with terms?')
                 })}
            onSubmit = {values => console.log(JSON.stringify(values, null, 2))}
        >
                <Form className="form">
                        <h2>?????????????????? ??????????????????????????</h2>
                        <MyTextInput
                                label="???????? ??????"
                                id="name"
                                name="name"
                                type="text"
                        />
                        {/*can be replaced by component MyTextInput*/}
                        <label htmlFor="email">???????? ??????????</label>
                        <Field
                            id="email"
                            name="email"
                            type="email"
                        />
                        <ErrorMessage className='error' name='email' component='div' />

                        {/*can be replaced by component MyTextInput*/}
                        <label htmlFor="amount">????????????????????</label>
                        <Field
                            id="amount"
                            name="amount"
                            type="number"

                        />
                        <ErrorMessage className='error' name='amount' component='div' />
                        <label htmlFor="currency">????????????</label>
                        <Field
                            id="currency"
                            name="currency"
                            as='select'>
                                <option value="">???????????????? ????????????</option>
                                <option value="USD">USD</option>
                                <option value="UAH">UAH</option>
                                <option value="RUB">RUB</option>
                        </Field>
                        <ErrorMessage className='error' name='currency' component='div' />

                        <label htmlFor="text">???????? ??????????????????</label>
                        <Field
                            id="text"
                            name="text"
                            as='textarea'
                        />
                        <ErrorMessage className='error' name='text' component='div' />

                        <MyCheckBox name="terms">
                                ???????????????????????? ?? ?????????????????? ?????????????????????????????????????
                        </MyCheckBox>

                        {/*<label className="checkbox">*/}

                        {/*        <Field*/}
                        {/*            name="terms"*/}
                        {/*            type="checkbox" />*/}
                        {/*        ???????????????????????? ?? ?????????????????? ?????????????????????????????????????*/}
                        {/*</label>*/}
                        {/*<ErrorMessage className='error' name='terms' component='div' />*/}

                        <button type="submit">??????????????????</button>
                </Form>
        </Formik>
    )
}

export default CustomForm;