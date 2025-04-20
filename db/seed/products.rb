categories = Category.create!([
  { name: 'T-Shirts' 
}])

# Then create products
Product.create!([
  {
    SKU: 'TS-BLK-S',
    description: 'Classic Black T-Shirt, 100% Cotton', 
    material: 'Premium Cotton',
    price: 19.99,
    stock: 100,
    category_id: categories.first.id,
    image_id: 1,
    size: 'S',
    colour: 'Black'
  },
  {
    SKU: 'TS-BLK-M',
    description: 'Classic Black T-Shirt, 100% Cotton',
    material: 'Premium Cotton',
    price: 19.99,
    stock: 150,
    category_id: categories.first.id,
    image_id: 1,
    size: 'M',
    colour: 'Black'
  },
  {
    SKU: 'TS-RED-L',
    description: 'Vibrant Red T-Shirt, Premium Material',
    material: 'Premium Cotton',
    price: 24.99,
    stock: 75,
    category_id: categories.first.id,
    image_id: 1,
    size: 'L',
    colour: 'Red'
  },
  {
    SKU: 'HD-GRY-XL',
    description: 'Comfortable Gray Hoodie, Fleece Interior',
    material: 'Premium Cotton',
    price: 39.99,
    stock: 50,
    category_id: categories.first.id,
    image_id: 1,
    size: 'XL',
    colour: 'Gray'
  },
  {
    SKU: 'TK-BLU-M',
    description: 'Summer Blue Tank Top',
    material: 'Premium Cotton',
    price: 15.99,
    stock: 80,
    category_id: categories.first.id,
    image_id: 1,
    size: 'M',
    colour: 'Blue'
  }
])

puts "Created #{Product.count} products"



# This file should ensure the existence of records required to run the application in every environment (production,