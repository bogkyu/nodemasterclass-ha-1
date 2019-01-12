# nodemasterclass-ha-1
Homework Assignment #1

This is the first of several homework assignments you'll receive in this course. In order to receive your certificate of completion (at the end of this course) you must complete all the assignments and receive a passing grade.

## How to Turn It In:

1. Create a public github repo for this assignment.

2. Create a new post in the Facebook Group  and note "Homework Assignment #1" at the top.

3. In that thread, discuss what you have built, and include the link to your Github repo.

## The Assignment:

Please create a simple "Hello World" API. Meaning:

1. It should be a RESTful JSON API that listens on a port of your choice.

2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.


# My solution

I tried to follow the recipe from the lectures, and I came up with this solution.

Particularly, I created an uniform return object.  The answers also trasmit if an
error had been identified:

* if the path is present in routes (actually, there is only one, '``hello`'):

```javascript
{
    "isError": false,
    "message": "Text sent." // echoing back the message
}
```

* if the path sent is not present into routes

```javascript
{
    "isError": true,
    "message": "Wrong path: []. Use one of [hello]"
}
```
