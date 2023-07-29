# Technoscape Hackathon Backend

BlueJack Bank is a banking application built using a combination of modern
technologies. It utilizes React for the front-end user interface, Django as the
back-end framework, Django Rest Framework (DRF) for building RESTful APIs, and
PostgreSQL as the database. In addition to the technologies I mentioned earlier,
BlueJack Bank also incorporates Scikit-learn to build a machine learning model
for loan approval tasks.

Dependency Requirement:

-   nodejs (Currently using: v18.16.0)
-   npm (Currently using: 9.6.7)

---

## Steps/Commands

1. Open a terminal and use the following command to install the package
   depedency.

```
npm install
```

2. Create a env file to store information that is specific to our working
   environment. Use the following command in your terminal.

```
# windows machine
copy .env.example .env

#mac/linux
cp .env.example .env
```

3. To run the application, run the following command
    > Note: The server will run through default port which is 5173

```
npm run dev
```

---
