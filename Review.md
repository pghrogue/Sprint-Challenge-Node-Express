# Review Questions

## What is Node.js?
Node.js is a javascript runtime that allows running server side, without the need for a browser.

## What is Express?
Express is a minimalist web framework for Node.js that speeds development for web servers and applications/APIs.

## Mention two parts of Express that you learned about this week.
We learned about Middleware and Routers for Express.

## What is Middleware?
Middleware is a function that allows repeatable tasks to take place in between the moments where the server receives the instructions and when it processes them. This can be used to format input, check validations, check authorizations, etc.

## What is a Resource?
A resource is an Express set of instructions identified by a route. This handles what happens to data, and what is passed to the client.

## What can the API return to help clients know if a request was successful?
The API can return a status code (typically 200) to determine if a request was successful - along with that, it can return a message or a set of data.

## How can we partition our application into sub-applications?
We can partition our application using router and require. Router will let us split our resource paths into sub sections, and require (& middleware) will let us break functions into sub applications that can be reuseable.

## What is express.json() and why do we need it?
Express.json is a piece of middleware that allows us to parse the body of (post) requests.