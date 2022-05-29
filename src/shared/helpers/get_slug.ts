import { isUndefined } from './is_undefined'

export const getPostSlug = (value?: string | string[]) => {
  if (isUndefined(value)) {
    return value
  }

  if (Array.isArray(value)) {
    return value.join('/')
  }

  return value
}
