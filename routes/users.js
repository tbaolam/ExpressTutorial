const { name } = require('ejs');
const express = require('express');
const router = express.Router();

// It goes in order, so the first one that matches the route will be executed

router.get('/', (req, res) => {
    console.log(req.query.name)
    res.send('User List');
})

router.get('/new', (req, res) => {
    res.render("users/new");
})

router.post('/', (req, res) => {
    const isValid = true;
    if(isValid) {
        users.push({name: req.body.firstName});
        res.redirect(`/users/${users.length - 1}`);
    }
    else {
        console.log("Error");
        res.render("users/new", {firstName: req.body.firstName});
    }
})

// This is the same as the one below, but it's more organized
router
    .route("/:id")
    .get((req, res) => {
        console.log(req.user);
        res.send(`User Detail with ID ${req.params.id}`);
    })
    .put((req, res) => {
        res.send(`Update User Detail with ID ${req.params.id}`);
    })
    .delete((req, res) => {
        res.send(`Delete User Detail with ID ${req.params.id}`);
    })

    /*
router.get('/:id', (req, res) => {
    res.send(`User Detail with ID ${req.params.id}`);
})

router.put('/:id', (req, res) => {
    res.send(`Update User Detail with ID ${req.params.id}`);
})

router.delete('/:id', (req, res) => {
    res.send(`Delete User Detail with ID ${req.params.id}`);
})
*/
const users = [{name: "Jennie"}, {name: "Lisa"}, {name: "Rose"}, {name: "Jisoo"}];

// This is a middleware that will be executed before the route, anytime the route has an id is called
router.param("id", (req, res, next, id) => {
    req.user = users[id];
    next(); // This is important, otherwise the request will hang
})

module.exports = router;