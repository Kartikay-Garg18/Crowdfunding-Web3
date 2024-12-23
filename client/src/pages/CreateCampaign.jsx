import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { money } from '../assets'
import { CustomButton, FormField } from '../components'
import { useStateContext } from '../context'
import { checkIfImage } from '../utils'
import { ethers } from 'ethers'

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();

  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  }); 

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName] : e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if(exists){
        setIsLoading(true);
        await createCampaign({...form, target: ethers.utils.parseUnits(form.target, 18)});
        setIsLoading(false);
        navigate('/');
      } else{
        alert('Please enter a valid image URL');
        setForm({...form, image: ''});
      }
    });
    console.log(form);
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && 'Loader...'}
      <div className=' flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>Start a campaign</h1>
      </div>

      <form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
          labelName="Your Name *"
          placeholder="Kartikay"
          inputType="text"
          value={form.name}
          handleChange ={(e) => handleFormFieldChange('name', e)}/>
          
          <FormField 
          labelName="Campaign Title *"
          placeholder="Write a title"
          inputType="text"
          value={form.title}
          handleChange ={(e) => handleFormFieldChange('title', e)}/>
          
        </div>
        <FormField 
          labelName="Story *"
          placeholder="Write your story"
          isTextArea
          value={form.description}
          handleChange ={(e) => handleFormFieldChange('description', e)}/>

          <div className='w-full flex justify-center items-center p-4 bg-[#8c60fb] h-[120px] rounded-[10px]'>
            <img src={money} alt="money" className='w-[40px] h-[40px] object-contain'/>
            <h4 className='font-epilogue font-bold text-white text-[25px] ml-[20px]'>You will get 99% of the raised amount</h4>
          </div>

          <div className='flex flex-wrap gap-[40px]'>
          <FormField 
          labelName="Goal *"
          placeholder="Eth 0.50"
          inputType="text"
          value={form.target}
          handleChange ={(e) => handleFormFieldChange('target', e)}/>
          
          <FormField 
          labelName="End Date *"
          placeholder="End Date"
          inputType="date"
          value={form.deadline}
          handleChange ={(e) => handleFormFieldChange('deadline', e)}/>


          <FormField 
          labelName="Campaign Image *"
          placeholder="Place image URL of your campaign"
          inputType="url"
          value={form.image}
          handleChange ={(e) => handleFormFieldChange('image', e)}/>

        </div>

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton 
          btnType="submit"
          title="Submit new campaign"
          styles="bg-[#1dc071] w-full"/>
        </div>

      </form>
    </div>
  )
}

export default CreateCampaign