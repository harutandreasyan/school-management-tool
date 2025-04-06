# School Management Tool

This is a web application for managing school data. The project is developed using the following technologies:
- **Backend:** Express.js, Apollo Server, Prisma ORM, MySQL, Node.js (ES6)
- **Frontend:** React.js, Apollo Client, Material UI, Vite

## Installing and running the project locally
git clone https://github.com/harutandreasyan/school-management-tool.git

### Backend
cd school-management-tool/backend
npm install

## Create a .env file in the backend directory with the following content (adjust values as needed) 
DATABASE_URL="mysql://user:password@localhost:3306/sc_task"
JWT_SECRET="mySuperSecretKey"
PORT=4000

## Run database migrations and seed the database
npx prisma migrate dev --name init <br>
npm run seed  <br>
npm run dev 

### Frontend 
cd school-management-tool/frontend  <br>
npm install  <br>
npm run dev  
