import { styled } from '@mui/material'
import './NewsLetterInput.css'
import { useState } from 'react'

const InputContainer = styled('form')({
  position: 'relative',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  borderRadius: '50px',
  backgroundColor: '#FFF',
  border: '1px solid #98897C',
  padding: '15px',
})
const CustomInput = styled('input')({
  borderRadius: '50px',
  border: 'none',
  outline: 'none',
  paddingLeft: ' 20px',
  paddingRight: ' 10px',
})

export const NewsLetterInput = () => {
  const [formData, setFormData] = useState({
    email: '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Submitted')
    setFormData({ email: formData.email })
  }
  return (
    <InputContainer onSubmit={handleSubmit}>
      <CustomInput onChange={(e) => setFormData({ email: e.target.value })} placeholder="Enter your email" />
      <button type="submit" onClick={NewsLetterInput} value={formData.email} className='custom-button'>
        <p>Subscribe</p>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </InputContainer>
  )
}
