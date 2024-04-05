const router = require('express').Router();
const { User, Itinerary, Goal } = require('../../models');


//Gets all users and their associated intinerary
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [{ model: Itinerary }],
    });
    console.log(allUsers)
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});


//create a user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//Gabe Code Space
















//Gabe End Code Space

//create itinerary and assign to user
//create goal and add it to the itinerary
//delete a itinerary and all goals "On CASCADE"
//delete a goal
//delete a user



// router.post('/login', async (req, res) => {
//   try {
//     const userData = await User.findOne({ where: { email: req.body.email } });

//     if (!userData) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     const validPassword = await userData.checkPassword(req.body.password);

//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

//     req.session.save(() => {
//       req.session.user_id = userData.id;
//       req.session.logged_in = true;

//       res.json({ user: userData, message: 'You are now logged in!' });
//     });

//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.post('/logout', (req, res) => {
//   if (req.session.logged_in) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
// });

module.exports = router;
