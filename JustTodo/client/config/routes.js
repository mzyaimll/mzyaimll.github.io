import Todo from '../view/todo/todo1'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    props: true,
    component: Todo
  }
]
