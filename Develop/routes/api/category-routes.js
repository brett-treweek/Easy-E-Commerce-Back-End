const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// -------------- Find All Categories -----------------
router.get("/", async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      include: { model: Product },
    });
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// -------------- Find a Category by its ID -----------------
router.get("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      include: { model: Product },
    });

    if (!categoriesData) {
      res
        .status(404)
        .json({ message: "No category with that id is available!" });
      return;
    }
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ----------------- Create a new Category ------------------
router.post("/", async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ---------------- Update a Category by its ID ----------------
router.put("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.json(categoriesData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// ---------------- Delete a Category by its ID -------------------
router.delete("/:id", async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({ message: "Category Destroyed" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
