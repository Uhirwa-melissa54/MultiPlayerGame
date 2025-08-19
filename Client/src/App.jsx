import React from 'react'
import {Formik,Field,ErrorMessage} from 'formik'
import * as yup from 'yup';

function App() {
  const handleFormSubmit=(values,isSubmitting)=>{

  }
  const initialValues={name:" ",score:" "}

  const validationSchema=yup.object({
    name:yup.string.required('It is required'),
    score:yup.score.required('It is required'),
  })
  return (
    <>
    <Formik onSubmit={handleFormSubmit}
    initialValues={initialValues}
    validationSchema={validationSchema}>
    {({values,handleChange,handleSubmit,handleBlur,isSubmitting})=>(
      <form onsSubmit={handleSubmit}>
        <Field type='text' name="playerName"  value={values.name} onChange={handleChange} onBlur={handleBlur}/>
        <ErrorMessage name="playerName" component="div"/>
        <Field type='text' name="scores"  value={values.scores} onChange={handleChange} onBlur={handleBlur}/>
        <ErrorMessage name="scores" component="div"/>
        

      </form>

    )}

    </Formik>
    </>
    
  )
}

export default App
