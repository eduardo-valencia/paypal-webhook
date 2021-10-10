import camelCase from 'camelcase'

interface ConvertableObject {
  [key: string]: any
}

const addPropertyAsCamelCase =
  (row: ConvertableObject) => (newRow: ConvertableObject, property: string) => {
    const camelCaseProperty: string = camelCase(property)
    return {
      ...newRow,
      [camelCaseProperty]: row[property],
    }
  }

export const convertObjectToCamelCase = <NewObject extends unknown>(
  row: ConvertableObject
): NewObject => {
  const keys = Object.keys(row)
  return keys.reduce(addPropertyAsCamelCase(row), {}) as NewObject
}
