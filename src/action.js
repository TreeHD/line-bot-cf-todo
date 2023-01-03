
const baseUrl = 'https://base.code.treexhd.me/VSCode/nkust/MVCFrameWork/BackendCourse/Final/'
const getAllTodos = () => {
    return fetch(`${baseUrl}?action=getTodo`)
        .then(res => res.json())
}
const addTodo = (title, content) => {
    let formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    return fetch(`${baseUrl}?action=addTodo`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}
const delTodo = (id) => {
    let formData = new FormData()
    formData.append("id", id)
    return fetch(`${baseUrl}?action=deleteTodo`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

const updateTodo = (id) => {
    let formData = new FormData()
    formData.append("id", id)
    formData.append("complete", "true")
    return fetch(`${baseUrl}?action=updateTodo`, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}

export { getAllTodos, delTodo, updateTodo, addTodo }