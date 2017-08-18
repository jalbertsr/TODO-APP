const Task = require('../../../data-db/models/Task')

function handlePutTasks (req, res) {
  const idsArray = req.params.ids.split(',')

  const promiseArray = idsArray.map(id => Task.findByIdAndUpdate(id, {done: true}))
  Promise.all(promiseArray)
    .then(res.status(200))
    .catch(() => res.send(`Fail to add checkboxed tasks`))
}

module.exports = handlePutTasks
