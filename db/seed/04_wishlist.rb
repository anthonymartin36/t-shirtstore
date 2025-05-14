product = Product.create!([
  SKU: 'TS-BLK-S',
  description: 'Classic Black T-Shirt, 100% Cotton', 
  material: 'Premium Cotton',
  price: 19.99,
  stock: 100,
  category_id: 1,
  image_id: 14,
  size: 'S',
  colour: 'Black'
])

# Create Wishlist with valid attributes
Wishlist.create!([
  { quantity: 2, customer_id: 1, product_id: product.first.id },
  { quantity: 1, customer_id: 2, product_id: product.first.id },
])

puts "Created #{Wishlist.count} Cart"
