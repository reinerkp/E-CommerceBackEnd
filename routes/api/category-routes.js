const router = require("express").Router();
const { Category, Product, ProductTag } = require("../../models");

// The `/api/categories` endpoint

 // find all categories
  // be sure to include its associated Products
router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll(
      {include: [{ model: Product, through: ProductTag, as: 'category_products' }]}
    );
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
  try {
    // First, we find a user using their primary key (provided by params)
    const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product, through: ProductTag, as: 'category_products' }]
  });
    // If userData evaluates as false (no user exists with that primary key), then we will send an error message
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

 // create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
