'use strict'

// check for data from local storage
const getSavedTodos = function(){
    const todoJSON = localStorage.getItem('todos')
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }
}

//save todos to localStorage
const saveTodos = function(todos){
    localStorage.setItem('todos', JSON.stringify(todos))
}
//remove todo function
const removeTodo = function(id){
    const todoIndex = todos.findIndex(function(todo){
        return todo.id === id
    })
    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}
// toggle todo function
const toggleTodo = function(id){
    // const todoIndex = todos.findIndex(function(todo){
    //     return todo.id === id
    // })
    // if(todoIndex > -1){
    //     todos[todoIndex].completed = !todos[todoIndex].completed
    // }
    const todo = todos.find(function(todo){
        return todo.id === id
    })
    if(todo){
        todo.completed = !todo.completed
    }
}


//generate DOM element for todo
const generateTodoDOM = function(todo){
    const newTodo = document.createElement('label')
    const container = document.createElement('div')
    const text = document.createElement('span')
    const checkbox = document.createElement('input')
    const button = document.createElement('button')

    //setup checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    container.appendChild(checkbox)
    checkbox.addEventListener('change', function(){
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    //setup text value
    text.textContent = todo.text
    container.appendChild(text)

    //seting up container
    newTodo.classList.add('list-item')
    container.classList.add('list-item__container')
    newTodo.appendChild(container)

    //setup remove button
    button.textContent = 'remove'
    button.classList.add('button', 'button--text')
    newTodo.appendChild(button)
    button.addEventListener('click', function(){
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })


    return newTodo
}

//generate DOM elements for list summary
const generateSummaryDOM = function(incompleteTodos){
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if(incompleteTodos.length === 1) {
        summary.textContent = `you have ${incompleteTodos.length} todo left`
    } else {
        summary.textContent = `you have ${incompleteTodos.length} todos left`
    }
    return summary
}


// render application todos based on filters
const renderTodos = function(todos, filters){
    let filteredTodos = todos.filter(function(todo){
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    const incompleteTodos = filteredTodos.filter(function(todo){
        return !todo.completed
    })


    filteredTodos = filteredTodos.filter(function(todo){
        if(filters.hideCompleted){
            return !todo.completed
        } else{
            return true
        }
    })

    document.querySelector('#todos').innerHTML = ''
    
    const summary = generateSummaryDOM(incompleteTodos)
    document.querySelector('#todos').appendChild(summary)
    
    if(filteredTodos.length > 0){
        filteredTodos.forEach(function(todo){
            const newTodo = generateTodoDOM(todo)
            document.querySelector('#todos').appendChild(newTodo)
        })
    } else {
        const noTodo = document.createElement('p')
        noTodo.classList.add('empty-message')
        noTodo.textContent = 'no todos to show'
        document.querySelector('#todos').appendChild(noTodo)
    }
}



