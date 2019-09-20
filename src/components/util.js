function getValue(node) {
  return node.value
}

function getKeyValue(node) {
  return { [node.key]: node.value }
}

// TODO 数据缓存

let i = 0
export function travelNode(node) {
  i += 1
  const currentNode = node

  if (currentNode.children.length > 0) {
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

  console.log('i :', i)
  return { [currentNode.key]: currentNode.value }
}

export function randomId() {
  return Math.random()
    .toString(16)
    .slice(-6)
}
