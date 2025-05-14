categories = Category.create!([
  { name: "Polo T-Shirt" },
  { name: "V-Neck T-Shirt" },
  { name: "Raglan T-Shirt" },
  { name: "T-Shirt" }])

# Then create products
Product.create!([
  {
    SKU: 'TS-BLK-S',
    description: 'Classic Black T-Shirt, 100% Cotton', 
    material: 'Premium Cotton',
    price: 19.99,
    stock: 100,
    category_id: categories.fourth.id,
    image_id: 14,
    size: 'S',
    colour: 'Black'
  },
  {
    SKU: 'TS-WHT-M',
    description: 'Classic White T-Shirt, 100% Cotton',
    material: 'Premium Cotton',
    price: 19.99,
    stock: 150,
    category_id: categories.fourth.id,
    image_id: 15,
    size: 'M',
    colour: 'Black'
  },
  {
    SKU: 'TS-RED-L',
    description: 'Vibrant Red T-Shirt, Premium Material',
    material: 'Premium Cotton',
    price: 24.99,
    stock: 75,
    category_id: categories.fourth.id,
    image_id: 16,
    size: 'L',
    colour: 'Red'
  },
  {
    SKU: 'PL-BLU-L',
    description: 'Comfortable Blue Polo T-Shirt',
    material: 'Premium Cotton',
    price: 39.99,
    stock: 50,
    category_id: categories.first.id,
    image_id: 3,
    size: 'XL',
    colour: 'Gray'
  },
  {
    SKU: 'RGB-BLU-M',
    description: 'Raglan T-Shirt with Blue Sleeves',
    material: 'Premium Cotton',
    price: 15.99,
    stock: 80,
    category_id: categories.third.id,
    image_id: 10,
    size: 'M',
    colour: 'Blue'
  }
])

puts "Created #{Product.count} products"



# This file should ensure the existence of records required to run the application in every environment (production,