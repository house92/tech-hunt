Rails.application.routes.draw do
  get 'users/index'

  get 'users/show'

  get 'users/dashboard'

  root 'pages#home'

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :users do
    root 'users#dashboard' # creates user_root_path
  end

  scope :auth do
    get 'is_signed_in', to: 'auth#is_signed_in?'
  end

  get '/users/verification' => 'users/registrations#verification', as: 'user_verification'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
