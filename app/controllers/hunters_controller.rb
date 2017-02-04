class HuntersController < ApplicationController
  before_filter :authenticate_user!, only: [:edit, :update, :destroy]

  def create
    Hunter.create(hunter_params)
  end

  private
  def hunter_params
    params.require(:hunter).permit(:first_name, :last_name, :location, :bio, :user_id)
  end
end
