class EmployersController < ApplicationController
  before_filter :authenticate_user!, only: [:edit, :update, :destroy]

  def show
    @account = Employer.find_by(id: params[:id])
    @user = @account.user
  end

  def create
    Employer.create(employer_params)
  end

  private
  def employer_params
    params.require(:employer).permit(:company_name, :location, :bio, :user_id)
  end
end
