Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      devise_for :customers, path: '', path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'register'
      },
      controllers: {
        registrations: 'api/v1/customers/registrations',
        sessions:      'api/v1/customers/sessions'
      }

      resources :products
      resources :orders
      resources :customers
      resources :categories
      resources :carts do
        member do
          get  :quantity
          patch :update_quantity
        end
      end
      resources :wishlists do
        member do
          get   :quantity
          get   :show_by_product
          post  :cart
          patch :update_quantity
        end
        collection do
          get 'product/:product_id', action: :find_quantity
        end
      end
    end
  end
end
