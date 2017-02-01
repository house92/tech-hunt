class EmployersController < ApplicationController

  def create
    Employer.create(employer_params)
  end

  private
  def employer_params
    params.require(:employer).permit(:company_name, :location, :bio, :user_id)
  end
end
