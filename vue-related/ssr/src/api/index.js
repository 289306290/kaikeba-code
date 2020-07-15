export const fetchItem = id => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      name: 'alien',
      age: 20
    })
  }, 2e3)
}) 