Rails.application.routes.draw do
  get '/current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :carts
  resources :categories
  namespace :api do
    namespace :v1 do
      resources :products
      resources :orders
      resources :customers
      resources :categories
      resources :carts do
        member do
          get :quantity  # GET /api/v1/carts/:id/quantity
          patch :update_quantity  # PATCH /api/v1/carts/:id/update_quantity
        end
      end
      resources :wishlists do
        member do
          get :quantity  # GET /api/v1/wishlists/:id/quantity
          patch :update_quantity  # PATCH /api/v1/wishlists/:id/update_quantity
          post :cart, action: :add_to_cart  # POST /api/v1/wishlists/:id/cart
        end
      end
    end
  end
  #resources :customers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  #get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
