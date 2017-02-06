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
    get 'tests' => 'tests#show'
    post 'tests/big_five' => 'tests#big_five'
    post 'tests/myers_briggs' => 'tests#myers_briggs'
  end

  resources :hunters, only: [:create, :update]

  resources :employers, only: [:create, :update]

  get '/applications/accounts' => 'applications#accounts'

  resources :applications, only: [:index]

  resources :jobs, only: [:index, :show, :new, :create] do
    resources :applications, only: [:show, :new, :create]
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
