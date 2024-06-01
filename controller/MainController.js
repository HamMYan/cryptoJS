const crypto = require('crypto');
const { User } = require('../model/index');

class MainController {
    static async loginPage(req, res) {
        res.render('login');
    }
    static async registerPage(req, res) {
        res.render('register');
    }
    static async register(req, res) {
        const hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        const hashedPassword = hash.digest('hex');
        await User.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPassword
        });
        res.redirect('/');
    }
    static async login(req, res) {
        const user = await User.findOne({
            where: {
                email: req.body.username
            }
        });
        const message = 'Username or password is wrong'
        if (!user) {
            res.render('login', { message });
            return;
        }

        const hash = crypto.createHash('sha256');
        hash.update(req.body.password);
        const hashedPassword = hash.digest('hex');
        if (hashedPassword === user.password) {
            res.render('profile', { user });
        } else {
            res.render('login', { message });
        }
    }
    static async settingsPage(req, res) {
        const user = await User.findOne({
            where: { id: req.params.id }
        })
        res.render('settings', { user })
    }
    static async changePassword(req, res) {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        })


        const hash = crypto.createHash('sha256');
        hash.update(req.body.oldPassword);
        const hashedPassword = hash.digest('hex');
        
        const hash2 = crypto.createHash('sha256');
        hash2.update(req.body.newPassword);
        const newPass = hash2.digest('hex');
    

        if (hashedPassword === user.password) {
            if (req.body.newPassword == req.body.confPassword) {
                await User.update(
                    {
                        password: newPass
                    },
                    {
                        where: {
                            id: user.id
                        }

                    }
                )
                res.redirect(`/settings/${user.id}`)
            } else {
                res.send('New password and Confiform password are not the same')
            }
        } else {
            res.send('Old password is wrong')
        }
    }
}

module.exports = MainController;