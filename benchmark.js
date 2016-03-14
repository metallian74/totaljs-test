siege('node debug.js --harmony')
  .on(8000)
  .for(10000).times
  .get('/')
  .attack()
