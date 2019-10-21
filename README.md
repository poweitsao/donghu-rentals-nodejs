# donghu-rentals-nodejs
  I wrote a Node.js backend for a local video rental store in Donghu District, Taipei City, Taiwan. They primarily use this application for an in-store system that tracks movies, their genres, their available inventory, customers and employees. It also allows for the authentication of different accounts using JSON-web tokens and a hash function for security, as managers and regular employees would see different information. 

  It uses mongoDB to store various javascript objects, including information on Customers, Employees, Movies, Genres and customer membership options. It allowed their front-end interface to query the database for the relevant information to be displayed. 

  After multiple iterations and suggestions by employees, the store owners and other programmers, this version was adopted by the store to be used on a day-to-day basis.
