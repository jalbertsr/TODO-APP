const strftime = require('strftime')
const path = require('path')
const writeFile = require(path.join(process.cwd(), './helpers/writeFile'))

function handlePostTasks (req, res) {
  const taskName = req.body.task
  const date = strftime('%B %d, %Y %H:%M', new Date())
  const createId = () => '_' + Math.random().toString(36).substr(2, 9)
  const newTask = {name: `${taskName}`, time: `(Created at: ${date})`, ID: createId()}
  req.session.tasks.push(newTask)
  writeFile(req)

  res.redirect('/tasks/')
}

module.exports = handlePostTasks
