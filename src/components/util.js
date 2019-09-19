export function mapItemsToObject (item) {
  if (item.type === 'object') {
    return { ...item.children.map(mapItemsToObject) }
  } else if (item.type === 'array') {
    return item.children.map(child => {
      if (child.type === 'array' && child.children.length) {
        return mapItemsToObject(child)
      }

      if (child.type === 'object' && child.children.length) {
        return { [child.key]: mapItemsToObject(child) }
      }

      return { [child.key]: child.value }
    })
  } else {
    return { [item.key]: item.value }
  }
}
