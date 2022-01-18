// Form input types
export interface InputRule {
  type: 'required' | 'email'
  message: string
}
export type InputRules = InputRule[]
export interface InputProps {
  value: string | number
  rules: InputRules
}
export type InputTagType = 'input' | 'textarea'

export type ValidationFunction = () => boolean
export type ValidationFunctions = ValidationFunction[]
