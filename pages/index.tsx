
import type { NextPage } from 'next'
import Formly from '@/lib/components/Formly'
import { IField } from '@/lib/utils/types'
import { useState } from 'react'

const Home: NextPage = () => {

  const [values, setValues] = useState<any>(null);

  const form_name = 'starting'

  const onGetValues = async (data: any) => {
    await setValues(data);
  }

  async function confirmed(): Promise<boolean> {
		if (values) {
			if (values.username != values.password) {
				return false;
			}
			return true;
		}
		return false;
	}

  const fields: IField[] = [
    {
      type: 'input',
      name: 'username',
      attributes: {
        id: 'username',
        label: 'Username'
      },
      rules: ['required']
    },
    {
      type: 'input',
      name: 'password',
      attributes: {
        id: 'password',
        label: 'password'
      },
      rules: ['required', {name: 'confirmed', fnc: confirmed}]
    }
  ]

  return (
    <div className="max-w-screen-xl m-auto p-4">
      <Formly fields={fields} form_name={form_name} get_values={onGetValues} />
    </div>
  )
}

export default Home
