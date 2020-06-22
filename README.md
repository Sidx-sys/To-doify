# To-doify 📝

A _simple todo-list app_, which has the basic functionality of a **CRUD App**,<br>
along with _authentication_ done using **JWT** and made using **React <= Redux <= MongoDB (Atlas)**<br>
Styling done using _Materialize_

## To checkout the App :

[To-Doify📝](https://to-doify.herokuapp.com/ "To-doify")

## App features

1. ### Registration / Login

    There is a full authentication process with error feedback to make the registration process smooth and user friendly
    Once registered you'll be able to see all the todos made till date
    Sadly i could not make it user specific (yet)

2. ### Maintaining Todos

-   **Adding new Todos** => It can be done by a _AddTodo_ Card
-   **Deleting a Todo** => It can be done using the done button, to check off the task
-   **Undo a Todo\***that you just deleted\* => Just on deleting the todo you have a chance to undo that request, by just clicking on the Toast that appears on deleting
-   **Editing a Todo** => You can edit the Todo in the same card (For better UX)

3. ### Logout

    Once Logged out you can't do anything to the todo-list and will be routed to the landing Page. :)

4. ### Full Redux integration
    App is fully integrated with redux for all the state management for faster performance

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
