router.post("/login", (req, res) => {
    res.render("login");
});

router.post('/logout', (req, res) => {
    res.render('logout');
});