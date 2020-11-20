async function middleware1(context, next) {
  console.log('before 1')
  await Promise.resolve(async function(context, next) {
    console.log('before 2')
    await next()
    console.log('after 2')
  }(context, () => Promise.resolve()))
  console.log('after 1')
}

middleware1({}, undefined)