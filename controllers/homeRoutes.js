const router = require('express').Router();
const { Itinerary, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const itineraryData = await Itinerary.findAll({
      // include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ],
    });

    // Serialize data so the template can read it
    const projects = itineraryData.map((itinerary) => itinerary.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('itinerary', { 
      projects, 
    
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/itinerary/:id', async (req, res) => {
  try {
    const itineraryData = await Itinerary.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const itinerary = itineraryData.get({ plain: true });

    res.render('itinerary', {
      ...itinerary,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Itinerary }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/itinerary",async (req, res)=>{
  res.render("itinerary")
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
