"use client"

import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useTheme } from 'next-themes'

interface CustomPhoneInputProps {
  value: string
  onChange: (phone: string) => void
  country?: string
}

export function CustomPhoneInput({ value, onChange, country = 'co' }: CustomPhoneInputProps) {
  const { theme } = useTheme()

  return (
    <PhoneInput
      country={country}
      value={value}
      onChange={onChange}
      inputClass={`!w-full !h-10 !text-base !pl-14 !rounded-md !border !border-input ${
        theme === 'dark' ? '!bg-background !text-foreground' : ''
      }`}
      containerClass="!w-full"
      buttonClass={`!h-10 !w-12 !rounded-l-md !border !border-input ${
        theme === 'dark' ? '!bg-background' : ''
      }`}
      dropdownClass={`!rounded-md ${
        theme === 'dark' ? '!bg-background !text-foreground' : ''
      }`}
      searchClass={`!rounded-md ${
        theme === 'dark' ? '!bg-background !text-foreground' : ''
      }`}
    />
  )
}

