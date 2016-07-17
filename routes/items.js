module.exports = app => {
    app.route('/items')
        .get((req, res) => {
            app.adapters.db.getAll('items', (err, items) => {
                if(items) {
                    app.helpers.request(res, true, items);
                } else {
                    app.helpers.request(res, true, 'No items yet.');
                }
            });
        })

        .post((req, res) => {
            const firstname = req.body.firstname;
            const lastname = req.body.lastname;

            if(firstname && lastname) {
                app.adapters.db.save('user', {firstname, lastname}, (err, user) => {
                    app.helpers.request(res, true, user);
                });
            } else {
                app.helpers.request(res, false, 'Bad Request', 400);
            }
        });

    app.route('/user/:_id')
        .get((req, res) => {
            const _id = req.params._id;

            app.adapters.db.getById('user', _id, (err, user) => {
                if(user) {
                    app.helpers.request(res, true, user);
                } else {
                    app.helpers.request(res, false, 'No user found.', 404);
                }
            });
        });
};