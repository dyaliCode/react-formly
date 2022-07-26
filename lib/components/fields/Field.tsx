import React, { ComponentClass, FunctionComponent } from 'react'
import { IField, IPropsField } from '../../utils/types';

// Field component.
import Input from './Input';

const components: any = {
  input: Input,
  // select: Select,
  // file: File,
  // textarea: Textarea,
  // checkbox: Checkbox,
  // radio: Radio,
  // autocomplete: AutoComplete
};


const Field: FunctionComponent<IPropsField> = ({ form_name, field, changeValue }: IPropsField) => {
  const FieldComponent:  ComponentClass<any, any> = components[field.type];

  const onChange = (data: any) => {
    changeValue(data);
  }

  return (
    <>
      <label htmlFor={field.attributes.id}>{field.attributes.label}</label>
      <FieldComponent key={field.name} form_name={form_name} field={field} changeValue={onChange} />
    </>
  )
}

export default Field;