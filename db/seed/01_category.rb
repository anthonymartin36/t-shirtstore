['Plain T-Shirt', 'Polo T-Shirt', 'V-Neck T-Shirt', 'Raglan T-Shirt'].each do |name|
  Category.find_or_create_by!(name: name)
end

puts "Categories total: #{Category.count}"
