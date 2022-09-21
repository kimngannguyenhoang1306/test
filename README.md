Clone this repo then run npm install and start both API and CLIENT.

- API run at: http://localhost:4000

- CLIENT run at: http://localhost:3000

# Using UI
- Access http://localhost:3000 to get user list.
- Enter name to search on Search bar.
- Add users by clicking 'Click to add users' button, enter users info then click 'Add'
- Update users inline then click 'Click to update users'


# task 1
> GET API: http://localhost:4000/users
>
> - req: can search users by using Postman to send request using req.query.name or using UI
>
> - res: <list of users> in JSON format

> POST API: http://localhost:4000/update
>
> - req: 
>
>        { updateUsers:
>                [ {id: (use GET API to know id if sending request by Postman),         
>                  username: , 
>                  email: ,
>                  birthdate: }, 
>                  ...
>                ]
>        }
>      
> - res: notification in JSON format

# task 2
## 2.1 

Switch to prelive branch to test if database is empty: npm test
      
