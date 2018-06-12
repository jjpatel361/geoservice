### App Implementation Details  

- Stack
    -  MySQL 8 
    -  NodeJS (ExpressJS for server)

The project requirement in a nut shell is _point inside a polygon problem_. The geo spatial co ordinates represent a polygon structure of American states. Given these shape outlines and a geo location point the app should return the co responding state the point lies in.

MySQL newer versions are supporting storage of spatial co ordinates and geo spatial data types `Polygon` and `Point`. So, we can store the co ordinates in database and write simple spatial queries on it. This works because a `Polygon` can be viewed as a set of connected `Point` objects.

**Database Structure**

| id        | state           | shape  |
| ------------- |:-------------:| -----:|
| 1      | WASHINGTON | POLYGON [OBJECT] |
| 2      | NEW YORK   | POLYGON [OBJECT] |

**Database Query**

```sql
SELECT STATE FROM GEOM where ST_CONTAINS(geom.shape, POINT(-78.616215, 42.433614))
```

returns the state.

So far, we figured out the geo spatial  `INSERT` and `SELECT`. Next, we need to populate database from the given `states.json` file. The insert script is generated via a python code (_see sql-generator.py_). The python script outputs insert statements on standard output stream.

Lastly, we need an external interface to query the database. We use `ExpressJS` for server that queries the MySQL and generates appropriate response. Refer `index.js` for server side.

### Steps

##### Database

 - Install MySQL 8 on your local machine
 - Create table query

    ```sql
    CREATE TABLE `geom` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `state` varchar(60) DEFAULT NULL,
      `shape` polygon NOT NULL,
      PRIMARY KEY (`id`)
    );
    ```
  - Generate Insert Script
    ```python
    python sql-generator.py > query.sql
    ```
_Ensure the states.json is in same directory as python file. see `sql` folder_

##### For Server

- Update `config.json` with your database details (username, password, dbname).

- Install dependencies and start server
```javascript
npm install
npm start
```




