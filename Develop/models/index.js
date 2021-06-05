const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'

})

Tag.belongsToMany(Product, { 
  through: ProductTag,
  foreignKey: 'tag_id'
})

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
