Rails.application.routes.draw do
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

  resources :users, only: [:index, :show, :dashboard] do
    get 'dashboard' => 'users#dashboard'
  end

  resources :hunters, only: [:create, :update]

  resources :employers, only: [:create, :update]

  resources :jobs, only: [:index, :show, :new, :create]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
