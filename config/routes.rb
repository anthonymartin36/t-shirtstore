Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?

  devise_scope :customer do
    post   '/api/v1/glogin',  to: 'api/v1/customers/google#login'
    delete '/api/v1/glogout', to: 'api/v1/customers/google#logout'
  end

  namespace :api do
    namespace :v1 do
      devise_for :customers, path: '', path_names: {
        sign_in:       'login',
        sign_out:      'logout',
        registration:  'register',
        password:      'reset_password'
      },
      controllers: {
        registrations:  'api/v1/customers/registrations',
        sessions:       'api/v1/customers/sessions',
        passwords:      'api/v1/customers/passwords',
        confirmations:  'api/v1/customers/confirmations'
      }

      resources :products
      resources :orders
      resources :customers
      resources :categories
      resources :newsletter_subscriptions, only: [:create]
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
