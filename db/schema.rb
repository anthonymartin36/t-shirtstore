# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2026_11_19_000002) do
  create_table "allowlisted_jwts", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.string "jti", null: false
    t.string "aud"
    t.datetime "exp", null: false
    t.string "remote_ip"
    t.string "os_data"
    t.string "browser_data"
    t.string "device_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_allowlisted_jwts_on_customer_id"
    t.index ["jti"], name: "index_allowlisted_jwts_on_jti", unique: true
  end

  create_table "carts", force: :cascade do |t|
    t.integer "quantity"
    t.integer "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["product_id"], name: "index_carts_on_product_id"
    t.index ["user_id"], name: "index_carts_on_user_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "customers", force: :cascade do |t|
    t.string "email"
    t.string "encrypted_password"
    t.string "address"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "name"
    t.integer "user_id"
    t.string "provider"
    t.string "uid"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.index ["confirmation_token"], name: "index_customers_on_confirmation_token", unique: true
    t.index ["email"], name: "index_customers_on_email", unique: true
    t.index ["provider", "uid"], name: "index_customers_on_provider_and_uid", unique: true
    t.index ["reset_password_token"], name: "index_customers_on_reset_password_token", unique: true
    t.index ["user_id"], name: "index_customers_on_user_id", unique: true
  end

  create_table "images", force: :cascade do |t|
    t.string "image_name"
    t.string "image_alt"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jwt_denylists", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.index ["jti"], name: "index_jwt_denylists_on_jti", unique: true
  end

  create_table "newsletter_subscriptions", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "subscribed_at", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_newsletter_subscriptions_on_email", unique: true
  end

  create_table "order_items", force: :cascade do |t|
    t.integer "quantity"
    t.decimal "price"
    t.integer "product_id", null: false
    t.integer "order_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_order_items_on_order_id"
    t.index ["product_id"], name: "index_order_items_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.integer "shipment_id", null: false
    t.integer "payment_id", null: false
    t.decimal "cost_price", precision: 10, scale: 2
    t.decimal "tax", precision: 10, scale: 2
    t.decimal "courier_cost", precision: 10, scale: 2
    t.decimal "total", precision: 10, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_orders_on_customer_id"
    t.index ["payment_id"], name: "index_orders_on_payment_id"
    t.index ["shipment_id"], name: "index_orders_on_shipment_id"
  end

  create_table "password_reset_requests", force: :cascade do |t|
    t.integer "customer_id", null: false
    t.datetime "requested_at", null: false
    t.datetime "completed_at"
    t.string "ip_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_password_reset_requests_on_customer_id"
  end

  create_table "payments", force: :cascade do |t|
    t.string "card_name"
    t.string "card_number"
    t.string "expiry_date"
    t.string "cvv"
    t.integer "customer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_payments_on_customer_id"
  end

  create_table "products", force: :cascade do |t|
    t.text "description"
    t.text "material"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "category_id", null: false
    t.integer "image_id"
    t.string "colour"
    t.string "size"
    t.integer "stock"
    t.string "SKU"
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "shipments", force: :cascade do |t|
    t.string "full_name"
    t.string "address"
    t.string "city"
    t.string "postal_code"
    t.string "country"
    t.integer "customer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["customer_id"], name: "index_shipments_on_customer_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "guest_token", null: false
    t.integer "cart_id"
    t.integer "wishlist_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["guest_token"], name: "index_users_on_guest_token", unique: true
  end

  create_table "wishlists", force: :cascade do |t|
    t.integer "quantity"
    t.integer "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id"
    t.index ["product_id"], name: "index_wishlists_on_product_id"
    t.index ["user_id"], name: "index_wishlists_on_user_id"
  end

  add_foreign_key "allowlisted_jwts", "customers", on_delete: :cascade
  add_foreign_key "carts", "products"
  add_foreign_key "carts", "users"
  add_foreign_key "customers", "users"
  add_foreign_key "order_items", "orders"
  add_foreign_key "order_items", "products"
  add_foreign_key "orders", "customers"
  add_foreign_key "orders", "payments"
  add_foreign_key "orders", "shipments"
  add_foreign_key "password_reset_requests", "customers", on_delete: :cascade
  add_foreign_key "payments", "customers"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "images"
  add_foreign_key "shipments", "customers"
  add_foreign_key "users", "carts"
  add_foreign_key "users", "wishlists"
  add_foreign_key "wishlists", "products"
  add_foreign_key "wishlists", "users"
end
