

01UDFOV/01TXYOV Applicazioni Web I / Web Applications I [2021/2022]

Lab 2: Database integration

In this lab, you will implement the integration between your JavaScript application and a local database.

\1. Retrieve data from the database

Modify the program developed in the last lab to integrate it with a local database. To that end, the first

step is to download the database provided by us called “films.db”. It contains a collection of films with

the fields described in the first lab (note: if you did not complete the lab, you can download and start to

work from the proposed solution).

Specifically, you should add the following asynchronous methods to the **FilmLibrary** to retrieve data from

the database (you are free to choose the methods' name, but we strongly suggest assigning descriptive

ones):

•

•

•

•

•

•

Get **all** the films stored in the database and return (a Promise that resolves to) an array of **Film**

objects.

Get all the **favorite** films stored in the database and return (a Promise that resolves to) an array of

**Film** objects.

Get all the films **watched today** stored in the database and return (a Promise that resolves to) an

array of **Film** objects.

Get, through a parametric query, the films stored in the database whose **watch date** is earlier a

given date received by parameter. Return (a Promise that resolves to) an array of **Film** objects.

Get, through a parametric query, the films in the database whose **rating** is greater or equal to a

given number received by parameter. Return (a Promise that resolves to) an array of **Film** objects.

Get, through a parametric query, the films in the database whose **title** matches with a given string

received by parameter. Return (a Promise that resolves to) an array of **Film** objects.

Invoke the methods you have just implemented to check if they are working correctly.

\2. Modify the data stored in the database

In this exercise, you will add a set of methods to the **FilmLibrary** object to manipulate the data stored in the

database (note: before implementing this exercise, create a copy of the local database file since, if correctly

implemented, the following methods permanently modify the content of the database).

Specifically, you should implement the following functionalities and invoke them to check if they are

working correctly:

•

•

**Store** a new movie into the database. Once completed, print a confirmation/failure message.

**Delete** a movie from the database (using its ID as a reference). Once completed, print a

confirmation/failure message.

•

**Delete** the watch date of all the films stored in the database. Once completed, print a

confirmation/failure message.





**Hints:**

\1. The file “**films.db**” is included in the repository available on GitHub:

<https://github.com/polito-WA1-AW1-2022/lab2-node-database.git>

\2. If you prefer, you can use the available Lab 1 solution as starting point:

<https://github.com/polito-WA1-AW1-2022/lab1-node.git>

As you saw in the lectures, you can connect to an SQLite database using the following module:

•

**sqlite3 [(](https://www.npmjs.com/package/sqlite3)<https://www.npmjs.com/package/sqlite3>[)](https://www.npmjs.com/package/sqlite3)[ ](https://www.npmjs.com/package/sqlite3)**– the basic library

