const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function handlePutTasks (req, res) {
  const idsArray = req.params.ids.split(',')

  for (let i = 0; i < idsArray.length; i++) {
    for (let j = 0; j < req.session.tasks.length; j++) {
      if (idsArray[i] === req.session.tasks[j].ID) {
        req.session.completed.push(req.session.tasks[j])
        req.session.tasks.splice(j, 1)
      }
    }
  }
  writeFile(req)

  res.status(200).send('checkboxed task to done succesful')
}

module.exports = handlePutTasks
