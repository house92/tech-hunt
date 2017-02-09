class EmployersController < ApplicationController
  before_action :authenticate_user!, only: [:edit, :update, :destroy]

  def show
    @account = Employer.find_by(id: params[:id])
    @user = @account.user
  end

  def create
    Employer.create(employer_params)
  end

  def update
    account = Employer.find_by(user_id: employer_params[:user_id])
    account.update(employer_params)
    respond_to do |format|
      format.html {}
      format.json {
        render json: account
      }
    end
  end

  private
  def employer_params
    params.require(:employer).permit(:company_name, :location, :bio, :user_id)
  end
end
