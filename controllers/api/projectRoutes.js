const router = require('express').Router();
const { Project, Itinerary} = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newItinerary = await Itinerary.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItinerary);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itineraryData = await Itinerary.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itineraryData) {
      res.status(404).json({ message: 'No itinerary found with this id!' });
      return;
    }

    res.status(200).json(itineraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allItinerary = await Itinerary.findAll()
    res.status(200).json(allItinerary)
    
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.get('/:id',async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneitinerary = await Category.findOne({
      where:{
        id:req.params.id
      },
      include:[Product]


    })
    res.status(200).json(onecategory)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});
module.exports = router;

router.put('/:id', withAuth, async (req, res) => {
  try {
    const itineraryData = await Itinerary.update(
      {
        completed: req.body.completed,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!itineraryData) {
      res.status(404).json({ message: 'No itinerary found with this id!' });
      return;
    }

    res.status(200).json(itineraryData);
  } catch (err) {
    res.status(500).json(err);
  }
});