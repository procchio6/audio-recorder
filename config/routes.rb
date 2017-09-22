Rails.application.routes.draw do
  resources :clips
  root 'pages#main'
end
