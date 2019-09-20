function getValue(node) {
  return node.value
}

function getKeyValue(node) {
  return { [node.key]: node.value }
}

export function travelNode(node) {
  const currentNode = node

  if (currentNode.children.length) {
    if (currentNode.type === 'object') {
      const object = { ...currentNode.children.map(getKeyValue) }

      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          const element = object[key]
          const keys = Object.keys(element)
          const firstKey = keys[0]

          delete object[key]
          object[firstKey] = element[firstKey]
        }
      }

      currentNode.value = object
    } else if (currentNode.type === 'array') {
      currentNode.value = currentNode.children.map(getValue)
    }

    currentNode.children.forEach(travelNode)
  }

  return { [currentNode.key]: currentNode.value }
}
