import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  // isFieldDuplicated,
  type IField,
  type IForm,
  preprocess_and_validate_field,
  // type IBtnSubmit,
  // type IBtnReset
} from '../utils';
import Field from './fields/Field';

type Props = {
  form_name: string
  fields: IField[],
  get_values: Function
}

const Formly: FunctionComponent<Props> = ({ form_name, fields, get_values }) => {

  const [forms, setForms] = useState<IForm[]>([])
  const [curentForm, setCurrentForm] = useState<IForm>({
    form_name,
    fields: fields,
    values: {},
    valid: true
  });

  const onChange = async (data: any): Promise<void> => {
    let values = curentForm.values;

		const _fields = await Promise.all(
			curentForm.fields.map(async (field: IField) => {
				if (field.name === data.field_name) {
					values['touched'] = field.name;
					field.value = data.value;
					values[`${field.name}`] = data.value;
				}

				// Preprocess and validate field.
				field = await preprocess_and_validate_field(curentForm, field, values);

				return field;
			})
		);

		// Find dirty in the current form.
		const dirty = _fields.find((field: IField) => {
			if (field.validation) {
				return field.validation.dirty === true;
			}
		});

		const newForm = { ...curentForm, fields: _fields, values, valid: dirty ? false : true };
    setCurrentForm(newForm);

		// Update forms.
    const form = forms.find((form: IForm) => form.form_name === newForm.form_name);
    if (!form) {
      setForms([...forms, newForm]);
    } else {
      const _forms = forms.map((form: IForm) =>
        form.form_name === newForm.form_name ? newForm : form
      );
      setForms(_forms)
    }
    console.log('curentForm.values', curentForm.values)
    get_values(curentForm.values)
  }

  // Submit form.
	const onSubmit = async (): Promise<void> => {
		// const values = await getValues(form_name);
		// dispatch('submit', { ...values, valid: current_form.valid });
	};

	// Reset form.
	const onReset = async (): Promise<void> => {
		// Object.keys(values).forEach((key) => {
		// 	values[key] = null;
		// });
		// await storeForms.resetValues(form_name);
		// current_form.values = values;
	};

  useEffect(() => {
    async function init() {
      let values: any =  curentForm.values ?? {};

      await Promise.all(
        fields.map(async (field: IField) => {
          values[`${field.name}`] = field.value ?? null;
          // Preprocess and validate field.
          field = await preprocess_and_validate_field(curentForm, field, values);
          return field;
        })
      );

      // Find dirty in the current form.
      const dirty = fields.find((field: IField) => {
        if (field.validation) {
          return field.validation.dirty === true;
        }
      });

      const newForm = { ...curentForm, fields: fields, values, valid: dirty ? false : true };
      setCurrentForm(newForm);


      // Forms.
      const form = forms.find((form: IForm) => form.form_name === newForm.form_name);
      if (!form) {
        setForms([...forms, newForm]);
      } else {
        const _forms = forms.map((form: IForm) =>
          form.form_name === newForm.form_name ? newForm : form
        );
        setForms(forms)
      }

      console.log('curentForm.values', curentForm.values)
      get_values(curentForm.values)
    }

    init();
  
  }, [fields, form_name])
  

  return (
    <>
      <pre>
        <code>{JSON.stringify(forms, null, 2)}</code>
      </pre>
      {fields.map((field) => {
        return <Field key={field.name} form_name={form_name} field={field} changeValue={onChange} />;
      })}
    </>
  )
}

export default Formly
