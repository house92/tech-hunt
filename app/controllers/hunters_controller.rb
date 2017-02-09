class HuntersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update, :destroy]

  def show
    @account = Hunter.find_by(id: params[:id])
    @user = @account.user
    @big_five = @account.big_five
    @myers_briggs = @account.myers_briggs
  end

  def create
    Hunter.create(hunter_params)
  end

  def update
    account = Hunter.find_by(user_id: hunter_params[:user_id])
    account.update(hunter_params)
    respond_to do |format|
      format.html {}
      format.json {
        render json: account
      }
    end
  end

  private
  def hunter_params
    params.require(:hunter).permit(:first_name, :last_name, :location, :bio, :user_id)
  end
end
