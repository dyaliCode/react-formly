import React, {
	ComponentClass,
	FunctionComponent,
	memo,
	useEffect,
	useState,
} from "react";
import {IField, IPropsField} from "../utils/types";

// Field component.
import Input from "./fields/Input";
import Select from "./fields/Select";
import File from "./fields/File";
import Textarea from "./fields/Textarea";
import Checkbox from "./fields/Checkbox";
import Radio from "./fields/Radio";
import Message from "./Message";
import AutoComplete from "./fields/AutoComplete";

const components: any = {
	input: Input,
	select: Select,
	file: File,
	textarea: Textarea,
	checkbox: Checkbox,
	radio: Radio,
	autocomplete: AutoComplete,
};

const Field: FunctionComponent<IPropsField> = ({
	form_name,
	field,
	changeValue,
}: IPropsField) => {
	const [_field, _setField] = useState<IField>(field);
	const FieldComponent: ComponentClass<any, any> = components[field.type];

	useEffect(() => {
		_setField(field);
	}, [field]);

	const onChange = (data: any) => {
		changeValue(data);
	};

	// Create element tag.
	const createComponent = (
		children: JSX.Element,
		props: {tag?: string; classes?: string[]}
	) => {
		return React.createElement(
			props.tag ?? "div",
			{className: props.classes?.join(" ")},
			children
		);
	};

	// Render element field.
	const renderFieldComponent = () => {
		return (
			<>
				{_field.attributes.label && (
					<label htmlFor={_field.attributes.id}>
						{_field.attributes.label}
					</label>
				)}
				<FieldComponent
					key={_field.name}
					form_name={form_name}
					field={_field}
					changeValue={onChange}
				/>
			</>
		);
	};

	// Render errors list.
	const renderErrors = () => {
		if (_field.validation) {
			if (_field.validation.errors.length) {
				return _field.validation.errors.map((error: string, indx: number) => (
					<Message
						key={indx}
						error={error}
						messages={_field.messages ? _field.messages : []}
					/>
				));
			}
		}
	};

	return (
		<>
			{_field.prefix?.tag
				? createComponent(renderFieldComponent(), _field.prefix)
				: renderFieldComponent()}

			{/* Errors */}
			{renderErrors()}
		</>
	);
};

export default memo(Field);
