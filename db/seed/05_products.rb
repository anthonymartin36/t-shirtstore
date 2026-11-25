plain  = Category.find_by!(name: 'Plain T-Shirt')
polo   = Category.find_by!(name: 'Polo T-Shirt')
vneck  = Category.find_by!(name: 'V-Neck T-Shirt')
raglan = Category.find_by!(name: 'Raglan T-Shirt')

[
  # --- Polo T-Shirts (images 1-7) ---
  { SKU: 'PL-WHT', description: 'White Polo T-Shirt',  material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 1,  size: 'M', colour: 'White'  },
  { SKU: 'PL-BLK', description: 'Black Polo T-Shirt',  material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 2,  size: 'M', colour: 'Black'  },
  { SKU: 'PL-BLU', description: 'Blue Polo T-Shirt',   material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 3,  size: 'M', colour: 'Blue'   },
  { SKU: 'PL-NVY', description: 'Navy Polo T-Shirt',   material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 4,  size: 'M', colour: 'Navy'   },
  { SKU: 'PL-GRN', description: 'Green Polo T-Shirt',  material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 5,  size: 'M', colour: 'Green'  },
  { SKU: 'PL-ORG', description: 'Orange Polo T-Shirt', material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 6,  size: 'M', colour: 'Orange' },
  { SKU: 'PL-RED', description: 'Red Polo T-Shirt',    material: 'Pique Cotton', price: 34.99, stock: 100, category: polo,   image_id: 7,  size: 'M', colour: 'Red'    },
  # --- Raglan T-Shirts (images 8-13) ---
  { SKU: 'RG-WB',  description: 'Raglan T-Shirt — White Body, Black Sleeves', material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 8,  size: 'M', colour: 'White/Black' },
  { SKU: 'RG-WR',  description: 'Raglan T-Shirt — White Body, Red Sleeves',   material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 9,  size: 'M', colour: 'White/Red'   },
  { SKU: 'RG-WBL', description: 'Raglan T-Shirt — White Body, Blue Sleeves',  material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 10, size: 'M', colour: 'White/Blue'  },
  { SKU: 'RG-BR',  description: 'Raglan T-Shirt — Black Body, Red Sleeves',   material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 11, size: 'M', colour: 'Black/Red'   },
  { SKU: 'RG-BBL', description: 'Raglan T-Shirt — Black Body, Blue Sleeves',  material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 12, size: 'M', colour: 'Black/Blue'  },
  { SKU: 'RG-BW',  description: 'Raglan T-Shirt — Black Body, White Sleeves', material: 'Soft Cotton', price: 29.99, stock: 80, category: raglan, image_id: 13, size: 'M', colour: 'Black/White' },
  # --- Plain T-Shirts (images 14-18) ---
  { SKU: 'TS-BLK', description: 'Black T-Shirt', material: 'Combed Cotton', price: 24.99, stock: 150, category: plain, image_id: 14, size: 'M', colour: 'Black' },
  { SKU: 'TS-WHT', description: 'White T-Shirt', material: 'Combed Cotton', price: 24.99, stock: 150, category: plain, image_id: 15, size: 'M', colour: 'White' },
  { SKU: 'TS-RED', description: 'Red T-Shirt',   material: 'Combed Cotton', price: 24.99, stock: 150, category: plain, image_id: 16, size: 'M', colour: 'Red'   },
  { SKU: 'TS-BLU', description: 'Blue T-Shirt',  material: 'Combed Cotton', price: 24.99, stock: 150, category: plain, image_id: 17, size: 'M', colour: 'Blue'  },
  { SKU: 'TS-GRN', description: 'Green T-Shirt', material: 'Combed Cotton', price: 24.99, stock: 150, category: plain, image_id: 18, size: 'M', colour: 'Green' },
  # --- V-Neck T-Shirts (images 19-20) ---
  { SKU: 'VN-RED', description: 'Red V-Neck T-Shirt',  material: 'Cotton Blend', price: 27.99, stock: 100, category: vneck, image_id: 19, size: 'M', colour: 'Red'  },
  { SKU: 'VN-BLU', description: 'Blue V-Neck T-Shirt', material: 'Cotton Blend', price: 27.99, stock: 100, category: vneck, image_id: 20, size: 'M', colour: 'Blue' },
].each do |attrs|
  Product.find_or_create_by!(SKU: attrs[:SKU]) do |p|
    p.description = attrs[:description]
    p.material    = attrs[:material]
    p.price       = attrs[:price]
    p.stock       = attrs[:stock]
    p.category    = attrs[:category]
    p.image_id    = attrs[:image_id]
    p.size        = attrs[:size]
    p.colour      = attrs[:colour]
  end
end

puts "Products total: #{Product.count}"
