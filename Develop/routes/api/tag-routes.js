const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// ============= The `/api/tags` endpoint ==============


// ------------- Get All Tags -------------------
router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// -------------- Get Tags By ID --------------------
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (!tagData) {
      res.status(404).json({ message: "No tags with that id is available!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// --------------- Create A New Tag -------------------
router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// --------------- Update A Tag by its ID ----------------
router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// --------------- Delete a Tag by its ID ---------------
router.delete("/:id", async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Tag Destroyed" });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
